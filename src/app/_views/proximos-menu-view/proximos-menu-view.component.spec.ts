import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosMenuViewComponent } from './proximos-menu-view.component';

describe('ProximosMenuViewComponent', () => {
  let component: ProximosMenuViewComponent;
  let fixture: ComponentFixture<ProximosMenuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProximosMenuViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProximosMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
