import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  @Input() datosSidebar = {
    tituloPagina: '',
    opciones: [""],
    clases: [""],
    urls: [""]
  }


  constructor() { }

  ngOnInit(): void {
  }

}
