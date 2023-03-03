import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import CrudService from '../../core/services/crud-service';
import User from '../entities/user.entity';
import EncryptionService from "../../core/services/encryption-service";

@Injectable()
export default class UserService extends CrudService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) repository: Repository<User>,
              private encryptionService: EncryptionService) {
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
  beforeSavingDatabase(request: User): void {
    request.password = this.encryptionService.encrypt(request.password); // eslint-disable-line no-param-reassign
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
}
