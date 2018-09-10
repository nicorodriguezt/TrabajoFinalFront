import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadLaboralComponent } from './actividad-laboral.component';

describe('ActividadLaboralComponent', () => {
  let component: ActividadLaboralComponent;
  let fixture: ComponentFixture<ActividadLaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadLaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
