import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarRecetaNuevaComponent } from './cargar-receta-nueva.component';

describe('CargarRecetaNuevaComponent', () => {
  let component: CargarRecetaNuevaComponent;
  let fixture: ComponentFixture<CargarRecetaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarRecetaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarRecetaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
