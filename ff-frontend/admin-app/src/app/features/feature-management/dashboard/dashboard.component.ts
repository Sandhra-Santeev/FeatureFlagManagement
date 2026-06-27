import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureListComponent } from '../feature-list/feature-list.component';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FeatureListComponent,RouterModule,MatIconModule,MatToolbarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user = JSON.parse(localStorage.getItem('user')!);
  constructor(private router: Router) {}

  logout() {

  localStorage.removeItem('token');

  localStorage.removeItem('user');

  this.router.navigate(['/login']);

}

}
