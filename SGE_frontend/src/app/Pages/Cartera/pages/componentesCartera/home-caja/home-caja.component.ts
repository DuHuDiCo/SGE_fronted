import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
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

  savePago: boolean = false
  search: boolean = false
  cedula: string = ''
  numeroRecibo: string = ''
  cuentasCobrar: any[] = []
  totalCuotasAcuerdo: number = 0
  cuentasCobrarGestiones: any[] = []
  coutasList: CuotaList[] = []
  gestionesCuenta: Gestion[] = []
  saldoAcuerdoPago: number = 0
  saldoInteresesAcuerdo: number = 0
  saldoHonoriariosAcuerdo: number = 0
  saldoCapitalAcuerdo: number = 0
  totalIntereses: number = 0
  totalHonorarios: number = 0
  totalCapital: number = 0
  coutasRequest: CuotasRequest[] = []
  activarGuardarPago: boolean = false
  pago: any = {
    valor: 0,
    detalle: '',
    medioPago: '',
    numeroRecibo: ''
  }
  valorTotalIngresado: number = 0
  constructor(private cuentaCobrarService: CuentasCobrarService, private auth: AuthenticationService) { }



  ngOnInit(): void {
  }


  obtenerCuentaCobrar() {
    this.search = true
    this.cuentaCobrarService.getCuentaByDato(this.cedula).subscribe(
      (data: any) => {
        this.search = false
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
        this.search = false
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
                  this.totalCapital = this.totalCapital + c.capitalCuota
                  this.totalHonorarios = this.totalHonorarios + c.honorarios
                  this.totalIntereses = this.totalIntereses + c.interesCuota
                  if (c.pagos != null || c.pagos != undefined) {
                    console.log(c.pagos.valorPago);
                    this.saldoAcuerdoPago = this.saldoAcuerdoPago + c.valorCuota
                    this.saldoInteresesAcuerdo = this.totalIntereses + c.interesCuota
                    this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo + c.honorarios
                    this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo + c.capitalCuota


                  } else {
                    this.saldoAcuerdoPago = this.totalCuotasAcuerdo
                    this.saldoInteresesAcuerdo = this.totalIntereses
                    this.saldoHonoriariosAcuerdo = this.totalHonorarios
                    this.saldoCapitalAcuerdo = this.totalCapital
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

                      saldoCuota: c.pagos.saldoCuota
                    }
                    couta.pagos = pagos
                    if (c.pagos!.valorPago == 0) {
                      c.pagos!.saldoCuota = c.valorCuota
                    }
                  }



                  this.coutasRequest.push(couta)
                })
                console.log(this.saldoAcuerdoPago);
                console.log(this.totalCapital);
                console.log(this.totalHonorarios);
                console.log(this.totalIntereses);

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

    if (this.pago.detalle.trim() == '' || this.pago.detalle.trim() == null || this.pago.detalle.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar el concepto del pago',
        timer: 3000
      })

      return
    }

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
      return
    }




    if (this.pago.valor >= this.totalCuotasAcuerdo) {

      valorTotal = this.totalCuotasAcuerdo;
      this.saldoAcuerdoPago = this.totalCuotasAcuerdo
    }


    if (valorTotal > 0) {
      this.coutasList.forEach((c: CuotaList, i: number) => {
        if (this.pago.valor < c.valorCuota) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Valor ingresado menor al valor de la cuota pactada',
            timer: 3000
          })
          return
        }

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

            if (valorTotal == c.valorCuota) {

              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - this.coutasRequest[i].capitalCuota
              this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
              this.saldoInteresesAcuerdo = this.saldoInteresesAcuerdo - this.coutasRequest[i].interesCuota

              this.coutasRequest[i].capitalCuota = 0
              this.coutasRequest[i].honorarios = 0
              this.coutasRequest[i].interesCuota = 0


              this.coutasList[i].capitalCuota = 0
              this.coutasList[i].honorarios = 0
              this.coutasList[i].interesCuota = 0

              console.log(this.saldoCapitalAcuerdo);
              console.log(this.saldoHonoriariosAcuerdo);
              console.log(this.saldoInteresesAcuerdo);


            }



            if (valorTotal > 0 && valorTotal < c.valorCuota) {
              var difere = valorTotal

              if (this.coutasRequest[i].honorarios > 0) {
                if (difere > 0) {
                  difere = difere - this.coutasRequest[i].honorarios
                  this.coutasRequest[i].honorarios = 0
                  this.coutasList[i].honorarios = 0
                  this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
                }
              }

              if (difere > 0) {
                if (this.coutasRequest[i].interesCuota <= difere) {
                  difere = difere - this.coutasRequest[i].interesCuota
                  this.coutasRequest[i].interesCuota = 0
                  this.coutasList[i].interesCuota = 0
                  this.saldoInteresesAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].interesCuota
                }
              }

              if (difere > 0) {
                this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - difere
                this.coutasList[i].capitalCuota = this.coutasList[i].capitalCuota - difere
                this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - difere

              }

            }


            if (valorTotal > 0 && valorTotal > c.valorCuota) {
              valorTotal = valorTotal - c.valorCuota

              this.coutasRequest[i].pagos = pagos
              this.coutasList[i].pagos = pagosOriginal

              this.coutasRequest[i].honorarios = 0
              this.coutasList[i].honorarios = 0
              this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios


              this.coutasRequest[i].interesCuota = 0
              this.coutasList[i].interesCuota = 0
              this.saldoInteresesAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].interesCuota

              this.coutasRequest[i].capitalCuota = 0
              this.coutasList[i].capitalCuota = 0
              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - this.coutasRequest[i].capitalCuota
            }




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

              saldoCuota: c.valorCuota - valorTotal
            }
            var pagosOriginal: Pagos = {
              idPago: 0,
              valorPago: pagos.valorPago,
              fechaPago: pagos.fechaPago,
              usuarioId: 0,
              saldoCuota: pagos.saldoCuota
            }


            var difere = valorTotal
            

            if (this.coutasRequest[i].honorarios > 0) {
              if (difere > 0) {
                difere = difere - this.coutasRequest[i].honorarios
                this.coutasRequest[i].honorarios = 0
                this.coutasList[i].honorarios = 0
                this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
              }
            }

            if (difere > 0) {
              if (this.coutasRequest[i].interesCuota <= difere) {
                difere = difere - this.coutasRequest[i].interesCuota
                this.coutasRequest[i].interesCuota = 0
                this.coutasList[i].interesCuota = 0
                this.saldoInteresesAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].interesCuota
              }
            }

            if (difere > 0) {
              this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - difere
              this.coutasList[i].capitalCuota = this.coutasList[i].capitalCuota - difere
              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - difere

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
    console.log(this.saldoCapitalAcuerdo);
    console.log(this.saldoHonoriariosAcuerdo);
    console.log(this.saldoInteresesAcuerdo);
    this.activarGuardarPago = false
    this.savePago = true
    if (this.pago.numeroRecibo.trim() == '' || this.pago.numeroRecibo.trim() == null || this.pago.numeroRecibo.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar el numero de recibo',
        timer: 3000
      })
      this.activarGuardarPago = true
      this.savePago = false
      return
    }



    var recibo = {
      numeroObligacion: this.cuentasCobrarGestiones[0].numeroObligacion,
      numeroRecibo: this.pago.numeroRecibo,
      cuotasDto: this.coutasRequest,
      valorTotal: this.valorTotalIngresado,
      acuerdoTotal: this.saldoAcuerdoPago,
      capitalTotal: this.saldoCapitalAcuerdo,
      honorariosTotal: this.saldoHonoriariosAcuerdo,
      interesesTotal: this.saldoInteresesAcuerdo,
      detalle: this.pago.detalle,
      metodoPago: this.pago.medioPago,
      username: ''
    }

    var user = this.auth.getUsername();
    if (user != null || user != undefined) {
      recibo.username = user;
      console.log(recibo);

      this.cuentaCobrarService.crearRecibo(recibo).subscribe(
        (data: any) => {
          console.log(data);

          console.log(recibo);
          this.activarGuardarPago = false
          this.savePago = false
        }, (error: any) => {
          this.activarGuardarPago = false
          this.savePago = false
          console.log(error);

        }
      )
    }




  }

}
