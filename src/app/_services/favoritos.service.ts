import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';
import {Router} from '@angular/router';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
  params: {}
};

@Injectable()
export class FavoritosService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'receta/';
  }

  public RecetasxUsuario() {
    return this._http.get(this.url + 'favoritas', HttpOptions)
      .pipe(map(res => res));
  }

  public HacerFavortito(receta) {
    receta.Favorito = !receta.Favorito;
    const params = {};
    return this._http.post(this.url + 'favoritas/' + receta._id + '/' + receta.Favorito.toString(), params, HttpOptions)
      .pipe(map(res => res));
  }
}
