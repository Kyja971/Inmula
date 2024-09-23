import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lastValueFrom, take } from 'rxjs';
import { EmploymentService } from 'src/app/core/services/employment.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { CompanyItemsType } from 'src/app/core/types/ft-company/company-items.type';
import { FTCompanyType } from 'src/app/core/types/ft-company/ft-company.type';
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-application-status',
  templateUrl: './my-application-status.page.html',
  styleUrls: ['./my-application-status.page.scss'],
})
export class MyApplicationStatusPage implements OnInit {

  idFollowedCies: Array<number> = [];
  followedCies: Array<CompanyItemsType> = [];

  @Input()
  company!: CompanyItemsType;

  constructor(
    private _employmentService: EmploymentService,
    private _selfInformation: SelfInformationService,
    private _modalCtrl: ModalController,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getMyFollowedCies();
  }

   getMyFollowedCies() {
    const internId = this._selfInformation.retrievePersonnal();
     this._employmentService.getPersonnalArray().subscribe({
      next:  (personnalArray) => {
        this.idFollowedCies = [];
        if (personnalArray) {
          this.idFollowedCies = personnalArray;
           this._employmentService
            .CompanyIdToCompanyInfo(personnalArray)
            .pipe(take(1))
            .subscribe({
              next: (infoCompany) => {
                this.followedCies = [];
                if (infoCompany) {
                  this.followedCies = infoCompany;
                }
              },
            });
        }
      },
      error: (error) => {},
    });
  }

  presentContact(company: CompanyItemsType) {
    this._employmentService.getContact(company.id).subscribe({
      next: (response) => {
        this._modalCtrl.create({
          component : ContactModalComponent,
          componentProps: {
            contact: response[0],
            companyId: company.id
          }
        })
        .then((modal)=> {
          modal.present()
        });
      },
      error: (error) => {
        this._modalCtrl.create({
          component: ContactModalComponent,
          componentProps: {
            contact: undefined,
            companyId: company.id
          }
        })
        .then((modal) => {
          modal.present()
        })
      }})
      // (response) => {
      // if (response[0]) {
      //   this._modalCtrl.create({
      //     component : ContactModalComponent,
      //     componentProps: {
      //       contact: response[0],
      //       companyId: company.id
      //     }
      //   })
      //   .then((modal)=> {
      //     modal.present()
      //   });
      // } else {
      //   this._modalCtrl.create({
      //     component: ContactModalComponent,
      //     componentProps: {
      //       contact: undefined,
      //       companyId: company.id
      //     }
      //   })
      // }

    }   
}

