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
        text: 'Digite Su Contraseña Actual',
        icon: 'error',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
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
        text: 'Digite La Nueva Contraseña',
        icon: 'error',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
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
        text: 'Confirme Su Nueva Contraseña',
        icon: 'error',
        iconColor: '#960010',
        confirmButtonColor: '#960010',
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
            title: 'Datos Guardados',
            text: 'Su Contraseña ha Sido Actualizada, inicie Sesion de Nuevo',
            icon: 'success',
            confirmButtonColor: '#960010',
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
            text: 'Error al Cambiar La Contraseña',
            icon: 'error',
            iconColor: '#960010',
            confirmButtonColor: '#960010',
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
