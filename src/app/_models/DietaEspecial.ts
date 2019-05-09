import {Ingrediente} from './Ingrediente';

export class DietaEspecial {
  constructor(
    public _id: string,
    public Nombre: string,
    public Ingredientes: Ingrediente[],
    public Descripcion: string) {
  }
}
