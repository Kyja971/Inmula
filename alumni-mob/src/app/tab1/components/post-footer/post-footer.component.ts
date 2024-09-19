import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { LikeStatusService } from 'src/app/core/services/like-status.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { PostType } from 'src/app/core/types/post/post-type';
import { ShowLikesComponent } from '../show-likes/show-likes.component';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss'],
})
export class PostFooterComponent  implements OnInit {

  @Input()
  post!: PostType

  isMyPost = false
  postLiked = false
  likes: string[] = []

  constructor(
    private _self: SelfInformationService,
    private _likeStatusService: LikeStatusService,
    private _modalController: ModalController
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    if(this.post.id) {
      this._likeStatusService.findAll(this.post.id).pipe(take(1)).subscribe((likes: string[]) => {
        this.likes = likes
        this.postLiked = this.likes.includes(this._self.retrievePersonnal())
        this.isMyPost = (this._self.retrievePersonnal() == this.post.authorId)
      })
    }
  }

  addLike(postId?: number){
    if(postId) {
      this._likeStatusService.addLike(postId).pipe(take(1)).subscribe(()=> {
        this.postLiked = true
        this.likes.push(this._self.retrievePersonnal())
      })
    }
  }

  unLikePost(postId?: number){
    if(postId) {
      this._likeStatusService.findOne(postId).pipe(take(1)).subscribe((like: any) => {
        this._likeStatusService.deleteLike(like.id).pipe(take(1)).subscribe(()=> {
          this.postLiked = false
          this.likes = this.likes.filter(internId => internId !== this._self.retrievePersonnal())
        })
      })
    }
  }

  async showLikes(postId?: number) {
    if(postId){
      const authModal = await this._modalController.create({
        component : ShowLikesComponent,
        componentProps: {
          internsId: this.likes
        }
      });
      authModal.present();
    }
  }

}
