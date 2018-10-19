import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterVerMenuComponent } from './footer-ver-menu.component';

describe('FooterVerMenuComponent', () => {
  let component: FooterVerMenuComponent;
  let fixture: ComponentFixture<FooterVerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterVerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterVerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
