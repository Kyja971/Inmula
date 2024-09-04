import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';

import { WsChatService } from 'src/app/core/services/ws-chat.service';
import { InternService } from 'src/app/core/services/intern.service';
import { SocketMessageType } from '../../dto/socket-message.type';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { ChatMessage } from 'src/app/core/interface/chat-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  //public message: string = '';
  public recievedMessages: Array<SocketMessageType> = [];
  public sendedMessages: Array<SocketMessageType> = [];
  public returnUserTyping: string = '';
  public message: ChatMessage = { content: '', isTypingValue: false };

  private _sid: string = '';
  public intern!: Intern;
  public messages: Array<any> = [];
  public isTyping = false;
  //public inputValue: string = '';

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

    this._wsService
      .receiveMessage()
      .subscribe((filteredMessages: Array<any>) => {
        this.messages = filteredMessages;
        this.isTyping = false;
      });
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

  onCancel(): void {
    this._modalController.dismiss();
    this._wsService.disconnect();
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onInputChange(event: any) {
    console.log('Nouvelle valeur saisie :', event.target.value);
    // déclare les evenements à suivre du ngModel
    this.message.content = event.target.value;
    this.message.isTypingValue = true;
    //si input non vide
    if (event.target.value.trim() !== '') {
      this._wsService.startMessage();
      this._wsService.startTypingReturn().subscribe((recipient: any) => {
        //stock l'id du destinataire dans recipient
        this.returnUserTyping = recipient;
        console.log('Id destinataire retourné' + this.returnUserTyping);
        //compare l'id destinataire à l'id dans localStorage
        if (recipient == this._selfInformation.retrievePersonnal()) {
          this.isTyping = true;
        }
      });
    } else {
      this.isTyping = false;
    }
  }
}
