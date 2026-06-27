import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureService } from '../../../core/services/feature.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Feature } from '../../../core/models/feature';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [ CommonModule,MatCardModule,MatButtonModule,MatTableModule,MatIconModule,MatSlideToggleModule,RouterModule],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.css'
})
export class FeatureListComponent implements OnInit {

  features: Feature[] = [];
  displayedColumns: string[] = [
  'name',
  'status',
  'actions'
];

  constructor(private featureService: FeatureService) {}

ngOnInit() {
  this.loadFeatures();
}
  loadFeatures() {

  this.featureService.getFeatures().subscribe({

    next: (response) => {
      this.features = response;
    },

    error: (err) => {
      console.log(err);
    }

  });

}

  toggleFeature(id: string) {

  this.featureService.toggleFeature(id).subscribe({

    next: () => {
      this.loadFeatures();
    },

    error: (err) => {
      console.log(err);
    }
    

  });

}
  deleteFeature(id: string): void {

    const confirmDelete = confirm(
      'Are you sure you want to delete this feature?'
    );

    if (!confirmDelete) {
      return;
    }

    this.featureService.deleteFeature(id).subscribe({

      next: () => {

        alert('Feature deleted successfully');

        this.loadFeatures();

      },

      error: (err) => {
         alert("Feature deletion failed")
        console.log(err);
      }

    });

  }


}
