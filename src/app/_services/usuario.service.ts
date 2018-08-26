import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import {backend} from './globalconfig';
import {Router} from '@angular/router';
import {headersToString} from 'selenium-webdriver/http';

@Injectable()
export class UsuarioService {
  public url: string;

  constructor(private _http: Http, private _router: Router) {
    this.url = backend + 'usuario/';
  }

  login(user) {
    const json = JSON.stringify(user);
    const params = json;
    const headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'login', params, {headers: headers})
      .pipe(map(res => res.json()));
  }

  sendToken(token: string) {
    localStorage.setItem('Logged', token);
  }

  getToken() {
    return localStorage.getItem('Logged');
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('Logged');
    return this._http.get(this.url + 'logout').pipe(map(res => res.json()));
  }
}
