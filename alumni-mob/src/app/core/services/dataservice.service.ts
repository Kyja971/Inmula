import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private id: string | undefined;

  setId(id: string) {
    this.id = id;
  }
  
  getId(): string | undefined {
    return this.id;
  }
}
