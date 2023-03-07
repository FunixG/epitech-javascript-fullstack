import {WebSocketGateway} from '@nestjs/websockets';
import WebSocket from 'ws';
import ApiWebsocket from '../../core/websocket/api-websocket';
import UserService from '../../user/services/user.service';
import UserWebsocketEntity from '../../core/websocket/user.websocket.entity';

@WebSocketGateway()
export default class SupportWebsocketService extends ApiWebsocket {
  constructor(readonly userService: UserService) {
    super(userService);
  }

  onNewMessage(
    client: WebSocket,
    sessionId: string,
    user: UserWebsocketEntity | undefined,
    message: string,
  ): void {
    this.sendMessageToSessionId(sessionId, message);
  }
}
