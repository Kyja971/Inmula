import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable, take } from 'rxjs';
import { Intern } from '../types/intern/intern-class';
import { plainToInstance } from 'class-transformer';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private readonly URI: string = `${environment.gatewayUrl}/intern`
  private _intern: Intern | null = null

  constructor(
    private _httpClient: HttpClient,
    private _modalController: ModalController
  ) { }

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

 async update(payload: any, internId?: string) {
    const intern = await this._httpClient.put<Intern>(`${this.URI}/${internId}`, payload).pipe(take(1)).subscribe((intern: Intern) => {
      this.intern = intern
      this._modalController.dismiss()
    })
    return lastValueFrom(this._httpClient.put<Intern>(`${this.URI}/${internId}`, payload))
  }

  set intern(intern: Intern) {
    this._intern = intern
  }

  get intern(): Intern | null {
    return this._intern
  }

}
