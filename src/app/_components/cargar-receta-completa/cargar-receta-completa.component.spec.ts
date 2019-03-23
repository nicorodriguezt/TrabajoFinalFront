import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarRecetaCompletaComponent } from './cargar-receta-completa.component';

describe('CargarRecetaCompletaComponent', () => {
  let component: CargarRecetaCompletaComponent;
  let fixture: ComponentFixture<CargarRecetaCompletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarRecetaCompletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarRecetaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
