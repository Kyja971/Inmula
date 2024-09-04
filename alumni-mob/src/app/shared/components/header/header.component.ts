import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  currentPage = '';

  constructor(
    private navCtrl: NavController, 
    private route: Router) {}

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
    this.currentPage = this.route.url
  }


}
