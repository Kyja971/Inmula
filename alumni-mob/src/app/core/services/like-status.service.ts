import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SelfInformationService } from './self-information.service';

@Injectable({
  providedIn: 'root'
})
export class LikeStatusService {

  private readonly URI: string = `${environment.gatewayUrl}/post`;

  constructor(
    private _httpClient: HttpClient,
    private _self: SelfInformationService
  ) { }

  findAll(postId: number): Observable<string[]>{
    return this._httpClient.post<string[]>(`${this.URI}/likes`, { postId: postId })
  }

  findOne(postId: number): Observable<any> {
    return this._httpClient.post<string[]>(`${this.URI}/like`, { interndId: this._self.retrievePersonnal(), postId: postId })
  }

  addLike(postId: number) {
    return this._httpClient.post<any>(`${this.URI}/addLike`, { internId: this._self.retrievePersonnal(), postId: postId})
  }

  deleteLike(likeId: number) {
    return this._httpClient.delete<any>(`${this.URI}/unlike/${likeId}`)
  }
}
