import {Ingrediente} from './Ingrediente';
import {DietaEspecial} from './DietaEspecial';

export class DatosUsuario {
  constructor(
    public PesoAprox: number,
    public Altura: number,
    public Edad: number,
    public Sexo: string,
    public IMC: string,
    public PesoTeorico: number,
    public Usuario: string,
    public ActividadLaboral: string,
    public Preferencias: Ingrediente[],
    public DietasEspeciales: DietaEspecial[]
  ) {
  }
}
