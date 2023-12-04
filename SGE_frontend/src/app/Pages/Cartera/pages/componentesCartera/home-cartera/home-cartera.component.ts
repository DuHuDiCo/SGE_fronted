import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { CuentasCobrarResponse } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
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

  constructor(private cuentasCobrar:CuentasCobrarService, private authService:AuthenticationService) { }

  // ARRAY CUENTAS POR COBRAR
  cuentasCobrarArray:CuentasCobrarResponse[] = []

  // ARRAYS
  codeudores:any[] = []
  codeudoresSelected:any[] = []
  gestiones:GestionArray[] = []
  ClasificacionArray:clasificacion[] = []
  Columnas:string[] = []

  constantes:string[] = [
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

  // OBJETOS
  cuentaCobrarSelected:CuentasCobrarResponse = {
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
    clientes: []
  }

  newGestion:Gestion = {
    numeroObligacion: '',
    clasificacion: {
      tipoClasificacion: null,
      tarea: {
        detalleTarea: '',
        fechaFinTarea: new Date,
        clasificacion: null
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
    detallesAdicionales: ''
  }

  // PARAMETROS PARA EL SERVICE
  //TODO:CAMBIAR A 0 CUANDO CORRIJAN EL ARCHIVO
  page:number = 1;
  size:number = 10
  fechaCreacion: string = 'fecha_creacion'

  // SPINNER DE LA TABLA
  spinner:boolean = true
  spinnerSidebar:boolean = true
  gestionButton:boolean = false
  modalGestiones:boolean = false
  isSticky = false;

  numeroPages: number = 0
  last: boolean = false
  first: boolean = false
  initialCon: number = 1;
  cont: number = 1
  isCon: boolean = false
  paginas!: Array<number>

  fechaActual:Date = new Date();
  

  ngOnInit(): void {
    this.getCuentasCobrar()
    this.getClasificacion()
    this.fechaActual = new Date()
  }

  // TRAER CUENTAS POR COBRAR
  getCuentasCobrar() {

    // var user = this.authService.getUsername()

    //   if (user == null || user == undefined) {
    //     return
    //   }

    this.cuentasCobrar.getCuentasCobrar('Diana1975', this.page, this.size, this.fechaCreacion).subscribe(
      (data:any) => {
        this.paginas = new Array(data.totalPages)
        this.cuentasCobrarArray = data.content
        this.last = data.last
        this.first = data.first
        this.numeroPages = data.totalPages
        this.cuentasCobrar.proSubject.next(true);
        console.log(data);
        if(this.cuentasCobrarArray.length == 0){
          this.spinner = true
        } else {
          this.spinner = false
        }

        console.log(this.cuentasCobrarArray);
      }, (error:any) => {
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

  findCuentaCobrar(numeroObligacion:string){
    if(this.newGestion.numeroObligacion == numeroObligacion){
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
          (data:any) => {
            this.cuentaCobrarSelected = data
            this.codeudores = data.clientes
            this.codeudores = this.codeudores.filter((c:any) => c.tipoGarante.tipoGarante != 'TITULAR')
            this.getGestiones(numeroObligacion);
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
            console.log(this.newGestion);
            
            if(this.cuentaCobrarSelected.documentoCliente != ''){
              this.spinnerSidebar = false
            }
          }, (error:any) => {
            console.log(error);
          }
        )
      }, 2000);
    }
    
  }

  findCodeudores(event:any){
    this.codeudoresSelected = this.codeudores.filter((c:any) => c.numeroDocumento == event.target.value)
    console.log(this.codeudoresSelected);
  }

  // GESTIONES
  getGestiones(numeroObligacion:string){
    this.cuentasCobrar.getGestiones(numeroObligacion).subscribe(
      (data:any) => {
        this.gestiones = data
        this.newGestion.numeroObligacion = numeroObligacion
        this.getLastDato(numeroObligacion)
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getLastDato(numeroDocumento:string){
    this.cuentasCobrar.getLastDatoAdicional(numeroDocumento).subscribe(
      (data:any) => {
        this.newGestion.detallesAdicionales = data.detallesAdicionelesToSend
        console.log(this.newGestion.detallesAdicionales);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  saveGestion(){

    if(this.newGestion.gestion.trim() == '' || this.newGestion.gestion.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite La Descripción',
        timer: 3000
      })
      return
    }

    if(this.newGestion.clasificacion.tipoClasificacion?.trim() == '' || this.newGestion.clasificacion.tipoClasificacion?.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Una Clasificación',
        timer: 3000
      })
      return
    } else {
      if(this.newGestion.clasificacion.tipoClasificacion.trim() == 'Tarea'){
        if(this.newGestion.clasificacion.tarea.fechaFinTarea instanceof Date || this.newGestion.clasificacion.tarea.fechaFinTarea == null){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Elija Una Fecha Final Para Su Tarea',
            timer: 3000
          })
          return
        }
          if(this.newGestion.clasificacion.tarea.clasificacion?.trim() == '' || this.newGestion.clasificacion.tarea.clasificacion?.trim() == null){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Elija Una Clasificación Para su Tarea',
            timer: 3000
          })
          return
        }
        if(this.newGestion.clasificacion.tarea.detalleTarea?.trim() == '' || this.newGestion.clasificacion.tarea.detalleTarea?.trim() == null){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Digite el Detalle de su Tarea',
            timer: 3000
          })
          return
        } 
      }
      
      if(this.newGestion.clasificacion.tipoClasificacion.trim() == 'Nota'){
        if(this.newGestion.clasificacion.nota.detalle.trim() == '' || this.newGestion.clasificacion.nota.detalle.trim() == null){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Digite Un Detalle Para su Nota',
            timer: 3000
          })
          return
        }
      }

    }
  
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
    //           console.log(this.newGestion);
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
    //               tarea: {
    //                 detalleTarea: '',
    //                 fechaFinTarea: new Date,
    //                 clasificacion: ''
    //               },
    //               nota: {
    //                 detalle: ''
    //               },
    //               acuerdoPago: {
    //                 detalle: '',
    //                 valorCuotaMensual: 0,
    //                 tipoAcuerdo: '',
    //                 valorTotalAcuerdo: 0,
    //                 valorInteresesMora: 0,
    //                 honoriarioAcuerdo: 0,
    //                 fechaCompromiso: new Date,
    //                 cuotasList: [],
    //                 username: ''
    //               }
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

  // CLASIFICACION
  getClasificacion(){
    this.cuentasCobrar.getClasificacion().subscribe(
      (data:any) => {
        this.ClasificacionArray = data
        console.log(this.ClasificacionArray);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  cancelarGestion(){

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

  abrirGestiones(){
    this.modalGestiones = true
  }

  cerrarGestiones(){
    this.modalGestiones = false
  }

  ocultarColumnas(columna:string){
    if(this.Columnas.includes(columna)){
      var position = this.Columnas.indexOf(columna)
      this.Columnas.splice(position, 1)
    } else {
      this.Columnas.push(columna)
    }
  }

  maxFecha(): string{
    var fechaMax = new Date();

    fechaMax.setDate(this.fechaActual.getDate() + 30)
    var fechaForm = fechaMax.toISOString().split('T')[0]

    return fechaForm;
  }

  minFecha(): string{
    var fechaMin = new Date();
    var fechaForm = fechaMin.toISOString().split('T')[0]
    return fechaForm;
  }

  seleccionarSize(numero:number){
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
}
