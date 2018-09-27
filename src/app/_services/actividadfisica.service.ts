import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {backend} from './globalconfig';
import {map} from 'rxjs/operators';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ActividadfisicaService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'usuario/datos/actividadfisica/';
  }

  public getActividades() {
    return this._http.get(this.url + 'list', HttpOptions)
      .pipe(map(res => res));

  }

  public getActividadesUsuario() {
    return this._http.get(this.url + 'info', HttpOptions)
      .pipe(map(res => res));

  }

  public setActividadUsuario(actividad, cantidad) {
    actividad.Cantidad = cantidad;
    const json = JSON.stringify(actividad);
    const params = json;

    console.log(params);

    return this._http.post(this.url + 'add', params, HttpOptions)
      .pipe(map(res => res));
  }

  public deleteActividadUsuario(actividad) {
    const json = JSON.stringify(actividad);
    const params = json;

    return this._http.put(this.url + 'remove', params, HttpOptions)
      .pipe(map(res => res));
  }
}
