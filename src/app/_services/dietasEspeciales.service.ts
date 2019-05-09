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
export class DietasEspecialesService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = backend + 'dietaEspecial/';
  }

  public getDietas() {
    return this._http.get(this.url, HttpOptions).pipe(map(res => res));
  }

}
