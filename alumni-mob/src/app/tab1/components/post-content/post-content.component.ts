/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from 'src/app/core/services/post.service';
import { PostType } from 'src/app/core/types/post/post-type';
import { AddPostComponent } from '../add-post/add-post.component';
import { SelfInformationService } from 'src/app/core/services/self-information.service';

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
    private _modalController: ModalController,
    public _selfInformation: SelfInformationService,
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
      this._modalController.dismiss()
    }
  }

}
