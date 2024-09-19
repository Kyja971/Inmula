import { HttpClient, HttpHandler, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent  implements OnInit {
  private apiResponse: any = {}

  private apiUrl = "https://api.francetravail.io/partenaire/evenements/v1/salonsenligne"

  constructor(
    private http: HttpClient
  ) { }

  // getData(req: HttpRequest<unknown>,next:HttpHandlerFn) {
    
  //   req.headers.set('authorization', `Bearer 201d7a50528608627d4939d6b95deb2aff3150761f9cd9f4c8355c87079ac48a`)
  // }



  async ngOnInit() {

      const headers = new HttpHeaders({
        Authorization: 'Bearer 201d7a50528608627d4939d6b95deb2aff3150761f9cd9f4c8355c87079ac48a',
        Accept: 'application/json'
      });

      try {
        const response = await lastValueFrom(this.http.get<any>(this.apiUrl, { headers }).pipe(
          //firstValueFrom() 
        ))
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
      }



    // const req: HttpRequest<unknown> = new HttpRequest('GET', this.apiUrl, {Headers: {'Authorization': 'Bearer 201d7a50528608627d4939d6b95deb2aff3150761f9cd9f4c8355c87079ac48a'}})
    // console.log(req.headers.get('Authorization'))
    // this.apiResponse = await lastValueFrom(this.http.request<unknown>(req).pipe(take(1)))
    // console.log(this.apiResponse, 'coucou')
  }

}
