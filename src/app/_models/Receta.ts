import {IngredienteXReceta} from './IngredienteXReceta';
import {MomentoDelDia} from './MomentoDelDia';

export class Receta {
  constructor(
    public _id: string,
    public Nombre: string,
    public Descripcion: string,
    public Pasos: string,
    public MomentoDelDia: [MomentoDelDia],
    public IngredientePrincipal: string,
    public Ingredientes: [IngredienteXReceta],
    public TipoComida: string,
    public Multiplicable: boolean,
    public Puntaje: number,
    public Porciones: number,
    public Calorias: number
  ) {
  }
}
