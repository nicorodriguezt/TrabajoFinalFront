import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../_models/Usuario';
import {UsuarioService} from '../../_services/usuario.service';
import {Router} from '@angular/router';
import {debug} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public Usuario: Usuario;
  public errorMensaje;
  public session;

  constructor(
    private _UsuarioService: UsuarioService, private _router: Router
  ) {
    this.Usuario = new Usuario('', '', '', '', '', null, null);
  }

  public login() {
    this.Usuario.UserName = this.Usuario.UserName.toLowerCase();
    this._UsuarioService.login(this.Usuario).subscribe(
      response => {
        this.session = response;
        if (!this.session.passport.user) {
          alert('Error en el servidor');
        } else {
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
      ,
      error1 => {
        const errorMensaje = <any>error1;
        if (errorMensaje) {
          this.errorMensaje = error1;
        }
      }
    );
  }

  loginGoogle() {
    window.location.href = this._UsuarioService.loginGoogle();
  }

  ngOnInit() {
  }

}
