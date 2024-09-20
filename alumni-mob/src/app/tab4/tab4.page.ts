import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmploymentService } from '../core/services/employment.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  companyArray: Array<any> = []

  constructor(
    private _formBuilder: FormBuilder,
    private _employmentService: EmploymentService
  ) { }

  formGroup: FormGroup = new FormGroup({})

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      job: [
        'Métier recherché',
        [Validators.required]
      ],
      location: [
        'Localisation',
        [Validators.required]
      ]
    })
  }

  mockResearch() {
    this.companyArray = this._employmentService.getDatas()
  }
}
