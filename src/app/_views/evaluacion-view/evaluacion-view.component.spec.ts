import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionViewComponent } from './evaluacion-view.component';

describe('EvaluacionViewComponent', () => {
  let component: EvaluacionViewComponent;
  let fixture: ComponentFixture<EvaluacionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
