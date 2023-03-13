import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import CrudService from '../../core/services/crud-service';
import User from '../entities/user.entity';
import EncryptionService from '../../core/services/encryption-service';
import BadRequestError from '../../core/errors/bad-request-error';
import TranslocoKeys from '../../core/transloco-keys';
import NotFoundError from '../../core/errors/not-found-error';
import UserTokenDto from '../dtos/user-token.dto';

@Injectable()
export default class UserService extends CrudService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(
  @InjectRepository(User) repository: Repository<User>,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {
    super(repository);
  }

  async beforeDeletingEntity(entity: User): Promise<void> {
    this.logger.log('User {} is removing.', entity.username);
  }

  /**
   * Suppressing lint scanning on that because this a middle method excecution.
   * We need to encrypt password before saving it in database
   * @param request
   */
  async beforeSavingDatabase(request: User): Promise<void> {
    if (!request.id && (!request.password || request.password.length === 0)) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_PASSWORD);
    }
    if (!request.username || request.username.length === 0) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_USERNAME);
    }
    if (!request.address || request.address.length === 0 || !request.email || request.email.length === 0) {
      throw new BadRequestError();
    }

    if (request.username === 'admin') {
      if (await this.userExists('admin')) {
        throw new BadRequestError(TranslocoKeys.BAD_REQUEST_USER_EXISTS);
      } else {
        request.role = 'admin';
      }
    } else {
      if (!request.id && await this.userExists(request.username)) {
        throw new BadRequestError(TranslocoKeys.BAD_REQUEST_USER_EXISTS);
      }

      if (!request.id) {
        request.role = 'user';
      } else if (request.role === null) {
        throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_ROLE);
      }
    }

    if (request.id === null) {
      request.password = this.encryptionService.encrypt(request.password);
    } else {
      request.password = this.encryptionService.encrypt('admin');
    }
  }

  /**
   * Suppressing lint scanning on that because this a middle method excecution.
   * Here we want to hide the user password when sending data to client
   * @param entity
   */
  async beforeSendingEntity(entity: User): Promise<void> {
    this.logger.log('Sending data about user {}', entity.username);
    entity.password = null; // eslint-disable-line no-param-reassign
  }

  public async findUser(username: string): Promise<User> {
    const search = {
      username,
    } as FindOptionsWhere<User>;

    const users: User[] = await this.repository.findBy(search);

    if (users.length === 0) {
      throw new NotFoundError();
    } else {
      return users[0];
    }
  }

  public async findUserByJwt(jwt: string): Promise<User> {
    try {
      const decoded = this.jwtService.decode(jwt);
      const { sub } = decoded;
      const user: User = await this.getById(Number(sub));
      user.password = null;

      return user;
    } catch (error) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_JWT_INVALID);
    }
  }

  public static validatePasswords(databasePassword: string, toCompare: string): void {
    if (!EncryptionService.compare(toCompare, databasePassword)) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_INVALID_PASSWORD);
    }
  }

  /**
   * lint ignore because we need to hide password
   * @param user
   */
  public async generateAccessToken(user: User): Promise<UserTokenDto> {
    const roles: string[] = ['user'];
    if (user.role !== 'user') {
      roles.push(user.role);
    }

    const now: number = Math.floor(new Date().getTime() / 1000);
    const expiration: number = now + 3600;
    const payload = {
      sub: user.id.toString(),
      username: user.username,
      roles,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const token: UserTokenDto = new UserTokenDto();
    user.password = null; // eslint-disable-line no-param-reassign
    token.user = user;
    token.accessToken = accessToken;
    token.generatedAt = now;
    token.expiresAt = expiration;
    return token;
  }

  private async userExists(username: string): Promise<boolean> {
    const search = {
      username,
    };

    const users: User[] = await this.getBySearch(search);
    return users.length > 0;
  }
}
