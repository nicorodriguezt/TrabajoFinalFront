import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUnidadesViewComponent } from './gestion-unidades-view.component';

describe('GestionUnidadesViewComponent', () => {
  let component: GestionUnidadesViewComponent;
  let fixture: ComponentFixture<GestionUnidadesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionUnidadesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionUnidadesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
