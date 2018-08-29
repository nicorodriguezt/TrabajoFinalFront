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
    return localStorage.getItem('Logged');
  }

  isLoggednIn() {
    return this.getSession() !== null;
  }

  logout() {
    localStorage.removeItem('Logged');
    return this._http.get(this.url + 'logout', HttpOptions).pipe(map(res => res));
  }

  singup(user) {
    const json = JSON.stringify(user);
    const params = json;

    return this._http.post(this.url + 'registrar', params, HttpOptions)
      .pipe(map(res => res));
  }
}
