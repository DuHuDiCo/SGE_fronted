import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { CoutasList, CuentasCobrarResponse, Gestion } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { CuotaList, CuotasRequest, Pagos, PagosRequest, ReciboPago } from 'src/app/Types/Cartera/Gestion/Gestion';
import { CuentasPorCobrar } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-home-caja',
  templateUrl: './home-caja.component.html',
  styleUrls: ['./home-caja.component.css']
})
export class HomeCajaComponent implements OnInit {

  base64Recibo: string = ""
  savePago: boolean = false
  search: boolean = false
  cedula: string = ''
  numeroRecibo: string = ''
  cuentasCobrar: any[] = []
  totalCuotasAcuerdo: number = 0
  cuentasCobrarGestiones: any[] = []
  coutasList: CuotaList[] = []
  coutasSelected: number[] = []
  gestionesCuenta: Gestion[] = []
  saldoAcuerdoPago: number = 0
  saldoInteresesAcuerdo: number = 0
  saldoHonoriariosAcuerdo: number = 0
  saldoCapitalAcuerdo: number = 0
  totalIntereses: number = 0
  totalHonorarios: number = 0
  totalCapital: number = 0
  mostrarRecibo: boolean = false
  coutasRequest: CuotasRequest[] = []
  activarGuardarPago: boolean = false
  pago: any = {
    valor: 0,
    detalle: '',
    medioPago: '',
    numeroRecibo: '',
    cumpliendo: false
  }
  valorTotalIngresado: number = 0
  recibosPago: ReciboPago[] = []
  recibosPagoSinFiltrar: ReciboPago[] = []


  constructor(private cuentaCobrarService: CuentasCobrarService, private auth: AuthenticationService) { }



  ngOnInit(): void {
  }


