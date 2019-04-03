import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {getResponseURL} from '@angular/http/src/http_utils';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('Logged')) {
      return true;
    } else {
      this._router.navigate(['main']);
      return false;
    }
  }
}
