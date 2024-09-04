import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from 'ionic-logging-service';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { PostType } from 'src/app/core/types/post/post-type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {

  /**
   * List of posts to be displayed in the view
   * @var PostType[]
   */
  public posts: Array<PostType> = []

  public isFilterActive: boolean = false

  private _subscription!: Subscription

  constructor(
    private _postService: PostService  // Dependency Injection
  ) { }

  ngOnInit(): void {
    this._subscription = this._postService.findAll(50,1)
    .subscribe({
      next: (posts: Array<PostType>) => {
        this.posts = posts 
        this.posts.sort((a, b) => (a.postedAt > b.postedAt ? -1 : 1))
      }, //Si code 200 ou 300 ce code sera effectué
      error: (error: any) => {
       }, //Si code 400 ce code sera effectué
      complete: () => { 
      }
    })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  // findOne(id: number): InternType | undefined {
  //   return this.interns.find((intern: InternType)=> intern.id === id)
  // }
}