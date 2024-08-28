/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/core/services/dataservice.service';
import { Intern } from 'src/app/core/types/intern/intern-class';
import { InternType } from 'src/app/core/types/intern/intern-type';

@Component({
  selector: 'app-header-intern',
  templateUrl: './headerIntern.component.html',
  styleUrls: ['./headerIntern.component.scss'],
})
export class headerInternComponent implements OnInit {


  @Input()
  intern!: Intern

  @Input()
  num!: number

  @Input()
  id: string | undefined

  constructor( private _router:Router,
              private _id : DataserviceService
  ) { }

  ngOnInit(): void {}

  goProfile(id?:string ){
    if(id){
      this._router.navigate(['', 'tabs', 'tab2', 'profile-page' , id])
    }

  }

}
