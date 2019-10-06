import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { DatosUsuario} from '../../_models/DatosUsuario';
import { DatosUsuarioService} from '../../_services/datos-usuario.service';

@Component({
  selector: 'app-nuevo-datos-usuario',
  templateUrl: './nuevo-datos-usuario.component.html',
  styleUrls: ['./nuevo-datos-usuario.component.css'],
  providers: [DatosUsuarioService]
})
export class NuevoDatosUsuarioComponent implements OnInit, OnChanges {
  @Input() DatosUsuario: DatosUsuario;
  @Output() sendDataUsuario: EventEmitter<any> = new EventEmitter();

  public sexos = [
    {value: 'M', titulo: 'Masculino'},
    {value: 'F', titulo: 'Femenino'}];

  constructor( private _DatosUsuarioService: DatosUsuarioService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.sendDataUsuario.emit(this.DatosUsuario);
  }

  ngOnInit(): void {}
}
