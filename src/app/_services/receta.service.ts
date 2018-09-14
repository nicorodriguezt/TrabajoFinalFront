import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable } from 'rxjs/Observable';
import {backend} from './globalconfig';
import {Router} from '@angular/router';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class RecetaService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'receta/';
  }

  public buscar(datos) {
    const json = JSON.stringify(datos);
    const params = json;

    return this._http.post(this.url + 'find', params, HttpOptions)
      .pipe(map(res => res));
  }

  public verInformacionReceta(datos) {
    return this._http.get(this.url + 'verReceta/' + datos.Nombre, HttpOptions)
      .pipe(map(res => res));
  }
}
