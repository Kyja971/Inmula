/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from 'src/app/core/services/post.service';
import { PostType } from 'src/app/core/types/post/post-type';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent  implements OnInit {

  @Input()
  post!: PostType

  constructor(
    private _postService: PostService,
    private _modalController: ModalController
  ) { }

  ngOnInit() {}

  async onUpdatePost(post: PostType) {
    const authModal = await this._modalController.create({
      component : AddPostComponent,
      componentProps: {
        post : post
      }
    });
    authModal.present();  }

  onDeletePost(id?: number) {
    if(id){
      this._postService.delete(id);
    }
  }

}
