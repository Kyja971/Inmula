import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { ModalController } from '@ionic/angular';
import { SelfInformationService } from './self-information.service';

describe('AuthService', () => {
  let service: AuthService;
  //création d'un faux service
  let fakeHttpClient: jasmine.SpyObj<HttpClient>;
  let fakestorageService: jasmine.SpyObj<StorageService>;
  let fakeModalController: jasmine.SpyObj<ModalController>;
  let fakeSelfInformation: jasmine.SpyObj<SelfInformationService>;
  beforeEach(() => {

    //test sur methode get, retrieve de storage et dismiss de modal
    fakeHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    fakestorageService = jasmine.createSpyObj('StorageService', ['retrieve']);
    fakeModalController = jasmine.createSpyObj('ModalController', ['dismiss']);
    fakeSelfInformation = jasmine.createSpyObj('SelfInformationService', ['set']);
    service = new AuthService(fakeHttpClient,fakestorageService,fakeModalController,fakeSelfInformation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
