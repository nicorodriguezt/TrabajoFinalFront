import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecetaService} from '../../_services/receta.service';
import {Receta} from '../../_models/Receta';
import {MomentoDelDia} from '../../_models/MomentoDelDia';
import {PonerMayuscula} from '../../_services/funciones-commun.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {CargarRecetaNuevaIngrerdienteComponent} from '../cargar-receta-nueva/cargar-receta-nueva.component';
import {IngredienteService} from '../../_services/ingrediente.service';
import {Ingrediente} from '../../_models/Ingrediente';
import {IngredienteXReceta} from '../../_models/IngredienteXReceta';

@Component({
  selector: 'app-cargar-receta-completa',
  templateUrl: './cargar-receta-completa.component.html',
  styleUrls: ['./cargar-receta-completa.component.css'],
  providers: [RecetaService, IngredienteService]
})
export class CargarRecetaCompletaComponent implements OnInit {
  @Input() Receta: Receta;
  @Output() finalizarCarga: EventEmitter<boolean> = new EventEmitter();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  _pasosForm: FormGroup;

  _Momentos = [];
  _Cargando = true;
  panelOpenState = false;
  _ListIngredientes = [];

  constructor(public dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private _RecetaService: RecetaService,
              private _IngredienteService: IngredienteService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      Porciones: ['', Validators.required]
    });

    this._pasosForm = this._formBuilder.group({
      pasos: this._formBuilder.array([this.addPasosGroup()])
    });
    this.ConfigFormsName();

    this._RecetaService.getMomentos().subscribe((res: MomentoDelDia[]) => {
      this._Momentos = res;
      this._Cargando = false;
    });

  }

  ConfigFormsName() {
    if (this.Receta.Estado === 'comida') {
      this.Receta.Descripcion = '';
      this.Receta.Porciones = null;
      this.Receta.IngredientePrincipal = null;
    }
    this.firstFormGroup.setValue({
      Nombre: this.Receta.Nombre,
      Descripcion: this.Receta.Descripcion
    });
    this.secondFormGroup.setValue({
      Porciones: this.Receta.Porciones
    });

    this.Receta.Ingredientes.forEach(x => {
      x.Ingrediente.Nombre = PonerMayuscula(x.Ingrediente.Nombre);
    });
  }

  addPasosGroup() {
    return this._formBuilder.group({
      valor: ['', Validators.required]
    });
  }

  addPaso() {
    this.pasosArray.push(this.addPasosGroup());
  }

  get pasosArray() {
    return <FormArray>this._pasosForm.get('pasos');
  }

  get CtrlNombre() {
    return this.firstFormGroup.get('Nombre').value;
  }
  get CtrlDescripcion() {
    return this.firstFormGroup.get('Descripcion').value;
  }
  get CtrlPorciones() {
    return this.secondFormGroup.get('Porciones').value;
  }

  removePaso(index) {
    this.pasosArray.removeAt(index);
  }

  nuevoIngrediente() {
    if (this._ListIngredientes.length === 0) {
      this._IngredienteService.getIngredientes().subscribe((res: Ingrediente[]) => {
        this._ListIngredientes = res;
        this._ListIngredientes.forEach(x => {
          x.NombreMostrar = PonerMayuscula(x.Nombre);
        });
        this.openDialog();
      });
    } else {
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CargarRecetaNuevaIngrerdienteComponent, {
      maxWidth: '70%',
      data: this._ListIngredientes
    });

    dialogRef.afterClosed().subscribe(x => {
      if (x !== undefined) {
        if (this.Receta.Ingredientes.find(ingre => ingre.Ingrediente.Nombre === x.Ingrediente.NombreMostrar)) {
          this.Receta.Ingredientes.forEach(item => {
            if (item.Ingrediente._id === x.Ingrediente._id && item.Unidad === item.Unidad) {
              item.Cantidad += x.Cantidad;
            }
          });
        } else {
          this.Receta.Ingredientes.push(x);
        }
        this.Receta.Ingredientes.forEach(y => {
          y.Ingrediente.Nombre = PonerMayuscula(y.Ingrediente.Nombre);
        });
      }
    });
  }

  removeIngrediente() {
    if (this.Receta.Ingredientes.length > 0) {
      this.Receta.Ingredientes.pop();
    }
  }

  finalizar() {
    this.Receta.Nombre = this.CtrlNombre;
    this.Receta.Descripcion = this.CtrlDescripcion;
    this.Receta.Porciones = this.CtrlPorciones;
    this.Receta.Pasos = [null];
    this.Receta.Pasos.pop();
    for (let v of this.pasosArray.value) {
      this.Receta.Pasos.push(v.valor);
      v++;
    }
    console.log(this.Receta);
  }

  cancelar() {
    this.finalizarCarga.emit(false);
  }

  cambiarMomentoDia(momento) {
    if (this.Receta.MomentoDelDia.find(x => x.Nombre === momento.Nombre)) {
      const indice = this.Receta.MomentoDelDia.indexOf(momento);
      this.Receta.MomentoDelDia.splice(indice, 1);
    } else {
      this.Receta.MomentoDelDia.push(momento);
    }
  }

  checkMomento(momento) {
    return !!this.Receta.MomentoDelDia.find(x => x.Nombre === momento.Nombre);
  }

  cambiarIngredientePrincipal(ingrediente) {
    this.Receta.IngredientePrincipal = ingrediente;
  }

  checkIngredientePrincipal(ingrediente) {
    return !!this.Receta.IngredientePrincipal === ingrediente;
  }

}

@Component({
  selector: 'app-cargar-receta-completa-ingrediente',
  templateUrl: './cargar-receta-completa-ingrediente.component.html',
  styleUrls: ['./cargar-receta-completa.component.css']
})
export class CargarRecetaCompletaIngrerdienteComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CargarRecetaCompletaIngrerdienteComponent>) {
  }

  ingredienteElegido: IngredienteXReceta;
  Unidades = ['Gramos'];

  confirmar() {
    this.dialogRef.close(this.ingredienteElegido);
  }

  cancelar() {
    this.dialogRef.close(undefined);
  }

}
