import { Component } from '@angular/core';
import {  ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm: FormGroup
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

  addUser() {

  if (this.userForm.invalid) {
    return;
  }

  this.userService.addUser(
      this.userForm.value
  ).subscribe({

      next: () => {
         alert("User added Successfully")
          this.router.navigate(['/dashboard']);

      },

      error: (err) => {
          alert(err.error.message)
          console.log(err);

      }

  });

}

}
