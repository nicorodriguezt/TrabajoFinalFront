import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ListaComprasService} from '../../_services/lista-compras.service';


@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
  providers: [ListaComprasService]
})
export class ListaComprasComponent implements OnInit {
  @Input() MenuLista;
  @Output() volverEvent: EventEmitter<boolean> = new EventEmitter();

  cargaDatos = true;
  ListaCompra;

  constructor(private _ListaComprasService: ListaComprasService) { }

  async ngOnInit() {
    this.ListaCompra = await this._ListaComprasService.getListaCompras(this.MenuLista).toPromise();
    this.ListaCompra.forEach(function (element) {
      element.Ingrediente.Nombre = element.Ingrediente.Nombre[0].toUpperCase() + element.Ingrediente.Nombre.substr(1).toLowerCase();
    });
    this.cargaDatos = false;
    console.log(this.ListaCompra);
  }

  volver() {
    this.volverEvent.emit(false);
  }

}
