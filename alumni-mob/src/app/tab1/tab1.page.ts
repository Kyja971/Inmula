import { Component, OnInit } from '@angular/core';
import { UnreadChatService } from '../core/services/unread-chat.service';
import { MessageType } from '../core/types/message-type/message-type';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  unreadMessages: Array<MessageType> = []


  constructor(
    private _unreadChatService: UnreadChatService
  ) {}

  ngOnInit() {
    this._unreadChatService.unreadMessages.subscribe((unreadMessage) => this.unreadMessages = unreadMessage)
  }

}
