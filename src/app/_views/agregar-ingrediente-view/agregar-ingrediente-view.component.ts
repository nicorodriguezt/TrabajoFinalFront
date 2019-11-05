import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {IngredienteService} from '../../_services/ingrediente.service';
import {MatSnackBar} from '@angular/material';
import {UnidadBasica} from '../../_models/UnidadBasica';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UnidadService} from '../../_services/unidad.service';
import {Unidad} from '../../_models/Unidad';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-agregar-ingrediente-view',
  templateUrl: './agregar-ingrediente-view.component.html',
  styleUrls: ['./agregar-ingrediente-view.component.css'],
  providers: [IngredienteService]
})
export class AgregarIngredienteViewComponent implements OnInit {
  @ViewChild('UnidadBasicaInput') UnidadBasicaInput: MatSelect;

  public Unidades = new UnidadBasica();
  public EnumOrigenes = ['Aceites, cuerpos grasos y aderezos', 'Aguas, bebidas e infusiones', 'Azúcares, edulcorantes, dulces y golosinas',
    'Caldos y sopas', 'Carnes, pescados y mariscos', 'Cereales para desayuno y barras de cereal',
    'Cereales, pastas y legumbres', 'Comida lista para consumir / Comida rápida', 'Condimento', 'Frutas', 'Frutas secas y semillas',
    'Hortalizas, algas y hongos', 'Huevos', 'Leches', 'Pan, galletitas y pastelería', 'Postres y helados',
    'Productos de copetín y encurtidos', 'Quesos', 'Salsas', 'Yogures'];
  public Datos = {
    Ingrediente: null,
    Origen: null,
    Porcion: null,
    Unidad: null,
    UnidadMacro: 'Gramos',
    UnidadMicro: 'MiliGramos',
    Calcio: null,
    Hierro: null,
    Proteina: null,
    Hidrato: null,
    GrasaSaturada: null,
    GrasaOtra: null,
    Fibra: null,
    Calorias: null,
    Categoria: null
  };
  _hasCategoria = false;

  constructor(private _IngredienteService: IngredienteService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  agregar() {
    this._IngredienteService.add(this.Datos).subscribe(x => {
      this.Datos.Categoria = null;
      this._hasCategoria = false;
      this.Datos.Ingrediente = null;
      this.Datos.Origen = null;
      this.Datos.Porcion = null;
      this.Datos.Unidad = null;
      this.Datos.Calcio = null;
      this.Datos.Hierro = null;
      this.Datos.Proteina = null;
      this.Datos.Hidrato = null;
      this.Datos.GrasaSaturada = null;
      this.Datos.GrasaOtra = null;
      this.Datos.Fibra = null;
      this.Datos.Calorias = null;
      this.openSnackBar('Cargado con exito', 'Descartar');
    });
  }

  addCategoria() {
    if (this.UnidadBasicaInput.ngControl.valid) {
      const dialogRef = this.dialog.open(AgregarIngredienteCategoriaComponent, {
        data: this.Datos.Unidad
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res != undefined) {
          this.Datos.Categoria = res;
          this._hasCategoria = true;
        }
      });
    } else {
      this.UnidadBasicaInput.ngControl.control.markAsTouched();
    }
  }

  removeCategoria() {
    this._hasCategoria = false;
    this.Datos.Categoria = null;
  }
}

@Component({
  selector: 'app-agregar-ingrediente-categoria-view',
  templateUrl: './agregar-ingrediente-categoria-view.component.html',
  styleUrls: ['./agregar-ingrediente-view.component.css'],
  providers: [UnidadService]
})
export class AgregarIngredienteCategoriaComponent implements OnInit {
  listUnidades: Unidad[] = [];
  unidadElegida: Unidad;
  _enableMostrar = false;
  _cargando = true;

  constructor(private _UnidadService: UnidadService,
              public dialogRef: MatDialogRef<AgregarIngredienteCategoriaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: String) {
  }

  ngOnInit() {
    this._UnidadService.getUnidades().subscribe((res: Unidad[]) => {
      res.forEach(x => {
        if (x.UnidadBasica === this.data) {
          this.listUnidades.push(x);
        }
      });
      this._cargando = false;
    });
  }

  confirmar() {
    this.dialogRef.close(this.unidadElegida);
  }

  showList() {
    this._enableMostrar = true;
  }
}
