import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required]

    });

  }

  login() {

    if (this.loginForm.invalid) {

      return;

    }

    this.authService.login(this.loginForm.value).subscribe({

      next: (response: any) => {

        localStorage.setItem('token', response.token);

        localStorage.setItem('user', JSON.stringify(response.user));

        this.router.navigate(['/dashboard']);

      },

      error: (err) => {

        alert(err.error?.message || 'Login Failed');

      }

    });

  }

}