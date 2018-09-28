import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-register-view',
  templateUrl: './login-register-view.component.html',
  styleUrls: ['./login-register-view.component.css']
})
export class LoginRegisterViewComponent implements OnInit {
  public login = true;

  constructor() {
  }

  public change() {
    if (this.login == true) { this.login = false; } else { this.login = true; }
  }

  ngOnInit() {
  }

}
