import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../core/services/notification.service';
import { map, Subscription } from 'rxjs';
import { WsChatService } from '../core/services/ws-chat.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  private _unreadNotif!: Subscription

  notifCount: number = 0

  constructor(
    private _notificationService: NotificationService,
    private _wsService: WsChatService
  ) {}

  ngOnInit(): void {
    let usersConnected: string[] = []
    this._wsService.getUsers().subscribe({
      next: (usersArray) => {
        console.log(usersArray, 'retour du wsService depuis tabs.ts')
        usersConnected = usersArray
      }
    })
    // .pipe(map((usersArray: string[]) => {
    //   usersConnected = usersArray
    // }))
    this._notificationService.startConnected(usersConnected)
    //this._notificationService.startUnread(arrayMessage)
    //this._unreadNotif = this._notificationService.checkUnread().subscribe((arrayMessage) => {
    //  this.notifCount = arrayMessage.length
    //})
  }

}
