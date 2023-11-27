import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { CuentasCobrarResponse } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';

@Component({
  selector: 'app-home-cartera',
  templateUrl: './home-cartera.component.html',
  styleUrls: ['./home-cartera.component.css']
})
export class HomeCarteraComponent implements OnInit {

  constructor(private cuentasCobrar:CuentasCobrarService, private authService:AuthenticationService) { }

  // ARRAY CUENTAS POR COBRAR
  cuentasCobrarArray:CuentasCobrarResponse[] = []

  // PARAMETROS PARA EL SERVICE
  page:number = 1;
  size:number = 10
  fechaCreacion: string = 'fecha_creacion'

  // SPINNER DE LA TABLA
  spinner:boolean = true

  ngOnInit(): void {
    this.getCuentasCobrar()
  }

  getCuentasCobrar() {

    // var user = this.authService.getUsername()

    //   if (user == null || user == undefined) {
    //     return
    //   }

    this.cuentasCobrar.getCuentasCobrar('Diana1975', this.page, this.size, this.fechaCreacion).subscribe(
      (data:any) => {
        this.cuentasCobrarArray = data.content

        if(this.cuentasCobrarArray.length == 0){
          this.spinner = true
        } else {
          this.spinner = false
        }

        console.log(this.cuentasCobrarArray);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

}
