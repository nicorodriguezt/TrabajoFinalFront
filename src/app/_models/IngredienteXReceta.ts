import {Ingrediente} from './Ingrediente';

export class IngredienteXReceta {
  constructor(
    public _id: string,
    public Ingrediente: Ingrediente,
    public Cantidad: string,
    public Unidad: number
  ) {
  }
}
