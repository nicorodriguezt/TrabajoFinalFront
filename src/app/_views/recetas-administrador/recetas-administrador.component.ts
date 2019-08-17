import {Component, OnInit} from '@angular/core';
import {Receta} from '../../_models/Receta';
import {RecetaService} from '../../_services/receta.service';

@Component({
  selector: 'app-recetas-administrador',
  templateUrl: './recetas-administrador.component.html',
  styleUrls: ['./recetas-administrador.component.css'],
  providers: [RecetaService]
})
export class RecetasAdministradorComponent implements OnInit {

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
    this._RecetaElegida = new Receta('', '', '', [], null, [], '', [], '', null, null, null, null, null, null, null, null);
    this._enableCargar = true;
  }

  evaluarReceta(receta) {
    this._RecetasService.verInformacionReceta(receta).subscribe((res: Receta) => {
      this._RecetaElegida = res;
      this._enableCargar = true;
    });
  }

}
