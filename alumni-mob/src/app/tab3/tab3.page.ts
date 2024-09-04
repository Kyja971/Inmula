import { Component, OnDestroy, OnInit } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { Subscription, take } from 'rxjs';
import { Subscription, take } from 'rxjs';
import { Intern } from '../core/types/intern/intern-class';
import { SelfInformationService } from '../core/services/self-information.service';
import { Logger } from 'ionic-logging-service';
import { WsChatService } from '../core/services/ws-chat.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit, OnDestroy {
  
  public interns: Array<Intern> = [];
  public usersConnected: Array<string> = [];
  private _refreshSubscription!: Subscription;
  private _getUsersSubscription!: Subscription;
export class Tab3Page implements OnInit, OnDestroy {
  
  public interns: Array<Intern> = [];
  public usersConnected: Array<string> = [];
  private _refreshSubscription!: Subscription;
  private _getUsersSubscription!: Subscription;

  constructor(
    private _service: InternService,
    private _selfInformation: SelfInformationService,
    private _wsService: WsChatService,
    private _selfInformation: SelfInformationService,
    private _wsService: WsChatService,
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

      this._wsService.emitGetUsers();
      this._getUsersSubscription = this._wsService.getUsers().subscribe((userConnected: any[]) => {
        this.usersConnected = userConnected;
      });

      this._refreshSubscription = this._wsService.refreshUsers().subscribe((data:any) => {
        if(data.newUser) {
          this.usersConnected.push(data.newUser)
        } else if (data.userDisconnected) {
          this.usersConnected = this.usersConnected.filter(user => user !== data.userDisconnected)
        }
      })
  }


  isConnected(internId?: string | undefined) {
    if (internId === undefined) {
      return false;
    }
    return this.usersConnected.includes(internId)
  }

  onCancel(): void {
    return;
  }

  ngOnDestroy() {
    this._refreshSubscription.unsubscribe()
    this._getUsersSubscription.unsubscribe()
  }
}
