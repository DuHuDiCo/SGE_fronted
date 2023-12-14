import { Component, HostListener, OnInit } from '@angular/core';
import { addMonths, isLeapYear, lastDayOfMonth } from 'date-fns';

import { Subscription } from 'rxjs';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Tarea } from 'src/app/Types/Cartera/Clasificacion-Tarea/Tarea';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { CuentaCobrarCalculate, CuentasCobrarResponse } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { Gestion, GestionArray } from 'src/app/Types/Cartera/Gestion/Gestion';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-home-cartera',
  templateUrl: './home-cartera.component.html',
  styleUrls: ['./home-cartera.component.css']
})
export class HomeCarteraComponent implements OnInit {

  private proSubscriptionNext!: Subscription;
  private proSubscriptionBack!: Subscription;

  constructor(private cuentasCobrar: CuentasCobrarService, private authService: AuthenticationService) { }

  // ARRAY CUENTAS POR COBRAR
  cuentasCobrarArray: CuentasCobrarResponse[] = []

  // ARRAYS
  codeudores: any[] = []
  codeudoresSelected: any[] = []
  gestiones: any[] = []
  ClasificacionArray: clasificacion[] = []
  Columnas: string[] = []
  clasificacionesT: Tarea[] = []

  constantes: string[] = [
    'CLIENTE',
    'BANCO',
    'DIAS VENC',
    'EDAD VENC',
    'SUCURSAL',
    'ASESOR',
    'CLAS JURI',
    'SALDO CAP',
    'ANIO',
    'F GESTION',
    'F COMPRO',
  ]
  cuotas: any[] = []

  // OBJETOS

  cuentaCobrarSelected: any = {

    idCuentasPorCobrar: 0,
    numeroObligacion: '',
    cliente: '',
    documentoCliente: '',
    fechaCuentaCobrar: new Date,
    fechaVencimiento: new Date,
    tipo: '',
    valorNotaDebito: 0,
    valorCuota: 0,
    valorPagos: 0,
    nombre_usuario: '',
    clasificacion: '',
    vendedor: '',
    clasificacionJuridica: '',
    detalle: '',
    sede: {
      idSede: 0,
      sede: ''
    },
    banco: {
      idBanco: 0,
      banco: ''
    },
    diasVencidos: 0,
    gestion: [],
    edadVencimiento: '',
    condicionEspecial: '',
    numeroCreditos: 0,
    pagare: '',
    moraObligatoria: 0,
    cuotasMora: 0,
    cuotas: 0,
    asesorCarteraResponse: {
      idAsesorCartera: 0,
      usuario: {
        idUsuario: 0,
        username: '',
        email: '',
        nombres: '',
        apellidos: '',
        sede: '',
        tipo_documento: '',
        numero_documento: '',
        celular: '',
        fecha_nacimiento: new Date,
        fecha_creacion: new Date,
        status: false,
        roles: [],
        enabled: false,
        authorities: [],
        accountNonLocked: false,
        accountNonExpired: false,
        credentialsNonExpired: false,
        password: ''
      }
    },
    clientes: [],
    totalObligatoria: 0
  }

  newGestion: Gestion = {
    numeroObligacion: '',
    clasificacion: {
      tipoClasificacion: null,
      tarea: null,
      nota: null,
      acuerdoPago: null
    },
    gestion: '',
    contact: false,
    detallesAdicionales: ''
  }

  // NOTA
  nota: any = {
    detalle: ''
  }

  // TAREA
  tarea: any = {
    detalleTarea: '',
    fechaFinTarea: new Date,
    clasificacion: ''
  }

  // ACUERDO DE PAGO
  acuerdo: any = {
    detalle: '',
    valorCuotaMensual: 0,
    tipoAcuerdo: '',
    valorTotalAcuerdo: 0,
    valorInteresesMora: 0,
    honoriarioAcuerdo: 0,
    fechaCompromiso: new Date,
    cuotasList: [
      {
        idCuota: 0,
        numeroCuota: 0,
        fechaVencimiento: new Date(),
        valorCuota: 0,
        capitalCuota: 0,
        honorarios: 0,
        cumplio: true
      }
    ],
    username: ''
  }

