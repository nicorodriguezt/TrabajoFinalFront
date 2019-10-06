import {Component, ComponentRef, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';
import {ActividadLaboral} from '../../_models/ActividadLaboral';
import {DatosUsuario} from '../../_models/DatosUsuario';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

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
  ref: ComponentRef<any>;
  cargando = true;

  constructor(private _location: Location,
              private _router: Router,
              private _DatosUsuarioService: DatosUsuarioService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog
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
    if (!this.DatosUsuario.PesoAprox || !this.DatosUsuario.Altura || !this.DatosUsuario.Edad ||
      this.DatosUsuario.Sexo === null || this.ActividadLaboral.Categoria === null) {
      this.errorMensaje = 'Datos incompletos';
    } else {
      this.DatosUsuario.ActividadLaboral = this.ActividadLaboral._id;
      this._DatosUsuarioService.cargaDatosUsuario(this.DatosUsuario).subscribe(response => {
          this.errorMensaje = null;
          this.openSnackBar('Datos guardados con exito', 'Descartar');
          if (this.existDatos) {
            this._router.navigate(['/main']);
          }
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
    this._DatosUsuarioService.getDatos().subscribe((res: DatosUsuario) => {
      if(res) {
        this.DatosUsuario = res;
      } else {
        this.existDatos = false;
        this.openInfo();
      }
      this.cargando = false;
    })
  }

  openInfo(): void {
    this.dialog.open(ModificarDatosViewWarningComponent, {
      width: '80%',
    });
  }

}
@Component({
  selector: 'app-modificar-datos-view-warning',
  templateUrl: './modificar-datos-view-warning.component.html',
  styleUrls: ['./modificar-datos-view.component.css']
})
export class ModificarDatosViewWarningComponent {

  constructor(public dialogRef: MatDialogRef<ModificarDatosViewWarningComponent>) {
  }

  aceptar() {
    this.dialogRef.close();
  }
}

