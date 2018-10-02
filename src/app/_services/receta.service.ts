import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable } from 'rxjs/Observable';
import {backend} from './globalconfig';
import {Router} from '@angular/router';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
  params: {}
};

@Injectable()
export class RecetaService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'receta/';
  }

  public buscar(datos, skip, limit) {
    const params = new HttpParams().set('Nombre', datos.Nombre).set('Saltar', skip).set('Limite', limit);
    HttpOptions.params = params;
    return this._http.get(this.url + 'find', HttpOptions)
      .pipe(map(res => res));
  }

  public verInformacionReceta(datos) {
    return this._http.get(this.url + 'verReceta/' + datos.Nombre, HttpOptions)
      .pipe(map(res => res));
  }
}
