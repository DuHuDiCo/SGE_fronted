import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login={
    username:"",
    password:""
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public iniciarSesion(){
    Swal.fire({
      position:'top-end',
      icon:'success',
      title:'Inicio Sesion Exitoso',
      showConfirmButton: false,
      timer:2000
    })
    this.router.navigate(['opciones'])
  }

}
