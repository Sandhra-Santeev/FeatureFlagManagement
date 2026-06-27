import { Component } from '@angular/core';
import {  ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeatureService } from '../../../core/services/feature.service';
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-feature',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './add-feature.component.html',
  styleUrl: './add-feature.component.css'
})
export class AddFeatureComponent {
  featureForm:FormGroup
  constructor(private fb: FormBuilder,private featureService: FeatureService,private router: Router) {
    this.featureForm = this.fb.group({

  name: ['', Validators.required],

  key: ['', Validators.required],

  description: ['']

});
  }
  addFeature() {

  if (this.featureForm.invalid) {
    return;
  }

  this.featureService.addFeature(
      this.featureForm.value
  ).subscribe({

      next: () => {
         alert("Feature added Successfully")
          this.router.navigate(['/dashboard']);

      },

      error: (err) => {
          alert("Feature not added")
          console.log(err);

      }

  });

}



}
