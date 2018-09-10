import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDatosUsuarioComponent } from './nuevo-datos-usuario.component';

describe('DatosUsuarioComponent', () => {
  let component: NuevoDatosUsuarioComponent;
  let fixture: ComponentFixture<NuevoDatosUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDatosUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDatosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
