import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsuarioService} from './_services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]
})
export class AppComponent {

  constructor(public _router: Router,
              private breakpointObserver: BreakpointObserver,
              private _UsuarioService: UsuarioService) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  title = 'TrabajoFinalFront';

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
}

