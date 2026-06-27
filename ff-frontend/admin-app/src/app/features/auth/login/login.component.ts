import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators,FormGroup  } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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

    next: (response) => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.existingUser));
      this.router.navigate(['/dashboard']);
      console.log(response);
    },

    error: (err) => {
      alert(err.error.message)
      console.log(err);
    }

  });

}

}
