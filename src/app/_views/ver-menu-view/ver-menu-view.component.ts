import {Component, OnInit, ViewChild} from '@angular/core';
import {NguCarouselConfig, NguCarousel} from '@ngu/carousel';
import * as moment from 'moment-timezone';
import {MenuService} from '../../_services/menu.service';
import {Menu} from '../../_models/Menu';
import {Receta} from '../../_models/Receta';


@Component({
  selector: 'app-ver-menu-view',
  templateUrl: './ver-menu-view.component.html',
  styleUrls: ['./ver-menu-view.component.css'],
  providers: [MenuService]
})
export class VerMenuViewComponent implements OnInit {
  RecetaElegida = new Receta(null, null, null, null, null, null, null, null, false, null, null, null);
  Menu = new Menu(null, null, null, null);
  auxiliar;
  verReceta: boolean;
  menuExist: boolean;
  mainSlide;
  @ViewChild('carousel') carousel: NguCarousel<any>;

  // Carousel Config
  public Menus = [];
  public carouselTileConfig: NguCarouselConfig = {
    grid: {xs: 1, sm: 1, md: 1, lg: 5, all: 0},
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: false,
    animation: 'lazy'
  };

  constructor(public _MenuService: MenuService) {
  }

  async verMenus() {
    await this.verMenuHoy();
    await this.verMenuCompleto();
    this.verMenuAnterio();
  }

  async verMenuHoy() {
    this.auxiliar = await this._MenuService.infoMenuHoy().toPromise();
    if (this.auxiliar != null) {
      this.mainSlide = 0;
      this.Menus.push(this.auxiliar);
      this.menuExist = true;
      this.Menu = this.auxiliar;
      this.Menu.Recetas.forEach(function (element) {
        element.Receta.Nombre = element.Receta.Nombre[0].toUpperCase() + element.Receta.Nombre.substr(1).toLowerCase();
      });
      this.setFecha(this.Menu);
    }
  }

  async verMenuCompleto() {
    const response = await this._MenuService.MenuCompleto().toPromise();
    const aux = (Object.values(response));
      for (let i = 0; i < aux.length; i++) {
        aux[i].Recetas.forEach(function (element) {
          element.Receta.Nombre = element.Receta.Nombre[0].toUpperCase() + element.Receta.Nombre.substr(1).toLowerCase();
        });
        this.setFecha(aux[i]);
        this.Menus.push(aux[i]);
      }
  }

  verMenuAnterio() {
    this._MenuService.MenuAnterior().subscribe(response => {
      const aux = (Object.values(response));
      for (let i = 0; i < aux.length; i++) {
        aux[i].Recetas.forEach(function (element) {
          element.Receta.Nombre = element.Receta.Nombre[0].toUpperCase() + element.Receta.Nombre.substr(1).toLowerCase();
        });
        this.setFecha(aux[i]);
        this.Menus.unshift(aux[i]);
        this.mainSlide++;
      }
      this.carousel.moveTo(this.mainSlide, true);
    });
  }

  onmoveFn(movimiento) {
    console.log(movimiento)
    const i = movimiento.currentSlide;
    this.Menu = movimiento.dataSource[i];
  }

  reemplazarMenu(id) {
    this._MenuService.reemplazarMenu(id).subscribe(response => {
    });
  }

  setFecha(menu) {
    moment.locale('es');
    if (moment().tz('America/Argentina/Cordoba').format('MM-DD-YYYY') ===
      moment(menu.Fecha).tz('America/Argentina/Cordoba').format('MM-DD-YYYY')) {
      menu.FechaLetra = 'Hoy';
    } else {
      menu.FechaLetra = moment(menu.Fecha).format('dddd D/M');
      menu.FechaLetra = menu.FechaLetra[0].toUpperCase() + menu.FechaLetra.substr(1).toLowerCase();
    }
  }

  verMas(receta) {
    this.RecetaElegida = receta;
    this.verReceta = true;
  }

  ngOnInit() {
    this.menuExist = false;
    this.verReceta = false;
    this.verMenus();
  }

}
