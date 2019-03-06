import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosViewComponent } from './favoritos-view.component';

describe('FavoritosViewComponent', () => {
  let component: FavoritosViewComponent;
  let fixture: ComponentFixture<FavoritosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
