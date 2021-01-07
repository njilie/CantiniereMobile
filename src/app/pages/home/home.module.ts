import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { WeeklyMenusComponentModule } from '../../components/weekly-menus/weekly-menus.module';
import { MealsComponentModule } from '../../components/meals/meals.module';

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
