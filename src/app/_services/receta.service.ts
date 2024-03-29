import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {backend} from './globalconfig';
import {Router} from '@angular/router';
import {deleteNulls} from './funciones-commun.service';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true,
  params: {}
};

const HttpOptionsImage = {
  headers: new HttpHeaders({}),
  withCredentials: true,
  params: {}
};

@Injectable()
export class RecetaService {
  public url: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.url = backend + 'receta/';
  }

  public buscar(datos, skip, limit, filtros) {
    const params = new HttpParams()
      .set('Nombre', datos.Nombre)
      .set('Saltar', skip)
      .set('Limite', limit)
      .set('Descripcion', filtros[0])
      .set('Ingrediente', filtros[1])
      .set('Ultimas', filtros[2])
      .set('Puntuadas', filtros[3]);
    HttpOptions.params = params;
    return this._http.get(this.url + 'find', HttpOptions)
      .pipe(map(res => res));
  }

  public verInformacionReceta(datos) {
    HttpOptions.params = {};
    return this._http.get(this.url + 'verReceta/' + datos._id, HttpOptions)
      .pipe(map(res => res));
  }

  public getMomentos() {
    return this._http.get(this.url + 'getMomentos/', HttpOptions)
      .pipe(map(res => res));
  }

  public buscarIngerida(datos) {
    const params = new HttpParams().set('Nombre', datos);
    HttpOptions.params = params;
    return this._http.get(this.url + 'findIngerido/', HttpOptions)
      .pipe(map(res => res));
  }

  public recetasMejorPuntuadas() {
    return this._http.get(this.url + 'mejoresRecetas/', HttpOptions)
      .pipe(map(res => res));
  }

  public recetasNuevas() {
    return this._http.get(this.url + 'ultimasRecetas/', HttpOptions)
      .pipe(map(res => res));
  }

  public addReceta(data) {
    data = deleteNulls(data);
    const json = JSON.stringify(data);
    const params = json;

    return this._http.put(this.url, params, HttpOptions).pipe(map(res => res));
  }

  public actualizarReceta(data) {
    const json = JSON.stringify(data);
    const params = json;

    return this._http.post(this.url, params, HttpOptions).pipe(map(res => res));
  }

  public recetasCreadasUsuario() {
    return this._http.get(this.url + 'creadas/', HttpOptions)
      .pipe(map(res => res));
  }

  public listarRecetasPendientesAdmin() {
    return this._http.get(this.url + 'recetasPendientes/', HttpOptions)
      .pipe(map(res => res));
  }

  // public evaluacion(_id, estado) {
  //   const datos = {
  //     id: _id,
  //     Estado: estado
  //   };
  //   const params = JSON.stringify(datos);
  //   return;
  // }

  public puntuar(data) {
    const json = JSON.stringify(data);
    const params = json;

    return this._http.post(this.url + 'puntaje', params, HttpOptions).pipe(map(res => res));
  }

  public comentar(data) {
    const json = JSON.stringify(data);
    const params = json;

    return this._http.post(this.url + 'comentario', params, HttpOptions).pipe(map(res => res));
  }

  addImagen(image: File) {
    const file = new FormData();
    file.append('image', image, image.name);
    return this._http.post(this.url + 'image', file, HttpOptionsImage).pipe(map(res => res));
  }

  deleteImage(fileName: String) {
    return this._http.delete(this.url + 'image/' + fileName, HttpOptionsImage).pipe(map(res => res));
  }
}
