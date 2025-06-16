import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Datos } from 'src/app/Types/DatosUsuarios';
import { users } from 'src/app/Types/Usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent implements OnInit {
  ngOnInit(): void {
    this.listarUsuarios();
  }

  usuarios: users[] = [];

  page: number = 0;
  size: number = 10;

  rolesArray: string[] = [
    'Cartera',
    'Caja',
    'Archivos',
    'Ventas',
    'Servicios',
    'Consignaciones',
    'SUPERADMINISTRADOR',
    'SST',
  ];

  nombre: string = '';

  datos: Datos = {
    username: '',
    passwordUser: '',
    datoToDelete: '',
  };

  constructor(
    private usuariosService: BuscarUsuariosService,
    private authService: AuthenticationService
  ) {}

  private listarUsuarios() {
    this.usuariosService.listarUsuarios(this.page, this.size).subscribe(
      (data: any) => {
        this.usuarios = data;
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los usuarios',
          iconColor: '#960010',
          confirmButtonColor: '#960010',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'text-white btn border-0 rounded-pill px-4',
          },
        });
      }
    );
  }

  public filtrarUsuarios() {
    this.usuarios = [];
    if (this.nombre) {
      this.usuariosService.filtrarUsuarios(this.nombre).subscribe(
        (data: any) => {
          this.usuarios.push(data);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al filtrar los usuarios',
            iconColor: '#960010',
            confirmButtonColor: '#960010',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
        }
      );
    } else {
      this.listarUsuarios();
    }
  }

  public desactivarUsuario() {
    let username = this.authService.getUsername();

    if (username === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el nombre de usuario',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.datos.username = username;

    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe colocar la contraseña',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Desactivar El Cliente',
      text: '¿Estás seguro de Desactivar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-4',
        confirmButton: 'text-white btn border-0 rounded-pill px-4',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.desactivarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario desactivado',
              text: 'El usuario ha sido desactivado exitosamente',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            this.datos = {
              username: '',
              passwordUser: '',
              datoToDelete: '',
            };
            window.location.reload();
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al desactivar el usuario',
              iconColor: '#960010',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
          }
        );
      }
    });
  }

  public activarUsuario() {
    let username = this.authService.getUsername();

    if (username === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el nombre de usuario',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.datos.username = username;

    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe colocar la contraseña',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    Swal.fire({
      title: 'Activar El Cliente',
      text: '¿Estas seguro de Activar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-4',
        confirmButton: 'text-white btn border-0 rounded-pill px-4',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.activarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario activado',
              text: 'El usuario ha sido activado exitosamente',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            this.datos = {
              username: '',
              passwordUser: '',
              datoToDelete: '',
            };
            window.location.reload();
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al activar el usuario',
              iconColor: '#960010',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
          }
        );
      }
    });
  }
}
