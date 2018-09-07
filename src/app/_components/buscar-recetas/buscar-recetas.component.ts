import { Component, OnInit } from '@angular/core';
import { RecetaService} from '../../_services/receta.service';
import { Receta} from '../../_models/Receta';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-buscar-recetas',
  templateUrl: './buscar-recetas.component.html',
  styleUrls: ['./buscar-recetas.component.css'],
  providers: [RecetaService]
})
export class BuscarRecetasComponent implements OnInit {
  public Receta = new Receta('', '', null, '', null, '', false, null, null);
  public results = [];

  constructor(
    private _RecetaService: RecetaService
  ) { }

  public buscar() {
    this.results = [];
    if (this.Receta.Nombre !== '') {
      this._RecetaService.buscar(this.Receta).subscribe(response => {
        const aux = (Object.values(response));
        aux.forEach(value => {
          this.results.push(value);
        });
      });
    }
  }

  ngOnInit() {
  }

}
