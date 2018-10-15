import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';
import {Router} from '@angular/router';
import * as moment from 'moment-timezone';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
  params: {}
};

@Injectable()
export class MenuService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'menu/';
  }

  public generarMenu(cantidad) {
    const fecinicio = moment().add(cantidad + 1, 'days').tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
    const fecfin = moment().add(6, 'days').tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
    HttpOptions.params = new HttpParams().set('FechaInicio', fecinicio).set('FechaFin', fecfin);
    return this._http.get(this.url + 'menucompleto/', HttpOptions)
      .pipe(map(res => res));
  }

  public infoMenuHoy(fecha) {
    return this._http.get(this.url + 'infoMenuHoy/' + fecha, HttpOptions)
      .pipe(map(res => res));
  }

  public infoMenuCompleto() {
    const fecinicio = moment().add(1, 'days').tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
    const fecfin = moment().add(6, 'days').tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
    HttpOptions.params = new HttpParams().set('FechaInicio', fecinicio).set('FechaFin', fecfin);
    return this._http.get(this.url + 'infoMenuCompleto', HttpOptions)
      .pipe(map(res => res));
  }

  public cantidadRecetas() {
      const fecinicio = moment().add(1, 'days').tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
      const fecfin = moment().add(6, 'days').tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
      HttpOptions.params = new HttpParams().set('FechaInicio', fecinicio).set('FechaFin', fecfin);
      return this._http.get(this.url + 'countRecetas', HttpOptions)
        .pipe(map(res => res));
    }
}
