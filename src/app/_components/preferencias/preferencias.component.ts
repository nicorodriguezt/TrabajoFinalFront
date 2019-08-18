import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {DatosUsuario} from '../../_models/DatosUsuario';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar} from '@angular/material';
import {DietasEspecialesService} from '../../_services/dietasEspeciales.service';
import {DietaEspecial} from '../../_models/DietaEspecial';
import {IngredienteService} from '../../_services/ingrediente.service';
import {Ingrediente} from '../../_models/Ingrediente';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {
  @Input() DatosUsuario: DatosUsuario;
  @Output() returnEvent: EventEmitter<any> = new EventEmitter();

  panelOpenState = false;
  change = false;

  constructor(private _DatosUsuarioService: DatosUsuarioService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public addDieta() {
      const dialogRef = this.dialog.open(DietasEspecialesComponent, {
        width: '90%'
      });

    dialogRef.afterClosed().subscribe( res => {
      if (res !== undefined && res._id !== null) {
        const exist = this.DatosUsuario.DietasEspeciales.find(de => de._id === res._id);
        if (!exist) {
          this._DatosUsuarioService.addDieta(res).subscribe( res2 => {
            this.DatosUsuario.DietasEspeciales.push(res);
            this.change = true;
            this.openSnackBar('Cargado con exito', 'Descartar');
        });
      }
      }
    });
  }

  public addPreferencia() {
    const dialogRef = this.dialog.open(IngredientePreferenciaComponent, {
      width: '90%'
    });

    dialogRef.afterClosed().subscribe( res => {
      if (res !== undefined && res._id !== null) {
        const exist = this.DatosUsuario.Preferencias.find(ing => ing._id === res._id);
        if (!exist) {
          this._DatosUsuarioService.addPreferencia(res).subscribe(res2 => {
            this.DatosUsuario.Preferencias.push(res);
            this.change = true;
            this.openSnackBar('Cargado con exito', 'Descartar');
          });
        }
      }
    });
  }

  public eliminarDieta(dieta) {
    this._DatosUsuarioService.removeDieta(dieta).subscribe( res => {
      const index = this.DatosUsuario.DietasEspeciales.indexOf(dieta);
      this.DatosUsuario.DietasEspeciales.splice(index, 1);
      this.change = true;
      this.openSnackBar('Eliminado con exito', 'Descartar');
    });
  }

  public eliminarPreferencia(ingrediente) {
    this._DatosUsuarioService.removePreferencia(ingrediente).subscribe( res => {
      const index = this.DatosUsuario.Preferencias.indexOf(ingrediente);
      this.DatosUsuario.Preferencias.splice(index, 1);
      this.change = true;
      this.openSnackBar('Eliminado con exito', 'Descartar');
    });
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public volver() {
    this.returnEvent.emit({change: this.change, disable: false});
  }
}


@Component({
  selector: 'app-dietas-especiales-dialog',
  templateUrl: './dietas-especiales-dialog.component.html',
  providers: [ DietasEspecialesService]
})
export class DietasEspecialesComponent implements OnInit {
  ListDietas;
  enableMostrar = false;
  DietaElegida = new DietaEspecial(null, null, null, null);

  constructor(
    private _DietasEspecialesService: DietasEspecialesService,
    public dialogRef: MatDialogRef<DietasEspecialesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this._DietasEspecialesService.getDietas().subscribe((res: DietaEspecial[]) => {
      this.ListDietas = res;
      this.enableMostrar = true;
    });
  }

  public agregar() {
    this.dialogRef.close(this.DietaElegida);
  }
}

@Component({
  selector: 'app-ingredientes-preferencia-dialog',
  templateUrl: './ingrediente-preferencia-dialog.component.html',
  providers: [ IngredienteService]
})
export class IngredientePreferenciaComponent implements OnInit {
  ListIngredientes;
  ListOrigenes;
  OrigenElegido;
  enableMostrar = false;
  ingredientesOrigen = true;
  IngredienteElegido = new Ingrediente(null, null, null, null);

  constructor(
    private _IngredienteService: IngredienteService,
    public dialogRef: MatDialogRef<IngredientePreferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this._IngredienteService.getOrigenes().subscribe((res: string[]) => {
      this.ListOrigenes = res;
      this.enableMostrar = true;
    });
  }

  public agregar() {
    this.dialogRef.close(this.IngredienteElegido);
  }

  cargarIngredientes() {
    this.ListIngredientes = [];
    this.ingredientesOrigen = true;
    this._IngredienteService.getIngredientesByOrigen(this.OrigenElegido).subscribe((res: Ingrediente[]) => {
      this.ListIngredientes = res;
      this.ingredientesOrigen = false;
    });
  }
}
