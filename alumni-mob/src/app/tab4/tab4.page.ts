import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmploymentService } from '../core/services/employment.service';
import {  Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  companyArray: Array<any> = []
  selectedSegment: string = 'segment-one';

  constructor(
    private _formBuilder: FormBuilder,
    private _employmentService: EmploymentService,
    private router : Router
  ) { }

  formGroup: FormGroup = new FormGroup({})

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      job: [
        '',
        [Validators.required]
      ],
      location: [
        '',
        [Validators.required]
      ]
    })
  }

  async mockResearch() {
    this.companyArray = await lastValueFrom(this._employmentService.getDatas())
  }

  
}
