import {IngredienteXReceta} from './IngredienteXReceta';
import {MomentoDelDia} from './MomentoDelDia';
import {Ingrediente} from './Ingrediente';

export class Receta {
  constructor(
    public _id: string,
    public Nombre: string,
    public Descripcion: string,
    public Pasos: string[],
    public Favorito: boolean,
    public MomentoDelDia: MomentoDelDia[],
    public IngredientePrincipal: Ingrediente,
    public Ingredientes: IngredienteXReceta[],
    public TipoComida: string,
    public Multiplicable: boolean,
    public Puntaje: number,
    public Porciones: number,
    public Calorias: number,
    public UsuarioCreo: string,
    public Estado: string,
    public Comentarios: [{ Usuario; Nombre; Texto; Fecha }],
    public Imagen: File
  ) {
  }
}
