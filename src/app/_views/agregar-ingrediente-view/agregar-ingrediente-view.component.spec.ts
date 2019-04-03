import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIngredienteViewComponent } from './agregar-ingrediente-view.component';

describe('AgregarIngredienteViewComponent', () => {
  let component: AgregarIngredienteViewComponent;
  let fixture: ComponentFixture<AgregarIngredienteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarIngredienteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarIngredienteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
