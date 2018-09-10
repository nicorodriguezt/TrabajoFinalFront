import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { DatosUsuario} from '../../_models/DatosUsuario';
import { DatosUsuarioService} from '../../_services/datos-usuario.service';

@Component({
  selector: 'app-nuevo-datos-usuario',
  templateUrl: './nuevo-datos-usuario.component.html',
  styleUrls: ['./nuevo-datos-usuario.component.css'],
  providers: [DatosUsuarioService]
})
export class NuevoDatosUsuarioComponent implements OnChanges {
  @Input() DatosUsuario: DatosUsuario;
  @Input() DatosValid: boolean;
  @Output() sendData: EventEmitter<any> = new EventEmitter();

  public sexos = [
    {value: 'M', titulo: 'Masculino'},
    {value: 'F', titulo: 'Femenino'}];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.sendData.emit({Datos: this.DatosUsuario, Valid: this.DatosValid});
  }
}
