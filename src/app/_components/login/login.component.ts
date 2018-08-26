import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../_models/Usuario';
import {UsuarioService} from '../../_services/usuario.service';
import {Router} from '@angular/router';

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
    this.Usuario = new Usuario('','','','','');
  }

  public login() {
    this._UsuarioService.login(this.Usuario).subscribe(
      response => {
        this.session = response;
        if (!this.session.passport.user) {
          alert('Error en el servidor');
        } else {
          this._UsuarioService.sendToken(this.session.passport.user);
          this._router.navigate(['/main']);
        }
      }
      ,
      error1 => {
        var errorMensaje = <any>error1;
        if (errorMensaje) {
          this.errorMensaje = error1;
        }
      }
    );
  }

  ngOnInit() {
    this.session = this._UsuarioService.getToken();
  }

}
