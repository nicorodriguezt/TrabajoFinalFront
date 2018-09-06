export class Receta {
  constructor(
    public Nombre: string,
    public Pasos: string,
    public MomentoDelDia: [string],
    public IngredientePrincipal: string,
    public Ingredientes: [string],
    public TipoComida: string,
    public Multiplicable: boolean,
    public Porciones: number,
    public Calorias: number
  ) {
  }
}
