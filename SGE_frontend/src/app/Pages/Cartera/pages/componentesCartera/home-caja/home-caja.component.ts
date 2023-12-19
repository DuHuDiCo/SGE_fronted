import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { CuentasCobrarResponse, Gestion } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { CuotaList } from 'src/app/Types/Cartera/Gestion/Gestion';
import { CuentasPorCobrar } from 'src/app/Types/Consignaciones';

@Component({
  selector: 'app-home-caja',
  templateUrl: './home-caja.component.html',
  styleUrls: ['./home-caja.component.css']
})
export class HomeCajaComponent implements OnInit {

  cedula: string = ''

  cuentasCobrar: CuentasCobrarResponse[] = []
  coutasList: CuotaList[] = []

  constructor(private cuentaCobrarService: CuentasCobrarService) { }



  ngOnInit(): void {
  }

  obtenerCuentaCobrar() {
    this.cuentaCobrarService.getCuentaByCedula(this.cedula).subscribe(
      (data: any) => {
        this.cuentasCobrar = data;

        this.cuentasCobrar.forEach((c: CuentasCobrarResponse) => {
          var gestion = c.gestion.filter((g: Gestion) =>g.clasificacionGestion.isActive && g.clasificacionGestion.clasificacion == "ACUERDO DE PAGO")
          console.log(gestion);
          
        })

      }, (error: any) => {
        console.log(error);

      }
    )


  }

}
