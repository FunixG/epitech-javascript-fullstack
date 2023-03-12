import CrudService from '../../core/crud-service';
import UserDto from '../dto/user-dto';
import UserTokenDto from '../dto/user-token-dto';

class UserService extends CrudService<UserDto> {
  constructor() {
    super('user/');
  }

  async register(request: UserDto): Promise<UserDto | undefined> {
    return super.postCustomPath<UserDto>('register', request);
  }

  async login(request: UserTokenDto): Promise<UserTokenDto | undefined> {
    return super.postCustomPath<UserTokenDto>('login', request);
  }

  async actual(): Promise<UserDto | undefined> {
    return super.getCustomPath<UserDto>('actual');
  }
}

export default UserService;
