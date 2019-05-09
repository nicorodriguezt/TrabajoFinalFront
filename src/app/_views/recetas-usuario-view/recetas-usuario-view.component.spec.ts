import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasUsuarioViewComponent } from './recetas-usuario-view.component';

describe('RecetasUsuarioViewComponent', () => {
  let component: RecetasUsuarioViewComponent;
  let fixture: ComponentFixture<RecetasUsuarioViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetasUsuarioViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasUsuarioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
