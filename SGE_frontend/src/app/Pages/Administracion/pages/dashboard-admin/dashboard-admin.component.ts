import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  datos = {
    "tituloPagina": "Departamento de Administracion",
    "opciones":["Escritorio", "Gestion Usuarios", "Crear Usuarios",  "Logout"],
    "clases":["fa-solid fa-house-user", "fa-solid fa-building-columns", "fa-solid fa-calendar-days", "fa-solid fa-chart-simple", "fa-solid fa-right-from-bracket"],
    "urls": ["", "/administracion/gestionUsuarios", "/administracion/crearUsuarios", ""]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
