import { Component, OnInit } from '@angular/core';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { users } from 'src/app/Types/Usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class BuscarUsuariosComponent implements OnInit {

  usuarios: users[] = []

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  cedula: string = ''

  constructor(private usuariosService: BuscarUsuariosService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  private listarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('ERROR', 'Error al cargar los usuarios', 'error');
      }
    );
  }

  public filtrarUsuarios() {
    this.usuarios = [];
    if (this.cedula) {
      this.usuariosService.filtrarUsuarios(this.cedula).subscribe(
        (data: any) => {
          this.usuarios.push(data);
          console.log(this.usuarios);
        },
        (error: any) => {
          console.log(error);
          Swal.fire('ERROR', 'Error al filtrar los Usuarios', 'error');
        }
      );
    } else {
      this.listarUsuarios();
    }
  }

  public eliminarUsuario(idUsuario: Number) {

    let username = this.authService.getUsername()

    Swal.fire({
      title: 'Eliminar El Usuario',
      text: '¿Estas seguro de eliminar el Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuario(idUsuario, username).subscribe(
          (data: any) => {
            this.usuarios = this.usuarios.filter((usuario: users) => usuario.idUsuario != idUsuario);
            Swal.fire('Usuario Eliminado', 'El Usuario ha sido Eliminado Exitosamente', 'success')
          },
          (error: any) => {
            console.log(error
            );

            Swal.fire('ERROR', 'Error al Eliminar el Usuario', 'error')
          }
        )
      }
    })
  }
}






