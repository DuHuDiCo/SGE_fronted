import { Component, OnInit } from '@angular/core';
import { map } from 'jquery';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';

@Component({
  selector: 'app-datos-perfil',
  templateUrl: './datos-perfil.component.html',
  styleUrls: ['./datos-perfil.component.css'],
})
export class DatosPerfilComponent implements OnInit {
  public rolesPermisos: { rol: string; permisos: string[] }[] = [];

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.obtenerRolesPermisos();
  }

  obtenerRolesPermisos() {
    let arrays = this.authenticationService.getRoles();
    this.rolesPermisos = arrays.map(
      (item: { rol: string; permisos: { permiso: string }[] }) => {
        return {
          rol: item.rol,
          permisos: item.permisos.map(
            (permiso: { permiso: string }) => permiso.permiso
          ), // Extraemos los permisos
        };
      }
    );
  }

  logout(): void {
    this.authenticationService.logout();
    window.location.reload();
  }
}
