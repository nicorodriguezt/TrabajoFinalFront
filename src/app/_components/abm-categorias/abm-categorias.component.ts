import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Unidad} from '../../_models/Unidad';
import {UnidadBasica} from '../../_models/UnidadBasica';
import {UnidadService} from '../../_services/unidad.service';
import {OtrasUnidades} from "../../_models/OtrasUnidades";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NgForm, NgModel} from "@angular/forms";
import {Ingrediente} from "../../_models/Ingrediente";
import {IngredienteService} from "../../_services/ingrediente.service";
import {PonerMayuscula} from "../../_services/funciones-commun.service";

@Component({
  selector: 'app-abm-categorias',
  templateUrl: './abm-categorias.component.html',
  styleUrls: ['./abm-categorias.component.css'],
  providers: [UnidadService, IngredienteService]
})
export class AbmCategoriasComponent implements OnInit {
  @Input() _Unidad: Unidad;
  @Output() finalizar: EventEmitter<Unidad> = new EventEmitter();
  @ViewChild("UnidadBasicaInput") UnidadBasicaInput: NgModel;
  @ViewChild("unidadInput") unidadInput: NgModel;
  @ViewChild("loginForm") loginForm: NgForm;

  _UnidadBasicas: UnidadBasica;
  panelOpenState = false;
  _listOrigenes = [];
  _cargarIngredientes = false;
  _actualOrigen = null;
  _cargando = false;
  private listOtrasUnidadesRemove: OtrasUnidades[] = [];
  private listIngredientesRemove: Ingrediente[] = [];

  constructor(private dialog: MatDialog,
              private _UnidadService: UnidadService,
              private _IngredienteService: IngredienteService) {
  }

  ngOnInit() {
    this._UnidadBasicas = new UnidadBasica();
    if (this._Unidad.Ingredientes.length > 0) {
      this._actualOrigen = this._Unidad.Ingredientes[0].Origen;
      this._Unidad.Ingredientes.forEach(x => {
        x.Nombre = PonerMayuscula(x.Nombre);
      })
    }
  }

  addNuevaCategoria() {
    if (this.loginForm.valid) {
      this._Unidad.Ingredientes.forEach(x => {
        x.Nombre = x.Nombre.toLowerCase();
      });
      this._UnidadService.createUnidad(this._Unidad).subscribe((res: Unidad) => {
        this.finalizar.emit(res);
      });
    } else {
      this.UnidadBasicaInput.control.markAsTouched();
      this.unidadInput.control.markAsTouched();
    }
  }

  volver() {
    this.finalizar.emit(null);
  }

  addNuevoFactor() {
    if (this.UnidadBasicaInput.valid) {
      const dialogRef = this.dialog.open(AbmCategoriasOtrasUnidadesComponent, {
        data: this._Unidad.UnidadBasica
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res != undefined)
          this._Unidad.OtrasUnidades.push(res);
      });
    } else {
      this.UnidadBasicaInput.control.markAsTouched();
    }
  }

  listOtrasUnidades(otraUnidad: OtrasUnidades) {
    if (this.listOtrasUnidadesRemove.find(x => x.Unidad === otraUnidad.Unidad)) {
      const indice = this.listOtrasUnidadesRemove.indexOf(otraUnidad);
      this.listOtrasUnidadesRemove.splice(indice, 1);
    } else {
      this.listOtrasUnidadesRemove.push(otraUnidad);
    }
  }

  removeFactor() {
    this.listOtrasUnidadesRemove.forEach(remove => {
      const indice = this._Unidad.OtrasUnidades.indexOf(remove);
      this._Unidad.OtrasUnidades.splice(indice, 1);
    })
  }

  addIngredientesButton() {
    if (this.UnidadBasicaInput.valid) {
      if (this._listOrigenes.length === 0) {
        this._cargando = true;
        this._IngredienteService.getOrigenes().subscribe((res: string[]) => {
          this._listOrigenes = res;
          this._cargando = false;
          this._cargarIngredientes = true;
        });
      } else
        this._cargarIngredientes = true;
    } else {
      this.UnidadBasicaInput.control.markAsTouched();
    }
  }

  removeIngredientes() {
    this.listIngredientesRemove.forEach(remove => {
      const indice = this._Unidad.Ingredientes.indexOf(remove);
      this._Unidad.Ingredientes.splice(indice, 1);
    })
  }

  listIngredientes(ingrediente: Ingrediente) {
    if (this.listIngredientesRemove.find(x => x.Nombre === ingrediente.Nombre)) {
      const indice = this.listIngredientesRemove.indexOf(ingrediente);
      this.listIngredientesRemove.splice(indice, 1);
    } else {
      this.listIngredientesRemove.push(ingrediente);
    }
  }

  addIngredientes($event: Ingrediente[]) {
    this._Unidad.Ingredientes = $event;
    this._cargarIngredientes = false;
  }
}

@Component({
  selector: 'app-abm-categorias-otras-unidades',
  templateUrl: './abm-categorias-otras-unidades.component.html'
})
export class AbmCategoriasOtrasUnidadesComponent implements OnInit {
  _OtraUnidad: OtrasUnidades = new OtrasUnidades('', '');

  constructor(
    public dialogRef: MatDialogRef<AbmCategoriasOtrasUnidadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  cancelar() {
    this.dialogRef.close(undefined);
  }

  ngOnInit(): void {
  }

  confirmar() {
    this.dialogRef.close(this._OtraUnidad);
  }
}

@Component({
  selector: 'app-abm-categorias-ingredientes',
  templateUrl: './abm-categorias-ingredientes.component.html',
  styleUrls: ['./abm-categorias.component.css'],
  providers: [IngredienteService]
})
export class AbmCategoriasIngredientesComponent implements OnInit {
  @Input() actualOrigen: string;
  @Input() actualUnidad: string;
  @Input() listOrigenes: string[];
  @Input() listIngredientesActual: Ingrediente[];
  @Output() finalizar: EventEmitter<Ingrediente[]> = new EventEmitter();
  _listIngredientes: Ingrediente[];
  _enableMostrar = false;

  constructor(private _IngredienteService: IngredienteService) {
  }

  ngOnInit(): void {
    if (this.actualOrigen) {
      this.cargarIngredientes();
    }
  }

  cargarIngredientes() {
    this._enableMostrar = false;
    this._IngredienteService.getIngredientesByOrigen(this.actualOrigen).subscribe((res: Ingrediente[]) => {
      this._listIngredientes = res;
      for(let i = 0; i < this._listIngredientes.length; i++) {
        if(this._listIngredientes[i].UnidadPorcion != this.actualUnidad) {
          this._listIngredientes.splice(i, 1);
        } else {
          this._listIngredientes[i].Nombre = PonerMayuscula(this._listIngredientes[i].Nombre);
        }
      }
      this._enableMostrar = true;
    });
  }

  listIngredientes(ingrediente: Ingrediente) {
    if (this.listIngredientesActual.find(x => x._id === ingrediente._id)) {
      const indice = this.listIngredientesActual.indexOf(ingrediente);
      this.listIngredientesActual.splice(indice, 1);
    } else {
      this.listIngredientesActual.push(ingrediente);
    }
  }

  existInList(ingrediente: Ingrediente) {
    return !!this.listIngredientesActual.find(x => x._id === ingrediente._id);
  }

  confirmar() {
    this.finalizar.emit(this.listIngredientesActual);
  }
}
