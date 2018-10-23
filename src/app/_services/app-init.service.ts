import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {backend} from './globalconfig';
import 'rxjs/add/operator/toPromise';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};

@Injectable()
export class AppInitService {
  url = backend;
  response;

  constructor(private _http: HttpClient) {
  }

  UserLogged(): Promise<any> {
    return new Promise((resolve) => {
      this._http.get(this.url + 'usuario/info', HttpOptions).toPromise().then(res1 => {
        this.response = res1;
        localStorage.clear();
        localStorage.setItem('Logged', this.response._id);
        this._http.get(this.url + 'menu/countMenus', HttpOptions).toPromise().then(count => {
          if (count < 7) {
            // this._http.get(this.url + 'menu/menucompleto/', HttpOptions).subscribe();
          }
          resolve();
        }).catch(function () {
          localStorage.clear();
          resolve();
        });

      });
    });
  }
}
