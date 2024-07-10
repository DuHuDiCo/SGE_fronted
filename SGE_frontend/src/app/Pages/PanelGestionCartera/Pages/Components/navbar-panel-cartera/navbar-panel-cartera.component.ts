import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-panel-cartera',
  templateUrl: './navbar-panel-cartera.component.html',
  styleUrls: ['./navbar-panel-cartera.component.css']
})
export class NavbarPanelCarteraComponent implements OnInit {

  modoGestion: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
