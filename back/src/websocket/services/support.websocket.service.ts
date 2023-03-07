import ApiWebsocket from "../../core/websocket/api-websocket";
import {WebSocketGateway} from "@nestjs/websockets";
import UserService from "../../user/services/user.service";
import WebSocket from "ws";
import UserWebsocketEntity from "../../core/websocket/user.websocket.entity";

@WebSocketGateway()
export default class SupportWebsocketService extends ApiWebsocket {

    constructor(userService: UserService) {
        super(userService);
    }

    onNewMessage(client: WebSocket, sessionId: string, user: UserWebsocketEntity | undefined, message: string): void {
        this.sendMessageToSessionId(sessionId, message);
    }

}
