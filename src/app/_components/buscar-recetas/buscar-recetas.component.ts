import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { RecetaService} from '../../_services/receta.service';
import { Receta} from '../../_models/Receta';

@Component({
  selector: 'app-buscar-recetas',
  templateUrl: './buscar-recetas.component.html',
  styleUrls: ['./buscar-recetas.component.css'],
  providers: [RecetaService]
})
export class BuscarRecetasComponent implements OnInit {
  @Input() public RecetaBuscada: Receta;
  @Output()  sendReceta: EventEmitter<any> = new EventEmitter();
  public results = [];

  constructor(
    private _RecetaService: RecetaService
  ) { }

  public buscar() {
    this.results = [];
    if (this.RecetaBuscada.Nombre !== '') {
      this._RecetaService.buscar(this.RecetaBuscada).subscribe(response => {
        const aux = (Object.values(response));
        aux.forEach(value => {
          this.results.push(value);
        });
      });
    }
  }

  verMas(recetaElegida) {
    this.sendReceta.emit(recetaElegida);
  }

  ngOnInit() {
  }

}
