import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsuarioService} from '../../_services/usuario.service';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css'],
  providers: [UsuarioService, BreakpointObserver, MediaMatcher, DatosUsuarioService]
})
export class HeaderViewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public DatosExist = false;

  constructor(public _router: Router,
              private breakpointObserver: BreakpointObserver,
              private _UsuarioService: UsuarioService,
              private _DatosUsuarioService: DatosUsuarioService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  title = 'TrabajoFinalFront';
  _Rol = localStorage.getItem('Rol');

  public logout() {
    this.blockUI.start();
    this._UsuarioService.logout().subscribe(
      response => {
        this.blockUI.stop();
        this._router.navigate(['/login']);
      },
      error1 => {
        this.blockUI.stop();
      }
    );
  }

  checkRol() {
    if (!this._router.url.includes('/ver/')) {
      if (this._Rol === 'administrador') {
        return '/recetasAdmin';
      } else {
        return '/main';
      }
    }
  }

  ngOnInit() {
    this.datosExist();
  }

  datosExist() {
    if (localStorage.getItem('DatosExist') !== 'true' && localStorage.getItem('DatosExist') !== 'false') {
      this._DatosUsuarioService.getDatos().subscribe(datos => {
        if (datos) {
          this.DatosExist = true;
          localStorage.setItem('DatosExist', 'true');
        } else {
          localStorage.setItem('DatosExist', 'false');
        }
      }, error1 => {
        console.clear();
      });
    }
  }
}
