import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../_services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  providers: [UsuarioService]
})
export class MainMenuComponent implements OnInit {

  constructor(private _router: Router,
              private _UsuarioService: UsuarioService) { }

  public logout() {
    this._UsuarioService.logout().subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/login']);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  public cargarDatos() {
    this._router.navigate(['/datosUsuario']);
  }

  ngOnInit() {
  }

}
