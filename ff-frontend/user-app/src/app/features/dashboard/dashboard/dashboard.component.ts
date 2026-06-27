import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { EvaluateFeatureComponent } from '../../feature-evaluation/evaluate-feature/evaluate-feature.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    EvaluateFeatureComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user = JSON.parse(localStorage.getItem('user')!);

  constructor(private router: Router) {}

  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

}