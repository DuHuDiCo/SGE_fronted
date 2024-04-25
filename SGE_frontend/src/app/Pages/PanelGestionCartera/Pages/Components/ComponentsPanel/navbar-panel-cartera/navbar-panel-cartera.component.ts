import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-panel-cartera',
  templateUrl: './navbar-panel-cartera.component.html',
  styleUrls: ['./navbar-panel-cartera.component.css']
})
export class NavbarPanelCarteraComponent implements OnInit {

  @Input() btn: any;

  constructor() { }

  ngOnInit(): void {
  }

}
