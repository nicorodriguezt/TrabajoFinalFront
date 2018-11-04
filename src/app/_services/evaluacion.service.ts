import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class EvaluacionService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = backend + 'evaluacion/';
  }

  public getEvaluacion() {
    return this._http.get(this.url + 'resultados/', HttpOptions)
      .pipe(map(res => res));
  }
}
