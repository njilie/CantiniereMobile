import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsOfMenuPageRoutingModule } from './meals-of-menu-routing.module';

import { MealsOfMenuPage } from './meals-of-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsOfMenuPageRoutingModule
  ],
  declarations: [MealsOfMenuPage]
})
export class MealsOfMenuPageModule {}
