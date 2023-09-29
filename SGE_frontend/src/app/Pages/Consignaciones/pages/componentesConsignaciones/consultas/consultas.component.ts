import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PERMISOSCONSIGNACION } from 'src/app/Models/AllPermisos';
import { BancoServiceService } from 'src/app/Services/Consignaciones/Bancos/banco-service.service';
import { ConsultarService } from 'src/app/Services/Consignaciones/Consultar/consultar.service';
import { EstadoServiceService } from 'src/app/Services/Consignaciones/Estado/estado-service.service';
import { IngresarService } from 'src/app/Services/Consignaciones/IngresarConsignaciones/ingresar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Plataforma } from 'src/app/Types/Banco';
import { CambioEstado, Con, Consignacion, Obligacion, ObservacionDto } from 'src/app/Types/Consignaciones';
import { Estado } from 'src/app/Types/Estado';
import { Sede } from 'src/app/Types/Sede';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})

export class ConsultasComponent implements OnInit {

  // ARRAYS
  roles: string[] = []
  plataforma: any[] = []
  con: Con[] = []
  sedes: Sede[] = []
  estadoA: Estado[] = []
  paginas!: Array<number>
  botones!: Array<boolean>
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
    "INFORMES"
  ]

  //OBJETOS
  modal: Consignacion = {
    idConsignacion: 0,
    numeroRecibo: '',
    valor: 0,
    fechaPago: new Date,
    idPlataforma: 0,
    observaciones: '',
    obligaciones: [],
    base64: '',
    username: ''
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

  cambioArray: CambioEstado[] = []

  //VARIABLES
  cedula: string = ''
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

  estado: string = 'null'
  fecha: any = 'null'
  sede: string = 'null'

  estadoConsignacion: string = ''

  posicionDevolver: number = 0
  clickeado: string = ''


  private proSubscription!: Subscription;

  constructor(private authService: AuthenticationService, private consultarService: ConsultarService, private bancoService: BancoServiceService, private ingresarService: IngresarService, private estadoService: EstadoServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getRoles()
    this.getPlataforma()
    this.getAllEstado()
    this.getSede()
  }

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
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }, (error: any) => {
          Swal.fire('Error', 'Error al Actualizar La Consignación', 'error')
          this.editarCon = false
          console.log(error);
        }
      )
    }, 2000);
  }

  getRoles() {
    var roles = this.authService.getRolesP()
    console.log(this.roles);
    var permiso: any = {}
    permiso = roles.permisos.find((pe: any) => pe.permiso.startsWith('CONSULTAR'))
    console.log(permiso);
    var arrayP = permiso.permiso.split(" ")
    var p = arrayP[1].substring(0, arrayP[1].length - 1)
    this.estadoConsignacion = p
    console.log(p);

    this.getConsignaciones(p)
  }

  getConsignaciones(p: string) {
    this.consultarService.getAllConsignaciones(p, this.page, this.size).subscribe(
      (data: any) => {
        this.spinner = false
        this.con = data.content
        this.paginas = new Array(data.totalPages)
        this.last = data.last
        this.first = data.first
        this.consultarService.proSubject.next(true);

        this.botones = new Array<boolean>(this.con.length).fill(false)
        console.log(this.botones);
        console.log(data);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  img(dataURI: string) {
    this.base64 = dataURI
  }

  getConsignacionById(id: number) {
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
        console.log(this.cambiarEstado);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getPlataforma() {
    this.bancoService.getBancos().subscribe(
      (data: any) => {
        this.plataforma = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  cambiarPago(event: any) {
    var valor = event.target.value
    this.modal.idPlataforma = valor
  }

  getObligacionByCedula() {

    const cedula = this.cedula.trim()
    if (this.cedula.trim() == '' || isNaN(parseInt(cedula))) {
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    }

    this.buscarObli = true

    setTimeout(() => {
      this.ingresarService.getObligacionByCedula(this.cedula).subscribe(
        (data: any) => {
          this.cuentasPorCobrar.cuentasCobrar = data

          if (this.cuentasPorCobrar.cuentasCobrar.length > 0) {
            this.check = true
            this.buscarObli = false
            return
          }

          if (this.cuentasPorCobrar.cuentasCobrar.length <= 0) {
            Swal.fire('Error', 'Digite Una Cédula Válida', 'error')
            this.buscarObli = false
            this.cedula = ''
            return
          }

        }, (error: any) => {
          Swal.fire('Error', 'Error Al Traer Las Obligaciones', 'error')
          this.check = false
          this.buscarObli = false
          this.cedula = ''
          console.log(error);
        }
      )
    }, 2000);


  }

  checkBox(obligacion: string) {
    this.modal.obligaciones = []
    if (this.modal.obligaciones.includes(obligacion)) {
      var position = this.modal.obligaciones.indexOf(obligacion)
      this.modal.obligaciones.splice(position, 1)
    } else {
      this.modal.obligaciones.push(obligacion)
    }

  }

  public obtenerFile(event: any) {
    var archivo = event.target.files[0];
    this.extraerBase64(archivo).then((file: any) => {
      this.modal.base64 = file.base;
      console.log(this.modal);
    })
  }

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

  next() {
    if (!this.last) {
      this.page++
      this.getRoles()
      this.proSubscription = this.consultarService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.size);
        }
      );
      setTimeout(() => {
        this.proSubscription.unsubscribe()
      }, 1000);
    }
  }

  back() {
    if (!this.first) {
      this.page--
      this.getRoles()
      this.proSubscription = this.consultarService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.size);
        }
      );
      setTimeout(() => {
        this.proSubscription.unsubscribe()
      }, 1000);
    }
  }

  goToPage(page: number) {
    this.page = page
    this.getRoles()
  }

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
          console.log(data);

        }, (error: any) => {
          console.log(error);
          this.crearObs = false
        }
      )
    }, 2000);
  }

  getAllEstado() {
    this.estadoService.getAll().subscribe(
      (data: any) => {
        this.estadoA = data
      }, (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los estados', 'error')
      }
    )
  }

  filter() {
    this.con = []
    if (this.estado == 'null' && this.fecha == 'null' && this.sede == 'null') {
      Swal.fire('Error', 'Debe de Seleccionar Al Menos Un Dato', 'error')
      return
    }
    this.consultarService.filter(this.estado, this.fecha, this.sede, this.pages, this.sizes).subscribe(
      (data: any) => {
        this.con = data.content
        console.log(data.content);
        this.con.forEach((c: any) => {
          c.actualizaciones = c.actualizaciones.filter((a: any) => a.isCurrent == true)
        })
        console.log(this.con);

        if (this.con.length <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay Datos Con Este Filtro',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.estado = 'null'
              this.sede = 'null'
              this.fecha = 'null'
              this.filtro = false
              this.getRoles()
            }
          })

          return
        }

      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getSede() {
    this.consultarService.getAllSede().subscribe(
      (data: any) => {
        this.sedes = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  getConsignacionByCedula() {
    this.con = []
    this.consultarService.getConsignacionByCedula(this.cedula).subscribe(
      (data: any) => {
        this.con = data
        console.log(data);

      }, (error: any) => {
        console.log(error);
      }
    )
  }

  change(event: any) {
    if (this.fecha == '') {
      this.fecha = 'null'
    }

    if (this.estado != 'null' || this.fecha != 'null' || this.sede != 'null') {
      if (this.fecha != "" || this.estado != 'null' || this.sede != 'null') {
        this.filtro = true
      } else {
        this.filtro = false
      }
    } else {
      this.filtro = false
    }
  }

  cambiarConsignacionTemporal(id: number, position: number, estado: string) {

    var idC = this.cambioArray.find((c: any) => c.idConsignacion == id)

    if (idC != null || idC != undefined) {

      this.cambioArray = this.cambioArray.filter((c: any) => c.idConsignacion != id)
      this.cambiarBotones(position, 'fa-xmark', 'fa-check', 'ACTIVAR')
      console.log(this.cambioArray);
    } else {
      this.cambiarBotones(position, 'fa-check', 'fa-xmark', 'DESACTIVAR')
      this.cambiarEstado.idConsignacion = id

      this.cambiarEstado.estado = estado

      var user = this.authService.getUsername()

      if (user == null || user == undefined) {
        return
      }
      this.cambiarEstado.username = user

      this.cambioArray.push(this.cambiarEstado)
      this.cambiarEstado = {
        estado: '',
        idConsignacion: 0,
        username: '',
        observacion: ''
      }
    }

    console.log(this.cambioArray);

    // if (this.botones[position]) {
    //   this.botones[position] = false
    // } else {
    //   this.botones[position] = true
    // }
  }

  cambiarBotones(position: number, claseEliminar: string, claseAgregar: string, accion:string) {
    var btn_observaciones = document.getElementById(`btn_observaciones_${position}`)
    var btn_comprobante = document.getElementById(`btn_comprobante_${position}`)
    var btn_historial = document.getElementById(`btn_historial_${position}`)
    var btn_comprobar = document.getElementById(`btn_comprobar_consignaciones_${position}`)
    var btn_aplicar = document.getElementById(`btn_aplicar_consignaciones_${position}`)
    var btn_devolver_comprobadas = document.getElementById(`btn_devolver_comprobadas_${position}`)
    var btn_devolver_aplicadas = document.getElementById(`btn_devolver_aplicadas_${position}`)

      if(accion == 'DESACTIVAR'){
        var boton_observaciones = `<button *ngIf="!botones[i]"
        class="btn btn-danger btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#modalVer" id="btn_observaciones_{{ i }}" disabled><i
          class="fa-solid fa-ban"></i></button>`

        var boton_comprobar = `<button *ngIf="!botones[i]" (click)="cambiarConsignacionTemporal(c.idConsignacion, i, 'COMPROBADO')"
        class="btn btn-danger btn-sm ms-2" id="btn_comprobar_consignaciones_{{ i }}"><i
          class="fa-solid fa-xmark"></i></button>`

          if(btn_observaciones != null && btn_comprobar != null){
            btn_observaciones.outerHTML = boton_observaciones
            btn_comprobar.outerHTML = boton_comprobar
          }
      }
      if(accion == 'ACTIVAR'){
        btn_observaciones?.setAttribute('disabled', 'true')
        btn_comprobante?.setAttribute('disabled', 'true')
        btn_historial?.setAttribute('disabled', 'true')
        btn_devolver_comprobadas?.setAttribute('disabled', 'true')
        btn_devolver_aplicadas?.setAttribute('disabled', 'true')
      }
    }

    

  devolver(id: number, position: number, estado: string) {

    this.cambiarEstado.idConsignacion = id

    this.cambiarEstado.estado = estado

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.cambiarEstado.username = user

    this.posicionDevolver = position

    console.log(this.cambioArray)
  }

  agregarDevolucion() {
    if (this.cambiarEstado.observacion.trim() == '' || this.cambiarEstado.observacion.trim() == null) {
      Swal.fire('Error', 'Digite Una Observación', 'error')
      return
    }

    if (this.botones[this.posicionDevolver]) {
      this.botones[this.posicionDevolver] = false
    } else {
      this.botones[this.posicionDevolver] = true
    }

    this.cambioArray.push(this.cambiarEstado)
    console.log(this.cambioArray);

    this.cambiarEstado = {
      estado: '',
      idConsignacion: 0,
      username: '',
      observacion: ''
    }
  }

  cambiarConsignacion() {
    this.consultarService.cambiarEstadoConsignacion(this.cambiarEstado).subscribe(
      (data: any) => {
        Swal.fire('Felicidades', 'Cambio Realizado Con Éxito', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }, (error: any) => {
        Swal.fire('Error', 'Error al Realizar El Cambio', 'error')
        console.log(error);
      }
    )

  }

  cancelar() {
    this.cambiarEstado = {
      estado: '',
      idConsignacion: 0,
      username: '',
      observacion: ''
    }

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


}
