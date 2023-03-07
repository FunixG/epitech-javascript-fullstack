import {Module} from '@nestjs/common';
import SupportWebsocketService from './services/support.websocket.service';
import UserModule from '../user/user.module';

@Module({
  imports: [
    UserModule,
  ],
  providers: [
    SupportWebsocketService,
  ],
})
export default class WebsocketModule {}
