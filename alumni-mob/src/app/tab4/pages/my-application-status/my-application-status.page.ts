import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { EmploymentService } from 'src/app/core/services/employment.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { CompanyItemsType } from 'src/app/core/types/ft-company/company-items.type';
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component';

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
  ) { }

  ngOnInit() {
    this.getMyFollowedCies();
  }

  getMyFollowedCies() {
    const internId = this._selfInformation.retrievePersonnal();
    return this._employmentService.getPersonnalArray().subscribe({
      next: (personnalArray) => {
        this.idFollowedCies = [];
        if (personnalArray) {
          this.idFollowedCies = personnalArray;
          this._employmentService
            .companyIdToCompanyInfo(personnalArray)
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
      error: (error) => { },
    });
  }

  presentContact(company: CompanyItemsType) {
    this._employmentService.getContact(company.id).subscribe({
      next: (contact) => {
        this._modalCtrl.create({
          component: ContactModalComponent,
          componentProps: {
            contact: contact,
            companyId: company.id
          }
        })
          .then((modal) => {
            modal.present()
          });
      },
      error: () => {
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
      }
    })
  }
}

