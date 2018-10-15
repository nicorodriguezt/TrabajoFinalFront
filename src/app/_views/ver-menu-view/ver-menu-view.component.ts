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
    await this.generarMenuCompleto();
  }


  async verMenuHoy() {
    this.auxiliar = await this._MenuService.infoMenuHoy(this.fechaHoy).toPromise();
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
    let count = await this._MenuService.cantidadRecetas().toPromise();
    count = Number(count);
    if (count !== 7) {
      await this._MenuService.generarMenu(count).toPromise();
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

  // generarMenu() {
  //   this._MenuService.generarMenu().subscribe(response => {
  //     if (response != null) {
  //       this.verMenu();
  //     }
  //   });
  // }

  ngOnInit() {
    this.menuExist = false;
    this.verReceta = false;
    this.verMenus();
  }

}
