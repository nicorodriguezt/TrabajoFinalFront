import { Component, OnInit } from '@angular/core';
import { Menu } from '../../_models/Menu';

@Component({
  selector: 'app-ver-menu-view',
  templateUrl: './ver-menu-view.component.html',
  styleUrls: ['./ver-menu-view.component.css']
})
export class VerMenuViewComponent implements OnInit {
  Menu = new Menu("2018-09-26", null, null);

  constructor() { }

  ngOnInit() {
  }

}
