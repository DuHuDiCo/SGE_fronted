import { Component, OnInit } from '@angular/core';
import { UsuarioAgService } from 'src/app/Services/usuario-adminGeneral/usuario-ag.service';
import { Roles, RolesUser } from 'src/app/Types/Roles';

@Component({
  selector: 'app-roles-usuario',
  templateUrl: './roles-usuario.component.html',
  styleUrls: ['./roles-usuario.component.css']
})
export class RolesUsuarioComponent implements OnInit {

  constructor(private userAgService: UsuarioAgService, private usuarioagService: UsuarioAgService) { }

  selectedRolePermissions: { [role: string]: string[] } = {};

  selectedRole: string[] = []

  permisosUsuarios = {
    idRole: '',
    Permissions: ''
  }

  IterarRol: Roles[] = []

  role: RolesUser = {
    rol: "",
    permisos: []
  }

  ngOnInit(): void {
    this.userAgService.listarRoles().subscribe(
      (data: any) => {
        this.IterarRol = data;
        console.log(this.IterarRol)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  seleccionarTodosPermisos(role: string) {
    const rolePermissions = this.IterarRol.find(r => r.rol === role)?.permissions;

    if (rolePermissions) {
      if (this.selectedRolePermissions[role]?.length === rolePermissions.length) {
        this.selectedRolePermissions[role] = []; 
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

  activarRol(rol: string) {

    if (this.selectedRole.includes(rol)) {
      var position = this.selectedRole.indexOf(rol)
      this.selectedRole.splice(position, 1)
    } else {
      this.selectedRole.push(rol)
    }
  }

  rol: boolean = false;
  
}
