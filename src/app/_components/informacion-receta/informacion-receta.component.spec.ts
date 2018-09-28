import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionRecetaComponent } from './informacion-receta.component';

describe('InformacionRecetaComponent', () => {
  let component: InformacionRecetaComponent;
  let fixture: ComponentFixture<InformacionRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
