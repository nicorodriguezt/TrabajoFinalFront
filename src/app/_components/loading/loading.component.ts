import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../_services/usuario.service';
import {Usuario} from '../../_models/Usuario';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  providers: [UsuarioService]
})
export class LoadingComponent implements OnInit {

  constructor(private _UsuarioService: UsuarioService,
              private _router: Router) { }

  ngOnInit() {
    this._UsuarioService.getSession().subscribe((res: any) => {
      this._UsuarioService.sendSession(res.passport.user);
      this._UsuarioService.info().subscribe((res2: Usuario) => {
        this._UsuarioService.sendRol(res2.Rol);
        this._UsuarioService.sendDisclaimer(res2.Disclaimer);
        if (this._UsuarioService.getRol() === 'administrador') {
          this._router.navigate(['recetasAdmin']);
        }
        this._router.navigate(['/main']);
      });
    });
  }
}
