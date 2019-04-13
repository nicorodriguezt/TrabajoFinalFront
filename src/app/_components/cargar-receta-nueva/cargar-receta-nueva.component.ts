import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {RecetaService} from '../../_services/receta.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {IngredienteService} from '../../_services/ingrediente.service';
import {PonerMayuscula} from '../../_services/funciones-commun.service';

@Component({
  selector: 'app-cargar-receta-nueva',
  templateUrl: './cargar-receta-nueva.component.html',
  styleUrls: ['./cargar-receta-nueva.component.css'],
  providers: [RecetaService, IngredienteService]
})
export class CargarRecetaNuevaComponent implements OnInit {
  @Input() _nuevaComida;
  @Output() finalizarEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog,
              private _RecetaService: RecetaService,
              private _IngredienteService: IngredienteService) {
  }

  _cargando = true;
  _ListIngredientes;

  ngOnInit() {
    this._nuevaComida.Ingredientes = [];
    this._IngredienteService.getIngredientes().subscribe(res => {
      this._ListIngredientes = res;
      this._cargando = false;
      this._ListIngredientes.forEach(x => {
        x.NombreMostrar = PonerMayuscula(x.Nombre);
      });
    });

  }

  nuevoIngrediente() {
    const dialogRef = this.dialog.open(CargarRecetaNuevaIngrerdienteComponent, {
      maxWidth: '70%',
      data: this._ListIngredientes
    });

    dialogRef.afterClosed().subscribe(x => {
      if (x !== undefined) {
        if (this._nuevaComida.Ingredientes.length === 0) {
          this._nuevaComida.Ingredientes.push(x);
        } else {
          this._nuevaComida.Ingredientes.forEach(item => {
            if (item.Ingrediente._id === x.Ingrediente._id && item.Unidad === item.Unidad) {
              item.Cantidad += x.Cantidad;
            } else {
              this._nuevaComida.Ingredientes.push(x);
            }
          });
        }
      }
    });
  }

  crearReceta() {
    this._nuevaComida.Estado = 'comida';
    this._RecetaService.addReceta(this._nuevaComida).subscribe( x => {
      let auxiliar;
      auxiliar = x;
      this._nuevaComida._id = auxiliar._id;
      this.finalizarEvent.emit(true);
    });
  }

  cancelar() {
    this.finalizarEvent.emit(false);
  }
}

@Component({
  selector: 'app-cargar-receta-nueva-ingrediente',
  templateUrl: './cargar-receta-nueva-ingrediente.component.html',
  styleUrls: ['./cargar-receta-nueva.component.css']
})
export class CargarRecetaNuevaIngrerdienteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CargarRecetaNuevaIngrerdienteComponent>) {
  }

  ingredienteElegido = {
    Ingrediente: null,
    Cantidad: null,
    Unidad: null
  };
  Unidades = ['Gramos'];

  confirmar() {
    this.dialogRef.close(this.ingredienteElegido);
  }

  cancelar() {
    this.dialogRef.close(undefined);
  }

}