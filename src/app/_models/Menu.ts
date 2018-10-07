import {RecetaSugerida} from './RecetaSugerida';

export class Menu {
  constructor(
    public Calorias: number,
    public Fecha: Date,
    public Recetas: [RecetaSugerida]

  ) {}
}
