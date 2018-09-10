import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { ActividadLaboral} from '../../_models/ActividadLaboral';
import {DatosUsuarioService} from '../../_services/datos-usuario.service';

@Component({
  selector: 'app-actividad-laboral',
  templateUrl: './actividad-laboral.component.html',
  styleUrls: ['./actividad-laboral.component.css']
})
export class ActividadLaboralComponent implements OnInit, OnChanges {
  @Input() ActividadLaboral: ActividadLaboral;
  @Output() sendData: EventEmitter<any> = new EventEmitter();

  public list = [];

  constructor(
    private _DatosUsuarioService: DatosUsuarioService) {}

  ngOnInit() {
    this._DatosUsuarioService.getlist().subscribe(response => {
      const aux = (Object.values(response));
      aux.forEach(value => {
        this.list.push(value);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.sendData.emit(this.ActividadLaboral);
  }

}