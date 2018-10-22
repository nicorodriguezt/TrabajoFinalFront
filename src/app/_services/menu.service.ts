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
    return this._http.get(this.url + 'menucompleto/', HttpOptions)
      .pipe(map(res => res));
  }

  public infoMenuHoy() {
    return this._http.get(this.url + 'menuHoy/', HttpOptions)
      .pipe(map(res => res));
  }

  public MenuCompleto() {
    return this._http.get(this.url + 'menucompleto/', HttpOptions)
      .pipe(map(res => res));
  }

}
