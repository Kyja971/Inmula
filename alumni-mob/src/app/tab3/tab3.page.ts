import { Component, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { take } from 'rxjs';
import { Intern } from '../core/types/intern/intern-class';
import { SelfInformationService } from '../core/services/self-information.service';
import { Logger } from 'ionic-logging-service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public interns: Array<Intern> = []

  constructor(
    private _service: InternService,
    private _selfInformation: SelfInformationService
  ) {}

  ngOnInit(): void {
    this._service.findAll()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (results: any) => {
          for (let intern of results) {
            if (intern.id != this._selfInformation.retrievePersonnal()) {
              this.interns.push(intern)
            }
          }
        },
        error: (error: any) => {}
      })
  }

  onCancel(): void {
    return
  }
}