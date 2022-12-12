import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  datos = {
    "tituloPagina": "Departamento de Cartera",
    "opciones":["Escritorio", "Tasa de Cobro", "Calendario", "Estadisticas", "Facturacion", "Gestion", "Revisiones", "Configuraciones", "Logout"],
    "clases":["fa-solid fa-house-user", "fa-solid fa-building-columns", "fa-solid fa-calendar-days", "fa-solid fa-chart-simple", "fa-solid fa-file-invoice", "fa-solid fa-credit-card", "fa-solid fa-eye", "fa-solid fa-gear", "fa-solid fa-right-from-bracket"],
    "urls": ["", "", "", "", "", "/gestion", "", "", ""]
  }
   
  constructor() { }

  ngOnInit(): void {
  }

}
