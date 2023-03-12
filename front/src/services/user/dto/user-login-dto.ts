import RequestInterface from '../../core/entities/request-interface';

class UserLoginDto extends RequestInterface {
  username?: string;

  password?: string;
}

export default UserLoginDto;
