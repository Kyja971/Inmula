/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataserviceService } from 'src/app/core/services/dataservice.service';
import { InternService } from 'src/app/core/services/intern.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { WsChatService } from 'src/app/core/services/ws-chat.service';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { ChatComponent } from 'src/app/tab3/components/chat/chat.component';

@Component({
  selector: 'app-header-intern',
  templateUrl: './headerIntern.component.html',
  styleUrls: ['./headerIntern.component.scss'],
})
export class headerInternComponent implements OnInit {
  currentPage = '';

  private _usersSubscription!: Subscription
  private _messageSubscription!: Subscription
  connected: boolean = false

  // @Input()
  // connected: boolean = false

  @Input()
  num!: number;

  @Input()
  id: string | undefined;

  @Input()
  isInternConnected: boolean = false;

  constructor(
    private _router:Router,
    private _id : DataserviceService,
    private _modalController: ModalController,
    private _internService: InternService,
    private _wsService: WsChatService,
    private _self: SelfInformationService,
    private _notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.currentPage = this._router.url;
  }

  goProfile(id?: string) {
    if (id) {
      this._router.navigate(['', 'tabs', 'tab2', 'profile-page', id]);
    }
  }

  async onChatClick(intern: Intern) {
    // Let's start with modalController
    this._internService.intern = intern;
    const chatModal = await this._modalController.create({
      component: ChatComponent
    })
    chatModal.present()
    //Send a deleteUnreadMEssage to webSocketServer.
    if (intern.id) {
      this._wsService.deleteReadMessage(this._self.retrievePersonnal(), intern.id)
    }
  }

  checkConnected() {
    this._usersSubscription = this._notification.checkConnected().subscribe({
      next: (usersArray) => {
        console.log(usersArray)
        console.log("'coucou du retour de l'observable de meredeeeee")
        if (this.id && usersArray.includes(this.id)) {
          console.log(`intern ${this.id} is connected`)
          this.connected = true
        }
      }
    })
  }
}
