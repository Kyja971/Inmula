import { Component, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { take } from 'rxjs';
import { Intern } from '../core/types/intern/intern-class';
import { SelfInformationService } from '../core/services/self-information.service';
import { Logger } from 'ionic-logging-service';
import { WsChatService } from '../core/services/ws-chat.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public interns: Array<Intern> = [];
  public usersConnected: Array<string> = [];

  constructor(
    private _service: InternService,
    private _selfInformation: SelfInformationService,
    private _wsService: WsChatService
  ) {}

  ngOnInit(): void {
    this._service
      .findAll()
      .pipe(take(1))
      .subscribe({
        next: (results: any) => {
          for (let intern of results) {
            if (intern.id != this._selfInformation.retrievePersonnal()) {
              this.interns.push(intern);
            }
          }
        },
        error: (error: any) => {},
      });
  }

  getUsers() {
    this._wsService.emitConnectedUsers();
    this._wsService
      .receiveConnectedUsers()
      .subscribe((userConnected: any[]) => {
        this.usersConnected = userConnected;
      });
  }

  isConnected(internId?: string | undefined) {
    if (internId === undefined || this.usersConnected[0] === null) {
      return false;
    }
    return this.usersConnected.some(
      (userId) => userId.toLowerCase() === internId.toLowerCase()
    );
  }

  onCancel(): void {
    return;
  }

  ionViewWillEnter() {
    this.getUsers();
  }
}
