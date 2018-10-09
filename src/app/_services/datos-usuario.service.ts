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

  public cargar(datos, actividad) {
    datos.ActividadLaboral = actividad;
    delete datos.Preferencias;
    this.cargaDatosUsuario(datos).subscribe(response => {
      return true;
    },
      error1 => {
      return error1;
      });
  }

  public getlist() {
    return this._http.get(this.url + 'actividadlaboral/list', HttpOptions)
      .pipe(map(res => res));
  }

  public getDatos() {
    return this._http.get(this.url + 'info', HttpOptions).pipe(map(res => res));
  }

  public getActividad() {
    return this._http.get(this.url + 'actividadlaboral/info', HttpOptions).pipe(map(res => res));
  }

}
