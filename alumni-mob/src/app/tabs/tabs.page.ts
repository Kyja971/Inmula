import { Component, OnInit } from '@angular/core';
import { SelfInformationService } from '../core/services/self-information.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  isAllow: boolean = false

  //TODO: use subject instead of public reference
  constructor(public _selfInformation : SelfInformationService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

  }
}
