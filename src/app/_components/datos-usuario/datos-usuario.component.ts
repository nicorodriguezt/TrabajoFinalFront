import { Component, OnInit } from '@angular/core';
import { DatosUsuario} from '../../_models/DatosUsuario';
import { ActividadLaboral} from '../../_models/ActividadLaboral';
import {Router} from '@angular/router';
import { DatosUsuarioService} from '../../_services/datos-usuario.service';


@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  public DatosUsuario: DatosUsuario;
  public ActividadLaboral: ActividadLaboral;

  constructor(
    private _DatosUsuarioService: DatosUsuarioService,
    private _router: Router,
  ) { }





  ngOnInit() {
  }

}
