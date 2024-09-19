import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { CommentService } from 'src/app/core/services/comment.service';
import { InternService } from 'src/app/core/services/intern.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { CommentType } from 'src/app/core/types/comment/comment-type';
import { ShowCommentType } from 'src/app/core/types/comment/show-comment-type';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { PostType } from 'src/app/core/types/post/post-type';

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.scss'],
})
export class ShowCommentsComponent  implements OnInit {

  @Input()
  comments!: CommentType[]

  @Input()
  post!: PostType

  postAuthor!: Intern

  showComments: ShowCommentType[] = []

  writeCommentForm: FormGroup = new FormGroup({});

  constructor(
    private _modalController: ModalController,
    private _internService: InternService,
    private _formBuilder: FormBuilder,
    private _self: SelfInformationService,
    private _commentService: CommentService
  ) { }

  ngOnInit() {
    this.writeCommentForm = this._formBuilder.group({
      content: [
        '', // Default value for the control
        [Validators.required],
      ],
    });

    if(this.comments.length !== 0){
      this.comments.forEach((comment: CommentType) => {
        this._internService.findOne(comment.internId).pipe(take(1)).subscribe((intern: Intern) => {
          this.showComments.push({intern: intern, content: comment.content, postedAt: new Date()})
        })
      })
    }
  }

  onSubmit() {
    const payload = {
      internId: this._self.retrievePersonnal(),
      postId: this.post.id,
      content: this.writeCommentForm.value.content,
      postedAt: new Date()
    }
    this._commentService.newComment(payload).pipe(take(1)).subscribe(async (comment: CommentType) => {
      this._internService.findOne(comment.internId).pipe(take(1)).subscribe((intern: Intern) => {
        const payloadComment = {
          intern: intern,
          content: payload.content,
          postedAt: comment.postedAt
        }
        this.showComments.push(payloadComment)
      })
    })
    this.writeCommentForm.reset()
  }

  goBack(){
    this._modalController.dismiss()
  }

}
