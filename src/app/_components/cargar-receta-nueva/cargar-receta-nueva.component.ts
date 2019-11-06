import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {RecetaService} from '../../_services/receta.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {IngredienteService} from '../../_services/ingrediente.service';
import {PonerMayuscula} from '../../_services/funciones-commun.service';
import {Ingrediente} from '../../_models/Ingrediente';
import {UnidadService} from '../../_services/unidad.service';
import {Unidad} from '../../_models/Unidad';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from "rxjs/operators";

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
  _ListOrigenes;

  ngOnInit() {
    this._nuevaComida.Ingredientes = [];
    this._IngredienteService.getOrigenes().subscribe(res => {
      this._ListOrigenes = res;
      this._cargando = false;
    });
  }

  nuevoIngrediente() {
    const dialogRef = this.dialog.open(CargarRecetaNuevaIngrerdienteComponent, {
      maxWidth: '70%',
      data: this._ListOrigenes
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
    this._nuevaComida.Ingredientes.forEach(x => {
      x.Nombre = x.Nombre.toLowerCase();
    });
    this._RecetaService.addReceta(this._nuevaComida).subscribe(x => {
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
  styleUrls: ['./cargar-receta-nueva.component.css'],
  providers: [IngredienteService, UnidadService]
})
export class CargarRecetaNuevaIngrerdienteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CargarRecetaNuevaIngrerdienteComponent>,
              private _IngredienteService: IngredienteService,
              private _UnidadService: UnidadService) {
  }

  origenElegido = null;
  ingredienteElegido = {
    Ingrediente: null,
    Cantidad: null,
    Unidad: null
  };
  listIngredientes = [];
  enableMostrar = true;
  enableMostrarUnidades = true;
  Unidades = [];

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public cargarIngredientes() {
    this.listIngredientes = [];
    this.enableMostrar = true;
    this._IngredienteService.getIngredientesByOrigen(this.origenElegido).subscribe((res: Ingrediente[]) => {
      this.listIngredientes = res;
      this.listIngredientes.forEach(x => {
        x.Nombre = PonerMayuscula(x.Nombre);
        this.options.push(x.Nombre);
      });
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      this.enableMostrar = false;
    });
  }

  confirmar() {
    this.dialogRef.close(this.ingredienteElegido);
  }

  cancelar() {
    this.dialogRef.close(undefined);
  }

  cargarUnidades() {
    this.ingredienteElegido.Ingrediente = this.listIngredientes.find(x => x.Nombre === this.myControl.value);
    this.enableMostrarUnidades = true;
    this.Unidades = [];
    this.Unidades.push(this.ingredienteElegido.Ingrediente.UnidadPorcion);
    this._UnidadService.getUnidad(this.ingredienteElegido.Ingrediente).subscribe((res: Unidad) => {
      if (res) {
        res.OtrasUnidades.forEach(x => {
          this.Unidades.push(x.Unidad);
        });
      }
      this.enableMostrarUnidades = false;
    });

  }
}
