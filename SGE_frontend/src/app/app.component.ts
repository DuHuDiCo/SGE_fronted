import { Component, OnInit } from '@angular/core';
import SuperAdmin from './Models/SuperAdmin';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from './Services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth:AuthenticationService) {

  }


  ngOnInit(): void {
    this.auth.crearSuperAdmin().subscribe(
      (data:any)=>{
        console.log(data);
        
      },(error:any)=>{
        console.log(error);
        
      }
    );
  }



  title = 'SGE_frontend';
}
