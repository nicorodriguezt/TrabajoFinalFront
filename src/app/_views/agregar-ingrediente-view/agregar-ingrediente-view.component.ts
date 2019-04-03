import {Component, OnInit} from '@angular/core';
import {IngredienteService} from '../../_services/ingrediente.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-agregar-ingrediente-view',
  templateUrl: './agregar-ingrediente-view.component.html',
  styleUrls: ['./agregar-ingrediente-view.component.css'],
  providers: [IngredienteService]
})
export class AgregarIngredienteViewComponent implements OnInit {

  public Unidades = ['Gramos'];
  public Datos = {
    Ingrediente: null,
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
    Calorias: null
  };

  constructor(private _IngredienteService: IngredienteService,
              private snackBar: MatSnackBar) {
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
      this.Datos.Ingrediente = null;
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

}
