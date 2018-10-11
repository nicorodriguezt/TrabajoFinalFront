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

  public generarMenu() {
    const fecinicio = moment().tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
    const fecfin = moment().add(3, 'days').tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
    const params = new HttpParams().set('FechaInicio', fecinicio).set('FechaFin', fecfin);
    HttpOptions.params = params;
    return this._http.get(this.url + 'menucompleto/', HttpOptions)
      .pipe(map(res => res));
  }

  public infoMenu() {
    const fecha = moment().tz('America/Argentina/Cordoba').format('YYYY-MM-DD');
    return this._http.get(this.url + 'infoMenu/' + fecha, HttpOptions)
      .pipe(map(res => res));
  }
}
