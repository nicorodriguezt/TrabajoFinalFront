import {Component, OnInit} from '@angular/core';
import {Receta} from '../../_models/Receta';
import {RecetaService} from '../../_services/receta.service';
import { PonerMayuscula} from '../../_services/funciones-commun.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-recetas-administrador',
  templateUrl: './recetas-administrador.component.html',
  styleUrls: ['./recetas-administrador.component.css'],
  providers: [RecetaService]
})
export class RecetasAdministradorComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  public _cargando = true;
  public _enableCargar = false;
  public _ListRecetas = new Array<Receta>();
  public _RecetaElegida;

  constructor(private _RecetasService: RecetaService) {
  }

  ngOnInit() {
    this._RecetasService.listarRecetasPendientesAdmin().subscribe((res: Receta[]) => {
      this._ListRecetas = res;
      this._cargando = false;
    });
  }

  nuevaReceta() {
    this._RecetaElegida = new Receta('', '', '', [], null, [], null, [], '', null, null, null, null, null, null, null, null);
    this._enableCargar = true;
  }

  evaluarReceta(receta) {
    this.blockUI.start();
    this._RecetasService.verInformacionReceta(receta).subscribe((res: Receta) => {
      this._RecetaElegida = res;
      this.blockUI.stop();
      this._enableCargar = true;
    });
  }

  PonerMayuscula(Nombre: string) {
    return PonerMayuscula(Nombre);
  }

  evaluacionFinish($event) {
    if ($event !== false) {
      const i = this._ListRecetas.findIndex( x => x._id === $event._id);
      this._ListRecetas.splice(i, 1);
    }
    this._enableCargar = false;
  }
}
