import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsComponent } from './meals.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,],
  declarations: [MealsComponent],
  exports: [MealsComponent]
})
export class MealsComponentModule {}
