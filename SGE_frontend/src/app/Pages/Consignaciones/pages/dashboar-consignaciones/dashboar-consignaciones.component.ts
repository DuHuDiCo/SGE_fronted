import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboar-consignaciones',
  templateUrl: './dashboar-consignaciones.component.html',
  styleUrls: ['./dashboar-consignaciones.component.css']
})
export class DashboarConsignacionesComponent implements OnInit {

  datos = {
    "tituloPagina": "Departamento de Consignaciones",
    "opciones":["Escritorio", "Ingresar Consignaciones", "Consultar", "Reportes","Logout"],
    "clases":["fa-solid fa-house-user", "fa-solid fa-building-columns", "fa-solid fa-calendar-days", "fa-solid fa-chart-simple", "fa-solid fa-file-invoice"],
    "urls": ["", "ingresar", "consultar", "reportes",  ""]
  }

  cambio:number= 1;

  constructor() { }

  ngOnInit(): void {
  }


  

  cambiar(num:number){
    this.cambio = num;
  }

}
