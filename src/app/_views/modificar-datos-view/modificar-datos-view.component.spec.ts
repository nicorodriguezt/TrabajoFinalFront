import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDatosViewComponent } from './modificar-datos-view.component';

describe('ModificarDatosViewComponent', () => {
  let component: ModificarDatosViewComponent;
  let fixture: ComponentFixture<ModificarDatosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDatosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDatosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
