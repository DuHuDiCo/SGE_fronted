import { Component, OnInit } from '@angular/core';
import { RolesSystemService } from 'src/app/Services/rolesPermisosSystem/roles-system.service';
import { RolSystem } from 'src/app/Types/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-system-roles',
  templateUrl: './system-roles.component.html',
  styleUrls: ['./system-roles.component.css'],
})
export class SystemRolesComponent implements OnInit {
  page: number = 1;

  roles: string[] = [];

  rolesSaved: RolSystem[] = [];

  valid: boolean = false;

  constructor(private systemRoles: RolesSystemService) {}

  ngOnInit(): void {
    this.obtenerRolesSystem();
  }

  enviar(event: any): void {
    var rol = event.srcElement.value.toUpperCase();
    if (event.keyCode == 13) {
      if (rol != '') {
        if (!this.roles.includes(rol)) {
          this.roles.push(rol);

          event.srcElement.value = '';
          this.valid = false;
        } else {
          this.valid = true;
        }
      }
    }
  }

  quitarRol(rol: string) {
    this.roles = this.roles.filter((r) => r != rol);
  }

  guardarRoles() {
    setTimeout(() => {
      this.systemRoles.saveRoles(this.roles).subscribe(
        (data: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Roles Guardados Exitosamente',
            showConfirmButton: false,
            timer: 2000,
            confirmButtonColor: '#960010',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
          window.location.reload();
        },
        (error: any) => {}
      );
    }, 3000);
  }

  obtenerRolesSystem() {
    this.systemRoles.getRolesSystem().subscribe(
      (data: any) => {
        this.rolesSaved = data;
      },
      (error: any) => {}
    );
  }

  eliminarRol(idRole: number) {
    Swal.fire({
      title: 'Eliminar Rol',
      text: '¿Estas seguro de eliminar el Rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-4',
        confirmButton: 'text-white btn border-0 rounded-pill px-4',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.systemRoles.deleteRole(idRole).subscribe(
          (data) => {
            this.roles = this.roles.filter((rol: any) => rol.idRole != idRole);
            Swal.fire({
              icon: 'success',
              title: 'Rol Eliminado',
              text: 'El Rol ha sido eliminado exitosamente',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            window.location.reload();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al eliminar el rol',
              iconColor: '#960010',
              confirmButtonColor: '#960010',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
          }
        );
      }
    });
  }
}
