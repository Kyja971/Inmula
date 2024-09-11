import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Intern } from '../types/intern/intern-class';
import { plainToInstance } from 'class-transformer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private readonly URI: string = `http://localhost:3000/intern`
  private _intern: Intern | null = null

  constructor(private _httpClient: HttpClient) { }

  /**
   * @returns Observable<InternType[]>
   */
  findAll(): Observable<Array<Intern>> {

    return this._httpClient.get<Array<Intern>>(this.URI).pipe(
      map((interns: Array<any>) => {
        return interns.map((intern: any) => {
          return plainToInstance(Intern, intern)
        })
      })
    )
  }

  findOne(internId?: string): Observable<Intern> {

    return this._httpClient.get<Intern>(this.URI + '/' + internId).pipe(
      map((intern: any) => {
        return plainToInstance(Intern, intern)
      })
    )
  }

  set intern(intern: Intern) {
    this._intern = intern
  }

  get intern(): Intern | null {
    return this._intern
  }

}
