import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketUserType } from './types/socket-user.type';
import { Logger } from '@nestjs/common';
import { RequestMessageType } from './dto/request-message.type';
import { Observable, of, Subscription } from 'rxjs';
import { NotificationService } from 'src/services/notification.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['polling', 'websocket'],
})
export class ChatEventGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  //constructor(private _socket: Socket,){}

  @WebSocketServer()
  wsServer: Server;

  private _clients: Map<string, SocketUserType> = new Map<string, SocketUserType>();
  private _messageStock: Array<RequestMessageType> = []
  private _unreadMessage: Observable<Array<RequestMessageType>>
  private _subscription: Subscription

<<<<<<< HEAD
  constructor(
    //private _notification: NotificationService
  ) { }
=======
  @SubscribeMessage('getUsers')
  async checkConnected(): Promise<Array<any>> {
    let userConnected: string[] = [];
    this._clients.forEach((value, key) => {
      userConnected.push(value.userId);
    });
    //return the response to the frontEnd

    this.wsServer.emit('getUsers', userConnected);
    return userConnected;
  }
>>>>>>> e420e6e (refresh automatically from messager gateway)

  @SubscribeMessage('message')
  async chat(@MessageBody() data: RequestMessageType): Promise<any> {
      Logger.log(`Received ${JSON.stringify(data)}`)
      this._registerIncomingMessage(data)
      // Find the recipient
      const recipientSocket: SocketUserType = this._userToSocket(data.recipient)

    const payload: any = {
      emitter: data.recipient,
      recipient: data.emitter,
      datetime: new Date(),
      content: data.content,
    };
    Logger.log(
      `Emit : ${JSON.stringify(payload)} to ${recipientSocket.socket.id}`,
    );
    
    recipientSocket.socket.emit('message', payload);
  }
  private _clients: Map<string, SocketUserType> = new Map<
    string,
    SocketUserType
  >();

  //Activée à la 1ere connexion d'un client, elle contient un socketId que l'on doit stocker
  handleConnection(client: any, ...args: any[]): void {
<<<<<<< HEAD
    const { sockets } = this.wsServer.sockets

    Logger.log(`Connection was established for ${client.id}`)



    const { sockets } = this.wsServer.sockets;
    const users = {};
    Logger.log(`Connection was established for ${client.id}`);

    sockets.forEach((socket: any) => {
      if (socket.id === client.id) {
        this._clients.set(client.id, { socket })
=======
    const { sockets } = this.wsServer.sockets;
    const users = {};
    Logger.log(`Connection was established for ${client.id}`);

    sockets.forEach((socket: any) => {
      if (socket.id === client.id) {
        let userId = client.handshake.query.userId
        this._clients.set(client.id, { userId, socket });
>>>>>>> e420e6e (refresh automatically from messager gateway)
      }
    })

    //this._notification.startConnected(this._clients)
    //this._subscription = this._notification.checkConnected().subscribe({
    //  next: (usersMap) => {
    //    let usersConnected = []
    //    usersMap.forEach((value, key) => {
    //      usersConnected.push(value.userId)
    //    })
    //    this.wsServer.emit('usersConnected', usersConnected)
    //  }
    //})
    });

<<<<<<< HEAD
    const identity: ResponseConnectionType = {
      datetime: new Date(),
      socketId: client.id
    }

    // let usersConnected = []
    // this._clients.forEach((value, key) => {
    //   usersConnected.push(value.userId)
    // })

    this._clients.get(client.id).socket.emit('identity', identity);
    // this._clients.forEach((value, key) => {
    //   value.socket.emit('usersConnected', usersConnected)
    // })
    this._clients.forEach((c) => {
      if(c.socket.id !== client.id){
        c.socket.emit('userConnected', {
          newUser: this._socketToUser(client.id)
        })
      }
    })
  }

  handleDisconnect(client: any) {
    Logger.log(`Client ${client.id} was disconnected`)
    this._clients.delete(client.id)
    let usersConnected = []
    this._clients.forEach((value, key) => {
      usersConnected.push(value.userId)
    })
    Logger.log(usersConnected, 'disconnect')
    this._clients.forEach((value, key) => {
      value.socket.emit('usersConnected', usersConnected)
    })
=======
    this._clients.forEach((c) => {
      if(c.socket.id !== client.id){
        c.socket.emit('userConnected', {
          newUser: this._socketToUser(client.id)
        })
      }
    })
  }

  handleDisconnect(client: any) {
    Logger.log(`Client ${client.id} was disconnected`);
    this._clients.forEach((c) => {
      if(c.socket.id !== client.id){
        c.socket.emit('userConnected', {
          userDisconnected: this._socketToUser(client.id)
        })
      }
    })
    this._clients.delete(client.id);
>>>>>>> e420e6e (refresh automatically from messager gateway)
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() identity: ResponseConnectionType): Promise<ResponseConnectionType> {
    let usersConnected = []
    this._clients.forEach((value, key) => {
      usersConnected.push(value.userId)
    })
    Logger.log(usersConnected, 'tableau des usersConnected après userId:Identity')
    this._clients.forEach((value, key) => {
      value.socket.emit('usersConnected', usersConnected)
    })
    return identity
  }

  @SubscribeMessage('userId:Identity')
  async setUserID(@MessageBody() user: any): Promise<any> {
    this._clients.get(user.socketId).userId = user.id
  }

<<<<<<< HEAD
  private _userToSocket(user: string): SocketUserType {
    let recipient: SocketUserType
=======
  //Takes an userId and return the socket corresponding to the userId
  private _userToSocket(userId: string): SocketUserType {
    let recipient: SocketUserType;
>>>>>>> e420e6e (refresh automatically from messager gateway)
    this._clients.forEach((value: SocketUserType, sid: string) => {
      if (value.userId === userId) {
        recipient = value;
        return;
      }
    });
    return recipient;
  }

  //Takes a sid (socket id) and return the userId corresponding to the sid
  private _socketToUser(sid: string): string {
    let user = ""
    this._clients.forEach((value: SocketUserType) => {
      if (sid === value.socket.id){
        user = value.userId
      }
    })
    return user
  }

  //Takes a sid (socket id) and return the userId corresponding to the sid
  private _socketToUser(sid: string): string {
    let user = ""
    this._clients.forEach((value: SocketUserType) => {
      if (sid === value.socket.id){
        user = value.userId
      }
    })
    return user
  }

  @SubscribeMessage('startMessage')
  async startMessage(client: any, data: string): Promise<any> {
    Logger.log(`Received  service start ${JSON.stringify(data)}`);

    //Récupére le socket associé à l'id du destinataire
    const recipientSocket: SocketUserType = this._userToSocket(data);

    console.log("Voici l'id du destinataire : " + recipientSocket.userId);
    console.log("Voici le socket du destinataire : " + recipientSocket.socket.id);

    //emet sur le socket du destinataire
    this.wsServer
      .to(recipientSocket.socket.id)
      .emit('userTyping', recipientSocket.userId);
  }

}
