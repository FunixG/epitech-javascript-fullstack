import {Controller, Inject} from '@nestjs/common';
import CrudResource from '../../core/resources/crud-resource';
import User from '../entities/user.entity';
import UserService from '../services/user.service';

@Controller('user')
export default class UserController extends CrudResource<User, UserService> {
  constructor(@Inject(UserService) readonly service: UserService) {
    super(service);
  }
}
