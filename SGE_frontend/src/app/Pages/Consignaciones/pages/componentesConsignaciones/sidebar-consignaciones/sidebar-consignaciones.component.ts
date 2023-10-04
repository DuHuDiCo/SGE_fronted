import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-sidebar-consignaciones',
  templateUrl: './sidebar-consignaciones.component.html',
  styleUrls: ['./sidebar-consignaciones.component.css']
})
export class SidebarConsignacionesComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  permisos: string[] = [
    // 0
    "CREAR CONSIGNACIONES",
    // 1
    "CONSULTAR COMPROBADOS",
    // 2
    "CONSULTAR APLICADOS",
    // 3
    "COMPROBAR CONSIGNACIONES",
    // 4
    "APLICAR CONSIGNACIONES",
    // 5
    "EDITAR CONSIGNACIONES",
    // 6
    "FILTRAR ESTADO",
    // 7
    "FILTRAR SEDE",
    // 8
    "FILTRAR FECHA",
    // 9
    "FILTRAR CEDULA",
    // 10
    "GENERAR REPORTE PENDIENTES",
    // 11
    "GENERAR REPORTES COMPROBADAS",
    // 12
    "GENERAR REPORTE APLICADAS",
    // 13
    "VER OBSERVACIONES",
    // 14
    "VER COMPROBANTE",
    // 15
    "VER HISTORIAL",
    // 16
    "VER REPORTES GENERAL",
    // 17
    "VER REPORTES APLICADOS",
    // 18
    "VER REPORTES COMPROBADOS",
    // 19
    "VER REPORTES PENDIENTES",
    // 20
    "FILTRAR REPORTES FECHA",
    // 21
    "FILTRAR REPORTES USUARIO",
    // 22
    "CONFIGURACIONES",
    // 23
    "INFORMES"
  ]

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
