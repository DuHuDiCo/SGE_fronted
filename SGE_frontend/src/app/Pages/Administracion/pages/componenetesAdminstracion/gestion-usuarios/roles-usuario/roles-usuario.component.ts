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



  selectedRole: string[] = []
  selectedPermisos: string[] = []

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


  activarRol(rol: string) {

    if (this.selectedRole.includes(rol)) {
      var position = this.selectedRole.indexOf(rol)
      this.selectedRole.splice(position, 1)
    } else {
      this.selectedRole.push(rol)
    }
  }

  seleccionarAllRoles(rol: string) {
    const role = this.IterarRol.find((r: any) => r.rol == rol)
    if (role != null) {
      role.permissions.forEach((permi: any) => {
        this.selectedPermisos.push(permi.permission)
      });
    }

    console.log(this.selectedPermisos);
    

  }


}
