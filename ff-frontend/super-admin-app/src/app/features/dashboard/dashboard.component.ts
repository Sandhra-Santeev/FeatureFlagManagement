import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrganizationListComponent } from "../organization/organization-list/organization-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, OrganizationListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  role = JSON.parse(localStorage.getItem('role')!);

  constructor(private router: Router) {}

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);

  }

}