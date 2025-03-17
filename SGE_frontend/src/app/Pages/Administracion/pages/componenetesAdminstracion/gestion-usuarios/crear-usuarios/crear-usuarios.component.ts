import { Component, OnInit } from '@angular/core';
import { SedeService } from 'src/app/Services/Consignaciones/Sedes/sede.service';
import { GuardarUsuariosAdminService } from 'src/app/Services/guardarUsuariosAdmin/guardar-usuarios-admin.service';
import { RolesUser } from 'src/app/Types/Roles';
import { Sede } from 'src/app/Types/Sede';
import { Usuario } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit {
  constructor(
    private guardarUsuariosAdmin: GuardarUsuariosAdminService,
    private sede: SedeService
  ) {}

  usuarios: Usuario = {
    username: '',
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    tipo_documento: '',
    numero_documento: '',
    celular: '',
    sede: '',
    fecha_nacimiento: new Date(),
    roles: [],
  };

  roles: RolesUser = {
    rol: '',
    permisos: [],
  };

  Sede: Sede[] = [];

  guardarUsuario() {
    if (
      this.usuarios.username.trim() == '' ||
      this.usuarios.username.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el username',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuarios.nombres.trim() == '' ||
      this.usuarios.nombres.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el nombre',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuarios.apellidos.trim() == '' ||
      this.usuarios.apellidos.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el apellido',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuarios.tipo_documento.trim() == '' ||
      this.usuarios.tipo_documento.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el tipo de documento',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuarios.numero_documento.trim() == '' ||
      this.usuarios.numero_documento.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el numero de documento',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuarios.email.trim() == '' ||
      this.usuarios.email.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el email',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.usuarios.celular.trim() == '' ||
      this.usuarios.celular.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar el celular',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.guardarUsuariosAdmin.setUsuario(this.usuarios);
  }

  obtenerSede() {
    this.sede.getSedes().subscribe(
      (data: any) => {
        this.Sede = data;
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar las sedes',
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

  ngOnInit(): void {}
}
