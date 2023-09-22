import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAgService } from 'src/app/Services/usuario-adminGeneral/usuario-ag.service';
import { Roles, RolesUser } from 'src/app/Types/Roles';
import { Usuario } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  constructor(private userAgService: UsuarioAgService, private usuarioagService: UsuarioAgService, private router: Router) { }

  rolePermissionsVisibility: { [role: string]: boolean } = {};
  selectedRolePermissions: { [role: string]: string[] } = {};

  selectedRole: number[] = []
  selectedPermisos: number[] = []

  usuario: any = {
    "usuario": {},
    "roles": []
  }

  check: any[] = []

  permisosUsuarios = {
    idRole: '',
    Permissions: ''
  }

  IterarRol: Roles[] = []

  role: RolesUser = {
    rol: "",
    permisos: []
  }

  usuarios: Usuario = {
    username: "",
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    tipo_documento: "",
    numero_documento: "",
    celular: "",
    fecha_nacimiento: new Date(),
    roles: []
  }

  roles: RolesUser = {
    rol: "",
    permisos: []
  }

  ngOnInit(): void {
    this.userAgService.listarRoles().subscribe(
      (data: any) => {
        this.IterarRol = data;
        console.log(this.IterarRol)
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  guardarUsuario() {
     
    if (this.usuarios.username.trim() == '' || this.usuarios.username.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Username', 'error')
      return
    }
    if (this.usuarios.nombres.trim() == '' || this.usuarios.nombres.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar los Nombres', 'error')
      return
    }
    if (this.usuarios.password.trim() == '' || this.usuarios.password.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar la Contraseña', 'error')
      return
    }
    if (this.usuarios.apellidos.trim() == '' || this.usuarios.apellidos.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar los Apellidos', 'error')
      return
    }
    if (this.usuarios.tipo_documento.trim() == '' || this.usuarios.tipo_documento.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Tipo De Doc', 'error')
      return
    }
    if (typeof this.usuarios.numero_documento === 'string' && this.usuarios.numero_documento.trim() === '') {
      Swal.fire('Error', 'Debe ingresar el Numero de Doc', 'error');
      return;
    }

    if (this.usuarios.email.trim() == '' || this.usuarios.email.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Email', 'error')
      return
    }
    if (typeof this.usuarios.celular === 'string' && this.usuarios.celular.trim() == '') {
      Swal.fire('Error', 'Debe de ingresar el Celular', 'error')
      return
    }
    if (this.usuarios.fecha_nacimiento instanceof Date || this.usuarios.fecha_nacimiento == null) {
      Swal.fire('Error', 'Debe ingresar la Fecha de Nacimiento', 'error');
      return;
    }

    this.userAgService.setUsuario(this.usuarios)

    this.router.navigate(['/dashboard-admin-general/roles-usuario'])
    
  
  }
}
