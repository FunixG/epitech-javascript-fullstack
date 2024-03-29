import CrudService from '../../core/crud-service';
import UserDto from '../dto/user-dto';
import UserTokenDto from '../dto/user-token-dto';
import UserLoginDto from '../dto/user-login-dto';

class UserService extends CrudService<UserDto> {
  constructor() {
    super('user/');
  }

  async register(request: UserDto): Promise<UserDto | undefined> {
    return super.postCustomPath<UserDto>('register', request);
  }

  async login(request: UserLoginDto): Promise<boolean | undefined> {
    const userToken = await super.postCustomPath<UserTokenDto>('login', request);
    if (userToken && userToken.accessToken) {
      localStorage.setItem('auth-js-epitech-token', userToken.accessToken);
      return true;
    }
    return false;
  }

  async actual(): Promise<UserDto | undefined> {
    return super.getCustomPath<UserDto>('actual');
  }
}

export default UserService;
