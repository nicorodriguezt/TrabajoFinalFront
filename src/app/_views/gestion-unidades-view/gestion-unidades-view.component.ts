import {Component, OnInit} from '@angular/core';
import {UnidadService} from '../../_services/unidad.service';
import {Unidad} from '../../_models/Unidad';

@Component({
  selector: 'app-gestion-unidades-view',
  templateUrl: './gestion-unidades-view.component.html',
  styleUrls: ['./gestion-unidades-view.component.css'],
  providers: [UnidadService]
})
export class GestionUnidadesViewComponent implements OnInit {
  public _unidades: Unidad[];
  public _cargardo: boolean;
  public _nueva: boolean;
  private _Unidad: Unidad;

  constructor(public _UnidadService: UnidadService) {
  }

  ngOnInit() {
    this._nueva = false;
    this._cargardo = true;
    this._UnidadService.getUnidades().subscribe((res: Unidad[]) => {
      this._unidades = res;
      this._cargardo = false;
    });
  }

  nuevaCategoria() {
    this._Unidad = new Unidad(null, [], null, []);
    this._nueva = true;
  }

  finalizar($event) {
    if ($event) {
      this.ngOnInit();
    }
    this._nueva = false;
  }

  editCategoria(unidad: Unidad) {
    this._Unidad = unidad;
    this._nueva = true;
  }
}
