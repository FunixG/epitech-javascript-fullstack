import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, Repository} from 'typeorm';
import CrudService from '../../core/services/crud-service';
import User from '../entities/user.entity';
import EncryptionService from '../../core/services/encryption-service';
import BadRequestError from "../../core/errors/bad-request-error";
import TranslocoKeys from "../../core/transloco-keys";
import NotFoundError from "../../core/errors/not-found-error";
import {JwtService} from "@nestjs/jwt";
import UserTokenDto from "../dtos/user-token.dto";

@Injectable()
export default class UserService extends CrudService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(
      @InjectRepository(User) repository: Repository<User>,
      private encryptionService: EncryptionService,
      private jwtService: JwtService
  ) {
    super(repository);
  }

  beforeDeletingEntity(entity: User): void {
    this.logger.log('User {} is removing.', entity.username);
  }

  /**
   * Suppressing lint scanning on that because this a middle method excecution.
   * We need to encrypt password before saving it in database
   * @param request
   */
  async beforeSavingDatabase(request: User): Promise<void> {
    if (request.password == null) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_PASSWORD);
    }
    if (request.username == null) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_USERNAME);
    }

    if (request.username === 'admin') {
      if (await this.userExists('admin')) {
        throw new BadRequestError(TranslocoKeys.BAD_REQUEST_USER_EXISTS);
      } else {
        request.role = 'admin';
      }
    } else {
      if (await this.userExists(request.username)) {
        throw new BadRequestError(TranslocoKeys.BAD_REQUEST_USER_EXISTS);
      }
    }

    request.password = this.encryptionService.encrypt(request.password);
  }

  /**
   * Suppressing lint scanning on that because this a middle method excecution.
   * Here we want to hide the user password when sending data to client
   * @param entity
   */
  beforeSendingEntity(entity: User): void {
    this.logger.log('Sending data about user {}', entity.username);
    entity.password = null; // eslint-disable-line no-param-reassign
  }

  public async findUser(username: string): Promise<User> {
    const search = {
      username: username
    } as FindOptionsWhere<User>;

    const users: User[] = await this.repository.findBy(search);

    if (users.length === 0) {
      throw new NotFoundError();
    } else {
      return users[0];
    }
  }

  public validatePasswords(databasePassword: string, toCompare: string): void {
    if (!this.encryptionService.compare(toCompare, databasePassword)) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_INVALID_PASSWORD);
    }
  }

  public async generateAccessToken(user: User): Promise<UserTokenDto> {
    let roles: string[] = ['user'];
    if (user.role !== 'user') {
      roles.push(user.role);
    }

    const now: number = Math.floor(new Date().getTime() / 1000);
    const expiration: number = now + 3600;
    const payload = {
      sub: user.id.toString(),
      username: user.username,
      roles: roles,
      iat: now,
      exp: expiration
    }

    const accessToken = await this.jwtService.signAsync(payload);

    const token: UserTokenDto = new UserTokenDto();
    user.password = null;
    token.user = user;
    token.accessToken = accessToken;
    token.generatedAt = now;
    token.expiresAt = expiration;
    return token;
  }

  private async userExists(username: string): Promise<boolean> {
    const search = {
      username: username
    };

    const users: User[] = await this.getBySearch(search);
    return users.length > 0;
  }
}
