import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoiceConnectPage } from './choice-connect.page';

const routes: Routes = [
  {
    path: '',
    component: ChoiceConnectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoiceConnectPageRoutingModule {}
