import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterViewComponent } from './login-register-view.component';

describe('LoginRegisterViewComponent', () => {
  let component: LoginRegisterViewComponent;
  let fixture: ComponentFixture<LoginRegisterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
