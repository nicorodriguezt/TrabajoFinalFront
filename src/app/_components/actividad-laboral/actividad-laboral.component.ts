import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { ActividadLaboral} from '../../_models/ActividadLaboral';
import { DatosUsuarioService} from '../../_services/datos-usuario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActividadOverviewComponent} from '../actividad-fisica/actividad-fisica.component';

@Component({
  selector: 'app-actividad-laboral',
  templateUrl: './actividad-laboral.component.html',
  styleUrls: ['./actividad-laboral.component.css']
})
export class ActividadLaboralComponent implements OnInit, OnChanges {
  @Input() ActividadLaboral: ActividadLaboral;
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  datosactuales;

  public list = [];

  constructor( public dialog: MatDialog, private _DatosUsuarioService: DatosUsuarioService) {}

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
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.sendData.emit(this.list);
  }

  openInfo(): void {
    this.dialog.open(ActividadLaboralInfoComponent, {
      width: '250px',
      data: this.list
    });
  }

}

@Component({
  selector: 'app-actividad-laboral-info',
  templateUrl: './actividad-laboral-info.component.html',
})
export class ActividadLaboralInfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() { console.log(this.data)}

}
