import {Ingrediente} from './Ingrediente';
import {OtrasUnidades} from './OtrasUnidades';

export class Unidad {
  Categoria: string;
  Ingredientes: Ingrediente[];
  UnidadBasica: string;
  OtrasUnidades: OtrasUnidades[];

  constructor(categoria: string, Ingredientes: Ingrediente[], UnidadBasica: string, otrasunidades: OtrasUnidades[]) {
    this.Categoria = categoria;
    this.Ingredientes = Ingredientes;
    this.UnidadBasica = UnidadBasica;
    this.OtrasUnidades = otrasunidades;
  }

}
