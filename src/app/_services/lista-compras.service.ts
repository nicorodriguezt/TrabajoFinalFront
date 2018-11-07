import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
  params: {}
};

@Injectable()
export class ListaComprasService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = backend + 'listacompras/';
  }

  public getListaCompras(ids) {
    let params = new HttpParams();
    ids.forEach( x => {
      params = params.append('Ids', x);
    });
    HttpOptions.params = params;
    return this._http.get(this.url + 'lista/', HttpOptions)
      .pipe(map(res => res));
  }
}
