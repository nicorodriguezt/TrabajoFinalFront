import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../_services/usuario.service';
import {Router} from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  providers: [UsuarioService]
})
export class MainMenuComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private _router: Router,
              private _UsuarioService: UsuarioService,
              private breakpointObserver: BreakpointObserver) { }

  public logout() {
    this._UsuarioService.logout().subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/login']);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  ngOnInit() {
  }

}
