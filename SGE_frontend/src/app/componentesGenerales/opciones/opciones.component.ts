import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  rolesUsuario: any = []

  roles = {
    cartera: false,
    caja: false,
    archivos: false,
    ventas: false,
    servicios: false,
    consignaciones: false,
    administracion: false,
    sst: false,
  }


  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.rolesUsuario = this.authService.getRoles();
    
    
    this.validarRoles()
  }


  public validarRoles() {
    for (var rol of this.rolesUsuario) {
      switch (rol.rol) {
        case "Cartera":
          this.roles.cartera = true
          break;
        case "Caja":
          this.roles.caja = true
          break;
        case "Archivos":
          this.roles.archivos = true
          break;
        case "Ventas":
          this.roles.ventas = true
          break;
        case "Servicios":
          this.roles.servicios = true
          break;
        case "Consignaciones":
          this.roles.consignaciones = true
          break;
        case "Sst":
          this.roles.sst = true
          break;
        case "Administrador":
          this.roles.cartera = true;
          this.roles.caja = true;
          this.roles.archivos = true;
          this.roles.ventas = true;
          this.roles.servicios = true
          this.roles.consignaciones = true;
          this.roles.administracion = true;
          this.roles.sst = true;
      }
    }
  }



}
