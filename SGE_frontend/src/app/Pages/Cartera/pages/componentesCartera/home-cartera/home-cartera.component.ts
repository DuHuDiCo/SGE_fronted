import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addMonths, isLeapYear, lastDayOfMonth } from 'date-fns';

import { Subscription } from 'rxjs';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Tarea } from 'src/app/Types/Cartera/Clasificacion-Tarea/Tarea';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { CuentaCobrarCalculate, CuentasCobrarResponse } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';

import { CuotaList, CuotasRequest, Filtros, Gestion, GestionArray, Gestiones, Pagos, PagosRequest, ReciboPago, TipoVencimiento } from 'src/app/Types/Cartera/Gestion/Gestion';

import { ROLES } from 'src/app/Types/Roles';

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

  constructor(private cuentasCobrar: CuentasCobrarService, private authService: AuthenticationService, private router: Router) {
    this.listaDeAnios = this.obtenerListaDeAnios()
  }

  // ARRAY CUENTAS POR COBRAR
  cuentasCobrarArray: CuentasCobrarResponse[] = []
  mostrarRecibo: boolean = false
  // ARRAYS
  codeudores: any[] = []
  codeudoresSelected: any[] = []
  gestiones: any[] = []
  ClasificacionArray: clasificacion[] = []
  Columnas: string[] = []
  clasificacionesT: Tarea[] = []
  tiposVen: TipoVencimiento[] = []
  disableds!: Array<boolean>
  mostrarAgregarPago:boolean=false
  pago: any = {
    valor: 0,
    detalle: '',
    medioPago: "CONSIGNACION",
    numeroRecibo: '',
    cumpliendo: false
  }
  valorTotalIngresado: number = 0
  totalCuotasAcuerdo: number = 0
  saldoAcuerdoPago: number = 0
  saldoInteresesAcuerdo: number = 0
  saldoHonoriariosAcuerdo: number = 0
  saldoCapitalAcuerdo: number = 0
  totalIntereses: number = 0
  totalHonorarios: number = 0
  totalCapital: number = 0
  coutasRequest: CuotasRequest[] = []
  cuotasList: CuotaList[] = []
  activarGuardarPago: boolean = false
  pagoCuota: number = 0
  savePago: boolean = false
  base64Recibo: string = ""
  recibosPago: ReciboPago[] = []
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
  paginas!: Array<number>
  fechasIncrementadas: string[] = [];
  listaDeAnios: number[] = [];
  sedes: any[] = []
  cuotasSelected: any[] = []

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
      acuerdoPago: null,
      nombreClasificacion: ''
    },
    gestion: '',
    contact: false,
    detallesAdicionales: ''
  }

  gestionSelected: any = {
    numeroObligacion: '',
    clasificacion: {
      nombreClasificacion: '',
      tipoClasificacion: '',
      tarea: {
        detalleTarea: '',
        fechaFinTarea: new Date(),
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
        fechaCompromiso: new Date(),
        cuotasList: [],
        username: ''
      }
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
  }

  // ACUERDO DE PAGO
  acuerdo: any = {
    detalle: '',
    valorCuotaMensual: 0,
    tipoAcuerdo: '',
    valorTotalAcuerdo: 0,
    valorInteresesMora: 0,
    honoriarioAcuerdo: 0,
    fechaCompromiso: '',
    cuotasList: [],
    username: ''
  }

  acuerdoCal: any = {
    tipoAcuerdo: '',
    valorTotalAcuerdo: 0,
    valorTotalMora: 0,
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

  reporte: any = {
    numeroObligacion: "",
    cedula: ""
  }

  mostrarRep: any = {
    messageToWpp: "",
    base64: ""
  }

  clienteSelected: any = {
    numeroDocumento: '',
    nombreTitular: ''
  }

  //FILTROS
  filtros: Filtros = {
    banco: [],
    diasVencidosInicio: null,
    diasVencidosFin: null,
    edadVencimiento: [],
    sede: [],
    //TODO: CAMBIAR POR VACIO
    username: 'Diana1975',
    clasiJuridica: [],
    saldoCapitalInicio: null,
    saldoCapitalFin: null,
    fechaCpcInicio: null,
    fechaCpcFin: null,
    fechaGestionInicio: null,
    fechaGestionFin: null,
    fechaCompromisoInicio: null,
    fechaCompromisoFin: null,
    isActive: false
  }

  bancosArray: string[] = []
  edadVenArray: string[] = []
  sedesArray: string[] = []
  clasJurArray: string[] = []

  //VARIABLES
  mensaje: string = ''
  base64: string = ''

  // PARAMETROS PARA EL SERVICE
  //TODO:CAMBIAR A 0 CUANDO CORRIJAN EL ARCHIVO
  page: number = 0;
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

  fechaActual: Date = new Date();
  fechamax: string = '';
  fechamin: string = '';

  fechaCorte: string = '';

  constanteHonorarios: number = 0.234
  totalCuotas: number = 0

  fechaInicial: Date = new Date();
  incrementoMeses: number = 1;
  cantidadFechas: number = 0;
  idGestion: number = 0

  resetButton: boolean = false
  deshabilitarInputs: boolean = true
  saldoCapitalTotalFirst: number = 0
  moraObligatoriaFirst: number = 0

  sinDiasVencidos: number | null = 1
  isCalculate: boolean = true
  disabledFecha: boolean = false

  desactivarAcu: boolean = false
  botonFiltro: boolean = false
  filtrando: boolean = false

  // VARIABLE PARA FILTRAR OBLIGACION
  buscarObligacion:string = ''
  botonFiltrarObligacion: boolean = false


  ngOnInit(): void {
    this.getCuentasCobrar()
    this.getClasificacion()
    this.getTipoVen()
    this.getSedes()
    this.fechaActual = new Date()
    this.fechaCorte = this.obtenerFechaActual()
  }

  getTipoVen() {
    this.cuentasCobrar.getTipoVencimiento().subscribe(
      (data: any) => {
        this.tiposVen = data
        console.log(this.tiposVen);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getSedes() {
    this.cuentasCobrar.getSedes().subscribe(
      (data: any) => {
        this.sedes = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  obtenerListaDeAnios(): number[] {
    const anioInicial = 1990;
    const anioActual = new Date().getFullYear();

    const listaDeAnios = [];
    for (let anio = anioInicial; anio <= anioActual; anio++) {
      listaDeAnios.push(anio);
    }
    return listaDeAnios;
  }

  calcularFechasAnio(event: any) {
    this.filtros.fechaCpcInicio = new Date(event.target.value, 0, 1); // 0 representa enero
    this.filtros.fechaCpcFin = new Date(event.target.value, 11, 31); // 11 representa diciembre
    console.log(this.filtros.fechaCpcInicio);
    console.log(this.filtros.fechaCpcFin);
  }

  // TRAER CUENTAS POR COBRAR
  getCuentasCobrar() {

    // var user = this.authService.getUsername()

    //   if (user == null || user == undefined) {
    //     return
    //   }
    this.filtrando = false
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
      if (this.filtrando) {
        this.spinner = true
        this.filtro()
        this.proSubscriptionBack = this.cuentasCobrar.proSubject.subscribe(
          (con: boolean) => {
            this.isCon = con;
            this.cont = this.cont - this.size
            this.proSubscriptionBack.unsubscribe()
            this.spinner = false
          }
        );
      } else {
        this.spinner = true
        this.getCuentasCobrar()
        this.proSubscriptionBack = this.cuentasCobrar.proSubject.subscribe(
          (con: boolean) => {
            this.isCon = con;
            this.cont = this.cont - this.size
            this.proSubscriptionBack.unsubscribe()
            this.spinner = false
        }
        );
      }
    }
  }

  // SIGUIENTE PAGINA
  next() {
    if (!this.last) {
      this.spinner = true
      this.page++
      if (this.filtrando) {
        this.filtro()
        this.proSubscriptionNext = this.cuentasCobrar.proSubject.subscribe(
          (con: boolean) => {
            this.isCon = con;
            this.cont = this.cont + this.size
            this.proSubscriptionNext.unsubscribe()
            this.spinner = false
          }
        );
      } else {
        this.spinner = true
        this.getCuentasCobrar()
        this.proSubscriptionNext = this.cuentasCobrar.proSubject.subscribe(
          (con: boolean) => {
            this.isCon = con;
            this.cont = this.cont + this.size
            this.proSubscriptionNext.unsubscribe()
          }
        );
      }
    }
  }

  //IR A UNA PAGINA ESPECIFICA
  goToPage(page: number) {
    this.page = page
    if(this.filtrando){
      this.spinner = true
      this.filtro()
      this.proSubscriptionNext = this.cuentasCobrar.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.size);
          this.proSubscriptionNext.unsubscribe()
          this.spinner = false
        }
      );
    } else {
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
        fechaCuentaCobrar: '',
        fechaVencimiento: '',
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

      this.acuerdo = {
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

      this.newGestion = {
        numeroObligacion: '',
        clasificacion: {
          tipoClasificacion: null,
          tarea: null,
          nota: null,
          acuerdoPago: null,
          nombreClasificacion: ''
        },
        gestion: '',
        contact: false,
        detallesAdicionales: ''
      }

      this.codeudoresSelected = []
      setTimeout(() => {
        this.cuentasCobrar.getCuentaByObligacion(numeroObligacion).subscribe(
          (data: any) => {
            this.cuentaCobrarSelected = data
            this.saldoCapitalTotalFirst = data.clientes[0].saldoActual
            this.moraObligatoriaFirst = data.moraObligatoria
            this.calcularFirst()
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
                acuerdoPago: null,
                nombreClasificacion: ''
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
    this.gestiones = []
    this.cuentasCobrar.getGestiones(numeroObligacion).subscribe(
      (data: any) => {
        this.newGestion.numeroObligacion = numeroObligacion
        this.getLastDato(numeroObligacion)
        console.log(this.gestiones);
        this.ordenarGestiones(data)
        var gestion = this.gestiones.find((g: any) => g.clasificacion.clasificacion == 'ACUERDO DE PAGO' && g.clasificacion.isActive)
        if (gestion != null || gestion != undefined) {
          this.idGestion = gestion.idGestion
        }
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
    this.reporte.numeroObligacion = this.cuentaCobrarSelected.numeroObligacion

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
      if (this.newGestion.clasificacion.tipoClasificacion.trim() == 'TAREA') {
        if (this.tarea.fechaFinTarea instanceof Date || this.tarea.fechaFinTarea == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Elija Una Fecha Final Para Su Tarea',
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

        Swal.fire({
          title: 'Guardar Gestión',
          text: '¿Está Seguro De Crear Esta Gestión?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Crear',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(this.newGestion);
            this.gestionButton = true
            this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
              (data: any) => {
                this.gestiones.push(data)
                console.log(this.gestiones);
                Swal.fire({
                  icon: 'success',
                  title: 'Datos Guardados',
                  text: 'Gestión Guardada Exitosamente',
                  timer: 3000
                })
                this.gestionButton = false
                this.newGestion = {
                  numeroObligacion: this.newGestion.numeroObligacion,
                  clasificacion: {
                    tipoClasificacion: null,
                    tarea: null,
                    nota: null,
                    acuerdoPago: null,
                    nombreClasificacion: ''
                  },
                  gestion: '',
                  contact: false,
                  detallesAdicionales: this.newGestion.detallesAdicionales
                }
                $('#modalDetalle').modal('hide');
              }, (error: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error Al Guardar La Gestión',
                  timer: 3000
                })
                this.gestionButton = false
              }
            )
          }
        })
      }

      if (this.newGestion.clasificacion.tipoClasificacion.trim() == 'NOTA') {
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

        Swal.fire({
          title: 'Guardar Gestión',
          text: '¿Está Seguro De Crear Esta Gestión?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Crear',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(this.newGestion);
            this.gestionButton = true
            this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
              (data: any) => {
                this.gestiones.push(data)
                console.log(this.gestiones);
                Swal.fire({
                  icon: 'success',
                  title: 'Datos Guardados',
                  text: 'Gestión Guardada Exitosamente',
                  timer: 3000
                })
                this.gestionButton = false
                this.newGestion = {
                  numeroObligacion: this.newGestion.numeroObligacion,
                  clasificacion: {
                    tipoClasificacion: null,
                    tarea: null,
                    nota: null,
                    acuerdoPago: null,
                    nombreClasificacion: ''
                  },
                  gestion: '',
                  contact: false,
                  detallesAdicionales: this.newGestion.detallesAdicionales
                }
                $('#modalDetalle').modal('hide');
              }, (error: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error Al Guardar La Gestión',
                  timer: 3000
                })
                this.gestionButton = false
              }
            )
          }
        })
      }

      if (this.newGestion.clasificacion.tipoClasificacion.trim() == 'ACUERDO DE PAGO') {
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
        if (this.cuotas.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe de Calcular las Cuotas del Acuerdo',
            timer: 3000
          })
          return
        }        

        this.newGestion.clasificacion.acuerdoPago = this.acuerdo
        this.cuotas.forEach(element => {
          this.newGestion.clasificacion.acuerdoPago?.cuotasList.push(element)
        });

        this.newGestion.clasificacion.acuerdoPago?.cuotasList.splice(0, 1)

        //TODO:CAMBIAR POR EL NOMBRE DE USUARIO
        this.newGestion.clasificacion.acuerdoPago!.username = 'Diana1975'
        console.log(this.newGestion.clasificacion.acuerdoPago);

        $('#modalGestion').modal('hide');
        $('#modalDetalle').modal('show');
      }
    }



  }

  saveGestionWithDetalle(accion: string) {
    if (accion == 'SI') {
      if (this.acuerdo.detalle.trim() == '' || this.acuerdo.detalle.trim() == null) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Digite El detalle',
          timer: 3000
        })
        return
      }
      if (this.reporte.cedula.trim() == '' || this.reporte.cedula.trim() == null) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Digite El detalle',
          timer: 3000
        })
        return
      }
    }

    if (accion == 'NO') {
      if (this.reporte.cedula.trim() == '' || this.reporte.cedula.trim() == null) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Elija La Cédula del Cliente o Codeudor',
          timer: 3000
        })
        return
      }
      this.newGestion.clasificacion.acuerdoPago!.detalle = this.acuerdo.detalle
    }



    var sumaComprobacion = 0
    for (let i = 0; i < this.cuotas.length; i++) {
      sumaComprobacion = sumaComprobacion + this.cuotas[i].valorCuota
      console.log(sumaComprobacion);

    }

    if (sumaComprobacion != this.acuerdoCal.valorTotalAcuerdo) {
      Swal.fire({
        icon: 'error',
        title: 'La suma de la cuotas no coincide con el Valor del Acuerdo',
        text: 'Recalculando...',
        timer: 3000
      })
      setTimeout(() => {
        this.calcular()
      }, 3000);

    }

    console.log(this.newGestion);

    Swal.fire({
      title: 'Guardar Gestión',
      text: '¿Está Seguro De Crear Esta Gestión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.newGestion);
        this.gestionButton = true
          this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
            (data:any) => {
              this.gestiones.push(data)
              console.log(this.gestiones);
              this.mostrarReporte()
              Swal.fire({
                icon: 'success',
                title: 'Datos Guardados',
                text: 'Gestión Guardada Exitosamente',
                timer: 3000
              })
              this.gestionButton = false
              this.newGestion = {
                numeroObligacion: this.newGestion.numeroObligacion,
                clasificacion: {
                  tipoClasificacion: null,
                  tarea: null,
                  nota: null,
                  acuerdoPago: null,
                  nombreClasificacion: ''
                },
                gestion: '',
                contact: false,
                detallesAdicionales: this.newGestion.detallesAdicionales
              }
              this.cuotas = []
              this.disabledFecha = false
              this.acuerdo = {
                detalle: '',
                valorCuotaMensual: 0,
                tipoAcuerdo: '',
                valorTotalAcuerdo: 0,
                valorInteresesMora: 0,
                honoriarioAcuerdo: 0,
                fechaCompromiso: '',
                cuotasList: [],
                username: ''
              }
              this.cuentasCalcular = {
                numeroObligacion: '',
                valorTotal: 0,
                moraObligatoria: 0,
                fechaVencimiento: new Date,
                username: ''
              }
              this.col = true              
              $('#modalDetalle').modal('hide');
              $('#modalReporte').modal('show');
            }, (error:any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error Al Guardar La Gestión',
                timer: 3000
              })
              this.gestionButton = false
            }
          )
      }
    })
  }

  desactivarAcuerdo() {
    Swal.fire({
      title: 'Desactivar Acuerdo',
      text: '¿Desea Desactivar El Acuerdo de Pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentasCobrar.desactivateAcuerdoPago(this.gestionSelected.idGestion).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Datos Guardados',
              text: 'Acuerdo Desactivado Con Éxito',
              timer: 3000
            })
            this.newGestion.contact = true
            this.getGestiones(this.newGestion.numeroObligacion)
            setTimeout(() => {
              $('#modalGestion').modal('show');
              $('#modalGestionCom').modal('hide');
            }, 2000);
          }, (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error Al Desactivar El Acuerdo',
              timer: 3000
            })
            console.log(error);
          }
        )
      } else {
        var nombre = this.ClasificacionArray.filter((n: any) => n.nombre != 'ACUERDO DE PAGO')
        this.newGestion.clasificacion.nombreClasificacion = nombre[0].nombre
        this.newGestion.clasificacion.tipoClasificacion = nombre[0].tipo

        this.newGestion.contact = false
      }
    })
  }

  tipoClasificacion(event: any) {

    this.newGestion.clasificacion.nombreClasificacion = event.target.value

    var tipoClas = this.ClasificacionArray.find((t: any) => t.nombre == event.target.value)
    if (tipoClas != undefined || tipoClas != null) {
      this.newGestion.clasificacion.tipoClasificacion = tipoClas.tipo
      console.log(this.newGestion.clasificacion.tipoClasificacion);
    }

    if (this.newGestion.clasificacion.tipoClasificacion != 'ACUERDO DE PAGO') {
      this.col = true
      this.newGestion.contact = false
      this.disabledFecha = false
    }

    if (this.newGestion.clasificacion.tipoClasificacion == 'ACUERDO DE PAGO') {
      var gestion = this.gestiones.find((g: any) => g.clasificacion.clasificacion == 'ACUERDO DE PAGO' && g.clasificacion.isActive)
      this.gestionSelected = gestion
      console.log(this.gestionSelected);

      if (this.gestionSelected != null || this.gestionSelected != undefined) {

        this.newGestion.contact = false

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Este Cliente tiene un Acuerdo de Pago Vigente',
          timer: 3000
        })

        var nombre = this.ClasificacionArray.filter((n: any) => n.tipo != 'ACUERDO DE PAGO')
        this.newGestion.clasificacion.tipoClasificacion = nombre[0].tipo
        event.target.value = nombre[0].nombre

        setTimeout(() => {
          $('#modalGestion').modal('hide');
          $('#modalGestionCom').modal('show');
        }, 3000);

      } else {
        this.newGestion.contact = true
      }
    }
  }

  getOneGestion(id: number) {
    this.gestionSelected = {
      numeroObligacion: '',
      clasificacion: {
        nombreClasificacion: '',
        tipoClasificacion: '',
        tarea: {
          detalleTarea: '',
          fechaFinTarea: new Date(),
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
          fechaCompromiso: new Date(),
          cuotasList: [],
          username: ''
        }
      },
      gestion: '',
      contact: false,
      detallesAdicionales: ''
    }

    var gestion = this.gestiones.find((g: any) => g.idGestion == id)
    console.log(id);

    this.gestionSelected = gestion
    console.log(this.gestionSelected);

    if(this.gestionSelected.clasificacion.clasificacion == 'ACUERDO DE PAGO'){
      this.obtenerCuotas()
    }
    
  }

  obtenerCuotas(){
    this.cuotasList = []

    this.gestionSelected.clasificacion.cuotasList.forEach((c: any) => {
      this.cuotasList.push(c)
    });

    this.cuotasList.forEach((c: CuotaList) => {

      this.totalCuotasAcuerdo = this.totalCuotasAcuerdo + c.valorCuota
      this.totalCapital = this.totalCapital + c.capitalCuota
      this.totalHonorarios = this.totalHonorarios + c.honorarios
      this.totalIntereses = this.totalIntereses + c.interesCuota
      if (c.pagos != null || c.pagos != undefined) {

        if (c.pagos.reciboPago != null || c.pagos.reciboPago != undefined) {
          this.recibosPago.push(c.pagos.reciboPago)
        }

        console.log(c.pagos.valorPago);
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
        interesCuota: c.interesCuota,
        pagosDto: null

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
    })

    console.log(this.gestionSelected);
  }

  mostrarReporte() {
    this.cuentasCobrar.reporte(this.reporte).subscribe(
      (data: any) => {
        this.mostrarRep = data
        this.mensaje = this.mostrarRep.messageToWpp
        this.base64 = this.mostrarRep.base64
        console.log(this.mensaje);
      }, (error: any) => {
        console.log(error);
      }
    )

    var cliente = this.cuentaCobrarSelected.clientes.find((c: any) => c.numeroDocumento = this.reporte.cedula)
    this.clienteSelected.numeroDocumento = cliente.numeroDocumento
    this.clienteSelected.nombreTitular = cliente.nombreTitular
    console.log(this.clienteSelected);
  }

  cambiarCedula(event: any) {
    this.reporte.cedula = this.reporte.cedula
    console.log(this.reporte);
  }

  mostrarBase64() {
    var ele = document.getElementById('base64')
    ele?.click()
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

    this.acuerdoCal.valorCuotaMensual = this.acuerdo.valorCuotaMensual
    this.cuentasCalcular.valorTotal = this.cuentaCobrarSelected.totalObligatoria
    this.cuentasCalcular.moraObligatoria = this.cuentaCobrarSelected.moraObligatoria
    this.cuentasCalcular.fechaVencimiento = this.cuentaCobrarSelected.fechaVencimiento


    if (this.acuerdo.fechaCompromiso instanceof Date || this.acuerdo.fechaCompromiso == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Una Fecha de Compromiso',
        timer: 3000
      })
      return
    }
    if (this.acuerdo.fechaCompromiso > this.fechamax) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Una Fecha Menor a 30 Dias desde hoy',
        timer: 3000
      })
      return
    }
    if (this.acuerdo.fechaCompromiso < this.fechamin) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No Puede Elegir Una Fecha Anterior Al Dia de Hoy',
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
    this.calcularIntMora()

    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.calcularHonorarios()
    }

    this.calcularByTipoAcuerdo()
    console.log(this.acuerdoCal.valorTotalAcuerdo);

    if (this.acuerdo.valorCuotaMensual > this.acuerdoCal.valorTotalAcuerdo) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No Puede Ingresar Un Valor Mayor al Valor del Acuerdo',
        timer: 3000
      })
      return
    }

    var valorMinimo = this.acuerdoCal.valorTotalAcuerdo / 20
    console.log(valorMinimo);

    if (this.acuerdo.valorCuotaMensual < valorMinimo) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `El Valor Mínimo De La Cuota debe de ser de: ${valorMinimo}`,
        timer: 3000
      })
      return
    }

    this.disabledFecha = true
    this.calcular()
  }

  mostrarModalGestion() {
    $('#modalGestion').modal('show');
    $('#offcanvasTop').offcanvas('hide');
  }

  modalGestionSelected(){
    $('#modalHistoricoG').modal('show');
    $('#modalGestionCom').modal('hide');
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

    this.disableds = new Array(this.cuotas.length)
    this.disableds.forEach(element => {
      this.disableds.push(false)
    });

    this.disableds[0] = true
    this.disableds[this.cuotas.length - 1] = true

    this.col = false

  }


  // CALCULOS ACUERDO DE PAGO
  calcularIntMora() {
    var cal = this.cuentasCalcular.moraObligatoria * (this.constanteHonorarios / 366) * this.cuentaCobrarSelected.diasVencidos
    var res = cal.toFixed(0)
    this.acuerdoCal.valorInteresesMora = res
    this.acuerdo.valorInteresesMora = this.acuerdoCal.valorInteresesMora
    console.log(this.acuerdoCal.valorInteresesMora);
  }


  calcularHonorarios() {
    var cal = (this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.valorInteresesMora)) * 0.20
    console.log(this.cuentasCalcular.moraObligatoria);
    console.log(this.acuerdoCal.valorInteresesMora);


    var res = cal.toFixed(0)
    this.acuerdoCal.honoriarioAcuerdo = res
    this.acuerdo.honoriarioAcuerdo = this.acuerdoCal.honoriarioAcuerdo
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
    this.acuerdo.valorTotalAcuerdo = this.acuerdoCal.valorTotalAcuerdo
  }

  metodosCalculos() {

    for (let i = 0; i < this.cuotas.length; i++) {
      //CAPITAL CUOTA
      var porcentaje = this.cuotas[i].valorCuota / this.acuerdoCal.valorTotalAcuerdo
      console.log(porcentaje);
      var cap = porcentaje * this.cuentaCobrarSelected.totalObligatoria
      this.cuotas[i].capitalCuota = parseInt(cap.toFixed(0))

      // HONORARIOS POR CUOTA
      if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
        var hon = porcentaje * this.acuerdoCal.honoriarioAcuerdo
        this.cuotas[i].honorarios = parseInt(hon.toFixed(0))
      } else {
        this.cuotas[i].honorarios = 0
      }

      // INTERESES CUOTA
      var int = porcentaje * this.acuerdoCal.valorInteresesMora
      this.cuotas[i].interesCuota = parseInt(int.toFixed(0))

    }



  }

  //METODOS CALCULADORA OFFCANVAS INFERIOR

  calcularFirst() {
    this.acuerdoCal = {
      tipoAcuerdo: '',
      valorTotalAcuerdo: 0,
      valorTotalMora: 0,
      valorInteresesMora: 0,
      valorCuotaMensual: 0,
      honoriarioAcuerdo: 0,
    }

    //INTERESES MORA
    var resIntMora = this.cuentaCobrarSelected.moraObligatoria * (this.constanteHonorarios / 366) * this.cuentaCobrarSelected.diasVencidos
    this.acuerdoCal.valorInteresesMora = resIntMora.toFixed(0)

    //HONORARIOS
    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      var resHonorarios = (parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)) * 0.20
      this.acuerdoCal.honoriarioAcuerdo = resHonorarios.toFixed(0)
    }

    //MORA Y TOTAL
    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.acuerdoCal.valorTotalMora = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
    } else {
      this.acuerdoCal.valorTotalMora = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)
    }

    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.acuerdoCal.valorTotalAcuerdo = parseInt(this.cuentaCobrarSelected.clientes[0].saldoActual) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
    } else {
      this.acuerdoCal.valorTotalAcuerdo = parseInt(this.cuentaCobrarSelected.clientes[0].saldoActual) + parseInt(this.acuerdoCal.valorInteresesMora)
    }


  }

  calculadora(event: any) {
    if (this.cuentaCobrarSelected.clientes[0].saldoActual >= 0 || this.cuentaCobrarSelected.clientes[0].saldoActual == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Saldo Capital Total',
        timer: 3000
      })
      return
    }
    if (this.cuentaCobrarSelected.clientes[0].saldoActual < this.cuentaCobrarSelected.moraObligatoria) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El Saldo Capital Total no puede ser menor al Saldo Capital Vencido',
        timer: 3000
      })
      return
    }
    if (this.cuentaCobrarSelected.moraObligatoria < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El Saldo Capital Total no puede ser menor a 0',
        timer: 3000
      })
      return
    }
    if (this.cuentaCobrarSelected.clientes[0].saldoActual > this.saldoCapitalTotalFirst) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El Saldo Capital Total No Puede ser Mayor Ni Igual Al De BD',
        timer: 3000
      })
      return
    }

    this.calculadoraIntereses()

    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.calculadoraHonorarios()
    }

    this.calculadoraMoraAndTotal()

    this.deshabilitarInputs = true
    this.isCalculate = false

  }

  confirmarDatos() {
    if (this.isCalculate == false) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes de Calcular los Datos',
        timer: 3000
      })
      return
    }

    if (this.deshabilitarInputs == false) {
      this.deshabilitarInputs = true
    } else {
      this.deshabilitarInputs = false
    }

    this.isCalculate = false

  }

  habilitar() {
    this.deshabilitarInputs = false
    this.isCalculate = false
  }

  reiniciarCalculadora() {
    this.resetButton = true
    this.cuentasCobrar.getCuentaByObligacion(this.cuentaCobrarSelected.numeroObligacion).subscribe(
      (data: any) => {
        this.cuentaCobrarSelected = data
        this.saldoCapitalTotalFirst = data.clientes[0].saldoActual
        this.calcularFirst()
        this.resetButton = false
        this.isCalculate = true
      }, (error: any) => {
        console.log(error);
        this.resetButton = false
      }
    )
  }

  calculadoraIntereses() {
    var boton_saldo_capital = document.getElementById('boton_saldo_capital') as HTMLInputElement;

    var moraObligatoria = boton_saldo_capital.value

    var res = parseInt(moraObligatoria) * (this.constanteHonorarios / 366) * this.cuentaCobrarSelected.diasVencidos
    this.acuerdoCal.valorInteresesMora = res.toFixed(0)
  }

  calculadoraHonorarios() {
    var boton_saldo_capital = document.getElementById('boton_saldo_capital') as HTMLInputElement;

    var moraObligatoria = boton_saldo_capital.value
    var res = (parseInt(moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)) * 0.20
    this.acuerdoCal.honoriarioAcuerdo = res.toFixed(0)
  }

  calculadoraMoraAndTotal() {
    var boton_saldo_capital = document.getElementById('boton_saldo_capital') as HTMLInputElement;
    var boton_saldo_total = document.getElementById('boton_saldo_total') as HTMLInputElement;

    var moraObligatoria = boton_saldo_capital.value
    var valorTotal = boton_saldo_total.value


    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.acuerdoCal.valorTotalMora = parseInt(moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
    } else {
      this.acuerdoCal.valorTotalMora = parseInt(moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)
    }

    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.acuerdoCal.valorTotalAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
    } else {
      this.acuerdoCal.valorTotalAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora)
    }
  }

  calcularDiasVencidos(event: any) {
    var fechaActual = this.fechaActual;

    var fechaVen = new Date(this.cuentaCobrarSelected.fechaVencimiento)
    fechaVen.setDate(fechaVen.getDate() + 1);
    fechaVen.setHours(fechaActual.getHours(), fechaActual.getMinutes(), fechaActual.getSeconds(), fechaActual.getMilliseconds());

    var diferenciaMilisegundos = Math.abs(fechaActual.getTime() - fechaVen.getTime());
    var diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    this.cuentaCobrarSelected.diasVencidos = diferenciaDias;


    if (fechaVen >= fechaActual) {
      this.cuentaCobrarSelected.diasVencidos = 0
      this.cuentaCobrarSelected.moraObligatoria = 0
      this.calculadora(event)
      this.acuerdoCal.valorTotalMora = 0
      this.sinDiasVencidos = 0
    }

    if (fechaVen < fechaActual && this.sinDiasVencidos == 1) {
      this.calculadora(event)
      this.sinDiasVencidos = 1
    }

    if (this.sinDiasVencidos == 0 && fechaVen < fechaActual) {
      if (this.cuentaCobrarSelected.diasVencidos != 0) {
        this.cuentaCobrarSelected.moraObligatoria = this.moraObligatoriaFirst

        var res = parseInt(this.cuentaCobrarSelected.moraObligatoria) * (this.constanteHonorarios / 366) * this.cuentaCobrarSelected.diasVencidos
        this.acuerdoCal.valorInteresesMora = res.toFixed(0)

        if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
          var res = (parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)) * 0.20
          this.acuerdoCal.honoriarioAcuerdo = res.toFixed(0)
        }

        if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
          this.acuerdoCal.valorTotalMora = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
        } else {
          this.acuerdoCal.valorTotalMora = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)
        }

        if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
          this.acuerdoCal.valorTotalAcuerdo = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
        } else {
          this.acuerdoCal.valorTotalAcuerdo = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)
        }
      }
      this.sinDiasVencidos = 1
    }

    console.log(this.cuentaCobrarSelected.diasVencidos);
  }

  cambiarIntereses(event: any) {
    var boton_saldo_total = document.getElementById('boton_saldo_total') as HTMLInputElement;
    var valorTotal = boton_saldo_total.value

    if (this.acuerdoCal.valorInteresesMora < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Un Valor Válido',
        timer: 3000
      })
      return
    } else {
      if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
        this.acuerdoCal.valorTotalAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
      } else {
        this.acuerdoCal.valorTotalAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora)
      }
      this.isCalculate = true
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
    if (this.acuerdoCal.valorCuotaMensual === this.acuerdoCal.valorTotalAcuerdo) {
      var cuotaList1 = {
        numeroCuota: 1,
        fechaVencimiento: this.acuerdoCal.fechaCompromiso,
        valorCuota: this.acuerdoCal.valorTotalAcuerdo,
        capitalCuota: 0,
        interesCuota: 0,
        honorarios: 0,
        cumplio: false
      }
      this.cuotas.push(cuotaList1)
      this.metodosCalculos()
      return
    }

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
    var nuevoValor = event.target.value - this.cuotas[position].valorCuota
    alert(nuevoValor + " inicia")
    if (event.target.value > this.cuotas[position].valorCuota) {
      alert("target > cuota posicion")
      var sumaCoutasAnteriores = 0
      for (let i = this.cuotas.length - 1; i > position; i--) {
        console.log(i);

        console.log(this.cuotas.length - 1);

        if (nuevoValor > this.cuotas[i].valorCuota) {
          alert("nuevoVlor > cuota posicion ultima hacia primera")
          for (let j = 0; j < position; j++) {
            alert("suma " + j)
            sumaCoutasAnteriores = sumaCoutasAnteriores + parseInt(this.cuotas[j].valorCuota)
            console.log(sumaCoutasAnteriores);
          }
          var totalCuotaSumadas = sumaCoutasAnteriores + parseInt(event.target.value)
          console.log(totalCuotaSumadas);
          if (totalCuotaSumadas > this.acuerdoCal.valorTotalAcuerdo) {
            alert("totalCuotaSumadas > acuerdo total")
            var ultimaCuota = this.acuerdoCal.valorTotalAcuerdo - sumaCoutasAnteriores
            for (let k = position; k < this.cuotas.length - 1; k++) {
              alert("eliminacion posicion " + k)
              this.cuotas.splice(k + 1)
              i = this.cuotas.length - 1
            }
            this.cuotas[this.cuotas.length - 1].valorCuota = ultimaCuota
            this.disableds[this.cuotas.length - 1] = true
          } else {
            alert("totalCuotaSumadas < acuerdo total")
            nuevoValor = nuevoValor - this.cuotas[i].valorCuota
            this.cuotas.splice(i)
          }
        } else {
          alert("nuevoVlor < cuota posicion ultima hacia primera")
          nuevoValor = nuevoValor - this.cuotas[i].valorCuota
          if (nuevoValor <= 0) {
            this.cuotas[i].valorCuota = (nuevoValor) * -1
            alert(this.cuotas[i].valorCuota)
            this.cuotas[position].valorCuota = parseInt(event.target.value)
            this.totalCuotas = this.cuotas.length
            break
          }
        }
      }
    }
    //RECALCULAR PARA SUMAR CUOTAS
    var nuevoValorSumarCuotas = this.cuotas[position].valorCuota - event.target.value
    console.log(this.cuotas[position].valorCuota);
    console.log(event.target.value);
    if (event.target.value < this.cuotas[position].valorCuota) {
      alert("target < cuota posicion")
      for (let i = position; i < this.cuotas.length; i++) {
        //nuevo valor menor ultima cuota
        if (nuevoValorSumarCuotas < this.cuotas[this.cuotas.length - 1].valorCuota) {
          alert("nuevoValorSumarCuotas < ultima cuota")
          var cuotamenos = this.cuotas[this.cuotas.length - 1].valorCuota + nuevoValorSumarCuotas
          if (cuotamenos > this.acuerdoCal.valorCuotaMensual) {
            alert("cuotamenos > valor cuota mensula")
            var couta = this.cuotas[this.cuotas.length - 1].valorCuota + nuevoValorSumarCuotas
            if (couta > this.acuerdoCal.valorCuotaMensual) {
              alert("cuota > valor cuota mensula")
              var excedentePrinciapl = couta - this.acuerdoCal.valorCuotaMensual
              var excedenteParaCuouta = nuevoValorSumarCuotas - excedentePrinciapl
              this.cuotas[this.cuotas.length - 1].valorCuota = this.cuotas[this.cuotas.length - 1].valorCuota + excedenteParaCuouta
              if (excedentePrinciapl > 0) {
                alert("excendeprincipal en cuota > valot cuota mensula > 0")
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
                this.cuotas[position].valorCuota = parseInt(event.target.value)
                excedentePrinciapl = 0
                break;
              }
            } else {
              alert("cuota < valor cuota mensula")
              this.cuotas[this.cuotas.length - 1].valorCuota = couta
              this.cuotas[position].valorCuota = parseInt(event.target.value)
            }
          } else {
            alert("cuotamenos < valor cuota mensula")
            this.cuotas[this.cuotas.length - 1].valorCuota = cuotamenos
            this.cuotas[position].valorCuota = parseInt(event.target.value)
            break
          }
        }
        //nuevo valor mayor ultima cuota
        if (nuevoValorSumarCuotas > this.cuotas[this.cuotas.length - 1].valorCuota) {
          alert("nuevoValorSumarCuotas > valor ultima couta")
          if (nuevoValorSumarCuotas <= this.acuerdoCal.valorCuotaMensual) {
            alert("nuevoValorSumarCuotas <= valor cuota mensual")
            console.log(nuevoValorSumarCuotas);
            var couta = this.cuotas[this.cuotas.length - 1].valorCuota + nuevoValorSumarCuotas
            if (couta > this.acuerdoCal.valorCuotaMensual) {
              alert("cuota > valor mensual")
              var excedentePrinciapl = couta - this.acuerdoCal.valorCuotaMensual
              var excedenteParaCuouta = nuevoValorSumarCuotas - excedentePrinciapl
              this.cuotas[this.cuotas.length - 1].valorCuota = this.cuotas[this.cuotas.length - 1].valorCuota + excedenteParaCuouta
              if (excedentePrinciapl > 0) {
                alert("excedenteprincipal > 0 en cuota > valor mensual")
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
                this.cuotas[position].valorCuota = parseInt(event.target.value)
                excedentePrinciapl = 0
                break;
              }
            } else {
              alert(" cuota < valor mensual")
              this.cuotas[this.cuotas.length - 1].valorCuota = couta
              this.cuotas[position].valorCuota = parseInt(event.target.value)
              break;
            }
          }
          if (nuevoValorSumarCuotas >= this.acuerdoCal.valorCuotaMensual) {
            alert("nuevoValorSumarCuotas >= 0 cuota valor mensual")
            var coutaCambio = this.acuerdoCal.valorCuotaMensual - this.cuotas[this.cuotas.length - 1].valorCuota
            this.cuotas[this.cuotas.length - 1].valorCuota = this.acuerdoCal.valorCuotaMensual
            nuevoValorSumarCuotas = nuevoValorSumarCuotas - coutaCambio
            console.log(nuevoValorSumarCuotas);
            if (nuevoValorSumarCuotas > 0 && nuevoValorSumarCuotas < this.acuerdoCal.valorCuotaMensual) {
              alert("nuevoValorSumarCuotas > 0 y menor a cuota mensual")
              var cuoUl = {
                idCuota: 0,
                numeroCuota: 0,
                fechaVencimiento: '',
                valorCuota: nuevoValorSumarCuotas,
                capitalCuota: 0,
                interesCuota: 0,
                honorarios: 0,
                cumplio: false
              }
              this.cuotas.push(cuoUl)
              this.cuotas[position].valorCuota = parseInt(event.target.value)
              break;
            } else {
              alert("nuevoValorSumarCuotas > 0 y mayor a cuota mensual")
              var excedentePrinciapl = nuevoValorSumarCuotas - this.acuerdoCal.valorCuotaMensual
              var excedenteParaCuouta = nuevoValorSumarCuotas - excedentePrinciapl
              if (excedenteParaCuouta > 0 && excedenteParaCuouta >= this.acuerdoCal.valorCuotaMensual) {
                alert("excedentePrinciapl > 0 y mayor = a cuota mensual")
                var cuoUll = {
                  idCuota: 0,
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedenteParaCuouta,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUll)
                nuevoValorSumarCuotas = nuevoValorSumarCuotas - excedenteParaCuouta
              } else {
                alert("excedentePrinciapl > 0 y menor a cuota mensual")
                var cuoUll = {
                  idCuota: 0,
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedentePrinciapl,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUll)
                nuevoValorSumarCuotas = excedentePrinciapl
              }
            }
          }
        }
      }
    }
    this.disableds = []
    this.disableds = new Array(this.cuotas.length)
    this.disableds.forEach(element => {
      this.disableds.push(false)
    });

    this.disableds[0] = true
    this.disableds[this.cuotas.length - 1] = true
    console.log(this.cuotas);
    this.metodosCalculos()
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
          numeroObligacion: '',
          clasificacion: {
            tipoClasificacion: null,
            tarea: null,
            nota: null,
            acuerdoPago: null,
            nombreClasificacion: ''
          },
          gestion: '',
          contact: false,
          detallesAdicionales: this.newGestion.detallesAdicionales
        }

        this.acuerdo = {
          detalle: '',
          valorCuotaMensual: 0,
          tipoAcuerdo: '',
          valorTotalAcuerdo: 0,
          valorInteresesMora: 0,
          honoriarioAcuerdo: 0,
          fechaCompromiso: '',
          cuotasList: [],
          username: ''
        }

        this.nota = {
          detalle: ''
        }

        this.tarea = {
          detalleTarea: '',
          fechaFinTarea: '',
        }

        this.cuotas = []

        this.col = true
        this.disabledFecha = false

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
    this.fechamax = fechaForm
    return fechaForm;
  }

  minFecha(): string {
    var fechaMin = new Date();
    var fechaForm = fechaMin.toISOString().split('T')[0]
    this.fechamin = fechaForm


    return fechaForm;
  }

  seleccionarSize(numero: number) {
    if(this.filtrando){
      switch (numero) {
        case 20:
          this.size = 20
          this.spinner = true
          this.filtro()
          break;
        case 50:
          this.spinner = true
          this.size = 50
          this.filtro()
          break;
        case 100:
          this.spinner = true
          this.size = 100
          this.filtro()
          break;
      }
    } else {
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
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset;

    // Cambia la clase según la posición de desplazamiento
    this.isSticky = scrollPosition >= 250;
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

  validarPermisoEnRolCartera(permiso: string, rolesCartera: any) {
    var permisos = rolesCartera[0].permisos.filter((p: any) => p.permiso == permiso)
    return permisos

  }

  //FILTROS
  filtro() {
    this.filtros.banco = this.bancosArray
    this.filtros.clasiJuridica = this.clasJurArray
    this.filtros.sede = this.sedesArray
    this.filtros.edadVencimiento = this.edadVenArray

    console.log(this.filtros);

    if (
      (this.filtros.banco.length == 0) &&
      (this.filtros.diasVencidosInicio == 0 || this.filtros.diasVencidosInicio == null) &&
      (this.filtros.diasVencidosFin == 0 || this.filtros.diasVencidosFin == null) &&
      (this.filtros.edadVencimiento.length == 0) &&
      (this.filtros.sede.length == 0) &&
      (this.filtros.clasiJuridica.length == 0) &&
      (this.filtros.saldoCapitalInicio == 0 || this.filtros.saldoCapitalInicio == null) &&
      (this.filtros.saldoCapitalFin == 0 || this.filtros.saldoCapitalFin == null) &&
      (this.filtros.fechaCpcInicio == null) &&
      (this.filtros.fechaCpcFin == null) &&
      (this.filtros.fechaGestionInicio == null) &&
      (this.filtros.fechaGestionFin == null) &&
      (this.filtros.fechaCompromisoInicio == null) &&
      (this.filtros.fechaCompromisoFin == null)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe de llenar al menos Un Filtro',
        timer: 3000,
      });
      return;
    }

    this.botonFiltro = true
    this.cuentasCobrar.filtro(this.page, this.size, this.fechaCreacion, this.filtros).subscribe(
      (data: any) => {
        this.botonFiltro = false
        this.filtrando = true
        this.paginas = new Array(data.totalPages)
        this.cuentasCobrarArray = data.content
        this.last = data.last
        this.first = data.first
        this.numeroPages = data.totalPages
        this.cuentasCobrar.proSubject.next(true);
        console.log(data);
        if (this.cuentasCobrarArray.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay Cuentas Con Estos Filtros',
            timer: 3000,
          });
          this.getCuentasCobrar()
          return;
        }
        $('#offcanvasFilter').offcanvas('hide');
      }, (error: any) => {
        this.botonFiltro = false
        console.log(error);
      }
    )
  }

  metodoBancos(banco: string) {
    if (this.bancosArray.includes(banco)) {
      var position = this.bancosArray.indexOf(banco)
      this.bancosArray.splice(position, 1)
    } else {
      this.bancosArray.push(banco)
    }
    console.log(this.bancosArray);
  }

  metodoEdadVen(edad: string) {
    if (this.edadVenArray.includes(edad)) {
      var position = this.edadVenArray.indexOf(edad)
      this.edadVenArray.splice(position, 1)
    } else {
      this.edadVenArray.push(edad)
    }
    console.log(this.edadVenArray);
  }

  metodoSede(sede: string) {
    if (this.sedesArray.includes(sede)) {
      var position = this.sedesArray.indexOf(sede)
      this.sedesArray.splice(position, 1)
    } else {
      this.sedesArray.push(sede)
    }
    console.log(this.sedesArray);
  }

  metodoClas(clas: string) {
    if (this.clasJurArray.includes(clas)) {
      var position = this.clasJurArray.indexOf(clas)
      this.clasJurArray.splice(position, 1)
    } else {
      this.clasJurArray.push(clas)
    }
    console.log(this.clasJurArray);
  }

  getByDato(){
    if(this.buscarObligacion.trim() == '' || this.buscarObligacion.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Una Cédula',
        timer: 3000
      })
      return
    }
    this.botonFiltrarObligacion = true
    this.cuentasCobrar.getCuentaByDato(this.buscarObligacion).subscribe(
      (data:any) => {
        this.botonFiltrarObligacion = false
        this.cuentasCobrarArray = data
        console.log(data);
        this.numeroPages = 1
        this.cuentasCobrar.proSubject.next(true);
        $('#modalObligacion').modal('hide');
        
        if(this.cuentasCobrarArray == null || this.cuentasCobrarArray.length == 0 ){
          this.spinner = true
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Hay Obligaciones Con Este Filtro',
            timer: 3000
          })
          // this.getCuentasCobrar()
        }
      }, (error:any) => {
        this.botonFiltrarObligacion = false
        console.log(error);
      }
    )
  }

  ordenarGestiones(gestiones: any[]) {
    var gesTrue = gestiones.filter((ges: any) => ges.clasificacion.isActive)
    gesTrue.forEach((ges: any) => {
      this.gestiones.push(ges)
    });

    var tareas = this.gestiones.filter((ges: any) => ges.clasificacion.clasificacion == 'TAREA' && ges.clasificacion.isActive)
    if (tareas != null || tareas != undefined) {
      tareas.forEach((ges: any) => {
        this.gestiones.push(ges)
      });

    }

    var notas = this.gestiones.filter((ges: any) => ges.clasificacion.clasificacion == 'NOTA' && ges.clasificacion.isActive)
    if (notas != null || notas != undefined) {
      notas.forEach((ges: any) => {
        this.gestiones.push(ges)
      });

    }

    var gesFalse = gestiones.filter((ges: any) => !ges.clasificacion.isActive)
    gesFalse.forEach((ges: any) => {
      this.gestiones.push(ges)
    });
  }

  agregarPagoACuotas() {

    this.mostrarAgregarPago = false
    if (this.pago.detalle.trim() == '' || this.pago.detalle.trim() == null || this.pago.detalle.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar el concepto del pago',
        timer: 3000
      })
      this.mostrarAgregarPago = true
      return
    }

    if (this.pago.medioPago.trim() == '' || this.pago.detalle.trim() == null || this.pago.detalle.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un medio pago',
        timer: 3000
      })
      this.mostrarAgregarPago = true
      return
    }

    if (this.pago.valor < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar un valor mayor a cero',
        timer: 3000
      })
      this.mostrarAgregarPago = true
      return
    }

    var date = new Date()
    var valorTotal = this.pago.valor
    if (valorTotal < this.totalCuotasAcuerdo) {
      this.valorTotalIngresado = valorTotal
    }
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
      alert()
      valorTotal = this.totalCuotasAcuerdo;
      this.saldoAcuerdoPago = this.totalCuotasAcuerdo
      this.valorTotalIngresado = this.valorTotalIngresado + parseInt(valorTotal)
    }



    if (valorTotal > 0) {
      this.cuotasList.forEach((c: CuotaList, i: number) => {
        console.log(c);

        if (this.pago.valor < c.valorCuota) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Valor ingresado menor al valor de la cuota pactada',
            timer: 3000
          })
          this.valorTotalIngresado = 0
          valorTotal = 0
          throw new Error('Valor ingresado menor al valor de la cuota pactada')

        }

        if (c.pagos != null || c.pagos != undefined) {
          if (c.pagos.saldoCuota > 0) {

            valorTotal = valorTotal - c.pagos.saldoCuota


            this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - this.coutasRequest[i].pagosDto!.saldoCuota
            this.cuotasList[i].capitalCuota = this.cuotasList[i].capitalCuota - this.cuotasList[i].pagos!.saldoCuota

            this.coutasRequest[i].pagosDto!.saldoCuota = 0
            this.cuotasList[i].pagos!.saldoCuota = 0

            this.coutasRequest[i].pagosDto!.valorPago = c.valorCuota
            this.cuotasList[i].pagos!.valorPago = this.coutasRequest[i].pagosDto!.valorPago




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
              this.cuotasList[i].pagos = pagosOriginal

              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - this.coutasRequest[i].capitalCuota
              this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
              this.saldoInteresesAcuerdo = this.saldoInteresesAcuerdo - this.coutasRequest[i].interesCuota


              this.coutasRequest[i].capitalCuota = 0
              this.coutasRequest[i].honorarios = 0
              this.coutasRequest[i].interesCuota = 0


              this.cuotasList[i].capitalCuota = 0
              this.cuotasList[i].honorarios = 0
              this.cuotasList[i].interesCuota = 0

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
                  this.cuotasList[i].honorarios = 0
                  this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
                }
              }

              if (difere > 0) {
                if (this.coutasRequest[i].interesCuota <= difere) {
                  difere = difere - this.coutasRequest[i].interesCuota
                  this.coutasRequest[i].interesCuota = 0
                  this.cuotasList[i].interesCuota = 0
                  this.saldoInteresesAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].interesCuota
                }
              }

              if (difere > 0) {
                this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - difere
                this.cuotasList[i].capitalCuota = this.cuotasList[i].capitalCuota - difere
                this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - difere

              }

            }


            if (valorTotal > 0 && valorTotal > c.valorCuota) {
              valorTotal = valorTotal - c.valorCuota

              this.coutasRequest[i].pagosDto = pagos
              this.cuotasList[i].pagos = pagosOriginal

              this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
              this.coutasRequest[i].honorarios = 0
              this.cuotasList[i].honorarios = 0


              this.saldoInteresesAcuerdo = this.saldoInteresesAcuerdo - this.coutasRequest[i].interesCuota
              this.coutasRequest[i].interesCuota = 0
              this.cuotasList[i].interesCuota = 0

              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - this.coutasRequest[i].capitalCuota
              this.coutasRequest[i].capitalCuota = 0
              this.cuotasList[i].capitalCuota = 0

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
              saldoCuota: pagos.saldoCuota,
              reciboPago: null
            }


            var difere = valorTotal


            if (this.coutasRequest[i].honorarios > 0) {
              if (difere > 0) {
                difere = difere - this.coutasRequest[i].honorarios
                this.saldoHonoriariosAcuerdo = this.saldoHonoriariosAcuerdo - this.coutasRequest[i].honorarios
                this.coutasRequest[i].honorarios = 0
                this.cuotasList[i].honorarios = 0

              }
            }

            if (difere > 0) {
              if (this.coutasRequest[i].interesCuota <= difere) {
                difere = difere - this.coutasRequest[i].interesCuota
                this.saldoInteresesAcuerdo = this.saldoInteresesAcuerdo - this.coutasRequest[i].interesCuota
                this.coutasRequest[i].interesCuota = 0
                this.cuotasList[i].interesCuota = 0

              }
            }

            if (difere > 0) {
              this.saldoCapitalAcuerdo = this.saldoCapitalAcuerdo - difere
              this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - difere
              this.cuotasList[i].capitalCuota = this.cuotasList[i].capitalCuota - difere


            }


            valorTotal = valorTotal - valorTotal
            this.coutasRequest[i].pagosDto = pagos
            this.cuotasList[i].pagos = pagosOriginal

            if (this.gestionSelected.clasificacion.coutasList[i].capitalCuota > 0) {
              this.cuotasList[i].pagos.saldoCuota = this.cuotasList[i].capitalCuota
              this.coutasRequest[i].pagosDto!.saldoCuota = this.cuotasList[i].capitalCuota
            }

            console.log(valorTotal);
            console.log(this.coutasRequest[i])
            console.log(c)
          }



        }

        if (c.pagos!.saldoCuota > 0 && new Date(c.fechaVencimiento) < new Date()) {

          this.coutasRequest[i].cumplio = false
          this.cuotasList[i].cumplio = false
          this.pago.cumpliendo = false
        }


        if (c.pagos!.saldoCuota > 0 && new Date(c.fechaVencimiento) >= new Date()) {

          this.coutasRequest[i].cumplio = true
          this.cuotasList[i].cumplio = true
          this.pago.cumpliendo = true

        }

        if (c.pagos!.saldoCuota == 0) {
          this.coutasRequest[i].cumplio = true
          this.cuotasList[i].cumplio = true
          this.pago.cumpliendo = true
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

    

  }

  generarRecibo() {
    console.log(this.saldoCapitalAcuerdo);
    console.log(this.saldoHonoriariosAcuerdo);
    console.log(this.saldoInteresesAcuerdo);
    this.activarGuardarPago = false
    this.savePago = true
    if (this.pago.recibo.trim() == '' || this.pago.recibo.trim() == null || this.pago.recibo.trim() == undefined) {
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
      numeroObligacion: this.cuentasCobrarArray[0].numeroObligacion,
      numeroRecibo: this.pago.numeroRecibo,
      cuotasDto: this.coutasRequest,
      valorTotal: this.valorTotalIngresado,
      acuerdoTotal: this.saldoAcuerdoPago,
      capitalTotal: this.saldoCapitalAcuerdo,
      honorariosTotal: this.saldoHonoriariosAcuerdo,
      interesesTotal: this.saldoInteresesAcuerdo,
      detalle: this.pago.detalle,
      metodoPago: this.pago.medioPago,
      cumpliendo: this.pago.cumpliendo,
      username: ''
    }

    var user = this.authService.getUsername();
    if (user != null || user != undefined) {
      recibo.username = user;
      console.log(recibo);

      // this.cuentasCobrar.crearRecibo(recibo).subscribe(
      //   (data: any) => {
      //     console.log(data);

      //     this.mostrarReciboPago(data.base64)


      //     console.log(recibo);
      //     this.activarGuardarPago = false
      //     this.savePago = false
      //   }, (error: any) => {
      //     this.activarGuardarPago = false
      //     this.savePago = false
      //     console.log(error);

      //   }
      // )
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