  acuerdoCal: any = {
    tipoAcuerdo: '',
    valorTotalAcuerdo: 0,
    valorInteresesMora: 0,
    valorCuotaMensual: 0,
    honoriarioAcuerdo: 0,
  }

  // CUENTAS COBRAR CALCULATE
  cuentasCalcular: CuentaCobrarCalculate = {
    numeroObligacion: '',
    valorTotal: 0,
    moraObligatoria: 0,
    fechaVencimiento: new Date,
    username: ''
  }

  cuotaList: any = {
    idCuota: 0,
    numeroCuota: 0,
    fechaVencimiento: '',
    valorCuota: 0,
    capitalCuota: 0,
    interesCuota: 0,
    honorarios: 0,
    cumplio: false
  }

  // PARAMETROS PARA EL SERVICE
  //TODO:CAMBIAR A 0 CUANDO CORRIJAN EL ARCHIVO
  page: number = 1;
  size: number = 10
  fechaCreacion: string = 'fecha_creacion'

  // SPINNER DE LA TABLA
  spinner: boolean = true
  spinnerSidebar: boolean = true
  gestionButton: boolean = false
  modalGestiones: boolean = false

  isSticky = false;
  col: boolean = true;

  numeroPages: number = 0
  last: boolean = false
  first: boolean = false
  initialCon: number = 1;
  cont: number = 1
  isCon: boolean = false
  paginas!: Array<number>

  fechaActual: Date = new Date();

  fechaCorte: string = '';

  constanteHonorarios: number = 0.234
  totalCuotas: number = 0

  fechaInicial: Date = new Date();
  incrementoMeses: number = 1;
  cantidadFechas: number = 0;
  fechasIncrementadas: string[] = [];


  ngOnInit(): void {
    this.getCuentasCobrar()
    this.getClasificacion()
    this.getClasificacionTarea()
    this.fechaActual = new Date()
    this.fechaCorte = this.obtenerFechaActual()
  }

