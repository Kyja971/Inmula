import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCompanyIdType } from '../types/ft-company/add-company-id.type';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SelfInformationService } from './self-information.service';
import { CompanyItemsType } from '../types/ft-company/company-items.type';
import { FTCompanyType } from '../types/ft-company/ft-company.type';
import { CompanyRelatedDatas } from '../types/company-related-datas/company-related-datas.type';

@Injectable({
  providedIn: 'root',
})
export class EmploymentService {
  private _baseUrl: string = `${environment.gatewayUrl}/boite`;
  _datas: Array<any> = [];
  internId = this._selfInfo.retrievePersonnal();

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _modalCtrl: ModalController,
    private _toastCtrl: ToastController,
    private _selfInfo: SelfInformationService
  ) {}

  getDatas() {
    try {
      this._http
        .get<any>(this._baseUrl)
        .pipe(take(1))
        .subscribe((response) => {
          this._datas = response;
        });
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
    return this._datas;
  }

  storeCompanyId(companyId: number) {
    console.log(this.internId, companyId);
    this._http
      .post<AddCompanyIdType>(`${this._baseUrl}/${this.internId}`, {
        id: companyId,
      })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          if (response) {
            this._modalCtrl.dismiss();
            this._router.navigate(['tabs', 'tab4', 'suivi']);
          }
        },
        error: () => {
          this._toastCtrl
            .create({
              message: 'Ajout impossible',
              duration: 3000,
              position: 'middle',
              buttons: [
                {
                  text: 'Fermer',
                },
              ],
            })
            .then((toastCreated) => toastCreated.dismiss());
        },
      });
  }

  getPersonnalArray(): Observable<number[]> {
    return this._http
      .get<number[]>(`${this._baseUrl}/${this.internId}`)
      .pipe(take(1));
  }

  CompanyIdToCompanyInfo(companyIds: number[]): Observable<Array<any>> {
    const headers = new HttpHeaders({ params: JSON.stringify(companyIds) });
    return this._http
      .get<Array<FTCompanyType>>(`${this._baseUrl}/company`, { headers })
      .pipe(take(1));
  }

  saveContact(contact: CompanyRelatedDatas, companyId: number) {
    return this._http.post<CompanyRelatedDatas>(`${this._baseUrl}/contact?internId=${this.internId}&companyId=${companyId}`, contact).pipe(take(1)).subscribe((response) => console.log(response))
  }

  getContact(companyId:number): Observable<CompanyRelatedDatas[]>{
    return this._http.get<CompanyRelatedDatas[]>(`${this._baseUrl}/contact/contact?internId=${this.internId}&companyId=${companyId}`).pipe(take(1))
  }

}
