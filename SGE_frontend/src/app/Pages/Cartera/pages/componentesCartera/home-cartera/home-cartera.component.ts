import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { addMonths, format, isLeapYear, lastDayOfMonth, parse, parseISO } from 'date-fns';

import { Subscription } from 'rxjs';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Tarea } from 'src/app/Types/Cartera/Clasificacion-Tarea/Tarea';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { CuentaCobrarCalculate, CuentasCobrarResponse } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';

import { ClasificacionGestion, CuotaList, CuotasRequest, Filtros, Gestion, GestionArray, Gestiones, Notificacion, Pagos, PagosRequest, ReciboPago, TipoVencimiento } from 'src/app/Types/Cartera/Gestion/Gestion';

import { ROLES } from 'src/app/Types/Roles';

import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-home-cartera',
  templateUrl: './home-cartera.component.html',
  styleUrls: ['./home-cartera.component.css']
})
export class HomeCarteraComponent implements OnInit {

  @ViewChild('datoBuscar', { static: false }) miInput!: ElementRef;

  @ViewChild('telefono')
  mySelect!: ElementRef<HTMLSelectElement>;

  private proSubscriptionNext!: Subscription;
  private proSubscriptionBack!: Subscription;

  constructor(private cuentasCobrar: CuentasCobrarService, private authService: AuthenticationService, private router: Router, private renderer: Renderer2, private elementRef: ElementRef) {
    this.listaDeAnios = this.obtenerListaDeAnios()    
  }

  // ARRAY CUENTAS POR COBRAR
  cuentasCobrarArray: CuentasCobrarResponse[] = []
  cuentasCobrarBuscar: CuentasCobrarResponse[] = []
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
  mostrarAgregarPago: boolean = false
  ocultarAgregarPago: boolean = false
  detalleRevision: string = ""
  mostrarCrearRevision: boolean = false
  ocultarCrearRevision: boolean = false
  pago: any = {
    valor: 0,
    detalle: '',
    medioPago: "",
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
  clientes: any[] = []
  telefonos: string[] = []
  activarGuardarPago: boolean = false
  pagoCuota: number = 0
  positionGestionSelected!: number;
  savePago: boolean = false
  base64Recibo: string = ""
  recibosPagoSinFiltrar: ReciboPago[] = []
  recibosPago!: ReciboPago[];
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
    'ULTIMA CLAS'
  ]
  cuotas: any[] = []
  paginas!: Array<number>
  fechasIncrementadas: string[] = [];
  listaDeAnios: number[] = [];
  sedes: any[] = []
  cuotasSelected: any[] = []
  notiArray: Notificacion[] = []
  notiArrayVencidas: Notificacion[] = []
  notiArrayRealizadas: Notificacion[] = []
  spinnerCrearNota: boolean = false
  // OBJETOS


