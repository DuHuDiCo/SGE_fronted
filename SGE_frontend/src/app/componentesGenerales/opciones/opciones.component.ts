import { Component, OnInit } from '@angular/core';

import Roles from 'src/app/Models/Roles';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ROLES, RolesUsuario } from 'src/app/Types/Roles';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  rolesUsuario: Roles[] = []
  


  role =ROLES.Administration;

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  


  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    
  }


  



  logout(): void {
    this.authService.logout();
    window.location.reload()
  }

}
