import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { WeeklyMenusComponentModule } from '../../component/weekly-menus/weekly-menus.module';
import { MealsComponentModule } from '../../component/meals/meals.module';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    WeeklyMenusComponentModule,
    MealsComponentModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
