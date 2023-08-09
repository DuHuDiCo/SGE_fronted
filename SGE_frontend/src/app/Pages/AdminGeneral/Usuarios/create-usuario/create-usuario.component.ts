import { Component, OnInit } from '@angular/core';
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

  constructor(private usuarioagService:UsuarioAgService) { }

  rolePermissionsVisibility: { [role: string]: boolean } = {};
  selectedRolePermissions: { [role: string]: string[] } = {};

  rol: boolean = false;


  selectedRole: string | null = null;

  usuario: Usuario = {
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

  IterarRol:Roles[] = []

  roles:RolesUser = {
    rol: "",
    permisos : []
  }

  ngOnInit(): void { 
    this.usuarioagService.listarRoles().subscribe(
      (data:any) => {
        this.IterarRol = data;
        console.log(this.IterarRol)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  guardarUsuario(){
    // if(this.usuario.username.trim() == '' || this.usuario.username.trim() == null){
    //   Swal.fire('Error', 'Debe de ingresar el Username', 'error')
    //   return
    // }
    // if(this.usuario.nombres.trim() == '' || this.usuario.nombres.trim() == null){
    //   Swal.fire('Error', 'Debe de ingresar los Nombres', 'error')
    //   return
    // }
    // if(this.usuario.password.trim() == '' || this.usuario.password.trim() == null){
    //   Swal.fire('Error', 'Debe de ingresar la Contraseña', 'error')
    //   return
    // }
    // if(this.usuario.apellidos.trim() == '' || this.usuario.apellidos.trim() == null){
    //   Swal.fire('Error', 'Debe de ingresar los Apellidos', 'error')
    //   return
    // }
    // if(this.usuario.tipo_documento.trim() == '' || this.usuario.tipo_documento.trim() == null){
    //   Swal.fire('Error', 'Debe de ingresar el Tipo De Doc', 'error')
    //   return
    // }
    // if (typeof this.usuario.numero_documento === 'string' && this.usuario.numero_documento.trim() === '') {
    //   Swal.fire('Error', 'Debe ingresar el Numero de Doc', 'error');
    //   return;
    // }
    
    // if(this.usuario.email.trim() == '' || this.usuario.email.trim() == null){
    //   Swal.fire('Error', 'Debe de ingresar el Email', 'error')
    //   return
    // }
    // if(typeof this.usuario.celular === 'string' && this.usuario.celular.trim() == ''){
    //   Swal.fire('Error', 'Debe de ingresar el Celular', 'error')
    //   return
    // }
    // if (this.usuario.fecha_nacimiento instanceof Date || this.usuario.fecha_nacimiento == null) {
    //   Swal.fire('Error', 'Debe ingresar la Fecha de Nacimiento', 'error');
    //   return;
    // }
    

    this.rol = true;
  }

  resetRoleSelection() {
    this.selectedRole = null;
    this.rolePermissionsVisibility = {}; 
  }

  activarRol(role: string) {
    if (this.rolePermissionsVisibility[role] === undefined) {
      this.rolePermissionsVisibility[role] = true; 
    } else {
      this.rolePermissionsVisibility[role] = !this.rolePermissionsVisibility[role]; // Alternar visibilidad
    }
  }

  seleccionarTodosPermisos(role: string) {
    const rolePermissions = this.IterarRol.find(r => r.rol === role)?.permissions;

    if (rolePermissions) {
      if (this.selectedRolePermissions[role]?.length === rolePermissions.length) {
        this.selectedRolePermissions[role] = []; // Deseleccionar todos los permisos
      } else {
        this.selectedRolePermissions[role] = rolePermissions.map(pr => pr.permission);
      }
    }
  }

  handlePermissionSelection(role: string, permission: string) {
    const selectedPermissions = this.selectedRolePermissions[role] || [];

    const permissionIndex = selectedPermissions.indexOf(permission);

    if (permissionIndex === -1) {
      selectedPermissions.push(permission);
    } else {
      selectedPermissions.splice(permissionIndex, 1);
    }

    this.selectedRolePermissions[role] = selectedPermissions;
  }

  crearUsuario(){

   
    

    // if(this.usuario.roles.length === 0 || this.usuario.roles === null){
    //   Swal.fire('Error', 'Debe añadir Minimamente un rol ', 'error');
    // }

    // if (!this.usuario.roles[0] || this.usuario.roles[0].rol == '' || this.usuario.roles[0].rol == null){
    //   Swal.fire('Error', 'Debe añadir Minimamente un rol ', 'error');
    //   return;
    // }
    
    // if (!this.usuario.roles[0].permisos[0] || this.usuario.roles[0].permisos[0] == ''  || this.usuario.roles[0].permisos[0] == null){
    //   Swal.fire('Error', 'Debe añadir Minimamente un Permiso ', 'error');
    //   return;
    // }

    var rolesKey = Object.keys(this.selectedRolePermissions)

   
    for (const rol of rolesKey) {
      var r:RolesUser = {
        "rol": rol,
        "permisos": []
      }
      this.usuario.roles.push(r);
    }
    
   console.log(this.rolePermissionsVisibility);
   console.log(this.selectedRolePermissions);
   
    console.log(this.usuario);
    


    // this.usuarioagService.crearUsuario(this.usuario).subscribe(
    //   (data) => {
    //     console.log(data);
    //     Swal.fire('Usuario Creado','El usuario ha sido Creado Con Exito', 'success')
    //     this.rol = false;
    //   },
    //   (error) => {
    //     console.log(error)
    //     Swal.fire('Error al Crear El usuario','Error al Crear El usuario', 'error')
    //   }
    // )
  }

}
