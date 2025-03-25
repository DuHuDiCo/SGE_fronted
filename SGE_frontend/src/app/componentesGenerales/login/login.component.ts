import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';
import Login from 'src/app/Models/Login';

import { Token } from 'src/app/Models/Token';
import { OpcionesService } from 'src/app/Services/Opciones/opciones.service';

import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { JwtRequest } from 'src/app/Types/Login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  jwtRequest: JwtRequest = {
    username: '',
    password: '',
  };

  //VARIABLE DEL SPINNER
  inicioSesion: boolean = false;

  constructor(
    private router: Router,
    private authentication: AuthenticationService,
    private opcionesService: OpcionesService
  ) {}

  ngOnInit(): void {
    anime({
      targets: '.wrapper',
      translateY: 250,
      duration: 4000,
    });
  }

  public iniciarSesion(): void {
    if (this.jwtRequest.username == '' || this.jwtRequest.password == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos incorrectos!',
        iconColor: '#d40000',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
    } else {
      const login = new Login(
        this.jwtRequest.username,
        this.jwtRequest.password
      );
      this.inicioSesion = true;
      setTimeout(() => {
        this.authentication.authentication(login).subscribe(
          (data: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Inicio sesion exitoso',
              showConfirmButton: false,
              timer: 2000,
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            this.authentication.setTokenLocalStorage(data.token);
            this.authentication.setUsernameLocalStorage(data.username);
            this.authentication.setRolesLocalStorage(data.roles);
            this.authentication.setSede(data.sede);
            this.opcionesService.setUpdate(data.isUpdateable);
            this.authentication.setFecha(data.ultimaSesion);
            this.router.navigate(['opciones']);
            this.inicioSesion = false;
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Datos Incorrectos!',
            });
            this.inicioSesion = false;
          }
        );
      }, 2000);
    }
  }
}
