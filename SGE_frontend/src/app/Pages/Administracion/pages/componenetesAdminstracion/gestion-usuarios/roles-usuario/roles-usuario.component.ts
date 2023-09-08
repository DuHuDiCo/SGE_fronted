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



  selectedRole: number[] = []
  selectedPermisos: number[] = []

  usuario: any = {
    "usuario": {},
    "roles": []
  }

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


  activarRol(rol: number) {

    if (this.selectedRole.includes(rol)) {
      var position = this.selectedRole.indexOf(rol)
      this.selectedRole.splice(position, 1)
    } else {
      this.selectedRole.push(rol)

    }



  }

  seleccionarAllRoles(rol: number) {
    const role = this.IterarRol.find((r: any) => r.idRole == rol)
    if (role != null) {
      var vali = this.usuario.roles.find((r: any) => r.id == rol)

      if (vali != null || vali != undefined) {
        if (vali.permisos.length > 0) {

          vali.permisos.forEach((p: any) => {
            if (this.selectedPermisos.includes(p)) {
              var position = this.selectedPermisos.indexOf(p)
              this.selectedPermisos.splice(position, 1)

            }
          });

          vali.permisos = []

        } else {
          role.permissions.forEach(element => {
            this.selectedPermisos.push(element.idPermission)
          });

          vali.permisos = role.permissions

        }



      } else {

        var roles: any = []

        role.permissions.forEach((p: any) => {
          this.selectedPermisos.push(p.idPermission)
          roles.push(p.idPermission)
        });

        var roleDto = {
          "id": rol,
          "permisos": roles
        }

        this.usuario.roles.push(roleDto)

      }

    }

    console.log(this.selectedPermisos);


  }

  selecionarPermiso(permiso: number, rol: number) {
    const role = this.IterarRol.find((r: any) => r.idRole == rol)
    alert(role)
    if (role != null || role != undefined) {
      const vali = this.usuario.roles.find((r:any)=>r.id == rol)
      alert(vali)
      if(vali != null || vali != undefined){
        if(vali.permisos > 0){

        }else{
          this.selectedPermisos.push(permiso)

        }
      }else{
        this.selectedPermisos.push(permiso)
        alert(permiso)

        var rolDto:any = {
          "id": rol,
          "permisos":[]
        }

        role.permissions.forEach(element => {
          if(this.selectedPermisos.includes(element.idPermission)){
            rolDto.permisos.push(element.idPermission)
          }
        });

        this.usuario.roles.push(rolDto)
        console.log(this.selectedPermisos);
        
      }

    }

   


  }


  guardar() {
    console.log(this.usuario);

  }




}
