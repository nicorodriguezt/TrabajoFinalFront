import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorViewComponent } from './buscador-view.component';

describe('BuscadorViewComponent', () => {
  let component: BuscadorViewComponent;
  let fixture: ComponentFixture<BuscadorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
