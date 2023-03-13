import {Module} from '@nestjs/common';
import SupportWebsocketService from './services/support.websocket.service';
import UserModule from '../user/user.module';
import {SocketModule} from "@nestjs/websockets/socket-module";

@Module({
  imports: [
      SocketModule,
    UserModule,
  ],
  providers: [
    SupportWebsocketService,
  ],
  exports: [
    SupportWebsocketService,
  ],
})
export default class WebsocketModule {}
