import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { CuentasCobrarResponse } from 'src/app/Types/Cartera/CuentasPorCobrarResponse';

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

  // OBJETO SIDEBAR
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

  // PARAMETROS PARA EL SERVICE
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
        this.cuentasCobrarArray = data.content

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
        this.proSubscriptionBack = this.cuentasCobrar.proSubject.subscribe(
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
    setTimeout(() => {
      this.cuentasCobrar.getCuentaByObligacion(numeroObligacion).subscribe(
        (data:any) => {
          this.cuentaCobrarSelected = data
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
}
