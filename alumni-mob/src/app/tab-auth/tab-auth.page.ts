import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthType } from '../core/types/auth/auth.type';
import { AuthService } from '../core/services/auth.service';
import { ModalController } from '@ionic/angular';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { SelfInformationService } from '../core/services/self-information.service';

@Component({
  selector: 'app-tab-auth',
  templateUrl: './tab-auth.page.html',
  styleUrls: ['./tab-auth.page.scss'],
})
export class TabAuthPage implements OnInit{

  public auths: Array<AuthType> = []
  public myRole?: string

  //TODO: Use subject instead of public reference for selfinfo
  constructor(
    private _authService: AuthService,
    private _modalController: ModalController,
    public _selfInformation : SelfInformationService
  ) { }

  ngOnInit() {
    this._authService.findAll()
    this._authService.auths$.subscribe((auths: AuthType[]) => {
      this.auths = auths;
    })
    this.myRole = this._selfInformation.role
  }
  
  trackByEmail(index: number, auth: AuthType): string {
    return auth.email; // Assurez-vous que 'id' est unique pour chaque utilisateur
  }

  async onAddAuth() {
    const authModal = await this._modalController.create({
      component : AddAccountComponent
    });
    authModal.present();
  }

  onDeleteAuth(id?: number) {
    if(id){
      this._authService.delete(id);
    }
  }

  async onUpdateAuth(auth: AuthType) {
    const authModal = await this._modalController.create({
      component : AddAccountComponent,
      componentProps: {
        auth : auth
      }
    });
    authModal.present();
  }

  canModify(auth: AuthType): boolean{
    const myRole = this._selfInformation.role;
    //Si on veut modifier un stagiaire on verifie que mon role est admin ou super admin
    if(auth.role==="stagiaire") {
      if (myRole==="admin" || myRole==="super_admin"){
        return true
      }
    }
    //Si on veut modifier un admin / super admin, on verifie que mon role est super admin
    return myRole==="super_admin"
  }
}
