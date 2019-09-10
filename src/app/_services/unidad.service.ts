import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';
import {Router} from '@angular/router';
import {Unidad} from '../_models/Unidad';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class UnidadService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'unidad/';
  }

  getUnidades() {
    return this._http.get(this.url + 'categorias', HttpOptions).pipe(map(res => res));
  }

  createUnidad(unidad: Unidad) {
    const json = JSON.stringify(unidad);
    const params = json;

    return this._http.post(this.url, params, HttpOptions).pipe(map(res => res));
  }
}
