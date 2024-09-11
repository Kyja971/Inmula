/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InternService } from 'src/app/core/services/intern.service';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { ChatComponent } from 'src/app/tab3/components/chat/chat.component';

@Component({
  selector: 'app-header-intern',
  templateUrl: './headerIntern.component.html',
  styleUrls: ['./headerIntern.component.scss'],
})
export class headerInternComponent implements OnInit {
  currentPage = '';

  @Input()
  intern!: Intern;

  @Input()
  num!: number;

  @Input()
  id: string | undefined;

  @Input()
  isInternConnected: boolean = false;

  constructor(
    private _router: Router,
    private _modalController: ModalController,
    private _internService: InternService
  ) {}

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
      component: ChatComponent,
    });
    chatModal.present();
  }
}
