import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasAdministradorComponent } from './recetas-administrador.component';

describe('RecetasAdministradorComponent', () => {
  let component: RecetasAdministradorComponent;
  let fixture: ComponentFixture<RecetasAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetasAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
