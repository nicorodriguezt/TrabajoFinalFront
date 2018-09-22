import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMenuViewComponent } from './ver-menu-view.component';

describe('VerMenuViewComponent', () => {
  let component: VerMenuViewComponent;
  let fixture: ComponentFixture<VerMenuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMenuViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
