import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('Logged') || state.url === '/registro') {
      if (!localStorage.getItem('Rol')) {
        return false;
      } else {
        const Rol = localStorage.getItem('Rol');
        if (state.url === '/recetasAdmin' || state.url === '/ingredientes' || state.url === '/unidades') {
          if (Rol === 'administrador') {
            return true;
          } else {
            this._router.navigateByUrl('/main');
            return false;
          }
        } else {
          if (Rol === 'usuario') {
            return true;
          } else {
            this._router.navigateByUrl('/recetasAdmin');
            return false;
          }
        }
      }
    } else {
      this._router.navigateByUrl('/login');
      return false;
    }
  }

}
