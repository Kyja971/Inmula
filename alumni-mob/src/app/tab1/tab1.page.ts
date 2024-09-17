import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../core/services/post.service';
import { PostType } from '../core/types/post/post-type';
import { Subscription } from 'rxjs';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { AddPostComponent } from './components/add-post/add-post.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{

  public posts: Array<PostType> = []

  public isFilterActive: boolean = false

  private _subscription!: Subscription

  private page = 1
  private take = 10


  constructor(
    private _postService: PostService,  // Dependency Injection
    private _modalController: ModalController
  ) { }

  ngOnInit(): void {
    this._postService.findAll(this.take, this.page)
    this._subscription = this._postService.posts$.subscribe({
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

  async onAddPost(){
    const authModal = await this._modalController.create({
      component : AddPostComponent
    });
    authModal.present();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  private generatePosts() {
    this.page++
    this._postService.findAll(this.take, this.page)
  }

  onIonInfinite(ev: any) {
    this.generatePosts()
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
}
