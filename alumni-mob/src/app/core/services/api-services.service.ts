import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  private baseUrl = ""

  constructor(private _http: HttpClient) { }

  getData() {
    return this._http.get(`${this.baseUrl}/etc...`);
  }
}
