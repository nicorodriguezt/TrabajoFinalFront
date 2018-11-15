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

  public getEvaluacionSemana() {
    return this._http.get(this.url + 'EvaluacionSemana/', HttpOptions)
      .pipe(map(res => res));
  }

  public getEvaluacionDia() {
    return this._http.get(this.url + 'EvaluacionDia/', HttpOptions)
      .pipe(map(res => res));
  }

  public configuracionUsuario(datos) {
    const json = JSON.stringify(datos);
    const params = json;

    return this._http.post(this.url + 'configuracion/', params, HttpOptions)
      .pipe(map(res => res));
  }

  public historial() {
    return this._http.get(this.url + 'Historial/', HttpOptions)
      .pipe(map(res => res));
  }
}
