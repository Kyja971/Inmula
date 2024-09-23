import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { EmploymentService } from 'src/app/core/services/employment.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { CompanyItemsType } from 'src/app/core/types/ft-company/company-items.type';
import { FTCompanyType } from 'src/app/core/types/ft-company/ft-company.type';

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
    private _selfInformation: SelfInformationService
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

}
