import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateFeatureComponent } from './evaluate-feature.component';

describe('EvaluateFeatureComponent', () => {
  let component: EvaluateFeatureComponent;
  let fixture: ComponentFixture<EvaluateFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