  obtenerCuentaCobrar() {
    this.search = true
    this.coutasList = []
    this.coutasRequest = []
    this.cuentasCobrarGestiones = []

    this.totalCuotasAcuerdo = 0
    this.saldoAcuerdoPago = 0
    this.saldoInteresesAcuerdo = 0
    this.saldoHonoriariosAcuerdo = 0
    this.saldoCapitalAcuerdo = 0
    this.totalIntereses = 0
    this.totalHonorarios = 0
    this.totalCapital = 0

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
        this.cuentasCobrarGestiones = []

      }, (error: any) => {
        this.search = false
        console.log(error);

      }
    )

  }

  obtenerDatosCuentaCobrar(cedula: string) {

    if (cedula.trim() == '' || cedula.trim() == null || cedula.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar un dato',
        timer: 3000
      })

      return
    }

    this.cuentaCobrarService.getCuentaByCedula(cedula).subscribe(
      (data: any) => {
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

                    if (c.pagos.reciboPago != null || c.pagos.reciboPago != undefined) {
                      this.recibosPagoSinFiltrar.push(c.pagos.reciboPago)
                    }

                    if (c.pagos.saldoCuota > 0) {

                      this.saldoAcuerdoPago = this.saldoAcuerdoPago + c.pagos.saldoCuota

                    }

                    this.saldoInteresesAcuerdo = this.totalIntereses + c.interesCuota
                    this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo + c.honorarios
                    this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo + c.capitalCuota


                  } else {

                    this.saldoAcuerdoPago = this.saldoAcuerdoPago + c.valorCuota

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
                    pago: false,
                    interesCuota: c.interesCuota,
                    pagosDto: null,
                    idCuota: c.idCuota
                  }

                  if (c.pagos != null || c.pagos != undefined) {
                    var pagos: PagosRequest = {
                      valorPago: c.pagos.valorPago,
                      fechaPago: c.pagos.fechaPago,

                      saldoCuota: c.pagos.saldoCuota
                    }
                    couta.pagosDto = pagos
                    if (c.pagos!.valorPago == 0) {
                      c.pagos!.saldoCuota = c.valorCuota
                    }
                  }



                  this.coutasRequest.push(couta)
                  ///////////
                  this.recibosPago = this.recibosPagoSinFiltrar.filter((r: ReciboPago, i: number, array) => array.findIndex(obj => JSON.stringify(obj) === JSON.stringify(r)) === i)
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

    if (this.pago.medioPago.trim() == '' || this.pago.detalle.trim() == null || this.pago.detalle.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un medio pago',
        timer: 3000
      })

      return
    }

    if (this.pago.valor < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar un valor mayor a cero',
        timer: 3000
      })

      return
    }

    var date = new Date()
    var valorTotal = this.pago.valor
    if (valorTotal < this.totalCuotasAcuerdo) {
      this.valorTotalIngresado = valorTotal
    }

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
      this.valorTotalIngresado = this.valorTotalIngresado + parseInt(valorTotal)
    }



    if (valorTotal > 0) {
      this.coutasList.forEach((c: CuotaList, i: number) => {
        // if (this.pago.valor < c.valorCuota) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Valor ingresado menor al valor de la cuota pactada',
        //     timer: 3000
        //   })
        //   this.valorTotalIngresado = 0
        //   valorTotal = 0
        //   throw new Error('Valor ingresado menor al valor de la cuota pactada')

        // }

        if (c.pagos != null || c.pagos != undefined) {
          if (c.pagos.saldoCuota > 0) {

            valorTotal = valorTotal - c.pagos.saldoCuota


            this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - this.coutasRequest[i].pagosDto!.saldoCuota
            this.coutasList[i].capitalCuota = this.coutasList[i].capitalCuota - this.coutasList[i].pagos!.saldoCuota

            this.coutasRequest[i].pagosDto!.saldoCuota = 0
            this.coutasList[i].pagos!.saldoCuota = 0

            this.coutasRequest[i].pagosDto!.valorPago = c.valorCuota
            this.coutasList[i].pagos!.valorPago = this.coutasRequest[i].pagosDto!.valorPago
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
              saldoCuota: pagos.saldoCuota,
              reciboPago: null
            }

            if (valorTotal > c.valorCuota) {
              pagos.saldoCuota = 0;
              pagosOriginal.saldoCuota
            }

            if (valorTotal == c.valorCuota) {
              valorTotal = valorTotal - c.valorCuota

              this.coutasRequest[i].pagosDto = pagos
              this.coutasList[i].pagos = pagosOriginal

              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - this.coutasRequest[i].capitalCuota
              this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
              this.saldoInteresesAcuerdo = this.saldoInteresesAcuerdo - this.coutasRequest[i].interesCuota


              this.coutasRequest[i].capitalCuota = 0
              this.coutasRequest[i].honorarios = 0
              this.coutasRequest[i].interesCuota = 0


              this.coutasList[i].capitalCuota = 0
              this.coutasList[i].honorarios = 0
              this.coutasList[i].interesCuota = 0
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

              this.coutasRequest[i].pagosDto = pagos
              this.coutasList[i].pagos = pagosOriginal

              this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
              this.coutasRequest[i].honorarios = 0
              this.coutasList[i].honorarios = 0


              this.saldoInteresesAcuerdo = this.saldoInteresesAcuerdo - this.coutasRequest[i].interesCuota
              this.coutasRequest[i].interesCuota = 0
              this.coutasList[i].interesCuota = 0

              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - this.coutasRequest[i].capitalCuota
              this.coutasRequest[i].capitalCuota = 0
              this.coutasList[i].capitalCuota = 0

            }


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
              saldoCuota: pagos.saldoCuota,
              reciboPago: null
            }


            var difere = valorTotal


            if (this.coutasRequest[i].honorarios > 0) {
              if (difere > 0) {
                difere = difere - this.coutasRequest[i].honorarios
                this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
                this.coutasRequest[i].honorarios = 0
                this.coutasList[i].honorarios = 0

              }
            }

            if (difere > 0) {
              if (this.coutasRequest[i].interesCuota <= difere) {
                difere = difere - this.coutasRequest[i].interesCuota
                this.saldoInteresesAcuerdo = this.saldoInteresesAcuerdo - this.coutasRequest[i].interesCuota
                this.coutasRequest[i].interesCuota = 0
                this.coutasList[i].interesCuota = 0

              }
            }

            if (difere > 0) {
              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - difere
              this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - difere
              this.coutasList[i].capitalCuota = this.coutasList[i].capitalCuota - difere


            }


            valorTotal = valorTotal - valorTotal
            this.coutasRequest[i].pagosDto = pagos
            this.coutasList[i].pagos = pagosOriginal

            if (this.coutasList[i].capitalCuota > 0) {
              this.coutasList[i].pagos.saldoCuota = this.coutasList[i].capitalCuota
              this.coutasRequest[i].pagosDto!.saldoCuota = this.coutasList[i].capitalCuota
            }
          }



        }

        if (c.pagos!.saldoCuota > 0 && new Date(c.fechaVencimiento) < new Date()) {

          this.coutasRequest[i].cumplio = false
          this.coutasList[i].cumplio = false
          this.pago.cumpliendo = false
        }


        if (c.pagos!.saldoCuota > 0 && new Date(c.fechaVencimiento) >= new Date()) {

          this.coutasRequest[i].cumplio = true
          this.coutasList[i].cumplio = true
          this.pago.cumpliendo = true

        }

        if (c.pagos!.saldoCuota == 0) {
          this.coutasRequest[i].cumplio = true
          this.coutasList[i].cumplio = true
          this.pago.cumpliendo = true
        }

        this.coutasRequest[i].pago = c.pago

      })


      if (this.saldoAcuerdoPago < this.pago.valor) {
        this.saldoAcuerdoPago = this.saldoAcuerdoPago - this.saldoAcuerdoPago
      } else {
        this.saldoAcuerdoPago = this.saldoAcuerdoPago - this.pago.valor
      }
      this.pago.valor = 0
      this.activarGuardarPago = true
    }


  }

  generarRecibo() {


    var coutasFiltradas = this.coutasRequest.filter((c: CuotasRequest) => !c.pago && c.pagosDto != null)

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
      cuotasDto: coutasFiltradas,
      valorTotal: this.valorTotalIngresado,
      acuerdoTotal: this.saldoAcuerdoPago,
      capitalTotal: this.saldoCapitalAcuerdo,
      honorariosTotal: this.saldoHonoriariosAcuerdo,
      interesesTotal: this.saldoInteresesAcuerdo,
      detalle: this.pago.detalle,
      metodoPago: this.pago.medioPago,
      cumpliendo: this.pago.cumpliendo,
      username: '',
      nombreClasificacion: null
    }

    var user = this.auth.getUsername();
    if (user != null || user != undefined) {
      recibo.username = user;

      this.cuentaCobrarService.crearRecibo(recibo).subscribe(
        (data: any) => {

          this.mostrarReciboPago(data.base64)


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

  obtenerReciboPosition(position: number) {
    this.mostrarRecibo = false;
    var recibo = this.recibosPago[position]
    if (recibo != null || recibo != undefined) {
      this.base64Recibo = "data:application/pdf;base64," + recibo.ruta
      var re: any = document.getElementById('mostrarRecibo')
      re.src = this.base64Recibo


    }
  }


  mostrarReciboPago(data: any) {
    this.base64Recibo = "data:application/pdf;base64," + data
    var re: any = document.getElementById('mostrarReciboPago')
    re.src = this.base64Recibo
    $('#reciboPago').modal('show');
  }




}
