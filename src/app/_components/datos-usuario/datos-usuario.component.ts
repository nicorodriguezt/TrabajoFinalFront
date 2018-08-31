import { Component, OnInit } from '@angular/core';
import { DatosUsuario} from '../../_models/DatosUsuario';
import { ActividadLaboral} from '../../_models/ActividadLaboral';
import { Router} from '@angular/router';
import { DatosUsuarioService} from '../../_services/datos-usuario.service';
import { Location } from '@angular/common';
import {Usuario} from '../../_models/Usuario';


@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css'],
  providers: [DatosUsuarioService]
})
export class DatosUsuarioComponent implements OnInit {
  public DatosUsuario: DatosUsuario;
  public ActividadLaboral: ActividadLaboral;
  public list = [];
  public sex = ['M', 'F'];

  constructor(
    private _DatosUsuarioService: DatosUsuarioService,
    private _router: Router,
    private _location: Location
  ) {
    this.DatosUsuario = new DatosUsuario(null, null, null, '', '', null, '', '', '');
    this.ActividadLaboral = new ActividadLaboral('',  null, '');
  }

  public volver() {
    this._location.back();
  }

  public cargar() {
    this._DatosUsuarioService.cargar(this.DatosUsuario, this.ActividadLaboral);
    this._router.navigate(['main']);
  }

  ngOnInit() {
    this._DatosUsuarioService.getlist().subscribe(response => {
      const aux = (Object.values(response));
      aux.forEach(value => {
        this.list.push(value);
      });
    });
  }

}
