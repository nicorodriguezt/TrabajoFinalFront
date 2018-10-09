import {Component, Input, Output, EventEmitter} from '@angular/core';
import {RecetaService} from '../../_services/receta.service';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-buscar-recetas',
  templateUrl: './buscar-recetas.component.html',
  styleUrls: ['./buscar-recetas.component.css'],
  providers: [RecetaService]
})
export class BuscarRecetasComponent {
  @Input() public RecetaBuscada: Receta;
  @Output() sendReceta: EventEmitter<any> = new EventEmitter();
  public results = [];
  skip = 0;
  limit = 6;
  pagina = 0;
  controlPaginas;

  constructor(
    private _RecetaService: RecetaService
  ) {
  }

  public buscar() {
    this.results = [];
    if (this.RecetaBuscada.Nombre !== '') {
      this._RecetaService.buscar(this.RecetaBuscada, this.skip, this.limit).subscribe(response => {
        const aux = (Object.values(response));
        if (aux.length !== 0) {
          this.controlPaginas = aux.length;
          this.pagina++;
          for (let i = 0; i < aux.length; i++) {
            if (i < 5) {
              aux[i].Nombre = aux[i].Nombre[0].toUpperCase() + aux[i].Nombre.substr(1).toLowerCase();
              this.results.push(aux[i]);
            }
          }
        }
      });
    }
  }

  public forward() {
    this.skip += 5;
    this.limit += 5;
    this.buscar();
  }

  public backward() {
    this.skip -= 5;
    this.limit -= 5;
    this.pagina--;
    this.pagina--;
    this.buscar();
  }

  TextoBuscadoReset() {
    this.pagina = 0;
    this.skip = 0;
    this.limit = 6;
    this.results = [];
  }

  verMas(recetaElegida) {
    this.sendReceta.emit(recetaElegida);
  }


}
