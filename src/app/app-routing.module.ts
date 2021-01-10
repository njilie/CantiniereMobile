import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'menu/:id/meals',
    loadChildren: () => import('./pages/meals-of-menu/meals-of-menu.module').then( m => m.MealsOfMenuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/authentication/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/authentication/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/authentication/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/authentication/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'meals',
    loadChildren: () => import('./pages/admin/meals/meals.module').then( m => m.MealsPageModule)
  },
  {
    path: 'menus',
    loadChildren: () => import('./pages/admin/menus/menus.module').then( m => m.MenusPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/admin/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'newmeal',
    loadChildren: () => import('./pages/admin/newmeal/newmeal.module').then( m => m.NewmealPageModule)
  },
  {
    path: 'newmenu',
    loadChildren: () => import('./pages/admin/newmenu/newmenu.module').then( m => m.NewmenuPageModule)
  },
  {
    path: 'user-admin/:id',
    loadChildren: () => import('./pages/admin/user-admin/user-admin.module').then( m => m.UserAdminPageModule)
  },
  {
    path: 'manage-meal/:id',
    loadChildren: () => import('./pages/admin/manage-meal/manage-meal.module').then( m => m.ManageMealPageModule)
  },
  {
    path: 'manage-menu/:id',
    loadChildren: () => import('./pages/admin/manage-menu/manage-menu.module').then( m => m.ManageMenuPageModule)
  },  {
    path: 'ingredient',
    loadChildren: () => import('./pages/admin/ingredient/ingredient.module').then( m => m.IngredientPageModule)
  }






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
