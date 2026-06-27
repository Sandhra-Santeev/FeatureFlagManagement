import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
 registerForm:FormGroup
  organizations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.registerForm = this.fb.group({

    organizationId: ['', Validators.required],

    username: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]]

  });
  }



  ngOnInit(): void {

    this.loadOrganizations();

  }

  loadOrganizations() {

    this.authService.getOrganizations().subscribe({

      next: (response: any) => {
  

        this.organizations = response;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  register() {

    if (this.registerForm.invalid) {

      return;

    }

    this.authService.register(this.registerForm.value).subscribe({

      next: () => {

        alert("Registration Successful");

        this.router.navigate(['/login']);

      },

      error: (err) => {

        console.log(err);

        alert(err.error.message);

      }

    });

  }

}
