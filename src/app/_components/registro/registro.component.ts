import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuarioService} from '../../_services/usuario.service';
import { Router} from '@angular/router';
import { Usuario} from '../../_models/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {
  public Usuario: Usuario;
  public errorMensaje;
  public session;
  controlPassword;
  disableSegundaPassword = true;

  constructor(
    private _UsuarioService: UsuarioService,
    private _router: Router,
  ) {
    this.Usuario = new Usuario(null, null, null, null, null, null);
  }

  public singup() {
    if (this.Usuario.Password !== this.controlPassword) {
      this.errorMensaje = 'Contraseñas no coincide';
      this.Usuario.Password = null;
      this.controlPassword = null;
    } else {
      this.Usuario.UserName = this.Usuario.UserName.toLowerCase();
      this.Usuario.Email = this.Usuario.Email.toLowerCase();
      this._UsuarioService.singup(this.Usuario).subscribe(
        response => {
          this.session = response;
          if (!this.session.passport.user) {
            alert('Error en el servidor');
          } else {
            this._UsuarioService.sendSession(this.session.passport.user);
            this._UsuarioService.sendRol('usuario');
            this._router.navigate(['/main']);
          }
        }
        ,
        error1 => {
          error1 = JSON.stringify(error1.error.message);
          const errorMensaje = <any>error1;
          if (errorMensaje) {
            this.errorMensaje = error1;
          }
        }
      );
    }
  }

  enableAceptar() {
    this.disableSegundaPassword = this.controlPassword === '' || this.controlPassword == null;
  }

  ngOnInit() {
  }

}
