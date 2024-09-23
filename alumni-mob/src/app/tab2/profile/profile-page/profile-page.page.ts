import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InternService } from 'src/app/core/services/intern.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { UpdateProfileComponent } from '../components/update-profile.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit, OnDestroy {

  intern: Intern | undefined
  isMyself: boolean = false

  private _subscription!: Subscription

  constructor( 
    private _activate : ActivatedRoute,
    private _internService : InternService,
    private _self: SelfInformationService,
    private _modalController: ModalController
  ) {}

  async ngOnInit() {
    this._activate.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        try {
          this._subscription = this._internService.findOne(id).subscribe({
            next: (intern: Intern) => {
               this.intern=intern
               this.isMyself = (id === this._self.retrievePersonnal())
            },
            error: (error: any) => {},
            complete: () => {}
          })
        } catch (error) {
          console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
          // Gérer l'erreur de manière appropriée, par exemple afficher un message d'erreur à l'utilisateur
        }
      } else {
        // Gérer le cas où aucun ID n'est fourni dans la route
        console.log('Aucun ID ');
      }
    })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  async updateProfile() {
    const authModal = await this._modalController.create({
      component : UpdateProfileComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      componentProps: {
        intern : this.intern
      }
    });
    authModal.present();
  }
}
