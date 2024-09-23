import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { LikeStatusService } from 'src/app/core/services/like-status.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { PostType } from 'src/app/core/types/post/post-type';
import { ShowLikesComponent } from '../show-likes/show-likes.component';
import { CommentType } from 'src/app/core/types/comment/comment-type';
import { CommentService } from 'src/app/core/services/comment.service';
import { ShowCommentsComponent } from '../show-comments/show-comments.component';

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

  comments: CommentType[] = []

  constructor(
    private _self: SelfInformationService,
    private _likeStatusService: LikeStatusService,
    private _commentService: CommentService,
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
      this._commentService.findAll(this.post.id).pipe(take(1)).subscribe((comments: CommentType[]) => {
        this.comments = comments
      })
    }
  }

  onClickLike(postId?: number){
    if(postId){
      if (this.postLiked && !this.isMyPost) {
        this.unLikePost(postId)
      }
      else if (!this.postLiked && !this.isMyPost) {
        this.addLike(postId)
      }
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

  async showComments(post: PostType){
    if(post){
      const authModal = await this._modalController.create({
        component : ShowCommentsComponent,
        initialBreakpoint: 1,
        breakpoints: [0, 1],
        componentProps: {
          comments: this.comments,
          post: post
        }
      });
      authModal.present();
    }
  }

}
