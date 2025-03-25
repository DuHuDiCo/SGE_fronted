import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpcionesService } from 'src/app/Services/Opciones/opciones.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { NuevaContraseña } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css'],
})
export class CambioContrasenaComponent implements OnInit {
  contrasena: NuevaContraseña = {
    nombreUsuario: '',
    contrasenaBase: '',
    contrasenaActualizada: '',
    confirmarContrasenaActualizada: '',
  };

  botonContrasena: boolean = false;

  constructor(
    private router: Router,
    private opcionesService: OpcionesService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  cambiarContrasena() {
    var user = this.authService.getUsername();
    if (user == null || user == undefined) {
      return;
    }
    this.contrasena.nombreUsuario = user;

    if (
      this.contrasena.contrasenaBase.trim() == '' ||
      this.contrasena.contrasenaBase.trim() == null
    ) {
      Swal.fire({
        title: 'Error',
        text: 'Digite su contraseña actual',
        icon: 'error',
        iconColor: '#d40000',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.contrasena.contrasenaActualizada.trim() == '' ||
      this.contrasena.contrasenaActualizada.trim() == null
    ) {
      Swal.fire({
        title: 'Error',
        text: 'Digite la nueva contraseña',
        icon: 'error',
        iconColor: '#d40000',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    if (
      this.contrasena.confirmarContrasenaActualizada.trim() == '' ||
      this.contrasena.confirmarContrasenaActualizada.trim() == null
    ) {
      Swal.fire({
        title: 'Error',
        text: 'Confirme la nueva contraseña',
        icon: 'error',
        iconColor: '#d40000',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      return;
    }
    this.botonContrasena = true;
    setTimeout(() => {
      this.opcionesService.changePassowrd(this.contrasena).subscribe(
        (data: any) => {
          Swal.fire({
            title: 'Datos guardados',
            text: 'Su contraseña ha sido actualizada, inicie sesion de nuevo',
            icon: 'success',
            timer: 2000,
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
          this.botonContrasena = false;
          setTimeout(() => {
            this.authService.logout();
            this.router.navigate(['login']);
          }, 4000);
        },
        (error: any) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al actualizar la contraseña',
            icon: 'error',
            timer: 2000,
            iconColor: '#d40000',
            confirmButtonColor: '#d40000',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
          this.botonContrasena = false;
        }
      );
    }, 2000);
  }
}
