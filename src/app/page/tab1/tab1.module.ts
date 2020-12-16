import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { WeeklyMenusComponentModule } from '../../component/weekly-menus/weekly-menus.module';
import { MealsComponentModule } from '../../component/meals/meals.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    WeeklyMenusComponentModule,
    MealsComponentModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
