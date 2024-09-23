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

  constructor(
  ) { }

  async ngOnInit() {
  }

}
