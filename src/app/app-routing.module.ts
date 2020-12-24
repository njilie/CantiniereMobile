import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'menu/:id/meals',
    loadChildren: () => import('./page/meals-of-menu/meals-of-menu.module').then( m => m.MealsOfMenuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./page/authentication/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/authentication/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./page/authentication/forgot/forgot.module').then( m => m.ForgotPageModule)
  },  {
    path: 'orders',
    loadChildren: () => import('./page/orders/orders.module').then( m => m.OrdersPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
