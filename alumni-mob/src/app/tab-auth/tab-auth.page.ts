import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthType } from '../core/types/auth/auth.type';
import { AuthService } from '../core/services/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
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

  checkboxes: CheckboxData[] = [
    { isChecked: true, value: 'all' },
    { isChecked: false, value: 'super_admin' },
    { isChecked: false, value: 'admin' },
    { isChecked: false, value: 'stagiaire' }
  ];

  //TODO: Use subject instead of public reference for selfinfo
  constructor(
    private _authService: AuthService,
    private _modalController: ModalController,
    private _alertController: AlertController,
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
      component : AddAccountComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1]
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
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      componentProps: {
        auth : auth
      }
    });
    authModal.present();
  }

  toggleCheckbox(event:any) {
    const checkedCheckboxes = this.checkboxes.filter(checkbox => checkbox.isChecked);
    this.auths = []
    if(this.checkboxes[0].isChecked){
      this._authService.findAll()
      this._authService.auths$.subscribe((auths: AuthType[]) => {
        this.auths = auths;
      })
    }else {
      checkedCheckboxes.forEach((checked: CheckboxData) => {
        this.auths = this.auths.concat(this._authService.findByRole(checked.value))
      })
    }
  }

  async presentAlert(auth: AuthType) {
    const alert = await this._alertController.create({
      header: 'Suppression',
      message: `Êtes vous sur de vouloir supprimer ${auth.email} ?`,
      buttons: [{
        text: "Oui",
        role: "confirm",
        handler: () => {
          this.onDeleteAuth(auth.id)
        }
      }
        ,{
          text: "Non",
          role: "cancel"
        }],
    });

    await alert.present();
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
interface CheckboxData {
  isChecked: boolean;
  value: string; // Valeur à récupérer si la case est cochée
}
