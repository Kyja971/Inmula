/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { InternService } from 'src/app/core/services/intern.service';
import { PostService } from 'src/app/core/services/post.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { PostType } from 'src/app/core/types/post/post-type';
import { AddPostComponent } from 'src/app/tab1/components/add-post/add-post.component';
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

  @Input()
  post?: PostType

  isAllow: boolean = false

  buttonMessage = {
    text: 'Envoyer un message',
      handler: () => {
        this.onChatClick(this.intern);
      }
  }

  buttonUpdatePost = {
    text: 'Modifier',
    role: 'destructive',
    handler: () => {
      this.onUpdatePost(this.post);
    }
  }

  buttonDeletePost = {
    text: 'Supprimer',
    handler: () => {
      this.onDeletePost(this.post?.id);
    }
  }

  buttonCancel = {
    text: 'Annuler',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  }

  public actionSheetButtons: any[] = [];

  constructor(
    private _router: Router,
    private _modalController: ModalController,
    private _internService: InternService,
    private _storage: StorageService,
    private _authService: AuthService,
    private _postService: PostService,
    private _selfInformation: SelfInformationService
  ) {}

  ngOnInit(): void {
    this.currentPage = this._router.url;
    const token = this._storage.retrieve('auth')
    this._authService.getRole({ token: token }).pipe(take(1)).subscribe((role: string) => {
      this.isAllow = (role === 'super_admin') || (this?.post?.authorId === this._selfInformation.retrievePersonnal());
      if (this.isAllow) {
        this.actionSheetButtons.push(this.buttonMessage, this.buttonUpdatePost, this.buttonDeletePost, this.buttonCancel)
      } else {
        this.actionSheetButtons.push(this.buttonMessage, this.buttonCancel)
      }
    })
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

  async onUpdatePost(post?: PostType){
    const authModal = await this._modalController.create({
      component : AddPostComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      componentProps: {
        post : post
      }
    });
    authModal.present();  
  }

  onDeletePost(id?: number) {
    if(id){
      this._postService.delete(id);
      this._modalController.dismiss()
    }
  }
}
