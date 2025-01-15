import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-datos-perfil',
  templateUrl: './datos-perfil.component.html',
  styleUrls: ['./datos-perfil.component.css']
})
export class DatosPerfilComponent implements OnInit {


  constructor(public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    console.log("Datos de inicio de sesion ", this.authenticationService.getRoles())

    // opcional
    console.log("Datos de inicio de sesion ", this.authenticationService.getRolesP().rol)

    console.log("Datos de inicio de sesion ", this.authenticationService.getSede())

    

    console.log("Datos de inicio de sesion ", this.authenticationService.getFecha())

    console.log("Datos de inicio de sesion ", this.authenticationService.getUsername())

    console.log("Datos de inicio de sesion ", this.authenticationService.getToken())

    const sede = this.authenticationService.getSede() || '';
    console.log("Datos de inicio de sesion ", this.authenticationService.setSede(sede))
    
  }

  public formatoFecha(fecha:Date){
    return fecha.toLocaleDateString('es-ES')
  }

}
