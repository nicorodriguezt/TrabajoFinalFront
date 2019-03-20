import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {RecetaService} from '../../_services/receta.service';
import {PonerMayuscula} from '../../_services/funciones-commun.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {RecetaSugerida} from '../../_models/RecetaSugerida';
import {MenuService} from '../../_services/menu.service';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-cargar-receta-ingerida',
  templateUrl: './cargar-receta-ingerida.component.html',
  styleUrls: ['./cargar-receta-ingerida.component.css'],
  providers: [RecetaService,]
})
export class CargarRecetaIngeridaComponent implements OnInit {
  @Input() Menu;
  @Output() finalizarEvent: EventEmitter<boolean> = new EventEmitter();

  momento;
  Momentos = [];
  recetasEncontradas = [];
  _nuevaComida = new Receta(null, null, null, null, null, null, null, null, null, null, null, null, null, );
  _enableAgregar = false;
  _hideVacio = false;
  auxiliar;
  porciones;
  recetaBuscar;
  error;
  cargando;

  constructor(private _RecetaService: RecetaService,
              private _MenuService: MenuService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.cargando = true;
    this.error = false;
    this._RecetaService.getMomentos().subscribe(res => {
      this.auxiliar = res;
      this.auxiliar.forEach(x => {
        this.Momentos.push(x);
      });
      this.cargando = false;
    });
  }

  handleBuscar() {
    if (this.recetaBuscar !== '' && this.recetaBuscar !== undefined) {
      this.recetasEncontradas = [];
      this._RecetaService.buscarIngerida(this.recetaBuscar).subscribe(res => {
        this.auxiliar = res;
        this.auxiliar.forEach(x => {
          x.Nombre = PonerMayuscula(x.Nombre);
          for (let i = 0; i < x.Ingredientes.length; i++) {
            x.Ingredientes[i] = PonerMayuscula(x.Ingredientes[i]);
          }
          this.recetasEncontradas.push(x);
        });
        if (this.recetasEncontradas.length === 0) {
          this._hideVacio = true;
        } else {
          this._hideVacio = false;
        }
      });

    }

  }

  nuevaComida() {
    this._enableAgregar = true;

  }

  info(receta) {
    const dialogRef = this.dialog.open(CargarRecetaIngeridaInfoComponent, {
      maxWidth: '90%',
      data: receta
    });

    dialogRef.afterClosed().subscribe(x => {
      if (x !== undefined || false) {
        if (this.momento === undefined || this.momento === null || this.porciones === undefined || this.porciones === null) {
          this.error = true;
        } else {
          const recetaSugerida = new RecetaSugerida(this.momento, null, x, this.Menu, this.porciones);
          this.cargando = true;
          this._MenuService.recetaSugeridaNueva(recetaSugerida).subscribe(response => {
            this.finalizarEvent.emit(false);
          });
        }
      }
    });
  }
}

@Component({
  selector: 'app-cargar-receta-ingerida-info',
  templateUrl: './cargar-receta-ingerida-info.component.html',
  styleUrls: ['./cargar-receta-ingerida.component.css']
})
export class CargarRecetaIngeridaInfoComponent {

  confirmacionDiv = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CargarRecetaIngeridaInfoComponent>) {
  }

  elegir() {
    this.confirmacionDiv = true;
  }

  confirmar() {
    this.dialogRef.close(this.data);
  }

  cancelar() {
    this.confirmacionDiv = false;
  }

  volver() {
    this.dialogRef.close(false);
  }

}
