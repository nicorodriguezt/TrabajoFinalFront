import { Component, OnInit } from '@angular/core';
import {FavoritosService} from '../../_services/favoritos.service';

@Component({
  selector: 'app-favoritos-view',
  templateUrl: './favoritos-view.component.html',
  styleUrls: ['./favoritos-view.component.css'],
  providers: [FavoritosService]
})
export class FavoritosViewComponent implements OnInit {

  cargardatos = false;
  listFavoritos = null;

  constructor(private _FavoritosService: FavoritosService) { }

  ngOnInit() {
    this._FavoritosService.RecetasxUsuario().subscribe(res => {
      console.log(res);
      this.listFavoritos = res;
    });
  }

}
