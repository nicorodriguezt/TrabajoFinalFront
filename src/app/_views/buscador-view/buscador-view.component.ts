import { Component, OnInit } from '@angular/core';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-buscador-view',
  templateUrl: './buscador-view.component.html',
  styleUrls: ['./buscador-view.component.css']
})
export class BuscadorViewComponent implements OnInit {
  public verReceta: boolean;
  public RecetaBuscada = new Receta(null, "",'', null, null, null, '',
    null, '', false, null, null, null, null, null , null);
  public RecetaElegida = new Receta(null, "",'', null, null, null, '',
    null, '', false, null, null, null, null, null, null);

  constructor() { }

  getReceta(receta) {
    this.verReceta = !this.verReceta;
    this.RecetaElegida = receta;
  }

  ngOnInit(): void {
    this.verReceta = false;
  }

}
