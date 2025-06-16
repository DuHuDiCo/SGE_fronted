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
  idUser: number = 0; // Propiedades para almacenar el ID del usuario y los datos del usuario

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
  }; // Objeto que almacena los datos del usuario

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
  }; // Objeto que almacena los datos del usuario con formato que se enviará al backend

  constructor(
    private authenticationService: AuthenticationService,
    private buscarUsuariosService: BuscarUsuariosService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.obtenerDatosUsuario(); // Llama a la función para obtener los datos del usuario cuando el componente se carga
  }

  // Función que obtiene los datos del usuario autenticado
  obtenerDatosUsuario() {
    let usuarioNombre = this.authenticationService.getUsername(); // Obtiene el nombre de usuario actual

    // Si el nombre de usuario no es nulo, obtiene los detalles del usuario
    if (usuarioNombre !== null) {
      // Obtiene los datos del usuario por su nombre de usuario
      this.authenticationService.getUser(usuarioNombre).subscribe(
        (data: any) => {
          this.idUser = data.idUsuario; // Almacena el ID del usuario

          // Luego, obtiene más detalles del usuario con el ID
          this.buscarUsuariosService.getUserById(this.idUser).subscribe(
            (data: any) => {
              this.usuario = data; // Asigna los datos obtenidos al objeto 'usuario'
            },
            (error: any) => {
              console.log(error); // Si hay error, se muestra en la consola
            }
          );
        },
        (error: any) => {
          console.log(error); // Si hay error, se muestra en la consola
        }
      );
    } else {
      console.log('User is null'); // Si el nombre de usuario es nulo, muestra un mensaje en la consola
    }
  }

  // Función que se ejecuta al intentar actualizar los datos del usuario
  public onActualizarDatosUsuario() {
    // Verifica que todos los campos requeridos estén completos. Si algún campo está vacío, muestra un error.
    if (
      this.usuario.username.trim() == '' ||
      this.usuario.username.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar el Username', 'error');
      return; // Detiene la ejecución si falta algún dato
    }
    if (
      this.usuario.nombres.trim() == '' ||
      this.usuario.nombres.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar los Nombres', 'error');
      return; // Detiene la ejecución si falta algún dato
    }
    if (
      this.usuario.apellidos.trim() == '' ||
      this.usuario.apellidos.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar los Apellidos', 'error');
      return; // Detiene la ejecución si falta algún dato
    }
    if (this.usuario.sede.trim() == '' || this.usuario.sede.trim() == null) {
      Swal.fire('Error', 'Debe de Seleccionar La Sede', 'error');
      return; // Detiene la ejecución si falta algún dato
    }
    if (
      this.usuario.tipo_documento.trim() == '' ||
      this.usuario.tipo_documento.trim() == null
    ) {
      Swal.fire('Error', 'Debe de ingresar el Tipo De Doc', 'error');
      return; // Detiene la ejecución si falta algún dato
    }
    if (
      this.usuario.numero_documento == '' ||
      this.usuario.numero_documento == null
    ) {
      Swal.fire('Error', 'Debe ingresar el Numero de Doc', 'error');
      return; // Detiene la ejecución si falta algún dato
    }
    if (this.usuario.email.trim() == '' || this.usuario.email.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Email', 'error');
      return; // Detiene la ejecución si falta algún dato
    }
    if (this.usuario.celular == '' || this.usuario.celular == null) {
      Swal.fire('Error', 'Debe de ingresar el Celular', 'error');
      return; // Detiene la ejecución si falta algún dato
    }

    // Asigna los datos del objeto 'usuario' al objeto 'users' para prepararlos para la actualización
    this.users.idUsuario = this.usuario.idUsuario;
    this.users.username = this.usuario.username;
    this.users.nombres = this.usuario.nombres;
    this.users.apellidos = this.usuario.apellidos;
    this.users.tipoDocumento = this.usuario.tipo_documento;
    this.users.numeroDocumento = this.usuario.numero_documento;
    this.users.correo = this.usuario.email;
    this.users.telefono = this.usuario.celular;
    this.users.sede = this.usuario.sede;

    // Llama al servicio para actualizar los datos del usuario en el backend
    this.buscarUsuariosService.updateUser(this.users).subscribe(
      (data: any) => {
        // Si la actualización es exitosa, muestra una alerta de éxito y redirige al usuario a la página de perfil
        Swal.fire(
          'Datos de usuario actualizados',
          'Los datos de usuario han sido actualizados exitosamente',
          'success'
        ).then(() => {
          this.users = null; // Limpia los datos del usuario
          this.route.navigate(['/dashboard-perfil/datos'], {
            replaceUrl: true,
          }); // Redirige a la página de perfil
        });
      },
      (error: any) => {
        console.log(error); // Si hay un error en la actualización, muestra el error en la consola
      }
    );
  }

  // Función que redirige al perfil del usuario cuando se hace clic en "Volver"
  volverPerfil() {
    this.route.navigate(['/dashboard-perfil/datos'], {
      replaceUrl: true, // Redirige a la página de perfil sin guardar la ruta anterior en el historial
    });
  }
}
