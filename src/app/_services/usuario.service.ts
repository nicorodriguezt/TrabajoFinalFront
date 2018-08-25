import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import {backend} from './globalconfig';

@Injectable()
export class UsuarioService {
  public url: string;

  constructor(private _http: Http) {
    this.url = backend + '/usuario/';
  }

  signup(user, gethash = null) {
    if (gethash != null) {
      user.gethash = gethash;
    }
    const json = JSON.stringify(user);
    const params = json;

    const headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'login', params, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
