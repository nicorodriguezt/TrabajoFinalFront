import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class ListaComprasService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = backend + 'listacompras/';
  }

  public getListaCompras(menu) {
    return this._http.get(this.url + 'lista/' + menu, HttpOptions)
      .pipe(map(res => res));
  }
}
