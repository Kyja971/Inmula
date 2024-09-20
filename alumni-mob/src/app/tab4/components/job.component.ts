import { Component, OnInit } from '@angular/core';
import { EmploymentService } from 'src/app/core/services/employment.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent  implements OnInit {
  private _datas: Array<any> = []

  constructor(
    private _employmentService: EmploymentService
  ) { }




  ngOnInit() {
    this.loadDatas()
  }

  loadDatas() {
    this._datas = this._employmentService.getDatas()
    console.log(this._datas)
  }

  

}
