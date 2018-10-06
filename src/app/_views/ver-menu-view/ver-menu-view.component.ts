import { Component, OnInit } from '@angular/core';
import { Menu } from '../../_models/Menu';
import { MenuService } from '../../_services/menu.service';
import * as moment from 'moment';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-ver-menu-view',
  templateUrl: './ver-menu-view.component.html',
  styleUrls: ['./ver-menu-view.component.css'],
  providers: [MenuService]
})
export class VerMenuViewComponent implements OnInit {
  RecetaElegida = new Receta(null, null, null, null, null, null, null, null, false, null, null, null);
  verReceta: boolean;
  Menu = new Menu(null, null, null);
  response;
  menuDay: string;

  constructor( public _MenuService: MenuService) { }


  verMenu() {
    this._MenuService.infoMenu().subscribe(response => {
      this.response = response;
      this.Menu = this.response;
      this.Menu.Recetas.forEach(function (element) {
        element.Receta.Nombre = element.Receta.Nombre[0].toUpperCase() +  element.Receta.Nombre.substr(1).toLowerCase();
      });
      moment.locale('es');
      if (moment().format('YYYY-MM-DD') === moment(this.Menu.Fecha).utc().format('YYYY-MM-DD')) {
        this.menuDay = 'Menu de Hoy';
      } else {
        this.menuDay = moment(this.Menu.Fecha).utc().format('dddd');
      }
    });
  }

  verMas(receta) {
    this.RecetaElegida = receta;
    this.verReceta = true;
  }

  ngOnInit() {
    this.verReceta = false;
    this.verMenu();

  }

}
