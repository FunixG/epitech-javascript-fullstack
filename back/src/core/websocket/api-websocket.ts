import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage} from "@nestjs/websockets";
import PingEntity from "./ping.entity";
import User from "../../user/entities/user.entity";
import UserWebsocketEntity from "./user.websocket.entity";
import UserService from "../../user/services/user.service";
import * as WebSocket from "ws";

/**
 * impl class need to add WebSocketGateway annotation
 */
export default abstract class ApiWebsocket implements OnGatewayConnection, OnGatewayDisconnect {

    private pingMap = new Map<string, PingEntity>();
    private clientUserMap = new Map<string, UserWebsocketEntity>();
    private sessionsMap = new Map<string, WebSocket>();

    protected constructor(private readonly userService: UserService) {
    }

    /**
     * called when a client connects to the server
     * @param client
     * @param args
     */
    handleConnection(client: WebSocket, ...args: any[]): void {
        const sessionId = this.generateSessionId();
        this.sessionsMap.set(sessionId, client);
    }

    /**
     * called when a client disconnects from the server
     * @param client
     */
    handleDisconnect(client: WebSocket): void {
        const sessionId = this.getSessionId(client);

        if (sessionId !== null) {
            this.pingMap.delete(sessionId);
            this.clientUserMap.delete(sessionId);
            this.sessionsMap.delete(sessionId);
        }
    }

    @SubscribeMessage('message')
    handleMessage(client: WebSocket, payload: string): void {
        const sessionId = this.getSessionId(client);
        if (sessionId === null) return;

        if (payload.startsWith("pong:")) {
            this.receivedPong(client, payload.substring("pong:".length));
        } else if (payload.startsWith("auth-request:")) {
            this.linkSocketWithUser(client, payload.substring("auth-request:".length)).then();
        } else {
            this.onNewMessage(client, sessionId, this.clientUserMap.get(sessionId), payload);
        }
    }

    abstract onNewMessage(client: WebSocket, sessionId: string, user: UserWebsocketEntity | undefined, message: string): void;

    protected sendMessageToAdmins(message: string): boolean {
        let adminsReceived: number = 0;

        for (const [key, value] of this.clientUserMap) {
            const userWs: UserWebsocketEntity = value;

            if (userWs.user !== undefined && userWs.user != null && userWs.user.role === 'admin') {
                this.sendMessageToSessionId(key, message);
                adminsReceived = adminsReceived + 1;
            }
        }
        return adminsReceived > 0;
    }

    protected sendMessageToSessionId(sessionId: string, message: string): void {
        const client: WebSocket = this.sessionsMap.get(sessionId);

        if (client !== undefined) {
            client.send(message);
        }
    }

    private async linkSocketWithUser(client: WebSocket, jwt: string): Promise<void> {
        try {
            const sessionId = this.getSessionId(client);
            if (sessionId === null) return;

            const user: User = await this.userService.findUserByJwt(jwt);
            const userLink = new UserWebsocketEntity();
            userLink.user = user;
            userLink.clientSocketId = sessionId;

            this.clientUserMap.set(sessionId, userLink);
        } catch (e) {
            return;
        }
    }

    private receivedPong(client: WebSocket, pong: string): void {
        const sessionId = this.getSessionId(client);
        if (sessionId === null) return;

        const ping: PingEntity = this.pingMap.get(sessionId);

        if (ping !== undefined && ping.pingMessage === pong) {
            this.pingMap.delete(sessionId);
        }
    }

    private generateSessionId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private getSessionId(client: WebSocket): string | null {
        for (const [sessionId, wsClient] of this.sessionsMap) {
            if (wsClient === client) {
                return sessionId;
            }
        }
        return null;
    }
}
