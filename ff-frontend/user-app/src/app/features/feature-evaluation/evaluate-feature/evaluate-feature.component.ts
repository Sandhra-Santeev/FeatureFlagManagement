import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { FeatureService } from '../../../core/services/feature.service';

@Component({
  selector: 'app-evaluate-feature',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './evaluate-feature.component.html',
  styleUrl: './evaluate-feature.component.css'
})
export class EvaluateFeatureComponent {

  featureForm: FormGroup;

  result: any = null;

  user = JSON.parse(localStorage.getItem('user')!);

  constructor(
    private fb: FormBuilder,
    private featureService: FeatureService
  ) {

    this.featureForm = this.fb.group({

      key: ['', Validators.required]

    });

  }

  checkFeature(): void {

    if (this.featureForm.invalid) {
      return;
    }

    const key = this.featureForm.value.key;

    this.featureService.evaluateFeature(
      key,
    ).subscribe({

      next: (response) => {

        this.result = response;

      },

      error: (err) => {

        alert(err.error?.message);

        this.result = null;

      }

    });

  }

}