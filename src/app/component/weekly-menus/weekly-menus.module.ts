import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyMenusComponent } from './weekly-menus.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [WeeklyMenusComponent],
  exports: [WeeklyMenusComponent]
})
export class WeeklyMenusComponentModule {}
