import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommentType } from '../types/comment/comment-type';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly URI: string = `${environment.gatewayUrl}/post`;

  constructor(
    private _httpClient: HttpClient,
  ) { }

  findAll(postId: number): Observable<CommentType[]> {
    return this._httpClient.post<CommentType[]>(`${this.URI}/comments`, { postId: postId })
  }

  newComment(payload: any): Observable<CommentType> {
    return this._httpClient.post<CommentType>(`${this.URI}/newComment`, payload)
  }
}
