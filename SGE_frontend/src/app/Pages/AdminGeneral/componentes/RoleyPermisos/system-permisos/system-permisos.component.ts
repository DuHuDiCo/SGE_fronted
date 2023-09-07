import { Component, OnInit } from '@angular/core';
import Permisos from 'src/app/Models/Permisos';
import { PermissionsSystemService } from 'src/app/Services/rolesPermisosSystem/permissions-system.service';
import { RolesSystemService } from 'src/app/Services/rolesPermisosSystem/roles-system.service';
import { Permission } from 'src/app/Types/Permissions';
import { RolSystem } from 'src/app/Types/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-permisos',
  templateUrl: './system-permisos.component.html',
  styleUrls: ['./system-permisos.component.css']
})
export class SystemPermisosComponent implements OnInit {

  page: number = 1;
  totalItems: number = 0

  permissions: Permission[] = []

  permisosAdded: string[] = []
  valid: boolean = false;
  rolesSaved: RolSystem[] = [];
  roleId: number = 0


  constructor(private permissionService: PermissionsSystemService, private systemRoles: RolesSystemService) { }

  ngOnInit(): void {
    this.rolesSystem()
    this.getAllPermissions()

  }

  getAllPermissions() {
    this.permissionService.getAllPermissions().subscribe(
      (data: any) => {
        this.permissions = data.content;
        console.log(data);

      }, (error: any) => {
        console.log(error);

      }
    )
  }

  enviar(event: any): void {
    var permiso = event.srcElement.value.toUpperCase()

    if (event.keyCode == 13) {
      if (permiso != '') {
        if (!this.permisosAdded.includes(permiso)) {
          this.permisosAdded.push(permiso)
          event.srcElement.value = ''
          this.valid = false
        } else {
          this.valid = true
        }
      }

    }

  }

  quitarPermiso(permiso: string) {
    this.permisosAdded = this.permisosAdded.filter(p => p != permiso);
  }

  eliminarPermiso(idPermission: number) {

    if (this.roleId == 0) {
      Swal.fire('ERROR', 'Debe colocar un Rol', 'error');
      return;
    }

    Swal.fire({
      title: 'Eliminar Permiso',
      text: '¿Estas seguro de eliminar el Permiso?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var ids = []
        ids.push(idPermission)
        this.permissionService.deletePermissions(this.roleId, ids).subscribe(
          (data) => {
            this.permissions = this.permissions.filter((permissions) => permissions.idPermission != idPermission);
            Swal.fire('Permiso Eliminado', 'El Permiso ha sido Eliminado Exitosamente', 'success')
          },
          (error) => {
            Swal.fire('ERROR', 'Error al Eliminar el Permiso', 'error')
          }
        )
      }
    })
  }

  rolesSystem() {
    this.systemRoles.getRolesSystem().subscribe(
      (data: any) => {
        this.rolesSaved = data;
        this.rolesSaved = this.rolesSaved.filter(r => r.rol != 'Administration')
        console.log(this.rolesSaved);

      }, (error: any) => {
        console.log(error);

      }
    )
  }

  guardarPermisos() {

    console.log(this.permisosAdded);
    console.log(this.roleId);


    if (this.permisosAdded.length == 0 && this.roleId == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Campos Vacios!',
      })
      return
    }

    this.permissionService.savePermissions(this.permisosAdded, this.roleId).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Permisos Guardados Exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
        console.log(data);
        window.location.reload()

      }, (error: any) => {
        console.log(error);

      }
    )
  }

  capturarIdRole(event: any) {
    this.roleId = event.target.value;

  }
}
