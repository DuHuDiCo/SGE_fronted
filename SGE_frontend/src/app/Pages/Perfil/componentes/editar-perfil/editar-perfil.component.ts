import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  idUser: number = 0;

  usuario: any = {
    username: '',
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    tipo_documento: '',
    numero_documento: '',
    celular: '',
    sede: '',
    roles: [],
    idUsuario: 0,
  };

  users: any = {
    idUsuario: 0,
    username: '',
    nombres: '',
    apellidos: '',
    sede: '',
    tipoDocumento: '',
    numeroDocumento: '',
    correo: '',
    telefono: '',
  };

  constructor(
    private authenticationService: AuthenticationService,
    private buscarUsuariosService: BuscarUsuariosService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.obtenerDatosUsuario();
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

  public onActualizarDatosUsuario() {
    if (
      this.usuario.username.trim() == '' ||
      this.usuario.username.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar el Username', 'error');
      return;
    }
    if (
      this.usuario.nombres.trim() == '' ||
      this.usuario.nombres.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar los Nombres', 'error');
      return;
    }
    if (
      this.usuario.apellidos.trim() == '' ||
      this.usuario.apellidos.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar los Apellidos', 'error');
      return;
    }
    if (this.usuario.sede.trim() == '' || this.usuario.sede.trim() == null) {
      Swal.fire('Error', 'Debe de Seleccionar La Sede', 'error');
      return;
    }
    if (
      this.usuario.tipo_documento.trim() == '' ||
      this.usuario.tipo_documento.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar el Tipo De Doc', 'error');
      return;
    }
    if (
      this.usuario.numero_documento == '' ||
      this.usuario.numero_documento == null
    ) {
      Swal.fire('Error', 'Debe ingresar el Numero de Doc', 'error');
      return;
    }

    if (this.usuario.email.trim() == '' || this.usuario.email.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Email', 'error');
      return;
    }
    if (this.usuario.celular == '' || this.usuario.celular == null) {
      Swal.fire('Error', 'Debe de ingresar el Celular', 'error');
      return;
    }

    this.users.idUsuario = this.usuario.idUsuario;
    this.users.username = this.usuario.username;
    this.users.nombres = this.usuario.nombres;
    this.users.apellidos = this.usuario.apellidos;
    this.users.tipoDocumento = this.usuario.tipo_documento;
    this.users.numeroDocumento = this.usuario.numero_documento;
    this.users.correo = this.usuario.email;
    this.users.telefono = this.usuario.celular;
    this.users.sede = this.usuario.sede;

    this.buscarUsuariosService.updateUser(this.users).subscribe(
      (data: any) => {
        Swal.fire(
          'Datos de usuario actualizados',
          'Los datos de usuario han sido actualizados exitosamente',
          'success'
        ).then(() => {
          this.users = null;
          this.route.navigate(['/dashboard-perfil/datos'], {
            replaceUrl: true,
          });
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  volverPerfil() {
    this.route.navigate(['/dashboard-perfil/datos'], {
      replaceUrl: true,
    });
  }
}
