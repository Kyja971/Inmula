import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-approach',
  templateUrl: './company-approach.component.html',
  styleUrls: ['./company-approach.component.scss'],
})
export class CompanyApproachComponent  implements OnInit {

  @Input()
  value: string = 'approach'

  constructor() { }

  ngOnInit() {
    console.log('approach init')
  }

}
