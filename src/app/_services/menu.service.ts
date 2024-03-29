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
export class MenuService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = backend + 'menu/';
  }

  public infoMenuHoy() {
    return this._http.get(this.url + 'menuHoy/', HttpOptions)
      .pipe(map(res => res));
  }

  public MenuCompleto() {
    return this._http.get(this.url + 'menucompleto/', HttpOptions)
      .pipe(map(res => res));
  }

  public reemplazarMenu(id) {
    return this._http.get(this.url + 'modificarmenu/' + id, HttpOptions)
      .pipe(map(res => res));
  }

  public MenuAnterior() {
    return this._http.get(this.url + 'menuanterior/', HttpOptions)
      .pipe(map(res => res));
  }

  public cambiarEstado(data) {
    const json = JSON.stringify(data);
    const params = json;

    return this._http.post(this.url + 'recetasugerida/update/', params, HttpOptions)
      .pipe(map(res => res));
  }

  public recetaSugeridaNueva(data) {
    const json = JSON.stringify(data);
    const params = json;

    return this._http.post(this.url + 'recetasugerida/RecetaSugeridaNueva/', params, HttpOptions)
      .pipe(map(res => res));
  }



}
