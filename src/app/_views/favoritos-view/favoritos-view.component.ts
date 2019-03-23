import { Component, OnInit } from '@angular/core';
import {FavoritosService} from '../../_services/favoritos.service';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-favoritos-view',
  templateUrl: './favoritos-view.component.html',
  styleUrls: ['./favoritos-view.component.css'],
  providers: [FavoritosService]
})
export class FavoritosViewComponent implements OnInit {

  cargarDatos = false;
  listFavoritos = null;
  verReceta = false;
  RecetaElegida = new Receta(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);


  constructor(private _FavoritosService: FavoritosService) { }

  ngOnInit() {
    this._FavoritosService.RecetasxUsuario().subscribe(res => {
      this.listFavoritos = res;
      this.cargarDatos = true;
    });
  }

  verMas(receta) {
    this.RecetaElegida = receta;
    this.verReceta = true;
  }

}
