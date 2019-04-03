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
  private aux;

  constructor(private _UsuarioService: UsuarioService, private _router: Router) {
  }

  public change() {
    this.login = this.login !== true;
  }

  ngOnInit() {
    this._UsuarioService.getSession().subscribe(response => {
      this.aux = response;
      if (this.aux.passport) {
        if (this.aux.passport.user) {
          this._UsuarioService.sendSession(this.aux.passport.user);
          this._UsuarioService.info().subscribe((res: Usuario) => {
            this._UsuarioService.sendRol(res.Rol);
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
