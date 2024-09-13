import { Component, Input, OnInit } from '@angular/core';
import { PostType } from 'src/app/core/types/post/post-type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  /**
   * List of posts to be displayed in the view
   * @var PostType[]
   */
  @Input()
  public posts: Array<PostType> = []

  constructor(
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

  }
}