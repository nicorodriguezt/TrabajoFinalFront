import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaInicialViewComponent } from './carga-inicial-view.component';

describe('CargaInicialViewComponent', () => {
  let component: CargaInicialViewComponent;
  let fixture: ComponentFixture<CargaInicialViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaInicialViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaInicialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
