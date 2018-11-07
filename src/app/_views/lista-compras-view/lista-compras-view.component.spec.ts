import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComprasViewComponent } from './lista-compras-view.component';

describe('ListaComprasViewComponent', () => {
  let component: ListaComprasViewComponent;
  let fixture: ComponentFixture<ListaComprasViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaComprasViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaComprasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
