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

  rolePermissionsVisibility: { [role: string]: boolean } = {};
  selectedRolePermissions: { [role: string]: string[] } = {};

  selectedRole:string [] = []

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
    
    const selectedRole = this.IterarRol.find(r => r.rol === role);
  
    if (selectedRole) {
      const rolePermissions = selectedRole.permissions.map(pr => pr.permission);
  
      const allSelected = rolePermissions.every(permission =>
        this.selectedRolePermissions[role]?.includes(permission)
      );

      if (allSelected) {
        this.selectedRolePermissions[role] = [];
      } else {
        this.selectedRolePermissions[role] = [...rolePermissions];
      }
    }
  }
  

  activarRol(rol: string) {

    if (this.selectedRole.includes(rol)) {
      var position = this.selectedRole.indexOf(rol)
      this.selectedRole.splice(position, 1)
    } else {
      this.selectedRole.push(rol)
    }
  }
}
