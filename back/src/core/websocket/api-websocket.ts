import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import {OnApplicationShutdown} from '@nestjs/common';
import {clearInterval} from 'timers';
import PingEntity from './ping.entity';
import User from '../../user/entities/user.entity';
import UserWebsocketEntity from './user.websocket.entity';
import UserService from '../../user/services/user.service';

/**
 * impl class need to add WebSocketGateway annotation
 */
export default abstract class ApiWebsocket implements OnGatewayConnection,
    OnGatewayDisconnect, OnApplicationShutdown {

  private pingMap = new Map<string, PingEntity>();

  private clientUserMap = new Map<string, UserWebsocketEntity>();

  private sessionsMap = new Map<string, WebSocket>();

  private readonly intervalId: NodeJS.Timeout;

  protected constructor(readonly userService: UserService) {
    this.intervalId = setInterval(() => {
      this.generatePingAndCheckZombies();
    }, 20000);
  }

  onApplicationShutdown(): void {
    clearInterval(this.intervalId);
  }

  /**
   * called when a client connects to the server
   * @param client
   */
  handleConnection(client: WebSocket): void {
    const sessionId = ApiWebsocket.generateSessionId();
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
    console.log(payload);
    const sessionId = this.getSessionId(client);
    if (sessionId === null) return;

    if (payload.startsWith('pong:')) {
      this.receivedPong(client, payload.substring('pong:'.length));
    } else if (payload.startsWith('auth-request:')) {
      this.linkSocketWithUser(client, payload.substring('auth-request:'.length)).then();
    } else {
      this.onNewMessage(client, sessionId, this.clientUserMap.get(sessionId), payload);
    }
  }

  public broadcast(message: string): void {
    this.sessionsMap.forEach((value, key) => {
      value.send(message);
    });
  }

  abstract onNewMessage(client: WebSocket, sessionId: string,
    user: UserWebsocketEntity | undefined, message: string): void;

  public sendMessageToAdmins(message: string): boolean {
    let adminsReceived: number = 0;

    this.clientUserMap.forEach((value, key) => {
      const userWs: UserWebsocketEntity = value;

      if (userWs.user !== undefined && userWs.user != null && userWs.user.role === 'admin') {
        this.sendMessageToSessionId(key, message);
        adminsReceived += 1;
      }
    });

    return adminsReceived > 0;
  }

  protected sendMessageToSessionId(sessionId: string, message: string): void {
    const client: WebSocket = this.sessionsMap.get(sessionId);

    if (client !== undefined) {
      client.send(message);
    }
  }

  private async linkSocketWithUser(client: WebSocket, jwt: string): Promise<void> {
    const sessionId = this.getSessionId(client);
    if (sessionId === null) return;

    try {
      const user: User = await this.userService.findUserByJwt(jwt);
      const userLink = new UserWebsocketEntity();
      userLink.user = user;
      userLink.clientSocketId = sessionId;

      this.clientUserMap.set(sessionId, userLink);
    } catch (e) {
      this.clientUserMap.delete(sessionId);
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

  private static generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15)
        + Math.random().toString(36).substring(2, 15);
  }

  private getSessionId(client: WebSocket): string | null {
    let sessionIdToSend: string | null = null;

    this.sessionsMap.forEach((wsClient, sessionId) => {
      if (wsClient === client) {
        sessionIdToSend = sessionId;
      }
    });

    return sessionIdToSend;
  }

  private generatePingAndCheckZombies(): void {
    this.checkZombies();
    this.sendPings();
  }

  private sendPings(): void {
    this.sessionsMap.forEach((ws, sessionId) => {
      let ping = this.pingMap.get(sessionId);

      if (ping === undefined || ping === null) {
        ping = new PingEntity();
        ping.sentAt = new Date();
        ping.clientSocketId = sessionId;
        ping.pingMessage = ApiWebsocket.generatePingData();

        ws.send('ping:' + ping.pingMessage);
      }
    });
  }

  private checkZombies(): void {
    this.pingMap.forEach((pingEntity, sessionId) => {
      if (ApiWebsocket.pingExpired(pingEntity)) {
        const session = this.sessionsMap.get(sessionId);

        if (session !== undefined && session !== null) {
          session.close();
          this.pingMap.delete(sessionId);
          this.clientUserMap.delete(sessionId);
          this.sessionsMap.delete(sessionId);
        }
      }
    });
  }

  private static pingExpired(pingEntity: PingEntity): boolean {
    const now = new Date();

    const diffMilliseconds = Math.abs(now.getTime() - pingEntity.sentAt.getTime());
    const diffMinutes = diffMilliseconds / (1000 * 60);
    return Math.floor(diffMinutes) === 1 && diffMinutes % 1 === 0;
  }

  private static generatePingData(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 15; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
