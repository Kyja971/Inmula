import { Component, OnDestroy, OnInit} from '@angular/core';
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
   * List of interns to be displayed in the view
   * @var PostType[]
   */
  public posts: Array<PostType> = [];
  public isFilterActive: boolean = false;

  private _subscription!: Subscription

  constructor(
    private _service : PostService // dependancy Injection
  ) {}


  toggleFilter() : void{
    //this.interns = this._service.findAll()
    this.isFilterActive = false
  }

  ngOnInit() : void {
    this._subscription = this._service.findAll()
     .subscribe({
      next: (posts: Array<PostType>) => { //  succes return Postype[]
        this.posts = posts
      },
      error: (error: any) => {},
      complete: () => {} // optionnel
     })

  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
