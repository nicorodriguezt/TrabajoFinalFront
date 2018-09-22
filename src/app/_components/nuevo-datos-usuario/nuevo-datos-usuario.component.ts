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
  @Input() DatosValid: boolean;
  @Output() sendData: EventEmitter<any> = new EventEmitter();
  DatosActuales;

  public sexos = [
    {value: 'M', titulo: 'Masculino'},
    {value: 'F', titulo: 'Femenino'}];

  constructor( public _DatosUsuarioService: DatosUsuarioService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.sendData.emit({Datos: this.DatosUsuario, Valid: this.DatosValid});
  }

  ngOnInit(): void {
    this._DatosUsuarioService.getDatos().subscribe( res => {
      if (res != null) {
        this.DatosActuales = res;
        this.DatosUsuario.Sexo = this.DatosActuales.Sexo;
        this.DatosUsuario.Altura = this.DatosActuales.Altura;
        this.DatosUsuario.Edad = this.DatosActuales.Edad;
        this.DatosUsuario.PesoAprox = this.DatosActuales.PesoAprox;
      }
    });
  }
}
