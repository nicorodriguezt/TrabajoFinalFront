import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../_services/menu.service';
import {Menu} from '../../_models/Menu';
import * as moment from 'moment-timezone';
import {PonerMayuscula} from '../../_services/funciones-commun.service';
import {RecetaService} from '../../_services/receta.service';
import {NguCarouselConfig} from '@ngu/carousel';

@Component({
  selector: 'app-pantalla-principal-view',
  templateUrl: './pantalla-principal-view.component.html',
  styleUrls: ['./pantalla-principal-view.component.scss'],
  providers: [MenuService, RecetaService]
})
export class PantallaPrincipalViewComponent implements OnInit {

  enableCargando; auxiliar;
  Menu = new Menu('', '', null, null);
  ProximaComida;
  recetasNuevas = [];
  recetasValoradas = [];
  verReceta; RecetaElegida;

  public carouselTileConfig: NguCarouselConfig = {
    grid: {xs: 2, sm: 2, md: 3, lg: 5, all: 0},
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: false,
    animation: 'lazy'
  };

  test = {
    Nombre: 'mata'
  }

  constructor(private _MenuService: MenuService,
              private _RecetaService: RecetaService) { }

  ngOnInit() {
    this.verReceta = false;
    this.enableCargando = true;
    this._MenuService.infoMenuHoy().subscribe(res => {
      this.auxiliar = res;
      this.Menu = this.auxiliar;
      this.getproximaComida();
      this.enableCargando = false;
    });
    this._RecetaService.recetasMejorPuntuadas().subscribe(res => {
      this.auxiliar = res;
      this.auxiliar.forEach(x => {
        x.Nombre = PonerMayuscula(x.Nombre);
        this.recetasValoradas.push(x);
      });
    });
    this._RecetaService.recetasNuevas().subscribe(res => {
      this.auxiliar = res;
      this.auxiliar.forEach(x => {
        x.Nombre = PonerMayuscula(x.Nombre);
        this.recetasNuevas.push(x);
      });
    });
  }

  getproximaComida() {
    const horaActual = Number(moment().format('kkmm'));
    if (horaActual >= 0 && horaActual < 1000) {
      this.ProximaComida = this.Menu.Recetas.find(x => x.MomentoDelDia.Nombre === 'Desayuno');
    } else {
      if (horaActual >= 1200 && horaActual < 1500) {
        this.ProximaComida = this.Menu.Recetas.find(x => x.MomentoDelDia.Nombre === 'Almuerzo');
      } else {
        if (horaActual >= 1500 && horaActual < 1900) {
          this.ProximaComida = this.Menu.Recetas.find(x => x.MomentoDelDia.Nombre === 'Merienda');
        } else {
          this.ProximaComida = this.Menu.Recetas.find(x => x.MomentoDelDia.Nombre === 'Cena');
        }
      }
    }
    this.ProximaComida.Receta.Nombre = PonerMayuscula(this.ProximaComida.Receta.Nombre);
  }

  verRecetaView(item) {
    this.RecetaElegida = item;
    this.verReceta = true;
  }
}
