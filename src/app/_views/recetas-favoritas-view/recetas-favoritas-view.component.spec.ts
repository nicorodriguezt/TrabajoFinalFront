import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasFavoritasViewComponent } from './recetas-favoritas-view.component';

describe('RecetasFavoritasViewComponent', () => {
  let component: RecetasFavoritasViewComponent;
  let fixture: ComponentFixture<RecetasFavoritasViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetasFavoritasViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetasFavoritasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
