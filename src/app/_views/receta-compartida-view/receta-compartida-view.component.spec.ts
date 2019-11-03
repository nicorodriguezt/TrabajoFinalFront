import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaCompartidaViewComponent } from './receta-compartida-view.component';

describe('RecetaCompartidaViewComponent', () => {
  let component: RecetaCompartidaViewComponent;
  let fixture: ComponentFixture<RecetaCompartidaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetaCompartidaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaCompartidaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
