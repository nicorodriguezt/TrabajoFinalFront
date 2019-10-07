import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ActividadLaboral} from '../../_models/ActividadLaboral';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-actividad-laboral',
  templateUrl: './actividad-laboral.component.html',
  styleUrls: ['./actividad-laboral.component.css']
})
export class ActividadLaboralComponent implements OnInit {
  @Input() ActividadLaboral: ActividadLaboral;
  @Output() sendDataActividad: EventEmitter<any> = new EventEmitter();
  datosactuales;

  public list = [];

  constructor(public dialog: MatDialog, private _DatosUsuarioService: DatosUsuarioService) {
  }

  ngOnInit() {
    this._DatosUsuarioService.getlist().subscribe(response => {
      const aux = (Object.values(response));
      aux.forEach(value => {
        this.list.push(value);
      });
    });
    this._DatosUsuarioService.getActividad().subscribe(response => {
      if (response != null) {
        this.datosactuales = response;
        this.ActividadLaboral = this.datosactuales.ActividadLaboral;
        this.sendDataActividad.emit(this.ActividadLaboral);
      }
    });
  }

  changedata() {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].Categoria == this.ActividadLaboral.Categoria) {
        this.ActividadLaboral._id = this.list[i]._id;
      }
    }
    this.sendDataActividad.emit(this.ActividadLaboral);
  }

  openInfo(): void {
    this.dialog.open(ActividadLaboralInfoComponent, {
      width: '80%',
      data: this.list
    });
  }

}

@Component({
  selector: 'app-actividad-laboral-info',
  templateUrl: './actividad-laboral-info.component.html',
  styleUrls: ['./actividad-laboral.component.css']
})
export class ActividadLaboralInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

}
