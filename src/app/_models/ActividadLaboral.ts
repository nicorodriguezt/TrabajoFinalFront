export class ActividadLaboral {
  constructor(
    public id: string,
    public Categoria: string,
    public Consumo: number,
    public Detalles: [object]
  ) {}
}
