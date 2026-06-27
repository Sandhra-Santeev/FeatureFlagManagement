import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { OrganizationService } from '../../../core/services/organization.service';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent implements OnInit {

  organizations: any[] = [];

  constructor(
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {

    this.loadOrganizations();

  }

  loadOrganizations() {

    this.organizationService.getOrganizations().subscribe({

      next: (response) => {

        this.organizations = response;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
