import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';
import User from './entities/user.entity';
import EncryptionService from '../core/services/encryption-service';
import JwtAuthGuard from './services/jwt.auth.guard';
import RolesAuthGuard from './services/roles.auth.guard';
import JwtStrategyAuthGard from './services/jwt-strategy.auth.gard';
import UserAuthService from './services/user-auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JwtStrategyAuthGard.getJwtSecretKey(),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    EncryptionService,
    UserService,
    UserAuthService,
    JwtAuthGuard,
    RolesAuthGuard,
    JwtStrategyAuthGard,
  ],
  controllers: [
    UserController,
  ],
  exports: [
    PassportModule,
    JwtAuthGuard,
  ],
})
export default class UserModule {}
