import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { WsChatService } from 'src/app/core/services/ws-chat.service';
import { InternService } from 'src/app/core/services/intern.service';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { ChatMessage } from 'src/app/core/interface/chat-message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  public returnUserTyping: string = '';
  public message: ChatMessage = { content: '', isTypingValue: false };
  public intern!: Intern;
  public messages: Array<any> = [];
  public isTyping = false;
  private receiveSub !: Subscription
  private isTypingSub !: Subscription

  constructor(
    private _modalController: ModalController,
    private _wsService: WsChatService,
    private _internService: InternService,
    private _selfInformation: SelfInformationService,
    private navCtrl: NavController
  ) {}

  goBack() {
    this.navCtrl.back();
    this._modalController.dismiss()
  }

  ngOnInit() {
    this.intern = this._internService.intern!;
    this.receiveSub = this._wsService
      .receiveMessage()
      .subscribe((filteredMessages: Array<any>) => {
        this.messages = filteredMessages;
        this.isTyping = false;
      });

    this.isTypingSub = this._wsService.startTypingReturn().subscribe((recipient: any) => {
        //stock l'id du destinataire dans recipient
        this.returnUserTyping = recipient;
        //compare l'id destinataire à l'id dans localStorage
        if (recipient == this._selfInformation.retrievePersonnal()) {
          this.isTyping = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.receiveSub.unsubscribe()
    this.isTypingSub.unsubscribe()
  }

  onSend(): void {
    this.message.isTypingValue = false;
    this._wsService
      .sendMessage(this.message.content)
      .subscribe((filteredMessages: Array<any>) => {
        this.message.content = '';
        this.messages = filteredMessages;
      });
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onInputChange(event: any) {
    // déclare les evenements à suivre du ngModel
    this.message.content = event.target.value;
    this.message.isTypingValue = true;
    //si input non vide
    if (event.target.value.trim() !== '') {
      this._wsService.startMessage();
    } else {
      this.isTyping = false;
    }
  }

  goBack() {
    this._modalController.dismiss()
  }
}
