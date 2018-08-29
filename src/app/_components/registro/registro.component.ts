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

  constructor(
    private _UsuarioService: UsuarioService,
    private _router: Router,
    private _location: Location
  ) {
    this.Usuario = new Usuario('','','','','');
  }

  public volver() {
    this._location.back();
  }

  public singup() {
    this.Usuario.UserName.toLowerCase();
    this._UsuarioService.singup(this.Usuario).subscribe(
      response => {
        this.session = response;
        if (!this.session.passport.user) {
          alert('Error en el servidor');
        } else {
          this._UsuarioService.sendSession(this.session.passport.user);
          this._router.navigate(['/main']);
        }
      }
      ,
      error1 => {
        error1 = JSON.stringify(error1.error.message);
        var errorMensaje = <any>error1;
        if (errorMensaje) {
          this.errorMensaje = error1;
        }
      }
    );
  }

  ngOnInit() {
  }

}
