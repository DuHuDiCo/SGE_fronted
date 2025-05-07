import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SedeService } from 'src/app/Services/Consignaciones/Sedes/sede.service';
import { UsuarioAgService } from 'src/app/Services/usuario-adminGeneral/usuario-ag.service';
import { Roles, RolesUser } from 'src/app/Types/Roles';
import { Sede } from 'src/app/Types/Sede';
import { Usuario } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css'],
})
export class CreateUsuarioComponent implements OnInit {
  constructor(
    private userAgService: UsuarioAgService,
    private usuarioagService: UsuarioAgService,
    private router: Router,
    private sede: SedeService
  ) {}

  rolePermissionsVisibility: { [role: string]: boolean } = {};
  selectedRolePermissions: { [role: string]: string[] } = {};

  selectedRole: number[] = [];
  selectedPermisos: number[] = [];

  usuario: any = {
    usuario: {},
    roles: [],
  };

  check: any[] = [];

  permisosUsuarios = {
    idRole: '',
    Permissions: '',
  };

  IterarRol: Roles[] = [];

  role: RolesUser = {
    rol: '',
    permisos: [],
  };

  usuarios: Usuario = {
    username: '',
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    tipo_documento: '',
    numero_documento: '',
    celular: '',
    fecha_nacimiento: new Date(),
    sede: '',
    roles: [],
  };

  roles: RolesUser = {
    rol: '',
    permisos: [],
  };

  Sede: Sede[] = [];

  ngOnInit(): void {
    this.userAgService.listarRoles().subscribe(
      (data: any) => {
        this.IterarRol = data;
      },
      (error: any) => {}
    );

    this.obtenerSede();
  }

  guardarUsuario() {
    if (
      this.usuarios.username.trim() == '' ||
      this.usuarios.username.trim() == null
    ) {
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
    if (
      this.usuarios.nombres.trim() == '' ||
      this.usuarios.nombres.trim() == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de ingresar los nombres',
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
        text: 'Debe de ingresar los apellidos',
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
        text: 'Debe de ingresar el tipo de doc',
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
      typeof this.usuarios.numero_documento === 'string' &&
      this.usuarios.numero_documento.trim() === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar el número de doc',
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
      typeof this.usuarios.celular === 'string' &&
      this.usuarios.celular.trim() == ''
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
    if (
      this.usuarios.fecha_nacimiento instanceof Date ||
      this.usuarios.fecha_nacimiento == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ingresar la fecha de nacimiento',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.userAgService.setUsuario(this.usuarios);

    this.router.navigate(['/dashboard-admin-general/roles-usuario']);
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
          text: 'Error al cargar las Sedes',
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
}
