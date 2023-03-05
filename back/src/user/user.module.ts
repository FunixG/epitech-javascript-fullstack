import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';
import User from './entities/user.entity';
import EncryptionService from '../core/services/encryption-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    EncryptionService,
    UserService,
  ],
  controllers: [
    UserController,
  ],
})
export default class UserModule {}
