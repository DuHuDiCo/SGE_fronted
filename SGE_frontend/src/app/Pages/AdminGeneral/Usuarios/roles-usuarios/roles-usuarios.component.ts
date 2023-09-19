import { Component, OnInit } from '@angular/core';
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

  constructor(private userAgService: UsuarioAgService) { }

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
      (error) => {
        console.log(error);
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

        console.log(newPermisos);

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

            console.log(rolesNoinclu);

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

    console.log(this.check);
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
          console.log(this.selectedPermisos);

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
        console.log(this.selectedPermisos);
        this.check.push(permiso)
      }
    }
  }

  guardarUsuario() {
    if (this.usuario.username.trim() == '' || this.usuario.username.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Username', 'error')
      return
    }
    if (this.usuario.nombres.trim() == '' || this.usuario.nombres.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar los Nombres', 'error')
      return
    }
    if (this.usuario.password.trim() == '' || this.usuario.password.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar la Contraseña', 'error')
      return
    }
    if (this.usuario.apellidos.trim() == '' || this.usuario.apellidos.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar los Apellidos', 'error')
      return
    }
    if (this.usuario.tipo_documento.trim() == '' || this.usuario.tipo_documento.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Tipo De Doc', 'error')
      return
    }
    if (typeof this.usuario.numero_documento === 'string' && this.usuario.numero_documento.trim() === '') {
      Swal.fire('Error', 'Debe ingresar el Numero de Doc', 'error');
      return;
    }

    if (this.usuario.email.trim() == '' || this.usuario.email.trim() == null) {
      Swal.fire('Error', 'Debe de ingresar el Email', 'error')
      return
    }
    if (typeof this.usuario.celular === 'string' && this.usuario.celular.trim() == '') {
      Swal.fire('Error', 'Debe de ingresar el Celular', 'error')
      return
    }
    if (this.usuario.fecha_nacimiento instanceof Date || this.usuario.fecha_nacimiento == null) {
      Swal.fire('Error', 'Debe ingresar la Fecha de Nacimiento', 'error');
      return;
    }
  }

  contieneTodosValores(arrayPrincipal: any[], valoresAComprobar: any[]): boolean {
    // Comprueba si cada valor en valoresAComprobar está presente en arrayPrincipal
    return valoresAComprobar.every(valor => arrayPrincipal.some(valor));
  }
}

