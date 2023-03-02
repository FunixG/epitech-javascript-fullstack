import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import CrudService from '../../core/services/crud-service';
import User from '../entities/user.entity';

@Injectable()
export default class UserService extends CrudService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  beforeDeletingEntity(entity: User): void {
    this.logger.log('User {} is removing.', entity.username);
  }

  beforeSavingDatabase(request: User): void {
    this.logger.log('Database user action for user {}. Patching ? -> {}', request.username, request.id === null);
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
