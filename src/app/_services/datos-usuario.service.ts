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
export class DatosUsuarioService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'usuario/datos/';
  }

  public cargaDatosUsuario(datos) {
    const json = JSON.stringify(datos);
    const params = json;

    return this._http.post(this.url + 'set', params, HttpOptions)
      .pipe(map(res => res));
  }

  public cargarActividadLaboral(actividad) {
    const json = JSON.stringify(actividad);
    const params = json;

    return this._http.put(this.url + 'actividadlaboral/add', params, HttpOptions)
      .pipe(map(res => res));
  }

  public cargar(datos, actividad) {
    this.cargaDatosUsuario(datos);
    // if error
    this.cargarActividadLaboral(actividad);
  }

}
