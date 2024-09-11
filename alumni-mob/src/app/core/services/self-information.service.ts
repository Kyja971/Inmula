import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SelfInformationService {

  constructor(
    private _storage: StorageService
  ) { }

  setPersonnal(intern: string) {
    this._storage.store('self', intern)
  }

  retrievePersonnal() {
    return this._storage.retrieve('self')
  }

  removePersonnal() {
    this._storage.remove('self')
  }
}
