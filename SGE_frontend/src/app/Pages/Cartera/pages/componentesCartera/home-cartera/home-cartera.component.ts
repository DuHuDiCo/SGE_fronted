import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import { CuentasCobrarResponse } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';
import { Gestion, GestionArray } from 'src/app/Types/Cartera/Gestion/Gestion';
import Swal from 'sweetalert2';

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
    fechaCompromiso: null,
    clasificacion: null,
    gestion: '',
    valorCompromiso: 0,
    asesorCartera: '',
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

  numeroPages: number = 0
  last: boolean = false
  first: boolean = false
  initialCon: number = 1;
  cont: number = 1
  isCon: boolean = false
  paginas!: Array<number>

  ngOnInit(): void {
    this.getCuentasCobrar()
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
          this.getClasificacion()

          if(this.cuentaCobrarSelected.documentoCliente != ''){
            this.spinnerSidebar = false
          }
          console.log(this.cuentaCobrarSelected);
        }, (error:any) => {
          console.log(error);
        }
      )
    }, 2000);
    
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

      if(this.newGestion.clasificacion?.trim() == '' || this.newGestion.clasificacion?.trim() == null){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Seleccione Una Clasificación',
          timer: 3000
        })
        return
      }

    if(this.newGestion.clasificacion?.trim() == 'Acuerdo de Pago' || this.newGestion.clasificacion?.trim() == 'Abonando/Fecha'){
      if(this.newGestion.fechaCompromiso instanceof Date || this.newGestion.fechaCompromiso == null){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Seleccione Una Fecha',
          timer: 3000
        })
        return
      }

      if(this.newGestion.valorCompromiso == 0 || this.newGestion.valorCompromiso == null){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Digite Un Valor de Compromiso',
          timer: 3000
        })
        return
      }
    }   
    
    console.log(this.newGestion);
    

    // setTimeout(() => {
    //   this.cuentasCobrar.saveGestion(this.newGestion).subscribe(
    //     (data:any) => {
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Felicidades',
    //         text: 'Gestión Guardada Exitosamente',
    //         timer: 3000
    //       })
    //     }, (error:any) => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Error Al Guardar La Gestión',
    //         timer: 3000
    //       })
    //     }
    //   )
    // }, 3000);
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

}
