import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpcionesService } from 'src/app/Services/Opciones/opciones.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { NuevaContraseña } from 'src/app/Types/Usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {

  contrasena:NuevaContraseña = {
    nombreUsuario: '',
    contrasenaBase: '',
    contrasenaActualizada: ''
  }

  constructor(private router:Router, private opcionesService:OpcionesService, private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  cambiarContrasena(){
    var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }
      this.contrasena.nombreUsuario = user

    if(this.contrasena.contrasenaBase.trim() == '' || this.contrasena.contrasenaBase.trim() == null){
      Swal.fire('Error', 'Digite Su Contraseña Actual', 'error')
      return
    }
    if(this.contrasena.contrasenaActualizada.trim() == '' || this.contrasena.contrasenaActualizada.trim() == null){
      Swal.fire('Error', 'Digite Su Contraseña Actualizada', 'error')
      return
    }

    
    

    this.opcionesService.changePassowrd(this.contrasena).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'Su Contraseña ha Sido Actualizada, inicie Sesion de Nuevo', 'success')
        setTimeout(() => {
          this.authService.logout()
          this.router.navigate(['login'])
        }, 4000);
      }, (error:any) => {
        Swal.fire('Error', 'Error al Cambiar La Contraseña', 'error')
        
      }
    )
  }

}
