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
    // Buscar el rol correspondiente en el arreglo IterarRol
    const roleObj = this.IterarRol.find(r => r.rol === role);

    if (roleObj) {
      const selectedPermissions = roleObj.permissions.map(pr => pr.permission);

      if (this.todosLosPermisosEstanSeleccionados(role)) {

        this.deseleccionarPermisos(role);
      } else {

        this.seleccionarPermisos(role, selectedPermissions);
      }
    }
  }

  private todosLosPermisosEstanSeleccionados(role: string): boolean {

    return (
      this.selectedRolePermissions[role]?.length ===
      this.IterarRol.find(r => r.rol === role)?.permissions.length
    );
  }

  private seleccionarPermisos(role: string, permissions: string[]): void {

    this.selectedRolePermissions[role] = permissions.slice();
  }

  private deseleccionarPermisos(role: string): void {

    this.selectedRolePermissions[role] = [];
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
