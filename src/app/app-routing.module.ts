import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'meals-of-menu',
    loadChildren: () => import('./page/meals-of-menu/meals-of-menu.module').then( m => m.MealsOfMenuPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
