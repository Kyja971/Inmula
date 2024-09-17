import { Injectable } from '@angular/core';
import { PostType } from '../types/post/post-type';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, take, map, Observable } from 'rxjs';
import { SelfInformationService } from './self-information.service';
import { ModalController } from '@ionic/angular';
import { plainToInstance } from 'class-transformer';
import { Intern } from '../types/intern/intern-class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly URI: string = `${environment.gatewayUrl}/post`
  private postsSubject = new BehaviorSubject<PostType[]>([]);
  public posts$ = this.postsSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _modalController: ModalController,
    private _self: SelfInformationService
  ) { }

  findAll(takePost :number,page:number) {
    this._httpClient.get<Array<PostType>>(this.URI + "?take=" + takePost + "&page=" + page).pipe(take(1)).subscribe((posts: PostType[]) => {
      this.postsSubject.next([...this.postsSubject.value, ...posts.map((post: any) => {
        return {
          id: post.id,
          title: post.title,
          content: post.content,
          type : post.type,
          postedAt: new Date(post.postedAt),
          media: post.media,
          authorId: post.authorId,
          author: {
            id: post.author.id,
            lastName: post.author.lastname,
            firstName: post.author.firstname,
            occupation: post.author.function,
            gender: post.author.gender,
            emails : post.author.emails,
            phone : post.author.phone,
            company: {
              name: post.author.company?.name
            },
            poe: {
              id: post.author.poe?.id,
              name: post.author.poe?.name,
              beginAt: new Date(post.author.poe?.beginAt),
              endAt: new Date(post.author.poe?.endAt)
            }
          }
        }
      })])
    })
  }

  add(post: any){
    this._httpClient.post<PostType>(this.URI, post).pipe(take(1)).subscribe((post: PostType) => {
      post.author = plainToInstance(Intern, post.author)
      this.postsSubject.next([...this.postsSubject.value, post]);
      this._modalController.dismiss();
    })
  }

  delete(id: number){
    this._httpClient.delete(this.URI + '/' + id).pipe(take(1)).subscribe(() => {
      const updatePost = this.postsSubject.value.filter(post => post.id !== id);
      this.postsSubject.next(updatePost);
    });
  }

  update(id?: number, payload?: any) {
    this._httpClient.put<any>(this.URI + '/' + id, payload).pipe(take(1)).subscribe({
      next: (post: PostType) => {
        const newPosts = this.postsSubject.value;
        newPosts.map(postSubject => { 
          if(postSubject.id === id){
            postSubject.title = post.title;
            postSubject.content = post.content;
            postSubject.media = post.media;
            postSubject.type = post.type;
          }
        })
        this.postsSubject.next([...newPosts]);
        this._modalController.dismiss();
      }, 
    })
  }
}




  /**
    Equivalent à ça a quelques chose pret
    return { ... post, postedAt: new Date(post.postedAt), 
    post.author.poe.beginAt: new Date(post.author.poe.beginAt), 
    post.author.poe.endAt: new Date(post.author.poe.endAt)}

    package class_transformer
  */
    // return this._httpClient.get<Array<PostType>>(this.URI + "?take=" + take + "&page=" + page)
    //   .pipe(  //permet d'enchainer les opérations sur les observable, ici pour transformer le post.date en Date
    //     map((posts: Array<any>) => { // Transform an observable to another observable
    //       return posts.map((post: any) => { // Transform an array to another array
    //         return { // Deserialization
              // id: post.id,
              // title: post.title,
              // content: post.content,
              // type : post.type,
              // postedAt: new Date(post.postedAt),
              // media: post.media,
              // authorId: post.authorId,
              // author: {
              //   id: post.author.id,
              //   lastName: post.author.lastname,
              //   firstName: post.author.firstname,
              //   occupation: post.author.function,
              //   gender: post.author.gender,
              //   emails : post.author.emails,
              //   phone : post.author.phone,
              //   company: {
              //     //id: post.author.company,
              //     name: post.author.company?.name
              //   },
              //   poe: {
              //     id: post.author.poe?.id,
              //     name: post.author.poe?.name,
              //     beginAt: new Date(post.author.poe?.beginAt),
              //     endAt: new Date(post.author.poe?.endAt)
              //   }
    //           }
    //         }
    //       })
    //     })
    //   )