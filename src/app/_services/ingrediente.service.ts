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
export class IngredienteService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = backend + 'ingrediente/';
  }

  public getIngredientes() {
    return this._http.get(this.url + 'getAll', HttpOptions)
      .pipe(map(res => res));
  }
}
