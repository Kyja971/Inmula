import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { InternService } from './intern.service';
import { StorageService } from './storage.service';
import { ChatMessageType } from '../types/chat/chat-message.type';

@Injectable({
  providedIn: 'root',
})
export class WsChatService {
  private _sid: string = '';
  private _emitterId: string = '';
  private _messages: Array<any> = [];
  private _messages$: BehaviorSubject<Array<any>> = new BehaviorSubject<
    Array<any>
  >(this._messages);

  constructor(
    private _socket: Socket,
    private _internService: InternService,
    private _storageService: StorageService
  ) {}

  public set sid(sid: string) {
    this._sid = sid;
  }

  public get sid(): string {
    return this._sid;
  }

  public get messages$(): BehaviorSubject<Array<any>> {
    return this._messages$;
  }

  private _updateMessages(): Array<any> {
    const messages = this._messages
      .filter((message: any) => {
        console.log(`Analyzed message : ${JSON.stringify(message)}`);
        return (
          message.emitter === this._internService.intern?.id ||
          message.recipient === this._internService.intern?.id
        );
      })
      .sort((m1: any, m2: any) => m1.datetime - m2.datetime);
    console.log(`Messages was updated : ${JSON.stringify(messages)}`);
    this._messages$.next(messages);
    return messages;
  }

  connect(userId: string): void {
    const auth: string | null = this._storageService.retrieve('auth');
    if (auth) this._emitterId = auth.split('.')[0];
    this._socket.ioSocket.io.opts.query = { userId };
    this._socket.connect((error: any) => {
      console.error(
        `Something went wrong while connecting to socket : ${error}`
      );
    });
  }

  disconnect(): void {
    this._socket.disconnect();
  }

  sendMessage(message: string): Observable<Array<any>> {
    const payload: ChatMessageType = {
      emitter: this._emitterId,
      recipient: this._internService.intern?.id,
      datetime: new Date(),
      content: message,
    };

    this._socket.emit('message', payload);

    this._messages.push({ ...payload, direction: 'out' });
    return of(this._updateMessages());
  }

  receiveMessage(): Observable<any> {
    return this._socket.fromEvent('message').pipe(
      map((payload: any) => {
        console.log(`Message was received : ${JSON.stringify(payload)}`);
        this._messages.push({ ...payload, direction: 'in' });
        return this._updateMessages();
      })
    );
  }

  sendIdentity(message: any): Observable<any> {
    return this._socket.emit('userId:Identity', message);
  }

  receiveIdentity(): Observable<any> {
    return this._socket.fromEvent('identity');
  }

  // emitConnectedUsers() {
  //   this._socket.emit('userConnected');
  // }

  // receiveConnectedUsers(): Observable<any[]> {
  //   return this._socket.fromEvent('ReturnList');
  // }

  startMessage() {
    //récupère et envoi l'id du destinataire
    const recipient = this._internService.intern?.id;
    this._socket.emit('startMessage', recipient);
  }

  startTypingReturn(): Observable<any> {
    return this._socket.fromEvent('userTyping');
  }

  emitGetUsers() {
    this._socket.emit('getUsers')
  }

  getUsers() {
    return this._socket.fromEvent('getUsers')
  }

  refreshUsers(): Observable<any> {
    return this._socket.fromEvent('userConnected')
  }

}
