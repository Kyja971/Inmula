import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketUserType } from './types/socket-user.type';
import { SocketAddress } from 'net';
import { Logger } from '@nestjs/common';
import { ResponseConnectionType } from './dto/response-connection.type';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    },
    transports: ['polling', 'websocket'],
  }
)
export class ChatEventGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wsServer: Server;

  private _clients: Map<string, SocketUserType> = new Map<string, SocketUserType>();
  

  //Activée à la 1ere connexion d'un client, elle contient un socketId que l'on doit stocker
  //
  handleConnection(client: any, ...args: any[]): void {
    const { sockets } = this.wsServer.sockets

    Logger.log(`Connection was established for ${client.id}`)

    sockets.forEach((socket: any) => {
      if (socket.id === client.id) {
        this._clients.set(client.id, { socket })
      }
    })

    const identity: ResponseConnectionType = {
      datetime: new Date(),
      socketId: client.id
    }

    this._clients.get(client.id).socket.emit('identity', identity);
  }

  handleDisconnect(client: any) {
    Logger.log(`Client ${client.id} was disconnected`)
    this._clients.delete(client.id)
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() identity: ResponseConnectionType): Promise<ResponseConnectionType> {
    return identity
  }

  @SubscribeMessage('userId:Identity')
  async setUserID(@MessageBody() user: any): Promise<any> {
    this._clients.get(user.socketId).userId = user.id
  }
}
