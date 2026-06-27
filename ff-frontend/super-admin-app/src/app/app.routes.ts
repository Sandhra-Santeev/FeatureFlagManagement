import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddOrganizationComponent } from './features/organization/add-organization/add-organization.component';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'organizations/add',
    component: AddOrganizationComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];