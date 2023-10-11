import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import Login from 'src/app/Models/Login';

import { Token } from 'src/app/Models/Token';
import { OpcionesService } from 'src/app/Services/Opciones/opciones.service';

import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { JwtRequest } from 'src/app/Types/Login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtRequest: JwtRequest = {
    username: '',
    password: ''
  }

  constructor(private router: Router, private authentication: AuthenticationService, private opcionesService:OpcionesService) { }

  ngOnInit(): void {

  }

  public iniciarSesion(): void {
    if (this.jwtRequest.username == '' || this.jwtRequest.password == '') {
      Swal.fire("Error", "Error, Revisen los Datos", "error");
    } else {
      const login = new Login(this.jwtRequest.username, this.jwtRequest.password);

      this.authentication.authentication(login).subscribe(
        (data: any) => {


          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inicio Sesion Exitoso',
            showConfirmButton: false,
            timer: 2000
          })

          this.authentication.setTokenLocalStorage(data.token)
          this.authentication.setUsernameLocalStorage(data.username)
          this.authentication.setRolesLocalStorage(data.roles)
          this.authentication.setSede(data.sede)

          this.opcionesService.setUpdate(data.isUpdateable)
          this.authentication.setFecha(data.ultimaSesion)

          

          this.router.navigate(['opciones'])
          

          
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos Incorrectos!',


          })
          

        }
      )

    }





  }



}
