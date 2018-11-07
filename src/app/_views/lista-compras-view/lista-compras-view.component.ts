import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../_services/menu.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-lista-compras-view',
  templateUrl: './lista-compras-view.component.html',
  styleUrls: ['./lista-compras-view.component.css'],
  providers: [MenuService]
})
export class ListaComprasViewComponent implements OnInit {
  ListMenu = [];
  cargaDatos = true;
  ListIds = [];
  verListaCompras = false;

  constructor(private _MenuService: MenuService) {
  }

  async ngOnInit() {
    this.ListMenu.push(await this._MenuService.infoMenuHoy().toPromise());
    const aux = (Object.values(await this._MenuService.MenuCompleto().toPromise()));
    for (let i = 0; i < aux.length; i++) {
      this.ListMenu.push(aux[i]);
    }
    this.ListMenu.forEach(x => {
      this.setFecha(x);
    });
    console.log(this.ListMenu);
    this.cargaDatos = false;
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

  onCheck(event, menu) {
    if (event.checked) {
      this.ListIds.push(menu._id);
    } else {
      const i = this.ListIds.findIndex( x => x === menu._id);
      this.ListIds.splice(i, 1);
    }
    console.log(this.ListIds);
  }

  generarLista() {
    if (this.ListIds.length > 0) {
      this.verListaCompras = true;
    }
  }
}
