import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PostService } from 'src/app/core/services/post.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { PostType } from 'src/app/core/types/post/post-type';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent  implements OnInit {
  formPost: FormGroup = new FormGroup({});

  @Input()
  post?: PostType;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalController : ModalController,
    private _postService: PostService,
    private _self: SelfInformationService
  ) { }

  ngOnInit() {
    this.formPost = this._formBuilder.group({
      title: [this.post?.title, [Validators.required]],
      content: [this.post?.content, [Validators.required]],
      media: [this.post?.media || ''],
      type: [this.post?.type, [Validators.required]]
    });
  }

  onSubmit() {
    const payload = {
      title: this.formPost.value?.title,
      content: this.formPost.value.content,
      media: this.formPost.value?.media,
      type: this.formPost.value.type,
      postedAt: new Date(),
      authorId: this._self.retrievePersonnal()
    };
    
    if(this.post){
      this._postService.update(this.post?.id, payload)
    }else{
      this._postService.add(payload)
    }
  }

  goBack(){
    this._modalController.dismiss()
  }

}
