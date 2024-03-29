import {
  Body, Controller, Get, Headers, Inject, Post,
} from '@nestjs/common';
import CrudResource from '../../core/resources/crud-resource';
import User from '../entities/user.entity';
import UserService from '../services/user.service';
import UserTokenDto from '../dtos/user-token.dto';

@Controller('user')
export default class UserController extends CrudResource<User, UserService> {
  constructor(@Inject(UserService) readonly service: UserService) {
    super(service);
  }

  @Post('register')
  async register(@Body() request: User): Promise<User> {
    return this.service.create(request);
  }

  @Post('login')
  async login(@Body() request: User): Promise<UserTokenDto> {
    const user: User = await this.service.findUser(request.username);
    UserService.validatePasswords(user.password, request.password);

    return this.service.generateAccessToken(user);
  }

  @Get('actual')
  async actual(@Headers('authorization') authHeader) {
    const token = authHeader.split(' ')[1];
    return this.service.findUserByJwt(token);
  }
}
