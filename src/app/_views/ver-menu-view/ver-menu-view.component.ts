import {Component, OnInit} from '@angular/core';
import {Menu} from '../../_models/Menu';
import {MenuService} from '../../_services/menu.service';
import * as moment from 'moment-timezone';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-ver-menu-view',
  templateUrl: './ver-menu-view.component.html',
  styleUrls: ['./ver-menu-view.component.css'],
  providers: [MenuService]
})
export class VerMenuViewComponent implements OnInit {
  fechaHoy = moment().tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
  RecetaElegida = new Receta(null, null, null, null, null, null, null, null, false, null, null, null);
  Menu = new Menu(null, null, null);
  auxiliar;
  verReceta: boolean;
  menuExist: boolean;
  menuDay: string;

  constructor(public _MenuService: MenuService) {
  }

  async verMenus() {
    await this.verMenuHoy();
    this.verMenuCompleto();
  }


  async verMenuHoy() {
    this.auxiliar = await this._MenuService.infoMenuHoy().toPromise();
    if (this.auxiliar != null) {
      this.menuExist = true;
      this.Menu = this.auxiliar;
      this.Menu.Recetas.forEach(function (element) {
        element.Receta.Nombre = element.Receta.Nombre[0].toUpperCase() + element.Receta.Nombre.substr(1).toLowerCase();
      });
      moment.locale('es');
      // if (moment().tz('America/Argentina/Cordoba').format('MM-DD-YYYY') ===
      //   moment(this.Menu.Fecha).tz('America/Argentina/Cordoba').format('MM-DD-YYYY')) {
      //   this.menuDay = 'Menu de Hoy';
      // } else {
      //   this.menuDay = moment(this.Menu.Fecha).tz('America/Argentina/Cordoba').format('dddd');
      // }
    }
  }

  async generarMenuCompleto() {
    const count = await this._MenuService.cantidadMenus().toPromise();
    if (count < 7) {
      const menus = await this._MenuService.generarMenu().toPromise();
      console.log(menus);
    }
  }

  verMenuCompleto() {
    console.log('c');
    this._MenuService.infoMenuCompleto().subscribe(response => {
      console.log(response);
    });
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
