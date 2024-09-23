/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from 'src/app/core/services/post.service';
import { PostType } from 'src/app/core/types/post/post-type';
import { AddPostComponent } from '../add-post/add-post.component';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent  implements OnInit {

  @Input()
  post!: PostType

  isAllow: boolean = false

  constructor(
    private _postService: PostService,
    private _modalController: ModalController,
    private _selfInformation: SelfInformationService,
    private _authService: AuthService,
    private _storage: StorageService
  ) { }

  async ngOnInit() {
    const token = this._storage.retrieve('auth')
    this._authService.getRole({ token: token }).pipe(take(1)).subscribe((role: string) => {
      this.isAllow = (role === 'super_admin') || (this.post.authorId === this._selfInformation.retrievePersonnal());
    })
  }

  async onUpdatePost(post: PostType) {
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
