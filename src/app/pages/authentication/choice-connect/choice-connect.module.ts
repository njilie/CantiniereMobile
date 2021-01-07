import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoiceConnectPageRoutingModule } from './choice-connect-routing.module';

import { ChoiceConnectPage } from './choice-connect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoiceConnectPageRoutingModule
  ],
  declarations: [ChoiceConnectPage]
})
export class ChoiceConnectPageModule {}
