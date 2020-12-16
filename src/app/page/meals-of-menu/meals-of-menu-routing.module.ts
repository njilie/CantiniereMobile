import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsOfMenuPage } from './meals-of-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MealsOfMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsOfMenuPageRoutingModule {}
