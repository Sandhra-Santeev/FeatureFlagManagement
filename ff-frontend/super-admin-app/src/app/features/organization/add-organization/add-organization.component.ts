import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { OrganizationService } from '../../../core/services/organization.service';

@Component({
  selector: 'app-add-organization',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css'
})
export class AddOrganizationComponent {

  organizationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private router: Router
  ) {

    this.organizationForm = this.fb.group({

      name: ['', Validators.required]

    });

  }

  addOrganization() {

    if (this.organizationForm.invalid) {
      return;
    }

    this.organizationService
      .addOrganization(this.organizationForm.value)
      .subscribe({

        next: (response: any) => {

          alert("Organization Added Successfully");

          this.router.navigate(['/dashboard']);

        },

        error: (err) => {

          alert(err.error?.message || 'Failed to create organization.');

        }

      });

  }

}
