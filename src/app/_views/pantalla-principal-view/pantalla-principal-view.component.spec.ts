import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaPrincipalViewComponent } from './pantalla-principal-view.component';

describe('PantallaPrincipalViewComponent', () => {
  let component: PantallaPrincipalViewComponent;
  let fixture: ComponentFixture<PantallaPrincipalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaPrincipalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaPrincipalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
