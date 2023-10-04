import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Roles from 'src/app/Models/Roles';
import { OpcionesService } from 'src/app/Services/Opciones/opciones.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ROLES, RolesUsuario } from 'src/app/Types/Roles';
declare var window: any;

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  rolesUsuario: Roles[] = []
  


  role =ROLES.Administration;

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  


  constructor(private authService: AuthenticationService, private opcionesService:OpcionesService, private router:Router) { }

  ngOnInit(): void {
    if(!this.opcionesService.getUpdate()){
      this.router.navigate(['cambioContrasena'])
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload()
  }

}
