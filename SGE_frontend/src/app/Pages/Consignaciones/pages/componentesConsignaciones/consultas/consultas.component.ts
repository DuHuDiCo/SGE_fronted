import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PERMISOSCONSIGNACION } from 'src/app/Models/AllPermisos';
import { BancoServiceService } from 'src/app/Services/Consignaciones/Bancos/banco-service.service';
import { ConsultarService } from 'src/app/Services/Consignaciones/Consultar/consultar.service';
import { EstadoServiceService } from 'src/app/Services/Consignaciones/Estado/estado-service.service';
import { IngresarService } from 'src/app/Services/Consignaciones/IngresarConsignaciones/ingresar.service';
import { ObligacionesService } from 'src/app/Services/Consignaciones/Obligaciones/obligaciones.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Plataforma } from 'src/app/Types/Banco';
import { CambioEstado, Con, Consignacion, IsSelected, Obligacion, ObservacionDto } from 'src/app/Types/Consignaciones';
import { Estado } from 'src/app/Types/Estado';
import { ROLES } from 'src/app/Types/Roles';
import { Sede } from 'src/app/Types/Sede';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})

export class ConsultasComponent implements OnInit {

  // ARRAYS
  roles: string[] = []
  plataforma: any[] = []
  con: any[] = []
  sedes: Sede[] = []
  estadoA: Estado[] = []
  paginas!: Array<number>
  botones!: Array<boolean>
  numeroPages: number = 0
  permisos: string[] = [
    // 0
    "CREAR CONSIGNACIONES",
    // 1
    "CONSULTAR COMPROBADOS",
    // 2
    "CONSULTAR APLICADOS",
    // 3
    "COMPROBAR CONSIGNACIONES",
    // 4
    "APLICAR CONSIGNACIONES",
    // 5
    "EDITAR CONSIGNACIONES",
    // 6
    "FILTRAR ESTADO",
    // 7
    "FILTRAR SEDE",
    // 8
    "FILTRAR FECHA",
    // 9
    "FILTRAR CEDULA",
    // 10
    "GENERAR REPORTE PENDIENTES",
    // 11
    "GENERAR REPORTES COMPROBADAS",
    // 12
    "GENERAR REPORTE APLICADAS",
    // 13
    "VER OBSERVACIONES",
    // 14
    "VER COMPROBANTE",
    // 15
    "VER HISTORIAL",
    // 16
    "VER REPORTES GENERAL",
    // 17
    "VER REPORTES APLICADOS",
    // 18
    "VER REPORTES COMPROBADOS",
    // 19
    "VER REPORTES PENDIENTES",
    // 20
    "FILTRAR REPORTES FECHA",
    // 21
    "FILTRAR REPORTES USUARIO",
    // 22
    "CONFIGURACIONES",
    // 23
    "INFORMES",
    // 24
    "CONSULTAR PENDIENTES"
  ]

