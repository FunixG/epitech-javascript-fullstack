import UserDto from './user-dto';

class UserTokenDto {
  user?: UserDto;

  accessToken?: string;

  generatedAt?: number;

  expiresAt?: number;
}

export default UserTokenDto;
