import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-perfil',
  templateUrl: './datos-perfil.component.html',
  styleUrls: ['./datos-perfil.component.css'],
})
export class DatosPerfilComponent implements OnInit {
  rolesPermisos: { rol: string; permisos: string[] }[] = [];
  idUser: number = 0;
  usuario: any = {};

  constructor(
    public authenticationService: AuthenticationService,
    private buscarUsuariosService: BuscarUsuariosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerRolesPermisos();
    this.obtenerDatosUsuario();
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

  obtenerDatosUsuario() {
    let usuarioNombre = this.authenticationService.getUsername();

    if (usuarioNombre !== null) {
      this.authenticationService.getUser(usuarioNombre).subscribe(
        (data: any) => {
          this.idUser = data.idUsuario;

          this.buscarUsuariosService.getUserById(this.idUser).subscribe(
            (data: any) => {
              this.usuario = data;
              console.log(this.usuario.ultimaSesion);

              this.usuario.ultimaSesion = new Date(
                this.usuario.ultimaSesion
              ).toLocaleDateString('es-CO'); // Convertir la fecha a string
            },
            (error: any) => {
              console.log(error);
            }
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log('User is null');
    }
  }

  volverPaginaAnterior() {
    this.location.back();
  }

  logout(): void {
    this.authenticationService.logout();
    window.location.reload();
  }
}
