import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  showMenus: boolean;
  canShowMenus: boolean;

  constructor() {
    this.showMenus = true;
    this.canShowMenus = true;
  }

}
