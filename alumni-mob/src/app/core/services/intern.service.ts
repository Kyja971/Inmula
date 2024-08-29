import { Injectable } from '@angular/core';
import { InternType } from '../types/intern/intern-type';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Intern } from '../types/intern/intern-class';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private _interns: Array<Intern> = []
  private readonly URI: string = `http://localhost:3000/intern`
  private _intern: InternType | null = null;


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

  public get intern(): InternType | null {
    return this._intern;
  }
  public set intern(intern: InternType | null) {
    this._intern = intern;
  }
}
