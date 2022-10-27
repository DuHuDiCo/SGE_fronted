import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['opciones'])
  }

}
