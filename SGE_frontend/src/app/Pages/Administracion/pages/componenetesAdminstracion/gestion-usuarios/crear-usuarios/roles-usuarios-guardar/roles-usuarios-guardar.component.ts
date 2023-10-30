import { Component, OnInit } from '@angular/core';
import { UsuarioAgService } from 'src/app/Services/usuario-adminGeneral/usuario-ag.service';
import { Roles, RolesUser } from 'src/app/Types/Roles';

@Component({
  selector: 'app-roles-usuarios-guardar',
  templateUrl: './roles-usuarios-guardar.component.html',
  styleUrls: ['./roles-usuarios-guardar.component.css']
})
export class RolesUsuariosGuardarComponent implements OnInit {

  constructor(private userAgService: UsuarioAgService) { }

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

  ngOnInit(): void {
    this.userAgService.listarRoles().subscribe(
      (data: any) => {
        this.IterarRol = data;
        
      },
      (error: any) => {
        
      }
    )
  }

  activarRol(rol: number) {

    if (this.selectedRole.includes(rol)) {
      var position = this.selectedRole.indexOf(rol)
      this.selectedRole.splice(position, 1)
      this.usuario.roles = this.usuario.roles.filter((r: any) => r.id != rol)
    } else {
      this.check = []
      this.selectedRole.push(rol)

    }
  }

  seleccionarAllRoles(rol: number) {

    const role = this.IterarRol.find((r: any) => r.idRole == rol)
    if (role != null) {

      if (this.selectedPermisos.length > 0) {

        var newPermisos: any = []

        role.permissions.forEach((element: any) => {
          var position = this.selectedPermisos.indexOf(element.idPermission)
          if (element.idPermission == this.selectedPermisos[position]) {
            newPermisos.push(element.idPermission)
          }
        });

        


        if (newPermisos.length == role.permissions.length) {
          newPermisos.forEach((x: any) => {
            var position = this.selectedPermisos.indexOf(x)
            this.selectedPermisos.splice(position, 1)
          });

          this.usuario.roles.forEach((r: any) => {
            if (r.id == rol) {
              r.permisos = []
            }
          });

          var check = document.getElementById('check' + rol)


          check?.removeAttribute("checked")
        } else {

          if (this.usuario.roles.some((r: any) => r.id == rol)) {

            var find = this.usuario.roles.find((r: any) => r.id == rol)
            find.permisos = []

            role.permissions.forEach(element => {

              if (!this.selectedPermisos.includes(element.idPermission)) {
                this.selectedPermisos.push(element.idPermission)
              }
              find.permisos.push(element.idPermission)
            });

            var check = document.getElementById('check' + rol)

            check?.setAttribute('checked', "true")


          } else {
            var rDto = {
              "id": rol,
              "permisos": []
            }

            this.usuario.roles.push(rDto)
            var rolesNoinclu: any = []

            role.permissions.forEach((p: any) => {


              if (!this.selectedPermisos.includes(p.idPermission)) {
                this.selectedPermisos.push(p.idPermission)

                rolesNoinclu.push(p.idPermission)

              }
            })

            

            this.usuario.roles.forEach((r: any) => {

              if (r.id == rol) {
                rolesNoinclu.forEach((p: any) => {
                  r.permisos.push(p)
                });
              }
            });
            this.selectedPermisos.forEach(element => {
              this.check.push(element)
            });
            var check = document.getElementById('check' + rol)

            check?.setAttribute('checked', "true")
          }
        }
      } else {

        var check = document.getElementById('check' + rol)

        check?.setAttribute('checked', "true")

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
              this.check.push(element.idPermission)
            });

            vali.permisos = role.permissions

          }
        } else {

          var roles: any = []

          role.permissions.forEach((p: any) => {
            this.selectedPermisos.push(p.idPermission)
            roles.push(p.idPermission)
            this.check.push(p.idPermission)
          });

          var roleDto = {
            "id": rol,
            "permisos": roles
          }

          this.usuario.roles.push(roleDto)

        }
      }
    }

    

  }

  selecionarPermiso(permiso: number, rol: number) {
    const role = this.IterarRol.find((r: any) => r.idRole == rol)

    if (role != null || role != undefined) {
      const vali = this.usuario.roles.find((r: any) => r.id == rol)

      if (vali != null || vali != undefined) {
        if (this.selectedPermisos.includes(permiso)) {
          var position = this.selectedPermisos.indexOf(permiso)
          this.selectedPermisos.splice(position, 1)

          this.usuario.roles.forEach((r: any) => {
            if (r.id == rol) {
              var position = r.permisos.indexOf(permiso)
              r.permisos.splice(position, 1)
            }

            if (r.permisos.length != role.permissions.length) {

              var check = document.getElementById('check' + rol)
              check?.removeAttribute("checked")
            }
          });

        } else {
          this.selectedPermisos.push(permiso)
          

          this.usuario.roles.forEach((r: any) => {

            if (r.id == rol) {

              r.permisos.push(permiso)
            }

            if (r.permisos.length == role.permissions.length) {
              var check = document.getElementById('check' + rol)
              check?.setAttribute("checked", "true");
            }
          });
          this.check.push(permiso)
        }
      } else {
        this.selectedPermisos.push(permiso)

        var rolDto: any = {
          "id": rol,
          "permisos": []
        }

        role.permissions.forEach(element => {
          if (this.selectedPermisos.includes(element.idPermission)) {
            rolDto.permisos.push(element.idPermission)
          }
        });

        this.usuario.roles.forEach((r: any) => {
          if (r.id == rol) {
            if (r.permisos.length == role.permissions.length) {

              var check = document.getElementById('check' + rol)
              check?.setAttribute("checked", "true");
            }
          }
        });

        this.usuario.roles.push(rolDto)
        
        this.check.push(permiso)

      }
    }
  }


  guardar() {
    


  }

  contieneTodosValores(arrayPrincipal: any[], valoresAComprobar: any[]): boolean {
    // Comprueba si cada valor en valoresAComprobar está presente en arrayPrincipal
    return valoresAComprobar.every(valor => arrayPrincipal.some(valor));
  }
}
