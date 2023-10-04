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
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  ngOnInit(): void {
    this.listarUsuarios();
  }

  usuarios: users[] = []

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  nombre: string = ''

  datos: Datos = {
    username: '',
    passwordUser: '',
    datoToDelete: ''
  }

  constructor(private usuariosService: BuscarUsuariosService, private authService: AuthenticationService) { }

  private listarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data;
        
      },
      (error: any) => {
        
        Swal.fire('ERROR', 'Error al cargar los usuarios', 'error');
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
          
          Swal.fire('ERROR', 'Error al filtrar los Usuarios', 'error');
        }
      );
    } else {
      this.listarUsuarios();
    }
  }

  public desactivarUsuario() {

    let username = this.authService.getUsername();

    if (username === null) {
      Swal.fire('ERROR', 'Error al Desactivar el Usuario', 'error');
      return;
    }

    this.datos.username = username;


    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire('ERROR', 'Debe colocar la Contraseña', 'error');
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.desactivarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire('Usuario Desactivado', 'El Usuario ha sido Desactivado Exitosamente', 'success');
            this.datos = {
              username: "",
              passwordUser: "",
              datoToDelete: ""
            };
            window.location.reload()
          },
          (error: any) => {
            
            Swal.fire('ERROR', 'Error al Desactivar el Usuario', 'error');
          }
        );
      }
    });
  }

  public activarUsuario() {

    let username = this.authService.getUsername()

    if (username === null) {
      Swal.fire('ERROR', 'Error al Desactivar el Usuario', 'error');
      return;
    }

    this.datos.username = username

    if (this.datos.passwordUser == '' || this.datos.passwordUser == null) {
      Swal.fire('ERROR', 'Debe colocar la Contraseña', 'error')
      return
    }

    Swal.fire({
      title: 'Activar El Cliente',
      text: '¿Estas seguro de Activar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.activarUsuario(this.datos).subscribe(
          (data: any) => {
            Swal.fire('Usuario Activado', 'El Usuario ha sido Activado Exitosamente', 'success');
            this.datos = {
              username: "",
              passwordUser: "",
              datoToDelete: ""
            };
            window.location.reload()
          },
          (error: any) => {
            Swal.fire('ERROR', 'Error al Activar el Usuario', 'error')
          }
        )
      }
    })
  }
}
