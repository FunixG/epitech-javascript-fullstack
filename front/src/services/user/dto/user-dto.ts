import ApiEntity from '../../core/entities/api-entity';

class UserDto extends ApiEntity {
  username?: string;

  password?: string;

  email?: string;

  address?: string;

  role?: string;

  isActive?: boolean;
}

export default UserDto;
