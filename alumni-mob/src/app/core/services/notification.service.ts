import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of,  } from 'rxjs';
import { MessageType } from '../types/message-type/message-type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  _notificationUnread: Observable<Array<MessageType>> = of([])
  _connectedUsers: Observable<Array<string>> = of([])

  startUnread(arrayMessage: MessageType[]) {
    this._notificationUnread = new BehaviorSubject<Array<MessageType>>(arrayMessage).asObservable()
  }
  
  startConnected(usersArray: string[]) {
    console.log('startConnected')
    this._connectedUsers = new BehaviorSubject<string[]>(usersArray).asObservable()
  }

  checkUnread() {
    return this._notificationUnread
  }

  checkConnected() {
    console.log('check connected begin')
    return this._connectedUsers
  }
}
