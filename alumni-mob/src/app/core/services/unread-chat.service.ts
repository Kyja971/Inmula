import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageType } from '../types/message-type/message-type';

@Injectable({
  providedIn: 'root'
})
export class UnreadChatService {

  constructor() { }

  private _unreadChatSubject: Subject<Array<MessageType>> = new Subject<Array<MessageType>>()
  unreadMessages = this._unreadChatSubject.asObservable()

}
