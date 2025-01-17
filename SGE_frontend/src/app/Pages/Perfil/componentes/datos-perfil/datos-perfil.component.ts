import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { HistorialRutasService } from 'src/app/Services/perfil/historial-rutas.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-datos-perfil',
  templateUrl: './datos-perfil.component.html',
  styleUrls: ['./datos-perfil.component.css'],
})
export class DatosPerfilComponent implements OnInit {
  rolesPermisos: { rol: string; permisos: string[] }[] = []; // Variable para almacenar roles y permisos
  idUser: number = 0; // Variable para almacenar el ID del usuario
  usuario: any = {}; // Variable para almacenar los datos del usuario

  constructor(
    public authenticationService: AuthenticationService,
    private buscarUsuariosService: BuscarUsuariosService,
    private historialRutasService: HistorialRutasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerRolesPermisos(); // Obtiene los roles y permisos del usuario
    this.obtenerDatosUsuario(); // Obtiene los datos del usuario
  }

  // Obtiene los roles y permisos del usuario autenticado desde el servicio AuthenticationService
  obtenerRolesPermisos() {
    let arrays = this.authenticationService.getRoles(); // Obtiene los roles desde el servicio de autenticación

    // Mapea los roles y extrae los permisos de cada uno
    this.rolesPermisos = arrays.map(
      (item: { rol: string; permisos: { permiso: string }[] }) => {
        return {
          rol: item.rol,
          permisos: item.permisos.map(
            (permiso: { permiso: string }) => permiso.permiso
          ), // Extrae los permisos de cada rol
        };
      }
    );
  }

  // Obtiene los datos del usuario autenticado
  obtenerDatosUsuario() {
    let usuarioNombre = this.authenticationService.getUsername(); // Obtiene el nombre de usuario actual

    // Si el nombre de usuario no es nulo, obtiene los detalles del usuario
    if (usuarioNombre !== null) {
      this.authenticationService.getUser(usuarioNombre).subscribe(
        (data: any) => {
          this.idUser = data.idUsuario; // Asigna el ID del usuario obtenido a 'idUser'

          // Obtiene más detalles del usuario con el ID
          this.buscarUsuariosService.getUserById(this.idUser).subscribe(
            (data: any) => {
              this.usuario = data; // Asigna los datos obtenidos al objeto 'usuario'

              // Convierte la fecha de la última sesión a un formato de fecha legible
              this.usuario.ultimaSesion = new Date(
                this.usuario.ultimaSesion
              ).toLocaleDateString('es-CO');
            },
            (error: any) => {
              console.log(error); // Si hay un error al obtener los datos, se muestra en consola
            }
          );
        },
        (error: any) => {
          console.log(error); // Si hay un error con la autenticación, se muestra en consola
        }
      );
    } else {
      console.log('User is null'); // Si el nombre de usuario es nulo, se muestra un mensaje
    }
  }

  // Redirige al usuario a la página de edición de perfil
  editarPerfil() {
    this.router.navigate(['/dashboard-perfil/editar-perfil'], {
      replaceUrl: true, // Redirige sin dejar la página de origen en el historial
    });
  }

  // Vuelve a la página anterior en el historial de navegación
  volverPaginaAnterior() {
    let ultimaRuta = this.historialRutasService.obtenerUltimaRuta(); // Obtiene la última ruta registrada en el historial de navegación

    // Si la última ruta es la de la edición de perfil, no hace nada
    if (ultimaRuta == '/dashboard-perfil/editar-perfil') {
      this.historialRutasService.obtenerUltimaRuta();
    } else {
      // Si no, vuelve a la página anterior
      this.location.back();
    }
  }

  // Cierra la sesión del usuario y recarga la página
  logout(): void {
    this.authenticationService.logout(); // Llama al servicio de logout
    window.location.reload(); // Recarga la página para reflejar los cambios
  }
}
