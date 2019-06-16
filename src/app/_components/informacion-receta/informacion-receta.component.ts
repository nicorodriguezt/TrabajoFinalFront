import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Receta} from '../../_models/Receta';
import {RecetaService} from '../../_services/receta.service';
import {FavoritosService} from '../../_services/favoritos.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-informacion-receta',
  templateUrl: './informacion-receta.component.html',
  styleUrls: ['./informacion-receta.component.css'],
  providers: [RecetaService, FavoritosService]
})
export class InformacionRecetaComponent implements OnInit {
  @Input() RecetaElegida: Receta;
  @Output() volverEvent: EventEmitter<boolean> = new EventEmitter();
  DatosReceta;
  recetaCargandoInfo = true;
  starFavorito = 0;
  Comentario;
  cantComentarios = 5;

  constructor(private _RecetaService: RecetaService,
              private _FavoritoService: FavoritosService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this._RecetaService.verInformacionReceta(this.RecetaElegida).subscribe(response => {
      console.log(response);
      this.DatosReceta = response;
      this.RecetaElegida = this.DatosReceta;
      this.RecetaElegida.Nombre = this.RecetaElegida.Nombre[0].toUpperCase() + this.RecetaElegida.Nombre.substr(1).toLowerCase();
      this.RecetaElegida.Ingredientes.forEach(function (element) {
        element.Ingrediente.Nombre = element.Ingrediente.Nombre[0].toUpperCase() + element.Ingrediente.Nombre.substr(1).toLowerCase();
      });
      if (this.RecetaElegida.Favorito === true) {
        this.starFavorito = 1;
      }
      this.recetaCargandoInfo = false;
    });
  }

  volver() {
    this.volverEvent.emit(false);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  togglefavorito() {
    this._FavoritoService.HacerFavortito(this.RecetaElegida).subscribe(res => {
      console.log(res);
      let mensaje = '';
      if (res === 'true') {
        this.starFavorito = 1;
        mensaje = 'Agregado a Favoritas';
      } else {
        this.starFavorito = 0;
        mensaje = 'Eliminado de Favoritas';
      }

      this.openSnackBar(mensaje, 'Descartar');

    });
  }

  onPuntuar(evento) {
    const data = {
      _id: this.RecetaElegida._id,
      puntaje : evento.rating
    };
    this._RecetaService.puntuar(data).subscribe(res => {
      this.openSnackBar('Receta puntuada', 'Descartar');
    });
  }

  onComentar() {
    const data = {
      _id: this.RecetaElegida._id,
      Texto : this.Comentario
    };
    this._RecetaService.comentar(data).subscribe(res => {
      this.Comentario = null;
      this.openSnackBar('Comentario realizado', 'Descartar');
    });
  }

  verMasComentarios() {
    this.cantComentarios = 10;
  }

}
