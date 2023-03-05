import User from '../entities/user.entity';

export default class UserTokenDto {
  user: User;

  accessToken: string;

  generatedAt: number;

  expiresAt: number;
}
