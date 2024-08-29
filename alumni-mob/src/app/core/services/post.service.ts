import { Injectable } from '@angular/core';
import { PostType } from '../types/post/post-type';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly URI: string = `http://localhost:3000/post`

  constructor(private _httpClient: HttpClient) { }

  findAll(take :number,page:number): Observable<Array<PostType>> {
  /**
    Equivalent à ça a quelques chose pret
    return { ... post, postedAt: new Date(post.postedAt), 
    post.author.poe.beginAt: new Date(post.author.poe.beginAt), 
    post.author.poe.endAt: new Date(post.author.poe.endAt)}

    package class_transformer
  */
    return this._httpClient.get<Array<PostType>>(this.URI + "?take=" + take + "&page=" + page)
      .pipe(  //permet d'enchainer les opérations sur les observable, ici pour transformer le post.date en Date
        map((posts: Array<any>) => { // Transform an observable to another observable
          return posts.map((post: any) => { // Transform an array to another array
            return { // Deserialization
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
                  //id: post.author.company,
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
          })
        })
      )
  } 
}
