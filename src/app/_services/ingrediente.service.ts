import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {backend} from './globalconfig';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
  params: {}
};

@Injectable()
export class IngredienteService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = backend + 'ingrediente/';
  }

  public getIngredientes() {
    return this._http.get(this.url + 'getAll', HttpOptions)
      .pipe(map(res => res));
  }

  public add(data) {
    const params = JSON.stringify(data);

    return this._http.post(this.url + 'add', params, HttpOptions)
      .pipe(map(res => res));
  }

  public getOrigenes() {
    if (localStorage['Origenes']) {
      return this._http.get(this.url + 'getOrigenes/', HttpOptions ).pipe(startWith(JSON.parse(localStorage['Origenes'] || '[]')));
    }
    return this._http.get(this.url + 'getOrigenes/', HttpOptions ).pipe(map(res => res));
  }

  public getIngredientesByOrigen(origen, key) {
    if (localStorage[key]) {
      return this._http.get(this.url + 'getByOrigen/' + origen, HttpOptions ).pipe(startWith(JSON.parse(localStorage[key] || '[]')));
    }
    return this._http.get(this.url + 'getByOrigen/' + origen, HttpOptions ).pipe(map(res => res));
  }
}
