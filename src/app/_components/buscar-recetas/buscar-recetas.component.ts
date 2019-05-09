import {Component, Input, Output, EventEmitter, OnInit, Inject} from '@angular/core';
import {RecetaService} from '../../_services/receta.service';
import {Receta} from '../../_models/Receta';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {VerMenuCargarRecetaComponent} from '../../_views/ver-menu-view/ver-menu-view.component';

@Component({
  selector: 'app-buscar-recetas',
  templateUrl: './buscar-recetas.component.html',
  styleUrls: ['./buscar-recetas.component.css'],
  providers: [RecetaService]
})
export class BuscarRecetasComponent {
  @Input() public RecetaBuscada: Receta;
  @Output() sendReceta: EventEmitter<any> = new EventEmitter();
  public results = [];
  skip = 0;
  limit = 6;
  pagina = 0;
  controlPaginas;
  recetasSearching = false;
  MensajeBusqueda = '';
  filtros = {
    descripcion: false,
    ingrediente: false,
    ultimas: false,
    puntuacion: false
  };

  constructor(
    private _RecetaService: RecetaService,
    public dialog: MatDialog
  ) {
  }

  public buscar() {
    this.MensajeBusqueda = '';
    this.results = [];
    if (this.RecetaBuscada.Nombre !== '') {
      this.recetasSearching = true;
      this._RecetaService.buscar(this.RecetaBuscada, this.skip, this.limit).subscribe(response => {
        this.recetasSearching = false;
        const aux = (Object.values(response));
        if (aux.length !== 0) {
          this.controlPaginas = aux.length;
          this.pagina++;
          for (let i = 0; i < aux.length; i++) {
            if (i < 5) {
              aux[i].Nombre = aux[i].Nombre[0].toUpperCase() + aux[i].Nombre.substr(1).toLowerCase();
              this.results.push(aux[i]);
            }
          }
        } else {
          this.MensajeBusqueda = 'No se encontraron recetas';
        }
      });
    }
  }

  public handleBuscar() {
    this.skip = 0;
    this.limit = 6;
    this.pagina = 0;
    this.buscar();
  }

  public forward() {
    this.skip += 5;
    this.limit += 5;
    this.buscar();
  }

  public backward() {
    this.skip -= 5;
    this.limit -= 5;
    this.pagina--;
    this.pagina--;
    this.buscar();
  }

  verMas(recetaElegida) {
    this.sendReceta.emit(recetaElegida);
  }

  filtrosDialog() {
    const dialogRef = this.dialog.open(BuscarRecetasFiltrosComponent, {
      width: '95%',
      data: this.filtros
    });

    dialogRef.afterClosed().subscribe(x => {
      if (x !== undefined) {
        this.filtros = x;
      }
    });
  }


}

@Component({
  selector: 'app-buscar-recetas-filtros',
  templateUrl: './buscar-recetas-filtros.component.html',
  styleUrls: ['./buscar-recetas.component.css']
})
export class BuscarRecetasFiltrosComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<BuscarRecetasFiltrosComponent>) {
  }

  confirmar() {
    this.dialogRef.close(this.data);
  }

}
