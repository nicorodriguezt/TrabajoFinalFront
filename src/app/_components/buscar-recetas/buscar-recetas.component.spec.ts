import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRecetasComponent } from './buscar-recetas.component';

describe('BuscarRecetasComponent', () => {
  let component: BuscarRecetasComponent;
  let fixture: ComponentFixture<BuscarRecetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarRecetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
