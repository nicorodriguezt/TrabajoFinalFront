import {Component, OnInit} from '@angular/core';
import {IngredienteService} from '../../_services/ingrediente.service';
import {MatSnackBar} from '@angular/material';
import {UnidadBasica} from "../../_models/UnidadBasica";

@Component({
  selector: 'app-agregar-ingrediente-view',
  templateUrl: './agregar-ingrediente-view.component.html',
  styleUrls: ['./agregar-ingrediente-view.component.css'],
  providers: [IngredienteService]
})
export class AgregarIngredienteViewComponent implements OnInit {

  public Unidades = new UnidadBasica();
  public EnumOrigenes = ['Aceites, cuerpos grasos y aderezos', 'Aguas, bebidas e infusiones', 'Azúcares, edulcorantes, dulces y golosinas',
    'Caldos y sopas', 'Carnes, pescados y mariscos', 'Cereales para desayuno y barras de cereal',
    'Cereales, pastas y legumbres', 'Comida lista para consumir / Comida rápida', 'Frutas', 'Frutas secas y semillas',
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

}
