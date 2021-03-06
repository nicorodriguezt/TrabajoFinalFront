import {Component, OnInit, Inject} from '@angular/core';
import {ActividadfisicaService} from '../../_services/actividadfisica.service';
import {ActividadFisica} from '../../_models/ActividadFisica';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {BlockUI, NgBlockUI} from "ng-block-ui";

@Component({
  selector: 'app-actividad-fisica',
  templateUrl: './actividad-fisica.component.html',
  styleUrls: ['./actividad-fisica.component.css'],
  providers: [ActividadfisicaService]
})
export class ActividadFisicaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  panelOpenState = false;
  ListActividades = [];
  ListActividadesUsuario = [];
  errorMensaje = false;
  cargando = true;

  public ActividadFisica: ActividadFisica;
  public Cantidad: number;

  constructor(public dialog: MatDialog,
              public _ActividadFisicaService: ActividadfisicaService,
              public snackBar: MatSnackBar) {
    this.ActividadFisica = new ActividadFisica(null, null, null);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.cargarListActividadesUsuario();
    this._ActividadFisicaService.getActividades().subscribe(response => {
      const aux = (Object.values(response));
      aux.forEach(value => {
        this.ListActividades.push(value);
      });
    });
  }

  openDialogNuevo(): void {
    const dialogRef = this.dialog.open(ActividadOverviewComponent, {
      data: {
        ActividadFisica: this.ActividadFisica,
        ListActividades: this.ListActividades,
        Cantidad: this.Cantidad
      }
    });

    dialogRef.afterClosed().subscribe(res => {
        if (res !== undefined) {
          this.ListActividadesUsuario.push(res);
        }
      }
    );
  }

  cargarListActividadesUsuario() {
    this.ListActividadesUsuario = [];
    this._ActividadFisicaService.getActividadesUsuario().subscribe(response => {
      const aux = (Object.values(response));
      aux.forEach(value => {
        this.ListActividadesUsuario.push(value);
      });
      this.cargando = false;
    });
  }

  eliminarActividad(actividad) {
    this.blockUI.start();
    this.errorMensaje = false;
    this._ActividadFisicaService.deleteActividadUsuario(actividad).subscribe(response => {
        const index = this.ListActividadesUsuario.indexOf(actividad._id);
        this.ListActividadesUsuario.splice(index, 1);
        this.openSnackBar('Borrado con Exito', 'Descartar');
        this.blockUI.stop();
      },
      error1 => {
        this.errorMensaje = true;
        this.blockUI.stop();
      }
    );
  }

}

@Component({
  selector: 'app-actividad-fisica-dialog',
  templateUrl: './actividad-fisica-dialog.component.html'
})
export class ActividadOverviewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  ListTipos = [];
  ListModalidades = [];
  ListDistancias = [];
  hideModalidad = false;
  hideDistancia = false;

  constructor(
    public _ActividadFisicaService: ActividadfisicaService,
    public dialogRef: MatDialogRef<ActividadOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  selectedTipo() {
    this.hideModalidad = false;
    this.hideDistancia = false;
    this.ListModalidades = [];
    this.data.ActividadFisica.Modalidad = null;
    this.data.ActividadFisica.Distancia = null;
    for (let i = 0; i < this.data.ListActividades.length; i++) {
      if (this.data.ListActividades[i].TipoActividad === this.data.ActividadFisica.TipoActividad) {
        if (this.data.ListActividades[i].Modalidad !== undefined) {
          if (!this.ListModalidades.includes(this.data.ListActividades[i].Modalidad)) {
            this.ListModalidades.push(this.data.ListActividades[i].Modalidad);
          }
        } else {
          if (this.data.ListActividades[i].Distancia !== undefined) {
            this.hideDistancia = true;
            if (!this.ListDistancias.includes(this.data.ListActividades[i].Distancia)) {
              this.ListDistancias.push(this.data.ListActividades[i].Distancia);
            }
          }
        }
      }
    }
    if (this.ListModalidades.length > 0) {
      this.hideModalidad = true;
    }
  }

  selectedModalidad() {
    this.hideDistancia = false;
    this.ListDistancias = [];
    this.data.ActividadFisicaDistancia = null;
    for (let i = 0; i < this.data.ListActividades.length; i++) {
      if (this.data.ListActividades[i].TipoActividad === this.data.ActividadFisica.TipoActividad &&
        this.data.ListActividades[i].Modalidad === this.data.ActividadFisica.Modalidad &&
        this.data.ListActividades[i].Distancia !== undefined) {
        if (!this.ListDistancias.includes(this.data.ListActividades[i].Distancia)) {
          this.ListDistancias.push(this.data.ListActividades[i].Distancia);
        }
      }
    }
    if (this.ListDistancias.length > 0) {
      this.hideDistancia = true;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  cargarActividad() {
    this.blockUI.start();
    this._ActividadFisicaService.setActividadUsuario(this.data.ActividadFisica, this.data.Cantidad).subscribe(response => {
        this.dialogRef.close(response);
        this.blockUI.stop();
      },
      error1 => {
        this.dialogRef.close(error1);
        this.blockUI.stop();
      }
    );
  }

  ngOnInit(): void {
    this.ListTipos = Array.from(new Set(this.data.ListActividades.map(item => item.TipoActividad)));
  }

}