  //OBJETOS
  modal: any = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: 0,
    fechaPago: new Date,
    idPlataforma: 0,
    observaciones: '',
    obligaciones: [],
    base64: '',
    username: '',
    estado: ''
  }
  actu: Con = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: 0,
    fechaPago: new Date,
    fechaCreacion: new Date,
    isSelected: true,
    usuarioId: 0,
    comprobantes: {
      idComprobante: 0,
      nombreArchivo: '',
      rutaArchivo: '',
      fechaCreacion: new Date,
      usuarioId: 0,
      dataURI: ''
    },
    plataforma: {
      idPlataforma: 0,
      bancos: {
        idBancos: 0,
        nombreBanco: '',
        tipoPago: []
      }
    },
    observaciones: [],
    cuentasCobrar: [],
    actualizaciones: [],
    fileReportes: [],
    sede: ''
  }
  cuentasPorCobrar: Con = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: 0,
    fechaPago: new Date,
    fechaCreacion: new Date,
    isSelected: true,
    usuarioId: 0,
    comprobantes: {
      idComprobante: 0,
      nombreArchivo: '',
      rutaArchivo: '',
      fechaCreacion: new Date,
      usuarioId: 0,
      dataURI: ''
    },
    plataforma: {
      idPlataforma: 0,
      bancos: {
        idBancos: 0,
        nombreBanco: '',
        tipoPago: []
      }
    },
    observaciones: [],
    cuentasCobrar: [],
    actualizaciones: [],
    fileReportes: [],
    sede: ''
  }
  detalle: Con = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: 0,
    fechaPago: new Date,
    fechaCreacion: new Date,
    isSelected: true,
    usuarioId: 0,
    comprobantes: {
      idComprobante: 0,
      nombreArchivo: '',
      rutaArchivo: '',
      fechaCreacion: new Date,
      usuarioId: 0,
      dataURI: ''
    },
    plataforma: {
      idPlataforma: 0,
      bancos: {
        idBancos: 0,
        nombreBanco: '',
        tipoPago: []
      }
    },
    observaciones: [],
    cuentasCobrar: [],
    actualizaciones: [],
    fileReportes: [],
    sede: ''
  }
  observacionDto: ObservacionDto = {
    detalle: '',
    username: '',
    idConsignacion: 0
  }
  cambiarEstado: CambioEstado = {
    estado: '',
    idConsignacion: 0,
    username: '',
    observacion: ''
  }
  isSelected: IsSelected = {
    idConsignacion: 0,
    username: '',
    opcion: '',
    estado: ''
  }

  cliente: any = {
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    numeroDocumento: '',
    username: '',
    numeroObligacion: '',
    sede: '',
    asesor: ''
  }

  cambioArray: CambioEstado[] = []
  asesores: any[] = []

  //VARIABLES
  cedula: string = ''
  cedulaEditar: string = ''
  base64: string = ''
  check: boolean = false
  page: number = 0
  pages: number = 0
  size: number = 10
  sizes: number = 10
  cont: number = 1
  isCon: boolean = false
  last: boolean = false
  first: boolean = false
  initialCon: number = 1;
  crearObs: boolean = false
  buscarObli: boolean = false
  editarCon: boolean = false
  spinner: boolean = true
  filtro: boolean = false
  cambios: boolean = false
  botonFiltrar: boolean = false
  botonCambiarConsignacion: boolean = false
  crearCliente: boolean = false

  estado: string = 'null'
  fecha: any = 'null'
  sede: string = 'null'

  estadoConsignacion: string = ''

  posicionDevolver: number = 0
  clickeado: string = ''

  sedeUser: string | null = ''
  selected!: boolean

  tipoReporte: string = ''

  botonGenerarPendientes: boolean = false
  filtrando: boolean = false


  private proSubscriptionNext!: Subscription;
  private proSubscriptionBack!: Subscription;

  constructor(private authService: AuthenticationService, private consultarService: ConsultarService, private bancoService: BancoServiceService, private ingresarService: IngresarService, private estadoService: EstadoServiceService, private sanitizer: DomSanitizer, private obligacionService: ObligacionesService) { }

  ngOnInit(): void {
    this.getRoles()
    this.getPlataforma()
    this.getAllEstado()
    this.getSede()
  }

  //VALIDACION DE LOS CAMPOS DE CONSIGNACION PARA EDITAR
  validateNewConsignacion() {
    if (this.modal.numeroRecibo.trim() == '' || this.modal.numeroRecibo.trim() == null) {
      Swal.fire('Error', 'Digite un Número de Recibo', 'error')
      return
    }
    if (this.modal.valor == 0 || this.modal.valor == null) {
      Swal.fire('Error', 'Digite un Valor', 'error')
      return
    }
    if (this.modal.fechaPago instanceof Date || this.modal.fechaPago == null) {
      Swal.fire('Error', 'Seleccione Una Fecha de Pago', 'error')
      return
    }
    if (this.modal.obligaciones.length <= 0 || this.modal.obligaciones == null) {
      if (this.cuentasPorCobrar.cuentasCobrar.length <= 0 || this.cuentasPorCobrar.cuentasCobrar == null) {
        Swal.fire('Error', 'Debe de Tener al Menos Una Obligación Seleccionada', 'error')
        return
      }
    }
    if (this.modal.idPlataforma == 0 || this.modal.idPlataforma == null) {
      Swal.fire('Error', 'Seleccione Una Plataforma', 'error')
      return
    }
    if (this.modal.estado == '' || this.modal.estado == null) {
      Swal.fire('Error', 'Seleccione Un Estado', 'error')
      return
    }

    this.showModal()
    
  }

  editarConsignacion() {
    if (this.modal.observaciones == '' || this.modal.observaciones == null) {
      Swal.fire('Error', 'Ingrese La Observación Correspondiente', 'error')
      return
    }
    this.editarCon = true

    setTimeout(() => {
      var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }
      this.modal.username = user

      this.consultarService.updateConsignacion(this.modal).subscribe(
        (data: any) => {
          Swal.fire('Felicidades', 'Consignación Actualizada Con éxito', 'success')
          this.editarCon = false
          $('#modalObs').modal('hide');
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }, (error: any) => {
          Swal.fire('Error', 'Error al Actualizar La Consignación', 'error')
          this.editarCon = false

        }
      )
    }, 2000);
  }

  //OBTENER EL ROL Y PERMISO DEL USUARIO
  getRoles() {

    var roles = this.authService.getRolesP()


    var permiso: any = {}
    permiso = roles.permisos.find((pe: any) => pe.permiso.startsWith('CONSULTAR'))

    var arrayP = permiso.permiso.split(" ")
    var p = arrayP[1].substring(0, arrayP[1].length - 1)
    this.estadoConsignacion = p


    this.getConsignaciones(p)
  }

  //TRAER LAS CONSIGNACIONES CON VALIDACIONES SEGUN EL PERMISO
  getConsignaciones(p: string) {
    this.sedeUser = this.authService.getSede()

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.cambiarEstado.username = user

    if (this.validarPermiso('CONSULTAR COMPROBADOS')) {
      this.consultarService.listarComprobados(user, this.page, this.size).subscribe(
        (data: any) => {
          this.spinner = false
          this.con = data.content
          console.log(data);
          
          this.con.forEach((e: any, index: number) => {

            if (e.isSelected) {
              var user = this.authService.getUsername()

              if (user == null || user == undefined) {
                return
              }
              var guardarArray: CambioEstado = {
                estado: e.isSelecetedEstado,
                idConsignacion: e.idConsignacion,
                username: user,
                observacion: ''
              }

              this.cambioArray.push(guardarArray)
              setTimeout(() => {
                if (e.isSelecetedEstado.startsWith('DEVUELTA')) {
                  this.cambiarDevolver(e.idConsignacion, index, 'DESACTIVAR', 'DEVOLVER CAJA')
                } else {
                  this.cambiarBotones(index, 'DESACTIVAR', e.idConsignacion, 'COMPROBADO')
                }
                if (this.cambioArray.length > 0) {
                  this.cambios = true
                } else {
                  this.cambios = false
                }
                console.log(this.cambioArray);
              }, 100);


            }
          });

          this.paginas = new Array(data.totalPages)
          this.last = data.last
          this.first = data.first
          this.numeroPages = data.totalPages
          this.consultarService.proSubject.next(true);
          this.con.forEach((c: any) => {
            c.actualizaciones = c.actualizaciones.filter((a: any) => a.isCurrent == true)
          })
          if (this.con.length <= 0) {
            Swal.fire('Error', 'No hay Consignaciones Disponibles', 'error')
            return
          }
          console.log(data);


          this.botones = new Array<boolean>(this.con.length).fill(false)
        }, (error: any) => {

        }
      )
    }

    if (this.validarPermiso('CONSULTAR PENDIENTES')) {
      this.consultarService.getAllConsignaciones(p, this.page, this.size).subscribe(
        (data: any) => {
          console.log(data);
          
          this.spinner = false
          this.con = data.content
          this.numeroPages = data.totalPages
          this.con.forEach((e: any, index: number) => {

            if (e.isSelected) {
              var user = this.authService.getUsername()

              if (user == null || user == undefined) {
                return
              }
              var guardarArray: CambioEstado = {
                estado: e.isSelecetedEstado,
                idConsignacion: e.idConsignacion,
                username: user,
                observacion: ''
              }

              this.cambioArray.push(guardarArray)
              setTimeout(() => {

                if (e.isSelecetedEstado.startsWith('DEVUELTA')) {
                  this.cambiarDevolver(e.idConsignacion, index, 'DESACTIVAR', 'DEVOLVER CAJA')
                } else {
                  this.cambiarBotones(index, 'DESACTIVAR', e.idConsignacion, 'COMPROBADO')
                }

                if (this.cambioArray.length > 0) {
                  this.cambios = true
                } else {
                  this.cambios = false
                }
                console.log(this.cambioArray);
              }, 100);


            }
          });

          this.paginas = new Array(data.totalPages)
          this.last = data.last
          this.first = data.first
          this.consultarService.proSubject.next(true);
          this.con.forEach((c: any) => {
            c.actualizaciones = c.actualizaciones.filter((a: any) => a.isCurrent == true)
          })
          this.botones = new Array<boolean>(this.con.length).fill(false)

          if (this.con.length <= 0) {
            Swal.fire('Error', 'No hay Consignaciones Disponibles', 'error')
            return
          }


        }, (error: any) => {

        }
      )
    }

  }

  img(dataURI: string) {
    this.base64 = dataURI
  }

  //OBTENER LA CONSIGNACION POR ID (PARA EDITAR Y OTRAS FUNCIONES)
  public getConsignacionById(id: number) {
    this.consultarService.getConsignacionById(id).subscribe(
      (data: any) => {
        this.cuentasPorCobrar.cuentasCobrar = []

        this.modal.idConsignacion = id
        this.modal.numeroRecibo = data.numeroRecibo
        this.modal.valor = data.valor
        this.modal.fechaPago = data.fechaPago
        this.modal.idPlataforma = data.plataforma.idPlataforma
        this.modal.base64 = data.base64

        this.actu = data
        this.cuentasPorCobrar = data
        this.detalle = data
        this.observacionDto.idConsignacion = data.idConsignacion

      }, (error: any) => {

      }
    )
  }

  //TRAER TODAS LAS PLATAFORMAS
  getPlataforma() {
    this.bancoService.getBancos().subscribe(
      (data: any) => {
        this.plataforma = data
      }, (error: any) => {

      }
    )
  }

  //METODO PARA CAMBIAR EL TIPO DE PAGO EN EL INPUT
  cambiarPago(event: any) {
    var valor = event.target.value
    this.modal.idPlataforma = valor
  }

  //BUSCAR UNA OBLIGACION SEGUN LA CEDULA DEL CLIENTE
  getObligacionByCedula() {

    const cedula = this.cedulaEditar.trim()
    if (cedula.trim() == '' || isNaN(parseInt(cedula))) {
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    }

    this.buscarObli = true

    setTimeout(() => {
      this.ingresarService.getObligacionByCedula(this.cedulaEditar).subscribe(
        (data: any) => {
          this.cuentasPorCobrar.cuentasCobrar = data

          if (this.cuentasPorCobrar.cuentasCobrar.length > 0) {
            this.check = true
            this.buscarObli = false
            return
          }

          if (this.cuentasPorCobrar.cuentasCobrar.length <= 0) {
            Swal.fire('Error', 'La Cédula No Pertenece A un Cliente', 'error')
            this.showCliente()
            this.getAllAsesores()
            this.buscarObli = false
            this.cedulaEditar = ''
            return
          }

        }, (error: any) => {
          Swal.fire('Error', 'Error Al Traer Las Obligaciones', 'error')
          this.check = false
          this.buscarObli = false
          this.cedulaEditar = ''

        }
      )
    }, 2000);


  }

  showCliente() {
    $('#modalCliente').modal('show')
  }

  //MARCAR LOS CHECKBOXS
  checkBox(obligacion: string) {
    this.modal.obligaciones = []
    if (this.modal.obligaciones.includes(obligacion)) {
      var position = this.modal.obligaciones.indexOf(obligacion)
      this.modal.obligaciones.splice(position, 1)
    } else {
      this.modal.obligaciones.push(obligacion)
    }

  }

  //OBTENER EL ARCHIVO (EDITAR)
  public obtenerFile(event: any) {
    var archivo = event.target.files[0];
    this.extraerBase64(archivo).then((file: any) => {
      this.modal.base64 = file.base;

    })
  }

  //CONVERTIRLO A BASE64 (EDITAR)
  public extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  //METODOS PARA LA PAGINACION DESDE EL BACKEND
  //PAGINA SIGUIENTE
  next() {
    if (!this.last) {
      this.page++
      if (this.filtrando) {
        this.filtrar(this.estado, this.fecha, this.sede, this.page, this.sizes)
        this.proSubscriptionNext = this.consultarService.proSubject.subscribe(
          (con: boolean) => {

            this.isCon = con;
            this.cont = this.cont + this.size
            this.proSubscriptionNext.unsubscribe()
          }
        );
      } else {
        this.getRoles()
        this.proSubscriptionNext = this.consultarService.proSubject.subscribe(
          (con: boolean) => {

            this.isCon = con;
            this.cont = this.cont + this.size
            this.proSubscriptionNext.unsubscribe()
          }
        );
      }
    }
  }

  //PAGINA ANTERIOR
  back() {
    if (!this.first) {
      this.page--
      if (this.filtrando) {
        this.filtrar(this.estado, this.fecha, this.sede, this.page, this.sizes)
        this.proSubscriptionBack = this.consultarService.proSubject.subscribe(
          (con: boolean) => {

            this.isCon = con;
            this.cont = this.cont - this.size
            this.proSubscriptionBack.unsubscribe()
          }
        );
      } else {
        this.getRoles()
        this.proSubscriptionBack = this.consultarService.proSubject.subscribe(
          (con: boolean) => {

            this.isCon = con;
            this.cont = this.cont - this.size
            this.proSubscriptionBack.unsubscribe()
          }
        );
      }

    }
  }

  //IR A UNA PAGINA ESPECIFICA
  goToPage(page: number) {
    this.page = page
    if (this.filtrando) {
      this.filtrar(this.estado, this.fecha, this.sede, this.page, this.sizes)
      this.proSubscriptionNext = this.consultarService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.sizes);
          this.proSubscriptionNext.unsubscribe()
        }
      );
    } else {
      this.getRoles()
      this.proSubscriptionNext = this.consultarService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.sizes);
          this.proSubscriptionNext.unsubscribe()
        }
      );
    }


  }

  //CREAR UNA OBSERVACION A UN CONSIGNACION DESDE EL MODAL VER MÁS
  saveObservacion() {

    if (this.observacionDto.detalle.trim() == '' || this.observacionDto.detalle.trim() == null) {
      Swal.fire('Error', 'Debe de Ingresar un Detalle', 'error')
      return
    }

    this.crearObs = true

    setTimeout(() => {
      var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }
      this.observacionDto.username = user

      this.consultarService.saveObservacion(this.observacionDto).subscribe(
        (data: any) => {
          Swal.fire('Felicidades', 'Observacion Guardada Con Éxito', 'success')
          this.crearObs = false
          this.detalle.observaciones.push(data)

          this.observacionDto = {
            detalle: '',
            username: '',
            idConsignacion: 0
          }

        }, (error: any) => {

          this.crearObs = false
        }
      )
    }, 2000);
  }

  //TRAER TODOS LOS ESTADOS
  getAllEstado() {
    this.estadoService.getAll().subscribe(
      (data: any) => {
        this.estadoA = data
      }, (error: any) => {

        Swal.fire('Error', 'Error al cargar los estados', 'error')
      }
    )
  }

  //FILTRAR POR SEDE, ESTADO Y/O FECHA
  filter() {
    this.con = []
    if (this.estado == 'null' && this.fecha == 'null' && this.sede == 'null') {
      Swal.fire('Error', 'Debe de Seleccionar Al Menos Un Dato', 'error')
      return
    }
    this.botonFiltrar = true
    this.spinner = true
    setTimeout(() => {
      this.filtrar(this.estado, this.fecha, this.sede, this.pages, this.sizes)
    }, 2000);

  }

  //TRAER TODAS LA SEDES
  getSede() {
    this.consultarService.getAllSede().subscribe(
      (data: any) => {
        this.sedes = data
      }, (error: any) => {

      }
    )
  }

  //FILTRAR UNA CONSIGNACION POR CEDULA DEL CLIENTE
  getConsignacionByCedula() {
    if (this.cedula == '' || this.cedula == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Una Cédula Válida',
        timer: 3000
      })
    }
    this.consultarService.getConsignacionByCedula(this.cedula).subscribe(
      (data: any) => {
        if (data.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No Hay Consignaciones Con Este Filtro',
            timer: 3000
          })
          return
        }
        this.con = data
        this.botones = new Array<boolean>(this.con.length).fill(false)
        this.paginas = new Array(data.totalPages)
        this.last = data.last
        this.first = data.first
        this.con.forEach((element: any) => {
          element.actualizaciones = element.actualizaciones.filter((a: any) => a.isCurrent == true)
        });
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Estas Fueron Las Consignaciones Encontradas',
          timer: 3000
        })
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  //CHANGE PARA DETECTAR UN CAMBIO EN LOS SELECT DEL FILTRO Y OCULTAR EL BOTON DE FILTRADO
  change(event: any) {
    if (this.fecha == '') {
      this.fecha = 'null'
    }

    if (this.estado != 'null' || this.fecha != 'null' || this.sede != 'null') {
      
      if (this.fecha != "" || this.estado != 'null' || this.sede != 'null' ) {
        
        if( this.cambioArray.length > 0 && (this.validarPermiso('COMPROBAR CONSIGNACIONES') || this.validarPermiso('APLICAR CONSIGNACIONES'))){
          
          this.filtro = false
        }else{
          
          this.filtro = true
        }

        
      }else{
        this.filtro = false
      }
    } else {
     
      this.filtro = false
    }
  }

  //METODO USADO EN EL HTML PARA LLAMAR LAS FUNCIONES DE CAMBIAR LOS BOTONES
  //SOLO DE COMPROBAR Y APLICAR
  cambiarConsignacionTemporal(id: number, position: number, estado: string, tipoReporte: string) {
    console.log(this.cambiarEstado);
    

    this.tipoReporte = tipoReporte

    var idC = this.cambioArray.find((c: any) => c.idConsignacion == id)
    console.log(idC);
    

    this.isSelected.idConsignacion = id
    this.isSelected.estado = estado

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    if (idC != null || idC != undefined) {
      
      this.cambioArray = this.cambioArray.filter((c: any) => c.idConsignacion != id)
      this.cambiarBotones(position, 'ACTIVAR', id, estado)
      if (this.cambioArray.length > 0) {
        this.cambios = true
      } else {
        this.cambios = false
      }

      this.isSelected.username = user

      this.isSelected.opcion = 'DESELECCIONAR'

      this.enviarIsSelected(this.isSelected)

    } else {
      
      this.cambiarEstado.idConsignacion = id
      this.cambiarEstado.estado = estado
      this.cambiarEstado.username = user
      this.cambioArray.push(this.cambiarEstado)

      this.isSelected.username = user
      this.isSelected.opcion = 'SELECCIONAR'
      this.enviarIsSelected(this.isSelected)

      this.cambiarEstado = {
        estado: '',
        idConsignacion: 0,
        username: '',
        observacion: ''
      }

      this.cambiarBotones(position, 'DESACTIVAR', id, estado)
      this.cambios = true
    }

    console.log(this.cambioArray);
    
  }

  enviarIsSelected(isSelected: IsSelected) {
    console.log(isSelected);

    this.consultarService.isSelected(isSelected).subscribe(
      (data: any) => {
        this.selected = data.isSelected
        console.log(this.selected);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  //METODO USADO EN EL HTML PARA LLAMAR LAS FUNCIONES DE CAMBIAR LOS BOTONES
  //SOLO DE DEVOLVER CONTABILIDAD Y DEVOLVER CAJA
  cambiarDevolver(id: number, position: number, accion: string, estado: string) {
    var btn_devolver_aplicadas
    var btn_devolver_aplicadas_x
    var btn_devolver_comprobadas
    var btn_devolver_comprobadas_x
    var btn_aplicar
    var btn_comprobar

    var btn_observaciones = document.getElementById(`btn_observaciones_${position}`)
    var btn_comprobante = document.getElementById(`btn_comprobante_${position}`)
    var btn_historial = document.getElementById(`btn_historial_${position}`)


    if (this.validarPermiso('APLICAR')) {
      btn_devolver_aplicadas = document.getElementById(`btn_devolver_aplicadas_${position}`)
      btn_devolver_aplicadas_x = document.getElementById(`btn_devolver_aplicadas_x${position}`)
      btn_aplicar = document.getElementById(`btn_aplicar_consignaciones_${position}`)
    }

    if (this.validarPermiso('COMPROBAR')) {
      btn_devolver_comprobadas = document.getElementById(`btn_devolver_comprobadas_${position}`)
      btn_devolver_comprobadas_x = document.getElementById(`btn_devolver_comprobadas_x${position}`)
      btn_comprobar = document.getElementById(`btn_comprobar_consignaciones_${position}`)
    }

    if (accion == 'DESACTIVAR') {
      if (this.filtro) {
        this.filtro = false
      }
      var boton_observaciones = `<button *ngIf="!botones[i]"
        class="btn btn-danger btn-sm ms-2" id="btn_observaciones_${position}" disabled><i
          class="fa-solid fa-ban"></i></button>`

      var boton_historial = `<button *ngIf="!botones[i]"
        class="btn btn-sm btn-danger ms-2" id="btn_historial_${position}" disabled><i
          class="fa-solid fa-ban"></i></button>`

      var boton_comprobante = `<button *ngIf="!botones[i]"
        class="btn btn-sm btn-danger ms-2" id="btn_comprobante_${position}" disabled><i
          class="fa-solid fa-ban"></i></button>`

      var boton_comprobar = `<button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado"
        class="btn btn-sm btn-danger ms-2" id="btn_comprobar_consignaciones_${position}" disabled><i class="fa-solid fa-ban"></i></button>`

      var boton_aplicar = `<button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado"
        class="btn btn-sm btn-danger ms-2" id="btn_aplicar_consignaciones_${position}" disabled><i class="fa-solid fa-ban"></i></button>`

      if (btn_observaciones != null && btn_historial != null && btn_comprobante != null) {

        btn_observaciones.outerHTML = boton_observaciones
        btn_historial.outerHTML = boton_historial
        btn_comprobante.outerHTML = boton_comprobante


        if (this.validarPermiso('APLICAR')) {
          if (btn_devolver_aplicadas != null && btn_devolver_aplicadas_x != null && btn_aplicar != null) {
            btn_devolver_aplicadas_x.style.display = 'block'
            btn_devolver_aplicadas.style.display = 'none'
            btn_aplicar.outerHTML = boton_aplicar
          }
        }

        if (this.validarPermiso('COMPROBAR')) {
          if (btn_devolver_comprobadas != null && btn_devolver_comprobadas_x != null && btn_comprobar != null) {
            btn_devolver_comprobadas_x.style.display = 'block'
            btn_devolver_comprobadas.style.display = 'none'
            btn_comprobar.outerHTML = boton_comprobar
          }
        }
      }
    }
    if (accion == 'ACTIVAR') {
      var boton_observaciones_activo = `<button *ngIf="!botones[i]"
        class="btn btn-info btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#modalVer" id="btn_observaciones_${position}"><i
        class="fa-regular fa-eye"></i></button>`

      var boton_historial_activo = `<button *ngIf="!botones[i]"
        class="btn btn-sm btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#modalInfo" id="btn_historial_${position}"><i
          class="fa-solid fa-circle-info"></i></button>`

      var boton_comprobante_activo = `<button *ngIf="!botones[i]" class="btn btn-sm btn-success ms-2" data-bs-toggle="modal" data-bs-target="#modalImage" id="btn_comprobante_${position}"><i
      class="fa-regular fa-image"></i></button>`

      var boton_comprobar_activo = `<button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado"
        class="btn btn-sm btn-warning ms-2" id="btn_comprobar_consignaciones_${position}"><i class="fa-solid fa-check"></i></button>`

      var boton_aplicar_activo = `<button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado"
        class="btn btn-sm btn-warning ms-2" id="btn_aplicar_consignaciones_${position}"><i class="fa-solid fa-check"></i></button>`


      if (btn_observaciones != null && btn_historial != null && btn_comprobante != null) {
        btn_observaciones.outerHTML = boton_observaciones_activo
        this.ponerEventoClick(id, `btn_observaciones_${position}`)
        btn_historial.outerHTML = boton_historial_activo
        this.ponerEventoClick(id, `btn_historial_${position}`)
        btn_comprobante.outerHTML = boton_comprobante_activo
        this.metodoImagen(id, `btn_comprobante_${position}`)

        if (this.validarPermiso('COMPROBAR')) {
          if (btn_devolver_comprobadas != null && btn_devolver_comprobadas_x && btn_comprobar != null) {
            btn_devolver_comprobadas_x.style.display = 'none'
            btn_devolver_comprobadas.style.display = 'block'
            btn_comprobar.outerHTML = boton_comprobar_activo
            this.metodoCambiarTemporal(`btn_comprobar_consignaciones_${position}`, id, position, 'COMPROBADO', 'COMPROBADAS')

          }
        }

        if (this.validarPermiso('APLICAR')) {
          if (btn_devolver_aplicadas != null && btn_devolver_aplicadas_x && btn_aplicar != null) {
            btn_devolver_aplicadas_x.style.display = 'none'
            btn_devolver_aplicadas.style.display = 'block'
            btn_aplicar.outerHTML = boton_aplicar_activo
            this.metodoCambiarTemporal(`btn_aplicar_consignaciones_${position}`, id, position, 'APLICADO', 'APLICADAS')
          }
        }

        var idC = this.cambioArray.find((c: any) => c.idConsignacion == id)

        if (idC != null || idC != undefined) {

          this.cambioArray = this.cambioArray.filter((c: any) => c.idConsignacion != id)
          if (this.cambioArray.length > 0) {
            this.cambios = true
          } else {
            this.cambios = false
          }

          this.isSelected.idConsignacion = id

          this.isSelected.estado = estado

          this.isSelected.username = this.cambiarEstado.username

          this.isSelected.opcion = 'DESELECCIONAR'

          this.enviarIsSelected(this.isSelected)
        }

      }
    }
  }

  //METODO QUE SE LLAMA EN "cambiarConsignacionTemporal" PARA REALIZAR
  //TODOS LOS CAMBIOS DE BOTONES Y SUS RESPECTIVAS VALIDACIONES
  //SOLO PARA COMPROBAR Y APLICAR
  cambiarBotones(position: number, accion: string, id: number, estado: string) {

    var btn_aplicar_x
    var btn_aplicar
    var btn_comprobar_x
    var btn_comprobar

    var btn_observaciones = document.getElementById(`btn_observaciones_${position}`)
    var btn_comprobante = document.getElementById(`btn_comprobante_${position}`)
    var btn_historial = document.getElementById(`btn_historial_${position}`)
    var btn_devolver_comprobadas = document.getElementById(`btn_devolver_comprobadas_${position}`)
    var btn_devolver_aplicadas = document.getElementById(`btn_devolver_aplicadas_${position}`)


    if (this.validarPermiso('APLICAR')) {
      btn_aplicar = document.getElementById(`btn_aplicar_consignaciones_${position}`)
      btn_aplicar_x = document.getElementById(`btn_aplicar_consignaciones_x${position}`)
    }

    if (this.validarPermiso('COMPROBAR')) {
      btn_comprobar = document.getElementById(`btn_comprobar_consignaciones_${position}`)
      btn_comprobar_x = document.getElementById(`btn_comprobar_consignaciones_x${position}`)
    }

    if (accion == 'DESACTIVAR') {
      if (this.filtro) {
        this.filtro = false
      }
      var boton_observaciones = `<button *ngIf="!botones[i]"
        class="btn btn-danger btn-sm ms-2" id="btn_observaciones_${position}" disabled><i
          class="fa-solid fa-ban"></i></button>`

      var boton_historial = `<button *ngIf="!botones[i]"
        class="btn btn-sm btn-danger ms-2" id="btn_historial_${position}" disabled><i
          class="fa-solid fa-ban"></i></button>`

      var boton_comprobante = `<button *ngIf="!botones[i]"
        class="btn btn-sm btn-danger ms-2" id="btn_comprobante_${position}" disabled><i
          class="fa-solid fa-ban"></i></button>`

      var boton_devolver_comprobadas = `<button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado"
        class="btn btn-sm btn-danger ms-2" id="btn_devolver_comprobadas_${position}" disabled><i class="fa-solid fa-ban"></i></button>`

      var boton_devolver_aplicadas = `<button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado"
        class="btn btn-sm btn-danger ms-2" id="btn_devolver_aplicadas_${position}" disabled><i class="fa-solid fa-ban"></i></button>`

      console.log(btn_observaciones);
      console.log(btn_historial);
      console.log(btn_comprobante);


      if (btn_observaciones != null && btn_historial != null && btn_comprobante != null) {
        btn_observaciones.outerHTML = boton_observaciones
        btn_historial.outerHTML = boton_historial
        btn_comprobante.outerHTML = boton_comprobante



        if (this.validarPermiso('APLICAR')) {
          if (btn_aplicar != null && btn_aplicar_x != null && btn_devolver_aplicadas != null) {
            btn_aplicar_x.style.display = 'block'
            btn_aplicar.style.display = 'none'
            btn_devolver_aplicadas.outerHTML = boton_devolver_aplicadas

          }
        }

        if (this.validarPermiso('COMPROBAR')) {
          if (btn_comprobar != null && btn_comprobar_x != null && btn_devolver_comprobadas != null) {
            btn_comprobar.style.display = 'none'
            btn_comprobar_x.style.display = 'block'
            btn_devolver_comprobadas.outerHTML = boton_devolver_comprobadas


          }
        }


      }
    }
    if (accion == 'ACTIVAR') {


      var boton_observaciones_activo = `<button *ngIf="!botones[i]"
        class="btn btn-info btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#modalVer" id="btn_observaciones_${position}"><i
        class="fa-regular fa-eye"></i></button>`

      var boton_historial_activo = `<button *ngIf="!botones[i]"
        class="btn btn-sm btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#modalInfo" id="btn_historial_${position}"><i
          class="fa-solid fa-circle-info"></i></button>`

      var boton_comprobante_activo = `<button *ngIf="!botones[i]"
        class="btn btn-sm btn-success ms-2" data-bs-toggle="modal" data-bs-target="#modalImage" id="btn_comprobante_${position}"><i
          class="fa-regular fa-image"></i></button>`

      var boton_devolver_comprobadas_activo = `<button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado"
        class="btn btn-sm btn-warning ms-2" data-bs-toggle="modal" data-bs-target="#modalObservacion" id="btn_devolver_comprobadas_${position}"><i class="fa-solid fa-backward"></i></button>`

      var boton_devolver_aplicadas_activo = ` <button *ngIf="!botones[i] && estadoConsignacion == c.actualizaciones[0].estado.estado" (click)="devolver(${id}, ${position}, 'DEVUELTA CAJA')"
        class="btn btn-sm btn-warning ms-2" data-bs-toggle="modal" data-bs-target="#modalObservacion" id="btn_devolver_aplicadas_${position}"><i class="fa-solid fa-backward"></i></button>`

      if (btn_observaciones != null && btn_historial != null && btn_comprobante != null) {
        btn_observaciones.outerHTML = boton_observaciones_activo
        this.ponerEventoClick(id, `btn_observaciones_${position}`)
        btn_historial.outerHTML = boton_historial_activo
        this.ponerEventoClick(id, `btn_historial_${position}`)
        btn_comprobante.outerHTML = boton_comprobante_activo
        this.metodoImagen(id, `btn_comprobante_${position}`)


        if (this.validarPermiso('COMPROBAR')) {
          if (btn_comprobar != null && btn_comprobar_x != null && btn_devolver_comprobadas) {
            btn_comprobar.style.display = 'block'
            btn_comprobar_x.style.display = 'none'
            btn_devolver_comprobadas.outerHTML = boton_devolver_comprobadas_activo
            this.metodoCambiarDevolver(`btn_devolver_comprobadas_${position}`, id, position, 'DEVUELTA CONTABILIDAD', 'COMPROBADAS')
          }

        }

        if (this.validarPermiso('APLICAR')) {
          if (btn_aplicar != null && btn_aplicar_x != null && btn_devolver_aplicadas != null) {
            btn_aplicar.style.display = 'block'
            btn_aplicar_x.style.display = 'none'
            btn_devolver_aplicadas.outerHTML = boton_devolver_aplicadas_activo
            this.metodoCambiarDevolver(`btn_devolver_aplicadas_${position}`, id, position, 'DEVUELTA CAJA', 'APLICADAS')
          }
        }

      }
    }
  }

  //METODO QUE SE LLAMA EN "cambiarDevolver" PARA REALIZAR
  //TODOS LOS CAMBIOS DE BOTONES Y SUS RESPECTIVAS VALIDACIONES
  //SOLO PARA DEVOLVER CONTABILIDAD Y DEVOLVER CAJA
  devolver(id: number, position: number, estado: string, tipoReporte: string) {
    this.tipoReporte = tipoReporte

    this.cambiarEstado.idConsignacion = id
    this.cambiarEstado.estado = estado

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.cambiarEstado.username = user

    this.posicionDevolver = position

    console.log(this.cambioArray);


  }

  //SE LLAMA EN LOS BOTONES PARA AÑADIR EL CLICK DE TRAER POR ID
  ponerEventoClick(idConsignacion: number, idElemento: string) {
    var x = document.getElementById(idElemento)
    x?.addEventListener('click', () => this.getConsignacionById(idConsignacion));
  }

  //SE LLAMA EN LOS BOTONES PARA AÑADIR EL CLICK PARA VOLVER DE NUEVO AL BOTON ORIGINAL
  metodoCambiarTemporal(idElemento: string, idConsignacion: number, position: number, estado: string, tipoReporte: string) {
    var x = document.getElementById(idElemento)
    x?.addEventListener('click', () => this.cambiarConsignacionTemporal(idConsignacion, position, estado, tipoReporte));
  }

  //SE LLAMA EN LOS BOTONES PARA AÑADIR EL CLICK PARA VOLVER DE NUEVO AL BOTON ORIGINAL
  metodoCambiarDevolver(idElemento: string, idConsignacion: number, position: number, estado: string, tipoReporte: string) {
    var x = document.getElementById(idElemento)
    x?.addEventListener('click', () => this.devolver(idConsignacion, position, estado, tipoReporte));
  }

  //SE LLAMA EN LOS BOTONES PARA AÑADIR EL CLICK DE MOSTRAR EL COMPROBANTE
  metodoImagen(idConsignacion: number, idElemento: string) {
    var comprobante = this.con.find((c: any) => c.idConsignacion == idConsignacion)
    if (comprobante != null || comprobante != undefined) {
      this.base64 = comprobante.comprobantes.dataURI + ',' + comprobante.comprobantes.rutaArchivo
    }
  }

  //METODO QUE SE UTILIZA EN ALGUNOS IF PARA EJECUTAR UNA ACCION SEGUN UN PERMISO ESPECIFICO
  validarPermiso(permisos: string): boolean {
    var roles = this.authService.getRolesP()

    var permiso: any = {}
    permiso = roles.permisos.find((pe: any) => pe.permiso.includes(permisos))
    return permiso != null || permiso != undefined

  }

  //METODO PARA AGREGAR UNA DEVOLUCION (CONTABILIDAD O CAJA)
  //AL ARRAY RESPECTIVO PARA GUARDARLOS SI ES NECESARIO
  agregarDevolucion() {
    if (this.cambiarEstado.observacion.trim() == '' || this.cambiarEstado.observacion.trim() == null) {
      Swal.fire('Error', 'Digite Una Observación', 'error')
      return
    }

    if(this.validarPermiso('COMPROBAR CONSIGNACIONES')){
      if (this.cambiarEstado.estado.trim() == '' || this.cambiarEstado.estado.trim() == null) {
        Swal.fire('Error', 'Elija Un Estado Para La Devolución', 'error')
        return
      }
    }

    var idC = this.cambioArray.find((c: any) => c.idConsignacion == this.cambiarEstado.idConsignacion)

    console.log(idC);

    this.isSelected.idConsignacion = this.cambiarEstado.idConsignacion
    this.isSelected.estado = this.cambiarEstado.estado

    if (idC != null || idC != undefined) {
      this.cambioArray = this.cambioArray.filter((c: any) => c.idConsignacion != this.cambiarEstado.idConsignacion)
      this.cambiarDevolver(this.cambiarEstado.idConsignacion, this.posicionDevolver, 'ACTIVAR', this.cambiarEstado.estado)
      if (this.cambioArray.length > 0) {
        this.cambios = true
      } else {
        this.cambios = false
      }

    } else {

      this.cambiarDevolver(this.cambiarEstado.idConsignacion, this.posicionDevolver, 'DESACTIVAR', this.cambiarEstado.estado)
      this.cambiarEstado.idConsignacion = this.cambiarEstado.idConsignacion
      this.cambiarEstado.estado = this.cambiarEstado.estado
      this.cambiarEstado.observacion = this.cambiarEstado.observacion.trim()

      var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }
      this.cambiarEstado.username = user

      this.cambioArray.push(this.cambiarEstado)

      this.isSelected.username = this.cambiarEstado.username
      this.isSelected.opcion = 'SELECCIONAR'
      this.cambiarEstado = {
        estado: '',
        idConsignacion: 0,
        username: '',
        observacion: ''
      }
      this.enviarIsSelected(this.isSelected)

      console.log(this.cambioArray);

      this.cambios = true

      $('#modalObservacion').modal('hide');
    }

  }

  //METODO PARA CAMBIAR EL ESTADO DE LA CONSIGNACION
  cambiarConsignacion() {
    this.botonCambiarConsignacion = true

    setTimeout(() => {
      this.consultarService.cambiarEstadoConsignacion(this.cambioArray, this.tipoReporte).subscribe(
        (data: any) => {
          Swal.fire('Felicidades', 'Cambio Realizado Con Éxito', 'success')
          this.botonCambiarConsignacion = false
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }, (error: any) => {
          Swal.fire('Error', 'Error al Realizar El Cambio', 'error')
          this.botonCambiarConsignacion = false

        }
      )
    }, 2000);

  }

  //METODO PARA CANCELAR TODOS LOS CAMBIOS
  cancelar() {
    this.cambioArray.forEach((e: any) => {
      var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }

      this.isSelected = {
        idConsignacion: e.idConsignacion,
        username: user,
        opcion: 'DESELECCIONAR',
        estado: e.estado
      }


      this.consultarService.isSelected(this.isSelected).subscribe(
        (data: any) => {

        }, (error: any) => {
          console.log(error);
        }
      )
    });

    this.cambioArray = []

    Swal.fire('Felicidades', 'Cambios Cancelados Con Éxito', 'success')

    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  cancelarObservacion() {
    this.cambiarEstado = {
      estado: '',
      idConsignacion: 0,
      username: '',
      observacion: ''
    }

    this.posicionDevolver = 0
  }

  //GENERAR REPORTE PENDIENTES
  generarReportePendientes() {
    this.botonGenerarPendientes = true
    setTimeout(() => {
      var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }
      this.consultarService.reportesPendientes(user).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Reporte Generado Con Éxito',
            timer: 3000
          })
          this.botonGenerarPendientes = false
        }, (error: any) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Al Generar El Reporte',
            timer: 3000
          })
          this.botonGenerarPendientes = false
        }
      )
    }, 2000);

  }

  getAllAsesores() {
    this.obligacionService.getAllAsesores().subscribe(
      (data: any) => {
        this.asesores = data
        console.log(this.asesores);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  filtrar(estado: string, fecha: any, sede: string, pages: number, sizes: number) {
    this.consultarService.filter(estado, fecha, sede, pages, sizes).subscribe(
      (data: any) => {
        this.filtrando = true

        if (data.content.length == 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se Encontraron Consignaciones Con Estos Filtros',
            timer: 3000
          })
          this.spinner = false
          this.botonFiltrar = false
          this.estado = 'null'
          this.fecha = 'null'
          this.sede = 'null'
          this.filtro = false

          this.getRoles()

        } else {
          this.con = data.content
          this.botones = new Array<boolean>(this.con.length).fill(false)
          this.botonFiltrar = false
          this.paginas = new Array(data.totalPages)
          this.last = data.last
          this.first = data.first
          this.spinner = false
          this.con.forEach((c: any) => {
            c.actualizaciones = c.actualizaciones.filter((a: any) => a.isCurrent == true)
          })
          console.log(data);
          this.consultarService.proSubject.next(true);
        }
      }, (error: any) => {
        this.botonFiltrar = false
        this.spinner = false
      }
    )
  }

  showModal() {
    $('#modalEditar').modal('hide');
    $('#modalObs').modal('show');
  }

  cancelarCliente() {
    this.cliente = {
      nombres: '',
      apellidos: '',
      tipoDocumento: '',
      numeroDocumento: '',
      username: '',
      numeroObligacion: '',
      sede: '',
      asesor: 0
    }
  }

  guardarCliente() {
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.cliente.username = user

    if (this.cliente.nombres.trim() == '' || this.cliente.nombres.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Los Nombres Del Cliente',
        timer: 3000
      })
      return
    }

    if (this.cliente.apellidos.trim() == '' || this.cliente.apellidos.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Los apellidos Del Cliente',
        timer: 3000
      })
      return
    }

    if (this.cliente.tipoDocumento.trim() == '' || this.cliente.tipoDocumento.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Tipo De Documento Del Cliente',
        timer: 3000
      })
      return
    }

    if (this.cliente.numeroDocumento.trim() == '' || this.cliente.numeroDocumento.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Número De Documento Del Cliente',
        timer: 3000
      })
      return
    }

    if (this.cliente.numeroObligacion.trim() == '' || this.cliente.numeroObligacion.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Número De Obligación Del Cliente',
        timer: 3000
      })
      return
    }

    if (this.cliente.sede.trim() == '' || this.cliente.sede.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija La Sede Del Cliente',
        timer: 3000
      })
      return
    }

    if (this.cliente.asesor == 0 || this.cliente.asesor == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija El Asesor Del Cliente',
        timer: 3000
      })
      return
    }

    this.crearCliente = true

    console.log(this.cliente);


    this.ingresarService.saveCliente(this.cliente).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Cliente Creado Exitosamente',
          timer: 3000
        })
        $('#modalCliente').modal('hide');
        this.crearCliente = false

        this.cedulaEditar = this.cliente.numeroDocumento

        this.ingresarService.getObligacionByCedula(this.cedulaEditar).subscribe(
          (data: any) => {
            this.cuentasPorCobrar.cuentasCobrar = data
            if (this.cuentasPorCobrar.cuentasCobrar.length > 0) {
              this.check = true
              this.buscarObli = false
              return
            }
          }, (error: any) => {
            console.log(error);
          }
        )
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Erro Al Crear El Cliente',
          timer: 3000
        })
        this.crearCliente = false
        this.cliente = {
          nombres: '',
          apellidos: '',
          tipoDocumento: '',
          numeroDocumento: '',
          username: '',
          numeroObligacion: '',
          sede: '',
          asesor: 0
        }
        console.log(error);

      }
    )

  }

  validarRol() {
    var roles = this.authService.getRoles()
    if(roles != null){
      var rol = roles.find((r:any) => r.rol == ROLES.SuperAdministration || r.rol == ROLES.Administration)
      if(rol != null){
        return rol
      }
      return null
    }

  }

}
