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

  private _postsSubscription!: Subscription
  private _newPostSubscription!: Subscription

  private page = 1
  private take = 10

  public newPost = false

  checkboxes: CheckboxData[] = [
    { isChecked: true, value: 'all' },
    { isChecked: false, value: 'Astuce' },
    { isChecked: false, value: 'Information' },
    { isChecked: false, value: 'Offre emploi' }
  ];

  constructor(
    private _postService: PostService,  // Dependency Injection
    private _modalController: ModalController
  ) { }

  ngOnInit(): void {
    this._postService.findAll(this.take, this.page)
    this._postsSubscription = this._postService.posts$.subscribe({
      next: (posts: Array<PostType>) => {
        this.posts = posts 
        this.posts.sort((a, b) => (a.postedAt > b.postedAt ? -1 : 1))
      }, //Si code 200 ou 300 ce code sera effectué
      error: (error: any) => {
       }, //Si code 400 ce code sera effectué
      complete: () => { 
      }
    })
    this._newPostSubscription = this._postService.getNewPost().subscribe(() => {
      this.newPost = true
    })
  }

  async onAddPost(){
    const authModal = await this._modalController.create({
      component : AddPostComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    authModal.present();
  }

  loadPoasts(checkedCheckboxes: CheckboxData[]){
    if(this.checkboxes[0].isChecked){
      this._postService.findAll(this.take, this.page)
    } else {
      if(checkedCheckboxes.length === 1) {
        this._postService.findByType(checkedCheckboxes[0].value, this.take, this.page)
      }
      else {
        const types: string[] = []
        checkedCheckboxes.forEach(checked => {
          types.push(checked.value)
        });
        this._postService.findByTypes(types, this.take, this.page)
      }
    }
  }

  toggleCheckbox() {
    const checkedCheckboxes = this.checkboxes.filter(checkbox => checkbox.isChecked);
    this._postService.emptyPosts()
    this.page = 1
    this.loadPoasts(checkedCheckboxes)
  }

  private async generatePosts() {
    const checkedCheckboxes = this.checkboxes.filter(checkbox => checkbox.isChecked);
    this.page++
    this.loadPoasts(checkedCheckboxes)
  }

  onIonInfinite(ev: any) {
    this.generatePosts()
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  refreshPost(){
    this.page = 1
    this._postService.emptyPosts()
    this._postService.findAll(this.take, this.page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.newPost = false
  }

  ngOnDestroy(): void {
    this._postsSubscription.unsubscribe()
    this._newPostSubscription.unsubscribe()
  }
}

interface CheckboxData {
  isChecked: boolean;
  value: string; // Valeur à récupérer si la case est cochée
}

