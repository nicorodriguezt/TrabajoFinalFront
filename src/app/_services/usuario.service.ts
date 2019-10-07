import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';
import {Router} from '@angular/router';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class UsuarioService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'usuario/';
  }

  login(user) {
    const json = JSON.stringify(user);
    const params = json;

    return this._http.post(this.url + 'login', params, HttpOptions)
      .pipe(map(res => res));
  }

  sendSession(token: string) {
    localStorage.setItem('Logged', token);
  }

  getSession() {
    return this._http.get(this.url + 'session', HttpOptions)
      .pipe(map(res => res));
  }

  sendRol(token: string) {
    localStorage.setItem('Rol', token);
  }

  getRol() {
    return localStorage.getItem('Rol');
  }

  info() {
    return this._http.get(this.url + 'info', HttpOptions)
      .pipe(map(res => res));
  }

  logout() {
    localStorage.removeItem('Logged');
    localStorage.removeItem('Rol');
    return this._http.get(this.url + 'logout', HttpOptions).pipe(map(res => res));
  }

  singup(user) {
    const json = JSON.stringify(user);
    const params = json;

    return this._http.post(this.url + 'registrar', params, HttpOptions)
      .pipe(map(res => res));
  }

  loginGoogle() {
    return this.url + 'google';
  }

  sendDisclaimer(token: boolean) {
    localStorage.setItem('Disclaimer', String(token));
  }

  updateDisclaimer() {
    return this._http.put(this.url + 'update', {Disclaimer: false}, HttpOptions).pipe(map(res => res));
  }
}
