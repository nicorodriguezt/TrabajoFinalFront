import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarRecetaIngeridaComponent } from './cargar-receta-ingerida.component';

describe('CargarRecetaIngeridaComponent', () => {
  let component: CargarRecetaIngeridaComponent;
  let fixture: ComponentFixture<CargarRecetaIngeridaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarRecetaIngeridaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarRecetaIngeridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
