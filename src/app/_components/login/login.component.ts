import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../_models/Usuario';
import {UsuarioService} from '../../_services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public Usuario: Usuario;
  public session;
  public token;

  constructor(
    private _UsuarioService: UsuarioService
  ) {
    this.Usuario = new Usuario('','','','','');
  }

  public login() {
    console.log(this.Usuario);
  }

  ngOnInit() {
  }

}