  // TRAER CUENTAS POR COBRAR
  getCuentasCobrar() {

    // var user = this.authService.getUsername()

    //   if (user == null || user == undefined) {
    //     return
    //   }

    this.cuentasCobrar.getCuentasCobrar('Diana1975', this.page, this.size, this.fechaCreacion).subscribe(
      (data: any) => {
        this.paginas = new Array(data.totalPages)
        this.cuentasCobrarArray = data.content
        this.last = data.last
        this.first = data.first
        this.numeroPages = data.totalPages
        this.cuentasCobrar.proSubject.next(true);
        console.log(data);
        if (this.cuentasCobrarArray.length == 0) {
          this.spinner = true
        } else {
          this.spinner = false
        }

        console.log(this.cuentasCobrarArray);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  //PAGINA ANTERIOR
  back() {
    if (!this.first) {
      this.page--
      this.spinner = true
      this.getCuentasCobrar()
      this.proSubscriptionBack = this.cuentasCobrar.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.cont - this.size
          this.proSubscriptionBack.unsubscribe()
        }
      );

    }
  }

  // SIGUIENTE PAGINA
  next() {
    if (!this.last) {
      this.page++
      this.spinner = true
      this.getCuentasCobrar()
      this.proSubscriptionNext = this.cuentasCobrar.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.cont + this.size
          this.proSubscriptionBack.unsubscribe()
        }
      );
    }
  }

  //IR A UNA PAGINA ESPECIFICA
  goToPage(page: number) {
    this.page = page
    this.spinner = true
    this.getCuentasCobrar()
    this.proSubscriptionNext = this.cuentasCobrar.proSubject.subscribe(
      (con: boolean) => {
        this.isCon = con;
        this.cont = this.initialCon + (this.page * this.size);
        this.proSubscriptionNext.unsubscribe()
      }
    );
  }

  findCuentaCobrar(numeroObligacion: string) {
    this.col = true
    if (this.newGestion.numeroObligacion == numeroObligacion) {
      return
    } else {
      this.spinnerSidebar = true
      this.cuentaCobrarSelected = {
        idCuentasPorCobrar: 0,
        numeroObligacion: '',
        cliente: '',
        documentoCliente: '',
        fechaCuentaCobrar: new Date,
        fechaVencimiento: new Date,
        tipo: '',
        valorNotaDebito: 0,
        valorCuota: 0,
        valorPagos: 0,
        nombre_usuario: '',
        clasificacion: '',
        vendedor: '',
        clasificacionJuridica: '',
        detalle: '',
        sede: {
          idSede: 0,
          sede: ''
        },
        banco: {
          idBanco: 0,
          banco: ''
        },
        diasVencidos: 0,
        gestion: [],
        edadVencimiento: '',
        condicionEspecial: '',
        numeroCreditos: 0,
        pagare: '',
        moraObligatoria: 0,
        totalObligatoria: 0,
        cuotasMora: 0,
        cuotas: 0,
        asesorCarteraResponse: {
          idAsesorCartera: 0,
          usuario: {
            idUsuario: 0,
            username: '',
            email: '',
            nombres: '',
            apellidos: '',
            sede: '',
            tipo_documento: '',
            numero_documento: '',
            celular: '',
            fecha_nacimiento: new Date,
            fecha_creacion: new Date,
            status: false,
            roles: [],
            enabled: false,
            authorities: [],
            accountNonLocked: false,
            accountNonExpired: false,
            credentialsNonExpired: false,
            password: ''
          }
        },
        clientes: []
      }
      this.codeudoresSelected = []
      setTimeout(() => {
        this.cuentasCobrar.getCuentaByObligacion(numeroObligacion).subscribe(
          (data: any) => {
            this.cuentaCobrarSelected = data
            this.codeudores = data.clientes
            this.codeudores = this.codeudores.filter((c: any) => c.tipoGarante.tipoGarante != 'TITULAR')
            this.getGestiones(numeroObligacion);
            this.cuentasCalcular.numeroObligacion = numeroObligacion
            this.newGestion = {
              numeroObligacion: this.newGestion.numeroObligacion,
              clasificacion: {
                tipoClasificacion: '',
                tarea: null,
                nota: null,
                acuerdoPago: null
              },
              gestion: '',
              contact: false,
              detallesAdicionales: this.newGestion.detallesAdicionales
            }
            console.log(this.newGestion);

            if (this.cuentaCobrarSelected.documentoCliente != '') {
              this.spinnerSidebar = false
            }
          }, (error: any) => {
            console.log(error);
          }
        )
      }, 2000);
    }

  }

  findCodeudores(event: any) {
    this.codeudoresSelected = this.codeudores.filter((c: any) => c.numeroDocumento == event.target.value)
    console.log(this.codeudoresSelected);
  }

  // GESTIONES
  getGestiones(numeroObligacion: string) {
    this.cuentasCobrar.getGestiones(numeroObligacion).subscribe(
      (data: any) => {
        this.gestiones = data
        this.newGestion.numeroObligacion = numeroObligacion
        this.getLastDato(numeroObligacion)
        console.log(data);

      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getLastDato(numeroDocumento: string) {
    this.cuentasCobrar.getLastDatoAdicional(numeroDocumento).subscribe(
      (data: any) => {
        this.newGestion.detallesAdicionales = data.detallesAdicionelesToSend
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  saveGestion() {

    if (this.newGestion.gestion.trim() == '' || this.newGestion.gestion.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite La Descripción',
        timer: 3000
      })
      return
    }

    if (this.newGestion.clasificacion.tipoClasificacion?.trim() == '' || this.newGestion.clasificacion.tipoClasificacion?.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Una Clasificación',
        timer: 3000
      })
      return
    } else {
      if (this.newGestion.clasificacion.tipoClasificacion.trim() == 'Tarea') {
        if (this.tarea.fechaFinTarea instanceof Date || this.tarea.fechaFinTarea == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Elija Una Fecha Final Para Su Tarea',
            timer: 3000
          })
          return
        }

        if (this.tarea.clasificacion?.trim() == '' || this.tarea.clasificacion?.trim() == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Elija Una Clasificación Para su Tarea',
            timer: 3000
          })
          return
        }


        if (this.tarea.detalleTarea?.trim() == '' || this.tarea.detalleTarea?.trim() == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Digite el Detalle de su Tarea',
            timer: 3000
          })
          return
        }

        this.newGestion.clasificacion.tarea = this.tarea
      }

      if (this.newGestion.clasificacion.tipoClasificacion.trim() == 'Nota') {
        if (this.nota?.detalle.trim() == '' || this.nota?.detalle.trim() == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Digite Un Detalle Para su Nota',
            timer: 3000
          })
          return
        }
        this.newGestion.clasificacion.nota = this.nota
      }

      if (this.newGestion.clasificacion.tipoClasificacion.trim() == 'Acuerdo de Pago') {
        if (this.acuerdo.fechaCompromiso instanceof Date || this.acuerdo.fechaCompromiso == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Elija Una Fecha de Compromiso',
            timer: 3000
          })
          return
        }
        if (this.acuerdo.valorCuotaMensual == 0 || this.acuerdo.valorCuotaMensual == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Digite Un Valor De Cuota Mensual',
            timer: 3000
          })
          return
        }
        if (this.acuerdo.tipoAcuerdo.trim() == '' || this.acuerdo.tipoAcuerdo.trim() == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Elija Un Tipo de Acuerdo',
            timer: 3000
          })
          return
        }
      }
    }
    console.log(this.newGestion);

    // Swal.fire({
    //   title: 'Guardar Gestión',
    //   text: '¿Está Seguro De Crear Esta Gestión?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Crear',
    //   cancelButtonText: 'Cancelar'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     console.log(this.newGestion);
    //     this.gestionButton = true
    //       this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
    //         (data:any) => {
    //           this.gestiones.push(data)
    //           console.log(this.gestiones);
    //           Swal.fire({
    //             icon: 'success',
    //             title: 'Datos Guardados',
    //             text: 'Gestión Guardada Exitosamente',
    //             timer: 3000
    //           })
    //           this.gestionButton = false
    //           this.newGestion = {
    //             numeroObligacion: this.newGestion.numeroObligacion,
    //             clasificacion: {
    //               tipoClasificacion: null,
    //               tarea: null,
    //               nota: null,
    //               acuerdoPago: null
    //             },
    //             gestion: '',
    //             contact: false,
    //             detallesAdicionales: this.newGestion.detallesAdicionales
    //           }
    //           $('#modalGestion').modal('hide');
    //         }, (error:any) => {
    //           Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: 'Error Al Guardar La Gestión',
    //             timer: 3000
    //           })
    //           this.gestionButton = false
    //         }
    //       )
    //   }
    // })

  }


  obtenerFechaActual(): string {
    // Obtiene la fecha actual en formato YYYY-MM-DD
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();

    // Formatea la fecha como YYYY-MM-DD
    const fechaFormateada = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    return fechaFormateada;
  }

  mostrarOffcanvas() {


    if (this.acuerdo.fechaCompromiso instanceof Date || this.acuerdo.fechaCompromiso == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Una Fecha de Compromiso',
        timer: 3000
      })
      return
    }
    if (this.acuerdo.valorCuotaMensual == 0 || this.acuerdo.valorCuotaMensual == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Un Valor De Cuota Mensual',
        timer: 3000
      })
      return
    }
    if (this.acuerdo.tipoAcuerdo.trim() == '' || this.acuerdo.tipoAcuerdo.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Un Tipo de Acuerdo',
        timer: 3000
      })
      return
    }



    // var gestion = this.gestiones.find((g:any) => g.clasificacion.clasificacion == 'Nota')
    // console.log(gestion);

    // if(gestion != null){
    //   console.log(gestion);

    // }

    $('#modalGestion').modal('hide');
    $('#offcanvasTop').offcanvas('show');
  }

  mostrarModalGestion() {
    $('#modalGestion').modal('show');
    $('#offcanvasTop').offcanvas('hide');
  }

  calcular() {

    this.cuotas = []

    if (this.cuentaCobrarSelected.totalObligatoria == 0 || this.cuentaCobrarSelected.totalObligatoria == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Valor Total',
        timer: 3000
      })
      return
    }

    if (this.cuentaCobrarSelected.moraObligatoria == 0 || this.cuentaCobrarSelected.moraObligatoria == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite La Mora Obligatoria',
        timer: 3000
      })
      return
    }

    if (this.cuentaCobrarSelected.fechaVencimiento instanceof Date || this.cuentaCobrarSelected.fechaVencimiento == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Una Fecha De Vencimiento',
        timer: 3000
      })
      return
    }

    this.fechaInicial = new Date(this.acuerdo.fechaCompromiso)
    this.acuerdoCal.valorCuotaMensual = this.acuerdo.valorCuotaMensual
    this.cuentasCalcular.valorTotal = this.cuentaCobrarSelected.totalObligatoria
    this.cuentasCalcular.moraObligatoria = this.cuentaCobrarSelected.moraObligatoria
    this.cuentasCalcular.fechaVencimiento = this.cuentaCobrarSelected.fechaVencimiento
    this.cuentasCalcular.username = 'Diana1975'


    this.calcularIntMora()

    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.calcularHonorarios()
    }

    this.calcularByTipoAcuerdo()

    this.calcularCuotas()

    this.cuentasCobrar.updateCuentaCobrar(this.cuentasCalcular).subscribe(
      (data: any) => {
        this.cuentaCobrarSelected = data
        console.log(data);


        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Datos Confirmados Con Éxito',
          timer: 3000
        })
      }, (error: any) => {
        console.log(error);
      }
    )
    this.col = false
    this.mostrarModalGestion()
    console.log(this.acuerdo);
    console.log(this.acuerdoCal);

  }


  // CALCULOS ACUERDO DE PAGO
  calcularIntMora() {
    var cal = this.cuentasCalcular.moraObligatoria * (this.constanteHonorarios / 366) * this.cuentaCobrarSelected.diasVencidos
    var res = cal.toFixed(0)
    this.acuerdoCal.valorInteresesMora = res
    console.log(this.acuerdoCal.valorInteresesMora);
  }


  calcularHonorarios() {
    var cal = (this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.valorInteresesMora)) * 0.20
    console.log(this.cuentasCalcular.moraObligatoria);
    console.log(this.acuerdoCal.valorInteresesMora);


    var res = cal.toFixed(0)
    this.acuerdoCal.honoriarioAcuerdo = res
    console.log(this.acuerdoCal.honoriarioAcuerdo);
  }


  calcularByTipoAcuerdo() {


    if (this.acuerdo.tipoAcuerdo == 'MORA') {
      this.acuerdoCal.tipoAcuerdo = this.acuerdo.tipoAcuerdo
      if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
        this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
      } else {
        this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.valorInteresesMora)
      }

    }

    if (this.acuerdo.tipoAcuerdo == 'TOTAL') {
      this.acuerdoCal.tipoAcuerdo = this.acuerdo.tipoAcuerdo
      if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
        this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.valorTotal + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
      } else {
        this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.valorTotal + parseInt(this.acuerdoCal.valorInteresesMora)
      }

    }
  }

  // CUOTAS

  // CALCULAR LAS FECHAS DE LAS CUOTAS
  generarFechas() {
    var fechaString = this.fechaInicial.toISOString()
    var fechaSplit = fechaString.split("T")
    var fechaOk = fechaSplit[0].split("-")
    var dia = parseInt(fechaOk[2])
    var mes = parseInt(fechaOk[1])
    var year = parseInt(fechaOk[0])
    var meses31 = [1, 3, 5, 7, 8, 10, 12]
    var meses30 = [4, 6, 9, 11]

    for (let i = 0; i < this.cantidadFechas; i++) {
      var fechaString = `${year}-${mes}-${dia}`

      var fechaDate = new Date(fechaString)

      if (mes == 12) {
        mes = 0
        year++
        mes++;
      } else {
        mes++
      }

      if (mes === 2) {
        if (parseInt(fechaOk[2]) == 30 || parseInt(fechaOk[2]) == 31) {
          const esBisiesto = isLeapYear(fechaDate);

          const ultimoDiaDeFebrero = esBisiesto ? dia = 29 : dia = 28;
        } else {
          dia = parseInt(fechaOk[2])
        }
      } else {
        if (meses30.includes(mes) && ((parseInt(fechaOk[2])) == 30 || (parseInt(fechaOk[2])) == 31)) {
          dia = 30
        } else {
          if (meses31.includes(mes) && ((parseInt(fechaOk[2])) == 31)) {
            dia = 31
          } else {
            dia = parseInt(fechaOk[2])
          }
        }
      }

      var fechaok = `${dia}/${mes}/${year}`

      this.fechasIncrementadas.push(fechaok)

    }

  }

  // CACULAR COUTAS
  calcularCuotas() {
    var totalCuotas = this.acuerdoCal.valorTotalAcuerdo / this.acuerdoCal.valorCuotaMensual
    var res = Math.ceil(totalCuotas);
    this.totalCuotas = res
    console.log(this.totalCuotas);
    this.cantidadFechas = this.totalCuotas;

    this.generarFechas()

    var porAcu = 0

    for (let i = 0; i < totalCuotas; i++) {

      var cuotaList = {
        numeroCuota: 0,
        fechaVencimiento: '',
        valorCuota: 0,
        capitalCuota: 0,
        interesCuota: 0,
        honorarios: 0,
        cumplio: false
      }
      // CUOTA MENSUAL
      cuotaList.valorCuota = this.acuerdoCal.valorCuotaMensual
      cuotaList.fechaVencimiento = this.fechasIncrementadas[i]
      cuotaList.numeroCuota = i + 1

      // CAPITAL CUOTA
      var porcentaje = cuotaList.valorCuota / this.acuerdoCal.valorTotalAcuerdo
      console.log(porcentaje);
      var cap = porcentaje * this.cuentaCobrarSelected.totalObligatoria
      cuotaList.capitalCuota = parseInt(cap.toFixed(0))

      // HONORARIOS POR CUOTA
      if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
        var hon = porcentaje * this.acuerdoCal.honoriarioAcuerdo
        cuotaList.honorarios = parseInt(hon.toFixed(0))
      } else {
        cuotaList.honorarios = 0
      }

      // INTERESES CUOTA
      var int = porcentaje * this.acuerdoCal.valorInteresesMora
      cuotaList.interesCuota = parseInt(int.toFixed(0))


      // ULTIMA CUOTA
      if (this.cuotas.length == this.totalCuotas - 1) {
        var decimalesCuota = totalCuotas % 1
        var ultimaCuota = this.acuerdoCal.valorCuotaMensual * decimalesCuota
        cuotaList.valorCuota = parseInt(ultimaCuota.toFixed(0))

        // CAPITAL CUOTA
        var porcentaje = cuotaList.valorCuota / this.acuerdoCal.valorTotalAcuerdo
        console.log(porcentaje);
        var cap = porcentaje * this.cuentaCobrarSelected.totalObligatoria
        cuotaList.capitalCuota = parseInt(cap.toFixed(0))

        // HONORARIOS POR CUOTA
        if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
          var hon = porcentaje * this.acuerdoCal.honoriarioAcuerdo
          cuotaList.honorarios = parseInt(hon.toFixed(0))
        } else {
          cuotaList.honorarios = 0
        }

        // INTERESES CUOTA
        var int = porcentaje * this.acuerdoCal.valorInteresesMora
        cuotaList.interesCuota = parseInt(int.toFixed(0))

        this.cuotas.push(cuotaList)
      } else {
        this.cuotas.push(cuotaList)
      }
      cuotaList = {
        numeroCuota: 0,
        fechaVencimiento: '',
        valorCuota: 0,
        capitalCuota: 0,
        interesCuota: 0,
        honorarios: 0,
        cumplio: false
      }

    }
    console.log(this.cuotas);

  }

  // RECALCULAR
  recalcularValores(position: number, event: any) {
    console.log(this.cuotas);

    var nuevoValor = event.target.value - this.acuerdoCal.valorCuotaMensual

    if (event.target.value > this.cuotas[position].valorCuota) {
      for (let i = this.cuotas.length - 1; i > position; i--) {
        if (nuevoValor > this.cuotas[i].valorCuota) {
          nuevoValor = nuevoValor - this.cuotas[i].valorCuota
          this.cuotas.splice(i)
        } else {
          alert(nuevoValor)
          nuevoValor = nuevoValor - this.cuotas[i].valorCuota
          if (nuevoValor <= 0) {
            this.cuotas[i].valorCuota = (nuevoValor) * -1
            this.totalCuotas = this.cuotas.length
            break
          }
        }
      }
    }

    //RECALCULAR PARA SUMAR CUOTAS
    var nuevoValorSumarCuotas = this.acuerdoCal.valorCuotaMensual - event.target.value
    console.log(this.acuerdoCal.valorCuotaMensual);
    console.log(event.target.value);

    if (event.target.value < this.cuotas[position].valorCuota) {



      for (let i = position; i < this.cuotas.length; i++) {

        //nuevo valor menor ultima cuota
        if (nuevoValorSumarCuotas < this.cuotas[this.cuotas.length - 1].valorCuota) {

          var cuotamenos = this.cuotas[this.cuotas.length - 1].valorCuota + nuevoValorSumarCuotas
          if (cuotamenos > this.acuerdoCal.valorCuotaMensual) {
            var couta = this.cuotas[this.cuotas.length - 1].valorCuota + nuevoValorSumarCuotas
            if (couta > this.acuerdoCal.valorCuotaMensual) {

              var excedentePrinciapl = couta - this.acuerdoCal.valorCuotaMensual

              var excedenteParaCuouta = nuevoValorSumarCuotas - excedentePrinciapl

              this.cuotas[this.cuotas.length-1].valorCuota = this.cuotas[this.cuotas.length-1].valorCuota +excedenteParaCuouta

              if (excedentePrinciapl > 0) {
                var cuoUl = {
                  idCuota: 0,
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedentePrinciapl,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUl)
                excedentePrinciapl = 0
                break;
              }


            } else {
              this.cuotas[this.cuotas.length - 1].valorCuota = couta
            }

          }

        }

        //nuevo valor mayor ultima cuota
        if (nuevoValorSumarCuotas > this.cuotas[this.cuotas.length - 1].valorCuota) {

          if (nuevoValorSumarCuotas <= this.acuerdoCal.valorCuotaMensual) {


            var couta = this.cuotas[this.cuotas.length - 1].valorCuota + nuevoValorSumarCuotas
            if (couta > this.acuerdoCal.valorCuotaMensual) {

              var excedentePrinciapl = couta - this.acuerdoCal.valorCuotaMensual

              var excedenteParaCuouta = nuevoValorSumarCuotas - excedentePrinciapl

              this.cuotas[this.cuotas.length-1].valorCuota = this.cuotas[this.cuotas.length-1].valorCuota +excedenteParaCuouta

              if (excedentePrinciapl > 0) {
                var cuoUl = {
                  idCuota: 0,
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedentePrinciapl,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUl)
                excedentePrinciapl = 0
                break;
              }

            } else {
              this.cuotas[this.cuotas.length - 1].valorCuota = couta
              this.cuotas[position].valorCuota = parseInt(event.target.value)
              break;
            }

          }

          
          var nuevoValorSumarCuotasCambio = this.cuotas[position].valorCuota - event.target.value
          if(nuevoValorSumarCuotasCambio >= this.acuerdoCal.valorCuotaMensual){
            var coutaCambio = this.acuerdoCal.valorCuotaMensual - this.cuotas[this.cuotas.length -1 ]
            this.cuotas[this.cuotas.length-1].valorCuota = coutaCambio

            nuevoValorSumarCuotasCambio  = nuevoValorSumarCuotasCambio - coutaCambio
            if(nuevoValorSumarCuotasCambio > 0 &&  nuevoValorSumarCuotasCambio < this.acuerdoCal.valorCuotaMensual){
              var cuoUl = {
                idCuota: 0,
                numeroCuota: 0,
                fechaVencimiento: '',
                valorCuota: nuevoValorSumarCuotasCambio,
                capitalCuota: 0,
                interesCuota: 0,
                honorarios: 0,
                cumplio: false
              }
              this.cuotas.push(cuoUl)
              nuevoValorSumarCuotasCambio = 0
              break;
            }


          }

          


        }
      }
    }
    console.log(this.cuotas);
  }

  // CLASIFICACION
  getClasificacion() {
    this.cuentasCobrar.getClasificacion().subscribe(
      (data: any) => {
        this.ClasificacionArray = data
        console.log(this.ClasificacionArray);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  cancelarGestion() {

    Swal.fire({
      title: 'Limpiar Gestión',
      text: 'Los Datos De la Gestión Actual serán Limpiados, ¿Está Seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Limpiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.newGestion = {
          numeroObligacion: this.newGestion.numeroObligacion,
          clasificacion: {
            tipoClasificacion: '',
            tarea: {
              detalleTarea: '',
              fechaFinTarea: new Date,
              clasificacion: ''
            },
            nota: {
              detalle: ''
            },
            acuerdoPago: {
              detalle: '',
              valorCuotaMensual: 0,
              tipoAcuerdo: '',
              valorTotalAcuerdo: 0,
              valorInteresesMora: 0,
              honoriarioAcuerdo: 0,
              fechaCompromiso: new Date,
              cuotasList: [],
              username: ''
            }
          },
          gestion: '',
          contact: false,
          detallesAdicionales: this.newGestion.detallesAdicionales
        }
        $('#modalGestion').modal('hide');
      }
    })
  }

  abrirGestiones() {
    this.modalGestiones = true
  }

  cerrarGestiones() {
    this.modalGestiones = false
  }

  ocultarColumnas(columna: string) {
    if (this.Columnas.includes(columna)) {
      var position = this.Columnas.indexOf(columna)
      this.Columnas.splice(position, 1)
    } else {
      this.Columnas.push(columna)
    }
  }

  maxFecha(): string {
    var fechaMax = new Date();

    fechaMax.setDate(this.fechaActual.getDate() + 30)
    var fechaForm = fechaMax.toISOString().split('T')[0]

    return fechaForm;
  }

  minFecha(): string {
    var fechaMin = new Date();
    var fechaForm = fechaMin.toISOString().split('T')[0]
    return fechaForm;
  }

  seleccionarSize(numero: number) {
    switch (numero) {
      case 20:
        this.size = 20
        this.spinner = true
        this.getCuentasCobrar()
        break;
      case 50:
        this.spinner = true
        this.size = 50
        this.getCuentasCobrar()
        break;
      case 100:
        this.spinner = true
        this.size = 100
        this.getCuentasCobrar()
        break;
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;

    // Cambia la clase según la posición de desplazamiento
    this.isSticky = scrollPosition >= 250;
  }

  // CLASIFICACION TAREA
  getClasificacionTarea() {
    this.cuentasCobrar.getTareas().subscribe(
      (data: any) => {
        this.clasificacionesT = data
        console.log(data);

      }, (error: any) => {
        console.log(error);
      }
    )
  }

  copyToClipboard(event: any) {
    navigator.clipboard.writeText(event.target.value).then(function () {
      Swal.fire({
        title: "Texto Copiado",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false
      });
    }).catch(function (err) {
      alert("error")
    })
  }
}
