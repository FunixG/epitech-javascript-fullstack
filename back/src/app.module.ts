import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { StatusController } from './status.controller';

@Module({
  imports: [UserModule],
  controllers: [StatusController]
})
export class AppModule {}
