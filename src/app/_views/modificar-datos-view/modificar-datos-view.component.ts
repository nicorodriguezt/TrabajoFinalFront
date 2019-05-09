import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';
import {ActividadLaboral} from '../../_models/ActividadLaboral';
import {DatosUsuario} from '../../_models/DatosUsuario';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-modificar-datos-view',
  templateUrl: './modificar-datos-view.component.html',
  styleUrls: ['./modificar-datos-view.component.css'],
  providers: [DatosUsuarioService]
})
export class ModificarDatosViewComponent implements OnInit {
  DatosUsuario = new DatosUsuario(null, null, null, null, null, null, null, null, null, null);
  ActividadLaboral = new ActividadLaboral(null, null, null, null);
  errorMensaje = null;
  existDatos = false;
  enablePreferencias = false;

  constructor(private _location: Location,
              private _router: Router,
              private _DatosUsuarioService: DatosUsuarioService,
              public snackBar: MatSnackBar
  ) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public volver() {
    this._location.back();
  }

  public getActividad(data) {
    this.ActividadLaboral = data;
  }

  public cargarDatos() {
    if (!this.DatosUsuario.PesoAprox || !this.DatosUsuario.Altura || !this.DatosUsuario.Edad || this.DatosUsuario.Sexo == '' || this.ActividadLaboral.Categoria == '') {
      this.errorMensaje = 'Datos incompletos';
    } else {
      this.DatosUsuario.ActividadLaboral = this.ActividadLaboral._id;
      this._DatosUsuarioService.cargaDatosUsuario(this.DatosUsuario).subscribe(response => {
          this.errorMensaje = null;
          this.openSnackBar('Datos guardados con exito', 'Descartar');
          this.existDatos = false;
        },
        error1 => {
          this.errorMensaje = 'Servidor no disponible';
        });
    }
  }

  public configPreferencias() {
    this.enablePreferencias = true;
  }

  public preferenciasReturn(evento) {
    this.enablePreferencias = evento.disable;
    if (evento.change) {
      this.cargarDatos();
    }
  }

  ngOnInit() {
  }

}