  alertasGestionesObject: any = {
    gestionesRealizadas: 0,
    cuentasSinGestion: 0,
    cuentasAsignadas: 0,
    acuerdosDePagosRealizados: 0,
    acuerdosDePagosActivos: 0,
    acuerdoPagoDia: 0,
    gestionesDia: 0
  }

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
      nombreClasificacion: "Seleccionar Una Clasificacion"
    },
    contact: false,
    detallesAdicionales: '',
    usernameToSetNotificacion: '',
    userNotifying: '',
    notificacionId: null,
    clasificacionId: null
  }

  notiId:number | null = null
  clasifiNotiId:number | null = null

  gestionSelected: any = {
    numeroObligacion: '',
    clasificacion: {
      nombreClasificacion: '',
      tipoClasificacion: '',
      tarea: {
        detalleTarea: '',
        fechaFinTarea: '',
        isPartOfRecaudo: false
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
    fechaFinTarea: '',
    isPartOfRecaudo: false
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
    saldoAcuerdo: 0,
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
    numeroAlterno: "",
    cedula: "",
    username: ""
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
    username: '',
    clasiJuridica: [],
    saldoCapitalInicio: null,
    saldoCapitalFin: null,
    fechaCpcInicio: null,
    fechaCpcFin: null,
    fechaGestionInicio: null,
    fechaGestionFin: null,
    fechaCompromisoInicio: null,
    fechaCompromisoFin: null,
    isActive: false,
    clasificacionGestion: []
  }

  limpiarFiltro: boolean = false

  bancosArray: string[] = []
  edadVenArray: string[] = []
  sedesArray: string[] = []
  clasJurArray: string[] = []
  clasGesArray: string[] = []
  asesores: any[] = []

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
  isCalculate: boolean = false
  disabledFecha: boolean = false

  desactivarAcu: boolean = false
  botonFiltro: boolean = false
  filtrando: boolean = false
  filtroAgain:boolean = false

  botonPdf: boolean = false
  pageGestion: number = 1;
  calculating: boolean = false
  ingresarTel: boolean = true
  botonGuardarGes: boolean = false

  // VARIABLE PARA FILTRAR OBLIGACION
  buscarObligacion: string = ''
  botonFiltrarObligacion: boolean = false
  filtradoBuscar:boolean = false
  variableLimpiar: boolean = false
  
  //FILTRO NOTIFICACIONES
  filtroVen:string = ''
  filtroAll:string = ''
  filtroRealizada:string = ''

  @ViewChildren('variableCol') colcheck!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.getCuentasCobrar()
    this.getClasificacion()
    this.getTipoVen()
    this.getSedes()
    this.getAsesores()
    this.getNotificaciones()
    this.fechaActual = new Date()
    this.fechaCorte = this.obtenerFechaActual()
    this.alertasGestiones()
  }

  getTipoVen() {
    this.cuentasCobrar.getTipoVencimiento().subscribe(
      (data: any) => {
        this.tiposVen = data
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
  }

  // TRAER CUENTAS POR COBRAR
  getCuentasCobrar() {
    var td
    var contenido:any
    var partesMes
    var mesTd
    var anioTd

    const mesActual = new Date().getMonth() + 1
    const anioActual = new Date().getFullYear()

    this.alertasGestiones()
    this.filtrando = false
    var admin = this.authService.getRolesByName(ROLES.Administration);

    var cartera = this.authService.getRolesByName(ROLES.Cartera);

    var permiso = this.validarPermisoEnRolCartera("VER TODOS", cartera);

    if (admin.length != 0 || permiso != undefined && permiso.length != 0) {
      this.cuentasCobrar.getCuentasCobrarAdmin(this.page, this.size, this.fechaCreacion).subscribe(
        (data: any) => {
          this.paginas = new Array(data.totalPages)
          this.cuentasCobrarArray = data.content
          console.log(data)
          this.last = data.last
          this.first = data.first
          this.numeroPages = data.totalPages
          this.cuentasCobrar.proSubject.next(true);
          if (this.cuentasCobrarArray.length == 0) {
            this.spinner = true
          } else {
            this.spinner = false
            setTimeout(() => {
              for (let i = 0; i < this.size; i++) {
                td = document.getElementById(`td_${i}`)

                if(td != null && td != undefined){
                  contenido = td.textContent;

                  partesMes = contenido.split('/')

                  mesTd = parseInt(partesMes[1], 10)
                  anioTd = parseInt(partesMes[2], 10)
                  
                  if(mesTd == mesActual && anioTd == anioActual){
                    td.classList.add("gestionado")
                  }
                }
              }
            }, 100);
          }
        }, (error: any) => {
          console.log(error);
        }

      )
    } else {
      var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }

      this.filtrando = false
      this.cuentasCobrar.getCuentasCobrar(user, this.page, this.size, this.fechaCreacion).subscribe(
        (data: any) => {
          this.paginas = new Array(data.totalPages)
          this.cuentasCobrarArray = data.content
          this.last = data.last
          this.first = data.first
          this.numeroPages = data.totalPages
          this.cuentasCobrar.proSubject.next(true);
          if (this.cuentasCobrarArray.length == 0) {
            this.spinner = true
          } else {
            this.spinner = false
            setTimeout(() => {
              for (let i = 0; i < this.size; i++) {
                td = document.getElementById(`td_${i}`)

                if(td != null && td != undefined){
                  contenido = td.textContent;

                  partesMes = contenido.split('/')

                  mesTd = parseInt(partesMes[1], 10)
                  anioTd = parseInt(partesMes[2], 10)
                  
                  if(mesTd == mesActual && anioTd == anioActual){
                    td.classList.add("gestionado")
                  }
                }
              }
            }, 100);
          }
        }, (error: any) => {
          console.log(error);
        }
      )
    }
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
    if (this.filtrando) {
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
      $('#modalObligacion').modal('hide');
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
        contact: false,
        detallesAdicionales: '',
        usernameToSetNotificacion: '',
        userNotifying: '',
        notificacionId: null,
        clasificacionId: null
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
        isPartOfRecaudo: false
      }

      this.codeudoresSelected = []
      $('#modalObligacion').modal('hide');
      setTimeout(() => {
        this.cuentasCobrar.getCuentaByObligacion(numeroObligacion).subscribe(
          (data: any) => {
            this.cuentaCobrarSelected = data
            console.log(this.cuentaCobrarSelected);
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
              contact: false,
              detallesAdicionales: this.newGestion.detallesAdicionales,
              usernameToSetNotificacion: '',
              userNotifying: '',
              notificacionId: null,
              clasificacionId: null
            }

            if (this.cuentaCobrarSelected.documentoCliente != '') {
              this.spinnerSidebar = false
            }
          }, (error: any) => {
            if(this.cuentaCobrarSelected.clientes.length == 0 || this.cuentaCobrarSelected.totalObligatoria == 0){
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Cliente Sin Saldo En El Sistema',
                timer: 3000
              })
              $('#offcanvasRight').offcanvas('hide');
            }
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
    this.alertasGestiones()
    this.gestiones = []
    this.notiId = 0
    this.cuentasCobrar.getGestiones(numeroObligacion).subscribe(
      (data: any) => {
        console.log(data);
        this.newGestion.numeroObligacion = numeroObligacion
        this.getLastDato(numeroObligacion)
        this.ordenarGestiones(data)
        var gestion = this.gestiones.find((g: any) => g.clasificacion.clasificacion == 'ACUERDO DE PAGO' && g.clasificacion.isActive)
        console.log(gestion);
        if (gestion != null || gestion != undefined) {
          this.idGestion = gestion.idGestion
        }
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getGestionesNoti(numeroObligacion:string, idGestion:number, fechaCreacion:Date, tipoGestion:string, idNotifi:number){
    this.getGestiones(numeroObligacion)
    this.notiId = idNotifi
    setTimeout(() => {
      this.getOneGestionNoti(idGestion, fechaCreacion, tipoGestion)
    }, 1000);
  }

  getOneGestionNoti(id: number, fechaCreacion:Date, tipoGestion:string) {
    this.gestionSelected = {
      numeroObligacion: '',
      clasificacion: {
        nombreClasificacion: '',
        tipoClasificacion: '',
        tarea: {
          detalleTarea: '',
          fechaFinTarea: '',
          isPartOfRecaudo: false
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

    this.coutasRequest = []
    this.recibosPago = []

    if(tipoGestion == 'ACUERDO DE PAGO' || tipoGestion == 'NOTA'){
      this.notiId = null
      this.clasifiNotiId = null
    }

    if(id != null){
      console.log(id);
      
      var gestion = this.gestiones.find((g: any) => g.clasificacion.idClasificacionGestion == id)

      this.positionGestionSelected = this.gestiones.indexOf(gestion)
  
      this.obtenerGestionSelected()

    } else {
      var gestion = this.gestiones.find((g: any) => g.clasificacion.clasificacion == tipoGestion && g.fechaGestion == fechaCreacion)
      console.log(gestion);
      
      this.positionGestionSelected = this.gestiones.indexOf(gestion)
  
      this.obtenerGestionSelected()
    }
  }

  completarGestion(){
    $('#modalGestion').modal('show');
    $('#modalGestionCom').modal('hide');
    this.newGestion.notificacionId = this.notiId
    this.newGestion.clasificacionId = this.clasifiNotiId
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
        if (this.tarea.fechaFinTarea.trim() == '' || this.tarea.fechaFinTarea.trim() == null) {
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

        if (this.newGestion.usernameToSetNotificacion?.trim() == '' || this.newGestion.usernameToSetNotificacion?.trim() == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Seleccione Un Asesor',
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
        var user = this.authService.getUsername()

        if (user == null || user == undefined) {
          return
        }

        this.newGestion.userNotifying = user

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
            this.gestionButton = true
            this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
              (data: any) => {
                this.getGestiones(this.newGestion.numeroObligacion)
                this.getNotificaciones()
                if(!this.filtroAgain){
                  this.getCuentasCobrar()
                } else {
                  this.filtro()
                }
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
                    nombreClasificacion: '',
                  },
                  contact: false,
                  detallesAdicionales: this.newGestion.detallesAdicionales,
                  usernameToSetNotificacion: '',
                  userNotifying: '',
                  notificacionId: null,
                  clasificacionId: null
                }
                $('#modalGestion').modal('hide');
                $('#offcanvasRight').offcanvas('hide');
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

        var user = this.authService.getUsername()

        if (user == null || user == undefined) {
          return
        }

        this.newGestion.userNotifying = user
        this.newGestion.usernameToSetNotificacion = user

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
            this.gestionButton = true
            this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
              (data: any) => {
                this.getGestiones(this.newGestion.numeroObligacion)
                Swal.fire({
                  icon: 'success',
                  title: 'Datos Guardados',
                  text: 'Gestión Guardada Exitosamente',
                  timer: 3000
                })
                this.getNotificaciones()
                if(!this.filtroAgain){
                  this.getCuentasCobrar()
                } else {
                  this.filtro()
                }
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
                  contact: false,
                  detallesAdicionales: this.newGestion.detallesAdicionales,
                  usernameToSetNotificacion: '',
                  userNotifying: '',
                  notificacionId: null,
                  clasificacionId: null
                }
                $('#modalGestion').modal('hide');
                $('#offcanvasRight').offcanvas('hide');
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
        if (this.acuerdo.detalle.trim() == '' || this.acuerdo.detalle.trim() == null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Digite El Detalle',
            timer: 3000
          })
          return
        }
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

        var user = this.authService.getUsername()

        if (user == null || user == undefined) {
          return
        }

        //TODO:CAMBIAR POR EL NOMBRE DE USUARIO
        this.newGestion.clasificacion.acuerdoPago!.username = user

        $('#modalGestion').modal('hide');
        $('#modalDetalle').modal('show');
      }
    }



  }

  ingresarTelefono() {
    if (this.ingresarTel == false) {
      this.ingresarTel = true
      this.reporte.numeroAlterno = null
    } else {
      this.ingresarTel = false
    }
  }

  saveGestionWithDetalle() {

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    this.newGestion.userNotifying = user
    this.newGestion.usernameToSetNotificacion = user

    if (this.reporte.cedula.trim() == '' || this.reporte.cedula.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija La Cédula del Cliente o Codeudor',
        timer: 3000
      })
      return
    }

    if (this.reporte.numeroAlterno.trim() == '' || this.reporte.numeroAlterno.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Número Del cliente',
        timer: 3000
      })
      return
    }

    this.newGestion.clasificacion.acuerdoPago!.detalle = this.acuerdo.detalle

    var sumaComprobacion = 0
    for (let i = 0; i < this.cuotas.length; i++) {
      sumaComprobacion = sumaComprobacion + this.cuotas[i].valorCuota
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
        this.botonGuardarGes = true
        this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
          (data: any) => {
            this.getGestiones(this.newGestion.numeroObligacion)
            this.getNotificaciones()
            this.mostrarReporte()
            if(!this.filtroAgain){
              this.getCuentasCobrar()
            } else {
              this.filtro()
            }
            Swal.fire({
              icon: 'success',
              title: 'Datos Guardados',
              showConfirmButton: false,
              text: 'Gestión Guardada Exitosamente',
              timer: 3000
            })
            console.log(this.newGestion);

            this.botonGuardarGes = false
            this.newGestion = {
              numeroObligacion: this.newGestion.numeroObligacion,
              clasificacion: {
                tipoClasificacion: null,
                tarea: null,
                nota: null,
                acuerdoPago: null,
                nombreClasificacion: ''
              },
              contact: false,
              detallesAdicionales: this.newGestion.detallesAdicionales,
              usernameToSetNotificacion: '',
              userNotifying: '',
              notificacionId: null,
              clasificacionId: null
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
          }, (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error Al Guardar La Gestión',
              timer: 3000
            })
            this.botonGuardarGes = false
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
    }

    if (this.newGestion.clasificacion.tipoClasificacion != 'ACUERDO DE PAGO') {
      this.col = true
      this.newGestion.contact = false
      this.disabledFecha = false
    }

    if (this.newGestion.clasificacion.tipoClasificacion == 'ACUERDO DE PAGO') {
      var gestion = this.gestiones.find((g: any) => g.clasificacion.clasificacion == 'ACUERDO DE PAGO' && g.clasificacion.isActive)

      if (gestion == undefined) {
        this.newGestion.contact = true
        return
      } else {
        this.gestionSelected = gestion
        console.log(this.gestionSelected);

        if (this.gestionSelected != null || this.gestionSelected != undefined) {

          this.getOneGestion(this.gestionSelected.idGestion)

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
        }
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
          fechaFinTarea: '',
          isPartOfRecaudo: false
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

    this.coutasRequest = []
    this.recibosPago = []

    var gestion = this.gestiones.find((g: any) => g.idGestion == id)
    
    this.positionGestionSelected = this.gestiones.indexOf(gestion)

    this.obtenerGestionSelected()
  }

  obtenerGestionSelected() {

    this.gestionSelected = this.gestiones[this.positionGestionSelected]

    this.clasifiNotiId = this.gestionSelected.clasificacion.idClasificacionGestion

    console.log(this.gestionSelected);
    if (this.gestionSelected.clasificacion.nombresClasificacion.tipo == 'ACUERDO DE PAGO') {
      this.obtenerCuotas()
    }
  }


  siguienteGestion() {
    this.positionGestionSelected++;
    this.gestionSelected = this.gestiones[this.positionGestionSelected]
  }

  anteriorGestion() {
    this.positionGestionSelected--;
    this.gestionSelected = this.gestiones[this.positionGestionSelected]
  }


  obtenerCuotas() {
    this.cuotasList = []
    this.totalCuotasAcuerdo = 0
    this.totalCapital = 0
    this.totalHonorarios = 0
    this.totalIntereses = 0
    this.saldoInteresesAcuerdo = 0
    this.saldoHonoriariosAcuerdo = 0
    this.saldoCapitalAcuerdo = 0
    this.saldoAcuerdoPago = 0

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
    })

    this.recibosPago = this.recibosPagoSinFiltrar.filter((r: ReciboPago, i: number, array) => array.findIndex(obj => JSON.stringify(obj) === JSON.stringify(r)) === i)
  }

  mostrarReporte() {
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    this.reporte.username = user
    console.log(this.reporte);

    setTimeout(() => {
      this.cuentasCobrar.reporte(this.reporte).subscribe(
        (data: any) => {
          this.mostrarRep = data
          this.mensaje = this.mostrarRep.messageToWpp
          this.base64 = this.mostrarRep.base64
        }, (error: any) => {
          console.log(error);
        }
      )
    }, 2000);

    var cliente = this.cuentaCobrarSelected.clientes.find((c: any) => c.numeroDocumento = this.reporte.cedula)
    this.clienteSelected.numeroDocumento = cliente.numeroDocumento
    this.clienteSelected.nombreTitular = cliente.nombreTitular
  }

  descargarAcuerdo() {
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    this.reporte.numeroObligacion = this.cuentaCobrarSelected.numeroObligacion
    this.reporte.cedula = this.cuentaCobrarSelected.documentoCliente
    this.reporte.username = user

    this.botonPdf = true

    this.cuentasCobrar.reporte(this.reporte).subscribe(
      (data: any) => {
        this.mostrarRep = data
        this.mensaje = this.mostrarRep.messageToWpp
        this.base64 = this.mostrarRep.base64
        setTimeout(() => {
          var down = document.getElementById('basePdf')
          down?.click()
          this.botonPdf = false
        }, 1000);
      }, (error: any) => {
        console.log(error);
        this.botonPdf = false
      }
    )

    var cliente = this.cuentaCobrarSelected.clientes.find((c: any) => c.numeroDocumento = this.reporte.cedula)
    this.clienteSelected.numeroDocumento = cliente.numeroDocumento
    this.clienteSelected.nombreTitular = cliente.nombreTitular
  }

  getAsesores() {
    this.cuentasCobrar.getAsesoresCartera().subscribe(
      (data: any) => {
        this.asesores = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  cambiarCedula(event: any) {
    this.reporte.cedula = this.reporte.cedula

    if (this.reporte.cedula == null || this.reporte.cedula == '') {
      this.renderer.setAttribute(this.mySelect.nativeElement, 'disabled', 'true')
    } else {
      this.renderer.removeAttribute(this.mySelect.nativeElement, 'disabled');
    }

    this.telefonos = []

    if (this.reporte.cedula != '' || this.reporte.cedula != null || this.reporte.cedula != 'null') {
      console.log(this.reporte.cedula);

      this.clientes = this.cuentaCobrarSelected.clientes.filter((c: any) => c.numeroDocumento == this.reporte.cedula)

      for (const c of this.clientes[0].telefonos) {
        this.telefonos.push(c.numero)
      }
    }

    console.log(this.reporte);
    
  }

  mostrarBase64() {
    setTimeout(() => {
      var ele = document.getElementById('base64')
      ele?.click()
    }, 2000);
    $('#offcanvasRight').offcanvas('hide');
  }

  cerrarCuenta(){
    $('#offcanvasRight').offcanvas('hide');
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
    console.log(this.calculating);

    if (this.calculating == false) {
      this.acuerdoCal.valorCuotaMensual = this.acuerdo.valorCuotaMensual
      this.cuentasCalcular.valorTotal = this.cuentaCobrarSelected.totalObligatoria
      this.cuentasCalcular.moraObligatoria = this.cuentaCobrarSelected.moraObligatoria
    }

    if (this.calculating == true) {
      this.acuerdoCal.valorCuotaMensual = this.acuerdo.valorCuotaMensual
      this.cuentasCalcular.valorTotal = this.acuerdoCal.saldoAcuerdo
      this.cuentasCalcular.moraObligatoria = this.acuerdoCal.valorTotalMora
    }

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

    if (this.calculating == false) {
      this.calcularIntMora()
    }

    if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
      this.calcularHonorarios()
    }

    this.calcularByTipoAcuerdo()

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

  modalGestionSelected() {
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

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    this.fechaInicial = new Date(this.acuerdo.fechaCompromiso)
    this.acuerdoCal.valorCuotaMensual = this.acuerdo.valorCuotaMensual
    this.cuentasCalcular.username = user

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
  }


  calcularHonorarios() {
    var cal = (this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.valorInteresesMora)) * 0.20

    var res = cal.toFixed(0)
    this.acuerdoCal.honoriarioAcuerdo = res
    this.acuerdo.honoriarioAcuerdo = this.acuerdoCal.honoriarioAcuerdo
  }

  calcularByTipoAcuerdo() {
    if (this.acuerdo.tipoAcuerdo == 'MORA') {
      this.acuerdoCal.tipoAcuerdo = this.acuerdo.tipoAcuerdo
      if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
        if (this.calculating == true) {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.honoriarioAcuerdo)
        } else {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
        }
      } else {
        if (this.calculating == true) {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.moraObligatoria
        } else {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.moraObligatoria + parseInt(this.acuerdoCal.valorInteresesMora)
        }
      }
    }

    if (this.acuerdo.tipoAcuerdo == 'TOTAL') {
      this.acuerdoCal.tipoAcuerdo = this.acuerdo.tipoAcuerdo
      if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
        if (this.calculating == true) {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.valorTotal
        } else {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.valorTotal + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
        }
      } else {
        if (this.calculating == true) {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.valorTotal
        } else {
          this.acuerdoCal.valorTotalAcuerdo = this.cuentasCalcular.valorTotal + parseInt(this.acuerdoCal.valorInteresesMora)
        }
      }
    }
    this.acuerdo.valorTotalAcuerdo = this.acuerdoCal.valorTotalAcuerdo
  }

  metodosCalculos() {

    for (let i = 0; i < this.cuotas.length; i++) {
      //CAPITAL CUOTA

      var porcentaje = this.cuotas[i].valorCuota / this.acuerdoCal.valorTotalAcuerdo
      var cap = 0
      if (this.acuerdoCal.tipoAcuerdo == "MORA") {
        cap = porcentaje * this.cuentaCobrarSelected.moraObligatoria
      }
      if (this.acuerdoCal.tipoAcuerdo == "TOTAL") {
        cap = porcentaje * this.cuentaCobrarSelected.totalObligatoria
      }
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
      this.acuerdoCal.saldoAcuerdo = parseInt(this.cuentaCobrarSelected.clientes[0].saldoActual) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
    } else {
      this.acuerdoCal.saldoAcuerdo = parseInt(this.cuentaCobrarSelected.clientes[0].saldoActual) + parseInt(this.acuerdoCal.valorInteresesMora)
    }


  }

  calculadora(event: any) {
    console.log(this.cuentaCobrarSelected.clientes[0].saldoActual);

    if (this.cuentaCobrarSelected.clientes[0].saldoActual <= 0 || this.cuentaCobrarSelected.clientes[0].saldoActual == null) {
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
    this.calculating = true

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
        this.calculating = false
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
      this.acuerdoCal.saldoAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
    } else {
      this.acuerdoCal.saldoAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora)
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
        this.acuerdoCal.saldoAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
        this.acuerdoCal.valorTotalMora = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora) + parseInt(this.acuerdoCal.honoriarioAcuerdo)
      } else {
        this.acuerdoCal.saldoAcuerdo = parseInt(valorTotal) + parseInt(this.acuerdoCal.valorInteresesMora)
        this.acuerdoCal.valorTotalMora = parseInt(this.cuentaCobrarSelected.moraObligatoria) + parseInt(this.acuerdoCal.valorInteresesMora)
      }
      console.log(this.acuerdoCal);

      this.isCalculate = true
      this.calculating = true
    }

  }

  // CUOTAS

  // CALCULAR LAS FECHAS DE LAS CUOTAS
  generarFechas() {
    this.fechasIncrementadas = []
    var fechaString = this.fechaInicial.toISOString()


    var fechaSplit = fechaString.split("T")
    var fechaOk = fechaSplit[0].split("-")
    var dia = parseInt(fechaOk[2])
    var mes = parseInt(fechaOk[1])
    var year = parseInt(fechaOk[0])
    var meses31 = [1, 3, 5, 7, 8, 10, 12]
    var meses30 = [4, 6, 9, 11]

    console.log(this.cantidadFechas);

    for (let i = 0; i < this.cantidadFechas; i++) {
      var fechaString = `${year}-${mes}-${dia}`

      var fechaDate = new Date(fechaString)



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

      if (mes == 12) {
        mes = 0
        year++
        mes++;
      } else {
        mes++
      }

    }

  }

  // CACULAR COUTAS
  calcularCuotas() {
    if (this.acuerdoCal.valorCuotaMensual < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se perminten valores negativos',
        timer: 3000,
      });

      return
    }

    if (this.acuerdoCal.valorCuotaMensual === this.acuerdoCal.valorTotalAcuerdo) {

      var fechaForm = this.acuerdo.fechaCompromiso.split('-')
      var dia = parseInt(fechaForm[2])
      var mes = parseInt(fechaForm[1])
      var anio = parseInt(fechaForm[0])

      var fechaS = `${dia}/${mes}/${anio}`

      var cuotaList1 = {
        numeroCuota: 1,
        fechaVencimiento: fechaS,
        valorCuota: this.acuerdoCal.valorTotalAcuerdo,
        capitalCuota: 0,
        interesCuota: 0,
        honorarios: 0,
        cumplio: false
      }
      this.cuotas.push(cuotaList1)
      this.metodosCalculos()

      var totalCuotas = this.acuerdoCal.valorTotalAcuerdo / this.acuerdoCal.valorCuotaMensual
      var res = Math.ceil(totalCuotas);
      this.totalCuotas = res
      this.cantidadFechas = this.totalCuotas;

      this.generarFechas()
      return
    }

    var totalCuotas = this.acuerdoCal.valorTotalAcuerdo / this.acuerdoCal.valorCuotaMensual
    var res = Math.ceil(totalCuotas);
    this.totalCuotas = res
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
      var cap = 0
      if (this.acuerdoCal.tipoAcuerdo == "MORA") {
        cap = porcentaje * this.cuentaCobrarSelected.moraObligatoria
      }
      if (this.acuerdoCal.tipoAcuerdo == "TOTAL") {
        cap = porcentaje * this.cuentaCobrarSelected.totalObligatoria
      }

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
        var cuotaListUltima = {
          numeroCuota: 0,
          fechaVencimiento: '',
          valorCuota: 0,
          capitalCuota: 0,
          interesCuota: 0,
          honorarios: 0,
          cumplio: false
        }
        var decimalesCuota = totalCuotas % 1
        if (decimalesCuota == 0) {
          cuotaListUltima.valorCuota = this.acuerdoCal.valorCuotaMensual
        } else {
          var ultimaCuota = this.acuerdoCal.valorCuotaMensual * decimalesCuota
          cuotaListUltima.valorCuota = parseInt(ultimaCuota.toFixed(0))
        }

        cuotaListUltima.fechaVencimiento = this.fechasIncrementadas[i]
        cuotaListUltima.numeroCuota = i + 1
        // CAPITAL CUOTA
        var porcentaje = cuotaListUltima.valorCuota / this.acuerdoCal.valorTotalAcuerdo
        var cap = 0
        if (this.acuerdoCal.tipoAcuerdo == "MORA") {
          cap = porcentaje * this.cuentaCobrarSelected.moraObligatoria
        }
        if (this.acuerdoCal.tipoAcuerdo == "TOTAL") {
          cap = porcentaje * this.cuentaCobrarSelected.totalObligatoria
        }
        cuotaListUltima.capitalCuota = parseInt(cap.toFixed(0))

        // HONORARIOS POR CUOTA
        if (this.cuentaCobrarSelected.clasificacionJuridica == 'Prejuridico') {
          var hon = porcentaje * this.acuerdoCal.honoriarioAcuerdo
          cuotaListUltima.honorarios = parseInt(hon.toFixed(0))
        } else {
          cuotaListUltima.honorarios = 0
        }

        // INTERESES CUOTA
        var int = porcentaje * this.acuerdoCal.valorInteresesMora
        cuotaListUltima.interesCuota = parseInt(int.toFixed(0))

        this.cuotas.push(cuotaListUltima)
      } else {
        this.cuotas.push(cuotaList)
      }
      

    }
    console.log(this.cuotas);
    

  }

  // RECALCULAR
  recalcularValores(position: number, event: any) {
    if (event.target.value < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se perminten valores negativos',
        timer: 3000,
      });
      event.target.value = this.cuotas[position].valorCuota
      return

    }
    var nuevoValor = event.target.value - this.cuotas[position].valorCuota
    if (event.target.value > this.cuotas[position].valorCuota) {
      var sumaCoutasAnteriores = 0
      for (let i = this.cuotas.length - 1; i > position; i--) {


        if (nuevoValor > this.cuotas[i].valorCuota) {
          for (let j = 0; j < position; j++) {
            sumaCoutasAnteriores = sumaCoutasAnteriores + parseInt(this.cuotas[j].valorCuota)
          }
          var totalCuotaSumadas = sumaCoutasAnteriores + parseInt(event.target.value)
          if (totalCuotaSumadas > this.acuerdoCal.valorTotalAcuerdo) {
            var ultimaCuota = this.acuerdoCal.valorTotalAcuerdo - sumaCoutasAnteriores
            for (let k = position; k < this.cuotas.length - 1; k++) {
              this.cuotas.splice(k + 1)
              i = this.cuotas.length - 1
            }
            this.cuotas[this.cuotas.length - 1].valorCuota = ultimaCuota
            this.disableds[this.cuotas.length - 1] = true
          } else {
            nuevoValor = nuevoValor - this.cuotas[i].valorCuota
            this.cuotas.splice(i)
          }
        } else {
          nuevoValor = nuevoValor - this.cuotas[i].valorCuota
          if (nuevoValor <= 0) {
            this.cuotas[i].valorCuota = (nuevoValor) * -1
            this.cuotas[position].valorCuota = parseInt(event.target.value)
            this.totalCuotas = this.cuotas.length
            break
          }
        }
      }
    }
    //RECALCULAR PARA SUMAR CUOTAS
    var nuevoValorSumarCuotas = this.cuotas[position].valorCuota - event.target.value
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
              this.cuotas[this.cuotas.length - 1].valorCuota = this.cuotas[this.cuotas.length - 1].valorCuota + excedenteParaCuouta
              if (excedentePrinciapl > 0) {
                var cuoUl = {
                  
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedentePrinciapl,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUl)
                this.cantidadFechas++;
                this.cuotas[position].valorCuota = parseInt(event.target.value)
                excedentePrinciapl = 0
                break;
              }
            } else {
              this.cuotas[this.cuotas.length - 1].valorCuota = couta
              this.cuotas[position].valorCuota = parseInt(event.target.value)
            }
          } else {
            this.cuotas[this.cuotas.length - 1].valorCuota = cuotamenos
            this.cuotas[position].valorCuota = parseInt(event.target.value)
            break
          }
        }
        //nuevo valor mayor ultima cuota
        if (nuevoValorSumarCuotas > this.cuotas[this.cuotas.length - 1].valorCuota) {
          if (nuevoValorSumarCuotas <= this.acuerdoCal.valorCuotaMensual) {
            var couta = this.cuotas[this.cuotas.length - 1].valorCuota + nuevoValorSumarCuotas
            if (couta > this.acuerdoCal.valorCuotaMensual) {
              var excedentePrinciapl = couta - this.acuerdoCal.valorCuotaMensual
              var excedenteParaCuouta = nuevoValorSumarCuotas - excedentePrinciapl
              this.cuotas[this.cuotas.length - 1].valorCuota = this.cuotas[this.cuotas.length - 1].valorCuota + excedenteParaCuouta
              if (excedentePrinciapl > 0) {
                var cuoUl = {
                  
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedentePrinciapl,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUl)
                this.cantidadFechas++;
                
                this.cuotas[position].valorCuota = parseInt(event.target.value)
                excedentePrinciapl = 0
                break;
              }
            } else {
              this.cuotas[this.cuotas.length - 1].valorCuota = couta
              this.cuotas[position].valorCuota = parseInt(event.target.value)
              break;
            }
          }
          if (nuevoValorSumarCuotas >= this.acuerdoCal.valorCuotaMensual) {
            var coutaCambio = this.acuerdoCal.valorCuotaMensual - this.cuotas[this.cuotas.length - 1].valorCuota
            this.cuotas[this.cuotas.length - 1].valorCuota = this.acuerdoCal.valorCuotaMensual
            nuevoValorSumarCuotas = nuevoValorSumarCuotas - coutaCambio
            if (nuevoValorSumarCuotas > 0 && nuevoValorSumarCuotas < this.acuerdoCal.valorCuotaMensual) {
              var cuoUl = {
                
                numeroCuota: 0,
                fechaVencimiento: '',
                valorCuota: nuevoValorSumarCuotas,
                capitalCuota: 0,
                interesCuota: 0,
                honorarios: 0,
                cumplio: false
              }
              this.cuotas.push(cuoUl)
              this.cantidadFechas++;
              
              this.cuotas[position].valorCuota = parseInt(event.target.value)
              break;
            } else {
              var excedentePrinciapl = nuevoValorSumarCuotas - this.acuerdoCal.valorCuotaMensual
              var excedenteParaCuouta = nuevoValorSumarCuotas - excedentePrinciapl
              if (excedenteParaCuouta > 0 && excedenteParaCuouta >= this.acuerdoCal.valorCuotaMensual) {
                var cuoUll = {
                  
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedenteParaCuouta,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUll)
                this.cantidadFechas++;
                nuevoValorSumarCuotas = nuevoValorSumarCuotas - excedenteParaCuouta
              } else {
                var cuoUll = {
                 
                  numeroCuota: 0,
                  fechaVencimiento: '',
                  valorCuota: excedentePrinciapl,
                  capitalCuota: 0,
                  interesCuota: 0,
                  honorarios: 0,
                  cumplio: false
                }
                this.cuotas.push(cuoUll)
                this.cantidadFechas++;
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
    this.metodosCalculos()
    this.validarCuotasVacias()
    this.generarFechas()


    this.cuotas.forEach((c:any, i:number)=>{
      if(c.fechaVencimiento == ""){
        c.fechaVencimiento = this.fechasIncrementadas[i]
        c.numeroCuota = i+1
      }
    })
  }

  // CLASIFICACION
  getClasificacion() {
    this.cuentasCobrar.getClasificacion().subscribe(
      (data: any) => {
        this.ClasificacionArray = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  validarCuotasVacias() {
    for (let i = 0; i < this.cuotas.length; i++) {
      if (this.cuotas[i].valorCuota <= 0) {
        this.cuotas.splice(i, 1)
        this.disableds[this.cuotas.length - 1] = true
      }

    }


  }

  cancelarGestion() {

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

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
            tipoClasificacion: null,
            tarea: null,
            nota: null,
            acuerdoPago: null,
            nombreClasificacion: ''
          },
          contact: false,
          detallesAdicionales: this.newGestion.detallesAdicionales,
          usernameToSetNotificacion: '',
          userNotifying: '',
          notificacionId: null,
          clasificacionId: null
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
          isPartOfRecaudo: false
        }

        this.cuotas = []

        this.col = true
        this.disabledFecha = false

        this.fechasIncrementadas = []
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
    if (this.filtrando) {
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
    })
  }

  validarPermisoEnRolCartera(permiso: string, rolesCartera: any) {
    if (rolesCartera != undefined && rolesCartera.length > 0) {
      var permisos = rolesCartera[0].permisos.filter((p: any) => p.permiso == permiso)
      return permisos
    }
  }

  //FILTROS
  filtro() {
    var td
    var contenido:any
    var partesMes
    var mesTd
    var anioTd

    const mesActual = new Date().getMonth() + 1
    const anioActual = new Date().getFullYear()

    var user = this.authService.getUsername();

    if (user != null || user != undefined) {
      this.filtros.username = user
    }

    this.filtros.banco = this.bancosArray
    this.filtros.clasiJuridica = this.clasJurArray
    this.filtros.sede = this.sedesArray
    this.filtros.edadVencimiento = this.edadVenArray
    this.filtros.clasificacionGestion = this.clasGesArray

    console.log(this.filtros);
    

    if (
      (this.filtros.banco.length == 0) &&
      (this.filtros.diasVencidosInicio == 0 || this.filtros.diasVencidosInicio == null) &&
      (this.filtros.diasVencidosFin == 0 || this.filtros.diasVencidosFin == null) &&
      (this.filtros.edadVencimiento.length == 0) &&
      (this.filtros.sede.length == 0) &&
      (this.filtros.clasiJuridica.length == 0) &&
      (this.filtros.clasificacionGestion.length == 0) &&
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

    var admin = this.authService.getRolesByName(ROLES.Administration);

    var cartera = this.authService.getRolesByName(ROLES.Cartera);

    var permiso = this.validarPermisoEnRolCartera("VER TODOS", cartera);

    if (admin.length != 0 || permiso != undefined && permiso.length != 0) {
      this.filtros.username = ''
    }

    this.botonFiltro = true
    console.log(this.filtros);
    this.cuentasCobrar.filtro(this.page, this.size, this.fechaCreacion, this.filtros).subscribe(
      (data: any) => {
        this.botonFiltro = false
        this.filtrando = true
        this.filtroAgain = true
        this.paginas = new Array(data.totalPages)
        this.cuentasCobrarArray = data.content
        console.log(this.cuentasCobrarArray);
        this.last = data.last
        this.first = data.first
        this.numeroPages = data.totalPages
        this.cuentasCobrar.proSubject.next(true);

        if (this.buscarObligacion != '' || (this.filtros.banco.length != 0) ||
          (this.filtros.diasVencidosInicio != 0 && this.filtros.diasVencidosInicio != null) ||
          (this.filtros.diasVencidosFin != 0 && this.filtros.diasVencidosFin != null) ||
          (this.filtros.edadVencimiento.length != 0) ||
          (this.filtros.sede.length != 0) ||
          (this.filtros.clasiJuridica.length != 0) ||
          (this.filtros.saldoCapitalInicio != 0 && this.filtros.saldoCapitalInicio != null) ||
          (this.filtros.saldoCapitalFin != 0 && this.filtros.saldoCapitalFin != null) ||
          (this.filtros.fechaCpcInicio != null) ||
          (this.filtros.fechaCpcFin != null) ||
          (this.filtros.fechaGestionInicio != null) ||
          (this.filtros.fechaGestionFin != null) ||
          (this.filtros.fechaCompromisoInicio != null) ||
          (this.filtros.fechaCompromisoFin != null)) {
            setTimeout(() => {
              for (let i = 0; i < this.size; i++) {
                td = document.getElementById(`td_${i}`)
  
                if(td != null && td != undefined){
                  contenido = td.textContent;
  
                  partesMes = contenido.split('/')
  
                  mesTd = parseInt(partesMes[1], 10)
                  anioTd = parseInt(partesMes[2], 10)
                  
                  if(mesTd == mesActual && anioTd == anioActual){
                    td.classList.add("gestionado")
                  }
                }
              }
            }, 100);
          this.variableLimpiar = true
        } else {
          this.variableLimpiar = false
        }
        console.log(this.cuentasCobrarArray);
        
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

  reiniciarFiltros(accion: string) {
    this.filtros = {
      banco: [],
      diasVencidosInicio: null,
      diasVencidosFin: null,
      edadVencimiento: [],
      sede: [],
      username: '',
      clasiJuridica: [],
      saldoCapitalInicio: null,
      saldoCapitalFin: null,
      fechaCpcInicio: null,
      fechaCpcFin: null,
      fechaGestionInicio: null,
      fechaGestionFin: null,
      fechaCompromisoInicio: null,
      fechaCompromisoFin: null,
      isActive: false,
      clasificacionGestion: []
    }

    this.bancosArray = []
    this.edadVenArray = []
    this.sedesArray = []
    this.clasJurArray = []
    this.clasGesArray = []

    if (accion == 'LIMPIAR') {
      this.buscarObligacion = ''
      this.cuentasCobrarBuscar = []
      this.filtradoBuscar = false
    }

    for (const i of this.colcheck.toArray()) {
      i.nativeElement.checked = false
    }

    if (this.buscarObligacion != '' || (this.filtros.banco.length != 0) ||
      (this.filtros.diasVencidosInicio != 0 && this.filtros.diasVencidosInicio != null) ||
      (this.filtros.diasVencidosFin != 0 && this.filtros.diasVencidosFin != null) ||
      (this.filtros.edadVencimiento.length != 0) ||
      (this.filtros.sede.length != 0) ||
      (this.filtros.clasiJuridica.length != 0) ||
      (this.filtros.saldoCapitalInicio != 0 && this.filtros.saldoCapitalInicio != null) ||
      (this.filtros.saldoCapitalFin != 0 && this.filtros.saldoCapitalFin != null) ||
      (this.filtros.fechaCpcInicio != null) ||
      (this.filtros.fechaCpcFin != null) ||
      (this.filtros.fechaGestionInicio != null) ||
      (this.filtros.fechaGestionFin != null) ||
      (this.filtros.fechaCompromisoInicio != null) ||
      (this.filtros.fechaCompromisoFin != null)) {
      this.variableLimpiar = true
    } else {
      this.variableLimpiar = false
    }
    this.filtrando = false
    this.filtroAgain = false
    this.getCuentasCobrar()
    this.spinner = true
    $('#offcanvasFilter').offcanvas('hide');
  }

  metodoBancos(banco: string) {
    if (this.bancosArray.includes(banco)) {
      var position = this.bancosArray.indexOf(banco)
      this.bancosArray.splice(position, 1)
    } else {
      this.bancosArray.push(banco)
    }
  }

  metodoEdadVen(edad: string) {
    if (this.edadVenArray.includes(edad)) {
      var position = this.edadVenArray.indexOf(edad)
      this.edadVenArray.splice(position, 1)
    } else {
      this.edadVenArray.push(edad)
    }
  }

  metodoSede(sede: string) {
    if (this.sedesArray.includes(sede)) {
      var position = this.sedesArray.indexOf(sede)
      this.sedesArray.splice(position, 1)
    } else {
      this.sedesArray.push(sede)
    }
  }

  metodoClas(clas: string) {
    if (this.clasJurArray.includes(clas)) {
      var position = this.clasJurArray.indexOf(clas)
      this.clasJurArray.splice(position, 1)
    } else {
      this.clasJurArray.push(clas)
    }
  }

  metodoClasGestion(tipo:string, clas: string) {

    var objeto:any = {
      tipoClasificacion: tipo,
      nombreClasificacion: clas
    }
    
    const index = this.clasGesArray.findIndex((element: any) => {
      return element.tipoClasificacion === tipo && element.nombreClasificacion === clas;
    });

    if (index !== -1) {
        this.clasGesArray.splice(index, 1);
    } else {
        this.clasGesArray.push(objeto);
    }

    console.log(this.clasGesArray);
  }

  getByDato() {
    var td
    var contenido:any
    var partesMes
    var mesTd
    var anioTd

    const mesActual = new Date().getMonth() + 1
    const anioActual = new Date().getFullYear()

    if (this.buscarObligacion.trim() == '' || this.buscarObligacion.trim() == null) {
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
      (data: any) => {
        this.botonFiltrarObligacion = false
        this.cuentasCobrarBuscar = data
        this.filtradoBuscar = true
        this.numeroPages = 1
        this.cuentasCobrar.proSubject.next(true);
        for (const i of this.colcheck.toArray()) {
          i.nativeElement.checked = false
        }

        if (this.buscarObligacion != '' || (this.filtros.banco.length != 0) ||
          (this.filtros.diasVencidosInicio != 0 && this.filtros.diasVencidosInicio != null) ||
          (this.filtros.diasVencidosFin != 0 && this.filtros.diasVencidosFin != null) ||
          (this.filtros.edadVencimiento.length != 0) ||
          (this.filtros.sede.length != 0) ||
          (this.filtros.clasiJuridica.length != 0) ||
          (this.filtros.saldoCapitalInicio != 0 && this.filtros.saldoCapitalInicio != null) ||
          (this.filtros.saldoCapitalFin != 0 && this.filtros.saldoCapitalFin != null) ||
          (this.filtros.fechaCpcInicio != null) ||
          (this.filtros.fechaCpcFin != null) ||
          (this.filtros.fechaGestionInicio != null) ||
          (this.filtros.fechaGestionFin != null) ||
          (this.filtros.fechaCompromisoInicio != null) ||
          (this.filtros.fechaCompromisoFin != null)) {
            setTimeout(() => {
              for (let i = 0; i < this.size; i++) {
                td = document.getElementById(`td_${i}`)
  
                if(td != null && td != undefined){
                  contenido = td.textContent;
  
                  partesMes = contenido.split('/')
  
                  mesTd = parseInt(partesMes[1], 10)
                  anioTd = parseInt(partesMes[2], 10)
                  
                  if(mesTd == mesActual && anioTd == anioActual){
                    td.classList.add("gestionado")
                  }
                }
              }
            }, 100);
          this.variableLimpiar = true
        } else {
          this.variableLimpiar = false
        }

        if (this.cuentasCobrarArray == null || this.cuentasCobrarArray.length == 0) {
          this.spinner = true
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Hay Obligaciones Con Este Filtro',
            timer: 3000
          })
          this.getCuentasCobrar()
        }
      }, (error: any) => {
        this.botonFiltrarObligacion = false
        console.log(error);
      }
    )
  }

  ordenarGestiones(gestiones: any[]) {
    var gesTrue = gestiones.filter((ges: any) => ges.clasificacion.clasificacion == 'ACUERDO DE PAGO' && ges.clasificacion.isActive)
    gesTrue.forEach((ges: any) => {
      this.gestiones.push(ges)
    });

    var tareas = gestiones.filter((ges: any) => ges.clasificacion.clasificacion == 'TAREA' && ges.clasificacion.isActive)
    if (tareas != null || tareas != undefined) {
      tareas.forEach((ges: any) => {
        this.gestiones.push(ges)
      });
    }

    var notas = gestiones.filter((ges: any) => ges.clasificacion.clasificacion == 'NOTA')
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

    this.mostrarAgregarPago = true
    this.ocultarAgregarPago = false
    if (this.pago.detalle.trim() == '' || this.pago.detalle.trim() == null || this.pago.detalle.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar el concepto del pago',
        timer: 3000
      })
      this.mostrarAgregarPago = false
      this.ocultarAgregarPago = true
      return
    }

    if (this.pago.medioPago.trim() == '' || this.pago.detalle.trim() == null || this.pago.detalle.trim() == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar un medio pago',
        timer: 3000
      })
      this.mostrarAgregarPago = false
      this.ocultarAgregarPago = true
      return
    }

    if (this.pago.valor < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes ingresar un valor mayor a cero',
        timer: 3000
      })
      this.mostrarAgregarPago = false
      this.ocultarAgregarPago = true
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
      this.cuotasList.forEach((c: CuotaList, i: number) => {



        if (c.pagos != null || c.pagos != undefined) {
          if (c.pagos.saldoCuota > 0) {

            valorTotal = valorTotal - c.pagos.saldoCuota


            this.coutasRequest[i].capitalCuota = this.coutasRequest[i].capitalCuota - this.coutasRequest[i].pagosDto!.saldoCuota
            this.cuotasList[i].capitalCuota = this.cuotasList[i].capitalCuota - this.cuotasList[i].pagos!.saldoCuota

            this.coutasRequest[i].pagosDto!.saldoCuota = 0
            this.cuotasList[i].pagos!.saldoCuota = 0

            this.coutasRequest[i].pagosDto!.valorPago = c.valorCuota
            this.cuotasList[i].pagos!.valorPago = this.coutasRequest[i].pagosDto!.valorPago
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


        this.coutasRequest[i].pago = c.pago

      })


      if (this.saldoAcuerdoPago < this.pago.valor) {
        this.saldoAcuerdoPago = this.saldoAcuerdoPago - this.saldoAcuerdoPago
      } else {
        this.saldoAcuerdoPago = this.saldoAcuerdoPago - this.pago.valor
      }
      this.pago.valor = 0
      this.activarGuardarPago = true
      this.ocultarCrearRevision = false

    }
  }

  crearNotaRevision() {
    this.ocultarCrearRevision = true
    this.mostrarCrearRevision = false
    this.spinnerCrearNota = true
    this.ocultarAgregarPago = false
    var detalle = this.detalleRevision


    var nota = {
      detalle: `ACUERDO DE PAGO N° ${this.gestionSelected.clasificacion.idClasificacionGestion} ${detalle}`
    }

    this.newGestion.clasificacion.nota = nota
    this.newGestion.clasificacion.nombreClasificacion = "Acuerdo de pago/Revision"
    this.newGestion.clasificacion.tipoClasificacion = "NOTA"
    this.newGestion.contact = false

    var usuario = this.authService.getUsername();
    if (usuario != null || usuario != undefined) {
      this.newGestion.userNotifying = usuario
      this.newGestion.usernameToSetNotificacion = usuario
    }

    this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Nota Guardada Con Éxito',
          timer: 3000
        })
        this.spinnerCrearNota = false
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Guardar  La Nota',
          timer: 3000
        })
        this.spinnerCrearNota = false
      }
    )



  }

  generarRecibo() {

    var coutasFiltradas = this.coutasRequest.filter((c: CuotasRequest) => !c.pago && c.pagosDto != null)


    this.activarGuardarPago = false
    this.savePago = true



    var recibo = {
      numeroObligacion: this.cuentaCobrarSelected.numeroObligacion,
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
      nombreClasificacion: "Acuerdo de pago/Recaudo"
    }


    console.log(recibo);


    var user = this.authService.getUsername();
    if (user != null || user != undefined) {
      recibo.username = user;

      this.cuentasCobrar.crearRecibo(recibo).subscribe(
        (data: any) => {

          this.mostrarReciboPago(data.base64)
          this.getGestiones(this.cuentaCobrarSelected.numeroObligacion)

          this.activarGuardarPago = false
          this.savePago = false
          this.coutasRequest = []
          this.pago = {
            valor: 0,
            detalle: '',
            medioPago: "",
            numeroRecibo: '',
            cumpliendo: false
          }

          this.valorTotalIngresado = 0
        }, (error: any) => {
          this.activarGuardarPago = false
          this.savePago = false
          console.log(error);

        }
      )
    }

    $('#modalGestionCom').modal('hide');


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

  // NOTIFICACIONES
  getNotificaciones() {
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    this.cuentasCobrar.getNotificacionesVencidas(user).subscribe(
      (data: any) => {
        this.notiArrayVencidas = data
        console.log(this.notiArrayVencidas);
        
        if (user == null || user == undefined) {
          return
        }
        this.cuentasCobrar.getAllNotificaciones(user).subscribe(
          (data: any) => {
            this.notiArray = data
            console.log(this.notiArray);
            
            if (user == null || user == undefined) {
              return
            }

            this.cuentasCobrar.getNotificacionesRealizadas(user).subscribe(
              (data: any) => {
                this.notiArrayRealizadas = data
                console.log(this.notiArrayRealizadas);
                
              }
            )

          }, (error: any) => {
            console.log(error);
          }
        )
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getNotiVenBySede(){
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    if(this.filtroVen == '' || this.filtroVen == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione Una Sede',
        timer: 3000
      })
      return
    }

    this.cuentasCobrar.getVencidasBySede(this.filtroVen, user).subscribe(
      (data:any) => {
        this.notiArrayVencidas = data
        console.log(this.notiArrayVencidas);
        if(this.notiArrayVencidas.length == 0){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Hay Notificaciones Con Este Filtro',
            timer: 3000
          })
          setTimeout(() => {
            this.getNotificaciones()
          }, 3000);
        }
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getNotiAllBySede(){
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    if(this.filtroAll == '' || this.filtroAll == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione Una Sede',
        timer: 3000
      })
      return
    }

    this.cuentasCobrar.getAllBySede(this.filtroAll, user).subscribe(
      (data:any) => {
        this.notiArray = data
        console.log(this.notiArray);
        if(this.notiArray.length == 0){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Hay Notificaciones Con Este Filtro',
            timer: 3000
          })
          setTimeout(() => {
            this.getNotificaciones()
          }, 3000);
        }
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getNotiRealizadasBySede(){
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    if(this.filtroRealizada == '' || this.filtroRealizada == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione Una Sede',
        timer: 3000
      })
      return
    }

    this.cuentasCobrar.getRealizadasBySede(this.filtroRealizada, user).subscribe(
      (data:any) => {
        this.notiArrayRealizadas = data
        console.log(this.notiArrayRealizadas);
        if(this.notiArrayRealizadas.length == 0){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Hay Notificaciones Con Este Filtro',
            timer: 3000
          })
          setTimeout(() => {
            this.getNotificaciones()
          }, 3000);
        }
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  desactivarNoti(id: number) {
    Swal.fire({
      title: 'Confirmar Notificación',
      text: '¿Desea Confirmar La Notificación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentasCobrar.desactivateNotificacion(id).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Datos Guardados',
              text: 'Notificación Confirmada Con Éxito',
              timer: 3000
            })
            this.getNotificaciones()
          }, (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error Al Confirma La Notificación',
              timer: 3000
            })
            console.log(error);
          }
        )
      }
    })
  }

  hideNotiRealizada(id: number) {
    Swal.fire({
      title: 'Eliminar Notificación',
      text: '¿Desea Eliminar La Notificación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentasCobrar.hideNotificacion(id).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Datos Guardados',
              text: 'Notificación Eliminada Con Éxito',
              timer: 3000
            })
            this.getNotificaciones()
          }, (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error Al Eliminar La Notificación',
              timer: 3000
            })
            console.log(error);
          }
        )
      }
    })
  }

  validarAcuerdoActivo(): boolean {
    var acuerdo = this.gestiones.find((g: Gestiones) => g.clasificacion.clasificacion == ClasificacionGestion.AcuerdoPago)
    return acuerdo != null || acuerdo != undefined ? true : false;
  }

  formatFechaDesdeBackend(fecha: Date): string {
    const date = new Date(fecha)

    return `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()} ${date.getUTCHours() + 5}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`
  }

  abrirModalBuscar() {
    $('#modalObligacion').modal('show')
    $('#modalObligacion').on('shown.bs.modal', () => {
      this.focusInput();
    });
  }

  focusInput() {

    this.miInput.nativeElement.focus();

  }


  alertasGestiones() {
    var usuario = this.authService.getUsername();
    var fecha = new Date();


    if (usuario != null || usuario != undefined) {
      this.cuentasCobrar.alertasGestiones(usuario, fecha.toISOString()).subscribe(
        (data: any) => {
          this.alertasGestionesObject = data; 
        }, (error: any) => {
          console.log(error)
        }
      )
    }
  }

}
