import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { CoutasList, CuentasCobrarResponse, Gestion } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { CuotaList, CuotasRequest, Pagos, PagosRequest } from 'src/app/Types/Cartera/Gestion/Gestion';
import { CuentasPorCobrar } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-caja',
  templateUrl: './home-caja.component.html',
  styleUrls: ['./home-caja.component.css']
})
export class HomeCajaComponent implements OnInit {

  cedula: string = ''
  numeroRecibo: string = ''
  cuentasCobrar: any[] = []
  totalCuotasAcuerdo: number = 0
  cuentasCobrarGestiones: any[] = []
  coutasList: CuotaList[] = []
  gestionesCuenta: Gestion[] = []
  saldoAcuerdoPago: number = 0
  coutasRequest: CuotasRequest[] = []
  activarGuardarPago:boolean = false
  pago: any = {
    valor: 0,
    detalle: ''
  }
  valorTotalIngresado:number = 0
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
    (cedula)
    this.cuentaCobrarService.getCuentaByCedula(cedula).subscribe(
      (data: any) => {
        console.log(data);
        this.cuentasCobrarGestiones = data;


        if (this.cuentasCobrarGestiones != null || this.cuentasCobrarGestiones != undefined) {
          this.cuentasCobrarGestiones.forEach((cc: any) => {
            if (cc.gestion.length > 0) {
              var gestion = cc.gestion.filter((g: Gestion) => g.clasificacionGestion.isActive && g.clasificacionGestion.clasificacion == "ACUERDO DE PAGO")
              this.gestionesCuenta = gestion

              if (gestion.length > 0) {
                gestion[0].clasificacionGestion.cuotasList.forEach((c: any) => {

                  this.coutasList.push(c)
                })

                this.coutasList.forEach((c: CuotaList) => {
                  this.totalCuotasAcuerdo = this.totalCuotasAcuerdo + c.valorCuota
                  if (c.pagos != null || c.pagos != undefined) {
                    console.log(c.pagos.valorPago);
                    this.saldoAcuerdoPago = cc.gestion[0].clasificacionGestion.valorTotalAcuerdo - c.pagos!.valorPago
                  } else {
                    this.saldoAcuerdoPago = cc.gestion[0].clasificacionGestion.valorTotalAcuerdo
                  }



                  var couta: CuotasRequest = {
                    numeroCuota: c.numeroCuota,
                    fechaVencimiento: c.fechaVencimiento,
                    valorCuota: c.valorCuota,
                    capitalCuota: c.capitalCuota,
                    honorarios: c.honorarios,
                    cumplio: false,
                    interesCuota: c.interesCuota,
                    pagos: null

                  }

                  if (c.pagos != null || c.pagos != undefined) {
                    var pagos: PagosRequest = {
                      valorPago: c.pagos.valorPago,
                      fechaPago: c.pagos.fechaPago,
                      username: '',
                      saldoCuota: c.pagos.saldoCuota
                    }
                    couta.pagos = pagos
                    if (c.pagos!.valorPago == 0) {
                      c.pagos!.saldoCuota = c.valorCuota
                    }
                  }



                  this.coutasRequest.push(couta)
                })


                console.log(this.totalCuotasAcuerdo);



                console.log(this.coutasRequest);


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


  agregarPagoACuotas() {
    var date = new Date()
    var valorTotal = this.pago.valor
    this.valorTotalIngresado = this.valorTotalIngresado + parseInt(this.pago.valor)
    console.log(valorTotal);

    if (isNaN(this.pago.valor)) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese datos numericos',
        timer: 3000
      })
    }

    if (this.pago.valor >= this.totalCuotasAcuerdo) {
      valorTotal = this.totalCuotasAcuerdo;
      this.saldoAcuerdoPago = this.totalCuotasAcuerdo
    }


    if (valorTotal > 0) {
      this.coutasList.forEach((c: CuotaList, i: number) => {


        if (c.pagos != null || c.pagos != undefined) {
          if (c.pagos.saldoCuota > 0) {

            valorTotal = valorTotal - c.pagos.saldoCuota
            this.coutasRequest[i].pagos!.saldoCuota = 0
            this.coutasList[i].pagos!.saldoCuota = 0
            this.coutasRequest[i].pagos!.valorPago = c.valorCuota
            this.coutasList[i].pagos!.valorPago = this.coutasRequest[i].pagos!.valorPago


            console.log(this.coutasRequest[i])
            console.log(c)
          }
        }

        if (c.pagos == null || c.pagos == undefined && valorTotal > 0) {

          if (valorTotal > 0 && valorTotal >= c.valorCuota) {


            var pagos: PagosRequest = {
              valorPago: c.valorCuota,
              fechaPago: date,
              username: '',
              saldoCuota: 0
            }

            var pagosOriginal: Pagos = {
              idPago: 0,
              valorPago: pagos.valorPago,
              fechaPago: pagos.fechaPago,
              usuarioId: 0,
              saldoCuota: pagos.saldoCuota
            }

            if (valorTotal > c.valorCuota) {
              pagos.saldoCuota = 0;
              pagosOriginal.saldoCuota
            }
            valorTotal = valorTotal - c.valorCuota
            this.coutasRequest[i].pagos = pagos
            this.coutasList[i].pagos = pagosOriginal


            console.log(valorTotal);
            console.log(this.coutasRequest[i])
            console.log(c)


          } else {
            if (valorTotal == 0) {
              i = 0

              return;
            }

            var pagos: PagosRequest = {
              valorPago: valorTotal,
              fechaPago: date,
              username: '',
              saldoCuota: c.valorCuota - valorTotal
            }
            var pagosOriginal: Pagos = {
              idPago: 0,
              valorPago: pagos.valorPago,
              fechaPago: pagos.fechaPago,
              usuarioId: 0,
              saldoCuota: pagos.saldoCuota
            }


            valorTotal = valorTotal - valorTotal
            this.coutasRequest[i].pagos = pagos
            this.coutasList[i].pagos = pagosOriginal


            console.log(valorTotal);
            console.log(this.coutasRequest[i])
            console.log(c)
          }



        }

        if (c.pagos!.saldoCuota > 0) {
          this.coutasRequest[i].cumplio = false
          this.coutasList[i].cumplio = false
        } else {
          this.coutasRequest[i].cumplio = true
          this.coutasList[i].cumplio = true
        }



      })


      if (this.saldoAcuerdoPago < this.pago.valor) {
        this.saldoAcuerdoPago = this.saldoAcuerdoPago - this.saldoAcuerdoPago
      } else {
        this.saldoAcuerdoPago = this.saldoAcuerdoPago - this.pago.valor
      }
      this.pago.valor = 0
      this.activarGuardarPago = true
    }

    console.log(this.coutasRequest);
    console.log(this.coutasList);


  }

  generarRecibo() {

    var recibo = {
      numeroObligacion: this.cuentasCobrarGestiones[0].numeroObligacion,
      numeroRecibo: '',
      cuotasDto: this.coutasRequest,
      valorTotal: this.valorTotalIngresado,
      saldoAcuerdo: this.saldoAcuerdoPago,
      detalle: this.pago.detalle
    }

    console.log(recibo);
    

  }

}
