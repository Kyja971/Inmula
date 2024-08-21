import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostType } from '../types/post/post-type';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  //private _post : Array<PostType> = []
  private readonly URI: string = 'http://localhost:3000/post'

  constructor(
    private _httpClient: HttpClient
  ) { }

  public findAll() : Observable<Array<PostType>> {
    return this._httpClient.get<Array<PostType>>(this.URI)
      .pipe(
        map((posts:Array<any>) => { //Transform an observable to another observable
          return posts.map((posts:any) =>{ //transform an array to another array
            //return {... post, postedAt: new Date(post.postedAt), autor.poe.beginAt: new Date(post.autor.poe.beginAt), autor.poe.endAt: new Date(post.autor.poe.endAt)}
            return { // Deserialization
              id: posts.id,
              title: posts.title,
              postedAt: new Date(posts.postedAt),
              content : posts.content,
              media: posts.media,
              autor: {
                id: posts.autor.id,
                lastname : posts.autor.lastname,
                firstname: posts.autor.firstname,
                occupation: posts.autor.occupation,
                promo: posts.autor.promo,
                company: {
                  id: posts.autor.company.id,
                  name : posts.autor.company.name,
                },
                poe: {
                  id : posts.autor.poe.id,
                  beginAt: new Date(posts.autor.poe.beginAt),
                  endAt: new Date(posts.autor.poe.endAt),
                  name: posts.autor.poe.name,
                }
              },
            }
          }) 
        })
      )
   }
}
