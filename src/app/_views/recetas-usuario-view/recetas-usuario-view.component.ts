import {Component, OnInit} from '@angular/core';
import {RecetaService} from '../../_services/receta.service';
import {Receta} from '../../_models/Receta';
import {PonerMayuscula} from '../../_services/funciones-commun.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-recetas-usuario-view',
  templateUrl: './recetas-usuario-view.component.html',
  styleUrls: ['./recetas-usuario-view.component.css'],
  providers: [RecetaService]

})
export class RecetasUsuarioViewComponent implements OnInit {

  _enableMostrar = false;
  _cargando = true;
  _ListRecetas = {
    Comidas: [],
    Pendientes: [],
    Revisadas: []
  };
  panelOpenState = true;
  _RecetaCargar: Receta;

  constructor(private _RecetaService: RecetaService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this._ListRecetas = {
      Comidas: [],
      Pendientes: [],
      Revisadas: []
    };
    this._RecetaService.recetasCreadasUsuario().subscribe((res: Receta[]) => {
      res.forEach(x => {
        switch (x.Estado) {
          case 'comida': {
            this._ListRecetas.Comidas.push(x);
            break;
          }
          case 'pendiente': {
            this._ListRecetas.Pendientes.push(x);
            break;
          }
          default: {
            this._ListRecetas.Revisadas.push(x);
            break;
          }
        }
      });
      this._ListRecetas.Comidas.forEach(x => {
        x.NombreMostrar = PonerMayuscula(x.Nombre);
      });
      this._ListRecetas.Revisadas.forEach(x => {
        x.NombreMostrar = PonerMayuscula(x.Nombre);
        x.Estado = PonerMayuscula(x.Estado);
      });
      this._ListRecetas.Pendientes.forEach(x => {
        x.NombreMostrar = PonerMayuscula(x.Nombre);
      });
      this._cargando = false;
    });
  }

  colorEstado(e) {
    if (e === 'aprobada') {
      return 'green';
    } else {
      return 'red';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cargarReceta(receta) {
    this._RecetaCargar = receta;
    this._enableMostrar = true;
  }

  nuevaReceta() {
    this._RecetaCargar = new Receta('', '', '', [], null, [], '',
      [], '', null, null, null, null, null, null, null);
    this._enableMostrar = true;
  }

  evento($event: boolean) {
    if ($event === true) {
      this.openSnackBar('Su receta fue enviada a evaluar', 'Descartar');
      this.ngOnInit();
    }
    return false;
  }
}
