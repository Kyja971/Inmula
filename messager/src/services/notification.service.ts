import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { RequestMessageType } from 'src/chat-event/dto/request-message.type';
import { SocketUserType } from 'src/chat-event/types/socket-user.type';

@Injectable()
export class NotificationService {
  _notificationUnread: Observable<Array<RequestMessageType>> = of([])
  _connectedUsers: Observable<Map<string, SocketUserType>> = of(new Map<string, SocketUserType>())

  startUnread(messagePending: Array<RequestMessageType>) {
    this._notificationUnread = new BehaviorSubject<Array<RequestMessageType>>(messagePending).asObservable()
  }

  startConnected(usersArray: Map<string, SocketUserType>) {
    this._connectedUsers = new BehaviorSubject<Map<string, SocketUserType>>(usersArray).asObservable()
  }

  checkUnread() {
    return this._notificationUnread
  }

  checkConnected() {
    return this._connectedUsers
  }
}
