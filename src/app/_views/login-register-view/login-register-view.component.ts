import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../_services/usuario.service';
import {Usuario} from '../../_models/Usuario';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-register-view',
  templateUrl: './login-register-view.component.html',
  styleUrls: ['./login-register-view.component.css'],
  providers: [UsuarioService]
})
export class LoginRegisterViewComponent implements OnInit {
  public login = true;
  private session;

  constructor(private _UsuarioService: UsuarioService, private _router: Router) {
  }

  public change() {
    this.login = this.login !== true;
  }

  ngOnInit() {
    this._UsuarioService.getSession().subscribe(response => {
      this.session = response;
      if (this.session.passport) {
        if (this.session.passport.user) {
          this._UsuarioService.sendSession(this.session.passport.user);
          this._UsuarioService.info().subscribe((res: Usuario) => {
            this._UsuarioService.sendRol(res.Rol);
            this._UsuarioService.sendDisclaimer(res.Disclaimer);
            if (this._UsuarioService.getRol() === 'administrador') {
              this._router.navigate(['recetasAdmin']);
            }
            this._router.navigate(['/main']);
          });
        }
      }
    });
  }

}
