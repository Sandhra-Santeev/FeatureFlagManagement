import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/feature-management/dashboard/dashboard.component';
import { FeatureListComponent } from './features/feature-management/feature-list/feature-list.component';
import { AddFeatureComponent } from './features/feature-management/add-feature/add-feature.component';
import { EditFeatureComponent } from './features/feature-management/edit-feature/edit-feature.component';
import { authGuard } from './core/guards/auth.guard';
import { AddUserComponent } from './users/user-management/add-user/add-user.component';

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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard/features',
    component: FeatureListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard/features/add',
    component: AddFeatureComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard/user',
    component: AddUserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard/features/edit/:id',
    component: EditFeatureComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
