import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { CuentasCobrarResponse, Gestion } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { CuotaList } from 'src/app/Types/Cartera/Gestion/Gestion';
import { CuentasPorCobrar } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';

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

        if (this.cuentasCobrar!= null || this.cuentasCobrar != undefined) {
          this.cuentasCobrar.forEach((c: CuentasCobrarResponse) => {
            if (c.gestion.length > 0) {
              var gestion = c.gestion.filter((g: Gestion) => g.clasificacionGestion.isActive && g.clasificacionGestion.clasificacion == "ACUERDO DE PAGO")
              console.log(gestion);

              if (gestion.length > 0) {
                gestion[0].clasificacionGestion.cuotasList.forEach((c: any) => {
                  setTimeout(() => {
                    this.coutasList.push(c)
                  }, 1000);
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'No hay un acuerdo de pago activo',
                  timer: 3000
                })
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No hay un acuerdo de pago activo',
                timer: 3000
              })
            }


          })
        }


      }, (error: any) => {
        console.log(error);

      }
    )


  }

}
