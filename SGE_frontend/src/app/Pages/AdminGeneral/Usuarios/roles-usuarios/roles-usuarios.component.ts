import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscarUsuariosService } from 'src/app/Services/BuscarUsuarios/buscar-usuarios.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { UsuarioAgService } from 'src/app/Services/usuario-adminGeneral/usuario-ag.service';
import { Roles, RolesUser } from 'src/app/Types/Roles';
import { Usuario } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-usuarios',
  templateUrl: './roles-usuarios.component.html',
  styleUrls: ['./roles-usuarios.component.css']
})
export class RolesUsuariosComponent implements OnInit {

  constructor(private userAgService: UsuarioAgService, private authService: AuthenticationService, private router: Router, private userService: BuscarUsuariosService) { }

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
    this.usuario.usuario = this.userAgService.getUsuario()
    // if(this.usuario.usuario.username == null || this.usuario.usuario.username == ""){
    //   this.router.navigate(['/dashboard-admin-general/crear-usuario'])
    // }

    var user = this.userService.getUsuarioGeneral();
    
    
    if(Object.keys(user).length != 0){
      
     
      this.obtenerRolesYPermisos(user);
    }
    

    this.userAgService.listarRoles().subscribe(
      (data: any) => {
        this.IterarRol = data;
        
        
      },
      (error) => {
        
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

        if (this.selectedPermisos.includes(permiso)) {
          var position = this.selectedPermisos.indexOf(permiso)
          this.selectedPermisos.splice(position, 1)

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
  }

  guardarUsuario() {

    let username = this.authService.getUsername();

    if (username != null || username != undefined) {
      
      

      this.userAgService.crearUsuario(this.usuario, username).subscribe(
        (data: any) => {
          Swal.fire('GUARDADO', 'El usuario guardado', 'success');
          setTimeout(() => {
            this.router.navigate(['/dashboard-admin-general/buscar-usuario'])
          }, 2000);
          

        },
        (error: any) => {
          
          Swal.fire('ERROR', 'Error Guardar Usuario', 'error')
        }
      )
    }
  }

  contieneTodosValores(arrayPrincipal: any[], valoresAComprobar: any[]): boolean {
    // Comprueba si cada valor en valoresAComprobar está presente en arrayPrincipal
    return valoresAComprobar.every(valor => arrayPrincipal.some(valor));
  }


  obtenerRolesYPermisos(user:any) {
   
    this.usuario.usuario = user
    

    var rolDto: any = {
      "id": "",
      "permisos": []
    }

    user.roles.forEach((r: any) => {
      
      
      this.selectedRole.push(r.rolId)
      rolDto.id = r.rolId
      r.permisos.forEach((p: any) => {
        this.selectedPermisos.push(p.permiso)
        rolDto.permisos.push(p.permiso)
      });
    });


    this.usuario.roles.push(rolDto)
   
    
    
   

  }
}

