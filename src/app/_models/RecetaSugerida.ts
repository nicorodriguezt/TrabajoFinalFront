import {Receta} from './Receta';
import {MomentoDelDia} from './MomentoDelDia';

export class RecetaSugerida {
  constructor(
    public MomentoDelDia: MomentoDelDia,
    public Calorias: number,
    public Receta: Receta,
    public Menu: string,
    public PorcionIngerida: number,
    public PorcionSugerida: number
  ) {}
}
