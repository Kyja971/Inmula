import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { InternService } from './intern.service';
import { StorageService } from './storage.service';
import { ChatMessageType } from '../types/chat/chat-message.type';

@Injectable({
  providedIn: 'root'
})
export class WsChatService {


  private _sid: string = '';
  private _emitterId: string = ''
  private _messages: Array<any> = []
  private _messages$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this._messages)

  public get sid(): string {
    return this._sid;
  }

  public set sid(sid: string) {
    this._sid = sid;
  }

  constructor(
    private _socket: Socket,
    private _internService: InternService,
    private _storageService: StorageService
  ) { }

  private _updateMessages(): Array<any> {
    const messages = this._messages
      .filter(
        (message: any) => {
          console.log(`Analyzed message: ${JSON.stringify(message)}`)
          return message.emitter === this._internService.intern?._id || message.recipient === this._internService.intern?._id
        }
      )
      .sort((m1: any, m2: any) => m1.datetime - m2.datetime)
      console.log(`Messages was updated : ${JSON.stringify(messages)}`)
      this._messages$.next(messages)
      return messages
  }


  /**
   * Pour transférer un payload avec le connect, il est possible de faire ceci:
   * this._socket.ioSocket.io.opts.query = { id: userId }
   * @param userId 
   */

  connect(): void {
    //this._socket.ioSocket.io.opts.query = { id: userId }
    this._socket.connect((error: any) => {
      console.error(`Something went wrong while trying to connect to socket server: ${error}`)
    })
  }

  disconnect(): void {
    this._socket.disconnect()
  }

  receiveIdentity(): Observable<any> {
    return this._socket.fromEvent('identity')
  }

  sendIdentity(message: any): Observable<any> {
    return this._socket.emit('userId:Identity', message)
  }

  sendMessage(message: string): Observable<Array<any>> {
    const payload: ChatMessageType = {
      emitter: this._emitterId,
      recipient: this._internService.intern?._id,
      datetime: new Date(),
      content: message
    }

    this._socket.emit('message', payload)

    this._messages.push({...payload, direction: 'out'})
    return of(this._updateMessages())
  }


  receiveMessage(): Observable<any> {
    return this._socket.fromEvent('message')
      .pipe(
        map((payload: any) => {
          console.log(`Message was received : ${JSON.stringify(payload)}`)
          this._messages.push({...payload, direction: 'in'})
          return this._updateMessages()
        })
      )
  }
}
