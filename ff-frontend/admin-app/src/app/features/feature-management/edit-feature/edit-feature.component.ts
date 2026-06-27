import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { FeatureService } from '../../../core/services/feature.service';

@Component({
  selector: 'app-edit-feature',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './edit-feature.component.html',
  styleUrl: './edit-feature.component.css'
})
export class EditFeatureComponent implements OnInit {

  featureForm: FormGroup;
  featureId!: string;

  constructor(
    private fb: FormBuilder,
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private router:Router
  ) {

    this.featureForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

  }

  ngOnInit(): void {

    this.featureId = this.route.snapshot.paramMap.get('id')!;

    this.loadFeature();

  }

  loadFeature() {

    this.featureService.getFeatureById(this.featureId).subscribe({

      next: (feature) => {

        this.featureForm.patchValue({

          name: feature.name,
          description: feature.description

        });

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  updateFeature() {

  if (this.featureForm.invalid) {
    return;
  }

  this.featureService
    .updateFeature(this.featureId, this.featureForm.value)
    .subscribe({

      next: () => {
          alert("Feature updated successfully")

        console.log("Feature updated successfully");

        this.router.navigate(['/dashboard']);

      },

      error: (err) => {
         alert("Feature updation failed")

        console.log(err);

      }

    });

}

}
