import {RecetaSugerida} from './RecetaSugerida';

export class Menu {
  constructor(
    public _id: string,
    public FechaLetra: string,
    public Fecha: Date,
    public Recetas: RecetaSugerida[]

  ) {}
}
