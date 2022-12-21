import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtRequest={
    username:"",
    password:""
  }

  constructor(private router:Router, private authentication:AuthenticationService) { }

  ngOnInit(): void {
   
  }

  public iniciarSesion(){
    if(this.jwtRequest.username == '' || this.jwtRequest.password == ''){
      Swal.fire("Error", "Error, Datos Incorrectos", "error");
    }else{
      this.authentication.authentication(this.jwtRequest).subscribe(
        (data:any)=>{
          
          Swal.fire({
            position:'top-end',
            icon:'success',
            title:'Inicio Sesion Exitoso',
            showConfirmButton: false,
            timer:2000
          })
          
          this.authentication.setTokenLocalStorage(data.token)
          this.authentication.setUsernameLocalStorage(data.username)
          this.authentication.setRolesLocalStorage(data.roles)
          this.router.navigate(['opciones'])
        },
        (error:any)=>{
          console.log(error);
          
        }
      )
      
    }


   
 
 
  }


  
}
