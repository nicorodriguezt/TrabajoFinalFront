import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Receta} from '../../_models/Receta';

@Component({
  selector: 'app-receta-compartida-view',
  templateUrl: './receta-compartida-view.component.html',
  styleUrls: ['./receta-compartida-view.component.css']
})
export class RecetaCompartidaViewComponent implements OnInit {
  enable = false;
  RecetaElegida: Receta = new Receta(null, null, null, null, null, null,
    null, null, null, null, null, null,
    null, null, null, null, null);

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.RecetaElegida._id = this._route.snapshot.paramMap.get('receta');
    this.enable = true;
  }

}
