import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unidad} from '../../_models/Unidad';
import {UnidadBasica} from '../../_models/UnidadBasica';
import {UnidadService} from '../../_services/unidad.service';

@Component({
  selector: 'app-abm-categorias',
  templateUrl: './abm-categorias.component.html',
  styleUrls: ['./abm-categorias.component.css'],
  providers: [UnidadService]
})
export class AbmCategoriasComponent implements OnInit {
  @Input() _Unidad: Unidad;
  @Output() finalizar: EventEmitter<Unidad> = new EventEmitter();

  _UnidadBasicas: UnidadBasica;

  constructor(private _UnidadService: UnidadService) { }

  ngOnInit() {
    this._UnidadBasicas = new UnidadBasica();
  }

  addNuevaCategoria() {
    this._UnidadService.createUnidad(this._Unidad).subscribe((res: Unidad) => {
      this.finalizar.emit(res);
    });
  }

  volver() {
    this.finalizar.emit(null);
  }
}
