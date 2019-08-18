import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

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

  public addDieta(dieta) {
    const params = {};
    return this._http.post(this.url + 'dietaEpecial/add/' + dieta._id, params, HttpOptions).pipe(map(res => res));
  }

  public removeDieta(dieta) {
    const params = {};
    return this._http.post(this.url + 'dietaEspecial/remove/' + dieta._id, params, HttpOptions).pipe(map(res => res));
  }

  public addPreferencia(ingrediente) {
    const params = {};
    return this._http.post(this.url + 'preferencias/add/' + ingrediente._id, params, HttpOptions).pipe(map(res => res));
  }

  public removePreferencia(ingrediente) {
    const params = {};
    return this._http.post(this.url + 'preferencias/remove/' + ingrediente._id, params, HttpOptions).pipe(map(res => res));
  }

}
