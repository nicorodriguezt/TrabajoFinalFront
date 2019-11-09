import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecetaService} from '../../_services/receta.service';
import {Receta} from '../../_models/Receta';
import {MomentoDelDia} from '../../_models/MomentoDelDia';
import {PonerMayuscula} from '../../_services/funciones-commun.service';
import {MatDialog} from '@angular/material';
import {CargarRecetaNuevaIngrerdienteComponent} from '../cargar-receta-nueva/cargar-receta-nueva.component';
import {IngredienteService} from '../../_services/ingrediente.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-cargar-receta-completa',
  templateUrl: './cargar-receta-completa.component.html',
  styleUrls: ['./cargar-receta-completa.component.css'],
  providers: [RecetaService, IngredienteService]
})
export class CargarRecetaCompletaComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() Receta: Receta;
  @Output() finalizarCarga: EventEmitter<boolean> = new EventEmitter();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  _pasosForm: FormGroup;

  _Momentos = [];
  _Cargando = true;
  panelOpenState = false;
  _ListOrigenes = [];
  _IngredientesOriginales = null;
  _Rol = localStorage.getItem('Rol');
  _imageFile: any = null;
  _cargandoImagen = false;
  private _imageName: string;
  errorMensaje: string = null;

  constructor(public dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private _RecetaService: RecetaService,
              private _IngredienteService: IngredienteService) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Imagen: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      Porciones: ['', Validators.required]
    });

    this._pasosForm = this._formBuilder.group({
      pasos: this._formBuilder.array([])
    });
    this.ConfigFormsName();

    this._IngredienteService.getOrigenes().subscribe((res: string[]) => {
      localStorage['Origenes'] = JSON.stringify(res);
      this._ListOrigenes = res;
    });

    this._RecetaService.getMomentos().subscribe((res: MomentoDelDia[]) => {
      this._Momentos = res;
      this._Cargando = false;
    });

  }

  ConfigFormsName() {
    if (this.Receta.Estado === 'comida') {
      this.Receta.Descripcion = '';
      this.Receta.IngredientePrincipal = null;
    }
    this.firstFormGroup.setValue({
      Nombre: this.Receta.Nombre,
      Descripcion: this.Receta.Descripcion,
      Imagen: this.Receta.Imagen || null
    });
    this.secondFormGroup.setValue({
      Porciones: this.Receta.Porciones
    });

    this.Receta.Ingredientes.forEach(x => {
      x.Ingrediente.Nombre = PonerMayuscula(x.Ingrediente.Nombre);
    });

    if (this.Receta.Pasos.length !== 0) {
      this.Receta.Pasos.forEach(x => {
        this.addPaso(x);
      });
    } else {
      this.addPasosGroup('');
    }
    this._IngredientesOriginales = JSON.parse(JSON.stringify(this.Receta.Ingredientes));
  }

  addPasosGroup(paso) {
    return this._formBuilder.group({
      valor: [paso, Validators.required]
    });
  }

  addPaso(paso) {
    this.pasosArray.push(this.addPasosGroup(paso));
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

  get CtrlImagen() {
    return this.firstFormGroup.get('Imagen').value;
  }

  get CtrlPorciones() {
    return this.secondFormGroup.get('Porciones').value;
  }

  removePaso(index) {
    this.pasosArray.removeAt(index);
  }

  nuevoIngrediente() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CargarRecetaNuevaIngrerdienteComponent, {
      width: '90%',
      data: this._ListOrigenes
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

  finalizar(estado) {
    const RecetaEnviar = JSON.parse(JSON.stringify(this.Receta));
    delete RecetaEnviar.FechaCreacion;
    delete RecetaEnviar.Calorias;
    delete RecetaEnviar.UsuarioCreo;
    delete RecetaEnviar.UsuariosFavorito;
    delete RecetaEnviar.Valores;
    delete RecetaEnviar.NombreMostrar;

    if (JSON.stringify(this.Receta.Ingredientes) === JSON.stringify(this._IngredientesOriginales)) {
      delete RecetaEnviar.Ingredientes;
    }
    if (this.firstFormGroup.touched) {
      RecetaEnviar.Nombre = this.CtrlNombre;
      RecetaEnviar.Descripcion = this.CtrlDescripcion;
      RecetaEnviar.Imagen = this.CtrlImagen;
    } else {
      delete RecetaEnviar.Nombre;
      delete RecetaEnviar.Descripcion;
    }

    if (this.secondFormGroup.touched) {
      RecetaEnviar.Porciones = this.CtrlPorciones;
    } else {
      delete RecetaEnviar.Porciones;
    }

    if (this._pasosForm.touched) {
      RecetaEnviar.Pasos = [null];
      RecetaEnviar.Pasos.pop();
      for (let v of this.pasosArray.value) {
        RecetaEnviar.Pasos.push(v.valor);
        v++;
      }
    } else {
      delete RecetaEnviar.Pasos;
    }
    RecetaEnviar.Estado = estado;
    RecetaEnviar.Imagen = this._imageFile;
    RecetaEnviar.IngredientePrincipal = this.Receta.IngredientePrincipal;

    this.blockUI.start();
    if (RecetaEnviar._id === '') {
      this._RecetaService.addReceta(RecetaEnviar).subscribe(x => {
        this.blockUI.stop();
        this.finalizarCarga.emit(RecetaEnviar);
      });
    } else {
      this._RecetaService.actualizarReceta(RecetaEnviar).subscribe(x => {
        this.blockUI.stop();
        this.finalizarCarga.emit(RecetaEnviar);
      });
    }

  }

  cancelar(volver: boolean) {
    if(!volver) {
      if (this.errorMensaje == null && this._imageFile != undefined) {
        this._RecetaService.deleteImage(this._imageName).subscribe();
      }
      this.finalizarCarga.emit(false);
    }
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
    return this.Receta.IngredientePrincipal === ingrediente._id;

  }

  checkFormValid() {
    return !this.firstFormGroup.valid
      || !this.secondFormGroup.valid
      || !this.pasosArray.valid
      || this.pasosArray.length === 0
      || this.Receta.MomentoDelDia.length === 0
      || this.Receta.Ingredientes.length === 0
      || this.Receta.IngredientePrincipal == null
      || (this._imageFile == null && this.Receta.Imagen == null);
  }

  processImage(imageInput: any) {
    this._cargandoImagen = true;
    this._RecetaService.addImagen(imageInput.files[0]).subscribe(x => {
      this._imageFile = x;
      this._imageName = this._imageFile.replace('https://storage.googleapis.com/imagenes-trabajo-final/', '');
    }, error1 => {
      this.errorMensaje = 'Por favor, intente mas tarde';
    });
  }
}
