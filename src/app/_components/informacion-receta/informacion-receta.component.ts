import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-informacion-receta',
  templateUrl: './informacion-receta.component.html',
  styleUrls: ['./informacion-receta.component.css']
})
export class InformacionRecetaComponent implements OnInit {
  @Input() RecetaElegida: Receta;
  @Output() volverEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  volver() {
    console.log(this.RecetaElegida)
    this.volverEvent.emit(false);
  }

}
