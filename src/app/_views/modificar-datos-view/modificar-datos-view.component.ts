import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';
import {ActividadLaboral} from '../../_models/ActividadLaboral';
import {DatosUsuario} from '../../_models/DatosUsuario';

@Component({
  selector: 'app-modificar-datos-view',
  templateUrl: './modificar-datos-view.component.html',
  styleUrls: ['./modificar-datos-view.component.css'],
  providers: [DatosUsuarioService]
})
export class ModificarDatosViewComponent implements OnInit {
  DatosUsuario = new DatosUsuario(null, null, null, '', null, null, '', '', '');
  ActividadLaboral = new ActividadLaboral('', null, '');
  errorMensaje = false;


  constructor(private _location: Location,
              private _router: Router,
              private _DatosUsuarioService: DatosUsuarioService) {
  }

  public volver() {
    this._location.back();
  }

  public getDatosUsuario(data) {
    this.DatosUsuario = data;
  }

  public getActividad(data) {
    this.ActividadLaboral = data.Datos;
  }

  public cargarDatos() {
    if (!this.DatosUsuario.PesoAprox || !this.DatosUsuario.Altura || !this.DatosUsuario.Edad || this.DatosUsuario.Sexo == '' || this.ActividadLaboral.Categoria == '') {
      this.errorMensaje = true;
    } else {
      this._DatosUsuarioService.cargar(this.DatosUsuario, this.ActividadLaboral);
      this._router.navigate(['main']);
    }
  }

  ngOnInit() {
  }

}
