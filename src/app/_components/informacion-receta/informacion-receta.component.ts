import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Receta} from '../../_models/Receta';
import {RecetaService} from '../../_services/receta.service';

@Component({
  selector: 'app-informacion-receta',
  templateUrl: './informacion-receta.component.html',
  styleUrls: ['./informacion-receta.component.css'],
  providers: [RecetaService]
})
export class InformacionRecetaComponent implements OnInit {
  @Input() RecetaElegida: Receta;
  @Output() volverEvent: EventEmitter<boolean> = new EventEmitter();
  DatosReceta;

  constructor(public _RecetaService: RecetaService) { }

  ngOnInit() {
    this._RecetaService.verInformacionReceta(this.RecetaElegida).subscribe(response => {
      this.DatosReceta = response;
      this.DatosReceta.Nombre = this.DatosReceta.Nombre[0].toUpperCase() +  this.DatosReceta.Nombre.substr(1).toLowerCase();
      this.DatosReceta.Ingredientes.forEach(function (element) {
        element.Ingrediente.Nombre = element.Ingrediente.Nombre[0].toUpperCase() + element.Ingrediente.Nombre.substr(1).toLowerCase();
      });
    });
  }

  volver() {
    this.volverEvent.emit(false);
  }

}
