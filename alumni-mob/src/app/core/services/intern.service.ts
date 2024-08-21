
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InternType } from 'src/app/core/types/intern/intern-type';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private _interns : Array<InternType> = []
  private readonly URI: string = 'http://localhost:3000/intern'

  constructor(
    private _httpClient: HttpClient
  ) {}

/**
 * 
 * @returns Observable <InternType[]>
 */
  public findAll() : Observable<Array<InternType>> {
   return this._httpClient.get<Array<InternType>>(
    this.URI
   )
  }

public filterCompany(company : string) :Array<InternType> {
  throw new Error(`Not implemented yet`)
}
}
