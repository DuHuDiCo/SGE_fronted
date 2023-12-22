import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
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

  cuentasCobrar: any[] = []

  cuentasCobrarGestiones: any[] = []
  coutasList: CuotaList[] = []

  constructor(private cuentaCobrarService: CuentasCobrarService) { }



  ngOnInit(): void {
  }


  obtenerCuentaCobrar() {
    this.cuentaCobrarService.getCuentaByDato(this.cedula).subscribe(
      (data: any) => {
        this.cuentasCobrar = data;
        if (data.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No existe una cuenta por cobrar',
            timer: 3000
          })
        }
        console.log(this.cuentasCobrar);
        this.cuentasCobrarGestiones = []

      }, (error: any) => {
        console.log(error);

      }
    )

  }

  obtenerDatosCuentaCobrar(cedula: string) {
    alert(cedula)
    this.cuentaCobrarService.getCuentaByCedula(cedula).subscribe(
      (data: any) => {
        console.log(data);
        this.cuentasCobrarGestiones = data;


        if (this.cuentasCobrarGestiones != null || this.cuentasCobrarGestiones != undefined) {
          this.cuentasCobrarGestiones.forEach((c: any) => {
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
        this.cuentasCobrar = []

      }, (error: any) => {
        console.log(error);

      }
    )


  }

}
