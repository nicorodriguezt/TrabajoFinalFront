import {RecetaSugerida} from './RecetaSugerida';

export class Menu {
  constructor(
    public FechaLetra: string,
    public Fecha: Date,
    public Recetas: [RecetaSugerida]

  ) {}
}
