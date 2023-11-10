import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { BuscarClientesService } from 'src/app/Services/clientes/BuscarClientes/buscar-clientes.service';
import { Ciudad } from 'src/app/Types/Ciudades';
import { Cliente } from 'src/app/Types/Cliente';
import { DatosContacto, Direccion } from 'src/app/Types/DatosCliente';
import { Departamento } from 'src/app/Types/Departamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css']
})
export class BuscarClientesComponent implements OnInit {

  @ViewChild('mySelect')
  mySelect!: ElementRef<HTMLSelectElement>;
  private proSubscription!: Subscription;
  pageTelefono: number = 1;
  pageDireccion: number = 1;
  pageCorreo: number = 1;

  cont: number = 1
  last: boolean = false
  first: boolean = false

  cliente: Cliente[] = []

  datosPersonales:any = {
    fechaNacimiento: '',
    lugarNacimiento: '',
    fechaExpedicionDocumento: '',
    lugarExpedicionDocumento: ''
  }

  isCon: boolean = false
  initialCon: number = 1;
  pages: number = 0
  sizes: number = 200
  numeroPages: number = 0
  page: number = 0
  size: number = 10
  order: string = 'idReporte'
  paginas!: Array<number>

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  cedula: string = ''

  telefono: boolean = false
  direccion: boolean = false
  correo: boolean = false

  datos:DatosContacto = {
    cedulaCliente: this.cedula,
    telefonos: [],
    direcciones: [],
    correos: []
  }

  telefonos:any[] = []
  direcciones:any[] = []
  correos:any[] = []

  idDep:number = 0

  ciudades:Ciudad[] = []

  department:Departamento[] = []

  newTelefono:string = ''
  newDireccion:Direccion = {
    "direccion": "",
    "ciudad": "",
    "departamento": "",
    "pais": ""
  }
  newCorreo:string = ''



  constructor(private clienteService: BuscarClientesService, private authService: AuthenticationService, private renderer: Renderer2, private elementRef: ElementRef ) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  private listarClientes() {
    this.clienteService.listarClientes(this.page, this.size).subscribe(
      (data: any) => {
        this.cliente = data.content;
        this.telefonos = data.telefonos
        this.direcciones = data.direcciones
        this.correos = data.correosElectronicos
        
      },
      (error) => {
        
        Swal.fire('Error', 'Error al cargar los clientes', 'error');
      }
    );
  }

  public filtrar() {
    this.cliente = [];
    if (this.cedula) {
      this.clienteService.filtrarClientes(this.cedula).subscribe(
        (data: any) => {
          this.cliente.push(data);
          
        },
        (error) => {
          
          Swal.fire('Error', 'Error al filtrar los Clientes', 'error');
        }
      );
    } else {
      this.listarClientes();
    }
  }

  public eliminarCliente(idCliente: Number) {

    let username = this.authService.getUsername()

    Swal.fire({
      title: 'Eliminar El Cliente',
      text: '¿Estas seguro de eliminar el Cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(idCliente, username).subscribe(
          (data: any) => {
            this.cliente = this.cliente.filter((cliente: Cliente) => cliente.idCliente != idCliente);
            Swal.fire('Cliente Eliminado', 'El Cliente ha sido Eliminado Exitosamente', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al Eliminar el Cliente', 'error')
          }
        )
      }
    })

  }

  botones(accion: string) {
    switch (accion) {

      case "abrirTelefono":
        this.telefono = true
        break;

      case "abrirDireccion":
        this.direccion = true
        this.listarDep();
        break;

      case "abrirCorreo":
        this.correo = true
        break;

      case "cerrarTelefono":
        this.telefono = false
        break;
      case "cerrarDireccion":
        this.direccion = false
        break;
      case "cerrarCorreo":
        this.correo = false
        break;
    }
  }
  

  guardarDatos(boton:string){

    this.datos.telefonos = [];
    this.datos.direcciones = [];
    this.datos.correos = [];

    var depa = this.department.find((d:any) => d.id == this.idDep)
    if(depa != null){
      this.newDireccion.departamento = depa.name
    }

    this.validarCampos()

    

    this.clienteService.updateDatos(this.datos).subscribe(
      (data:any) => {
        this.limpiarCampos(boton);
        this.actualizarEnVista(data);
      }, (error:any) => {
        
      }
    )
  }

  validarCampos(){
    if(this.telefono === true){
      if(this.newTelefono == null || this.newTelefono == ''){
        Swal.fire('Error', 'Si desea Agregar un Nuevo Teléfono debe de llenar el campo', 'error')
        return
      } else {
        this.datos.telefonos.push(this.newTelefono)
        Swal.fire('Felicidades', 'El Teléfono ha sido agregado con éxito', 'success')
      }
    }
    if(this.direccion === true){
      if(this.newDireccion.pais == '' || this.newDireccion.pais == null){
        Swal.fire('Error', 'Debe de llenar El Pais', 'error')
        return
      }
      
      if(this.newDireccion.departamento == '' || this.newDireccion.departamento == null){
        Swal.fire('Error', 'Debe de llenar El Departamento', 'error')
        return
      }
      if(this.newDireccion.ciudad == '' || this.newDireccion.ciudad == null){
        Swal.fire('Error', 'Debe de llenar La Ciudad', 'error')
        return
      }
      if(this.newDireccion.direccion == '' || this.newDireccion.direccion == null){
        Swal.fire('Error', 'Debe de llenar la Direccion', 'error')
        return
      }
      else {
        this.datos.direcciones.push(this.newDireccion)
        Swal.fire('Felicidades', 'La Nueva Direccion ha sido agregada con éxito', 'success')
      }
    }


    if(this.correo === true){
      if(this.newCorreo == null || this.newCorreo == ''){
        Swal.fire('Error', 'Si desea Agregar un Nuevo Correo debe de llenar el campo', 'error')
        return
      } else {
        this.datos.correos.push(this.newCorreo)
        Swal.fire('Felicidades', 'El Correo ha sido agregado con éxito', 'success')
      }
    }
  }

  limpiarCampos(boton:string){
    switch (boton) {
      case "confirmarTel":
        this.newTelefono  = ''
        this.telefono = false
        break;

        case "confirmarDirec":
          this.newDireccion = {
            "direccion": "",
            "ciudad": "",
            "departamento": "",
            "pais": ""
          }
          this.direccion = false
          break;

          case "confirmarCorreo":
            this.newCorreo  = ''
            this.correo = false
            break;
    }
  }

  actualizarEnVista(data:any){
    var clienteFound = this.cliente.find((c:any) => c.numeroDocumento == data.numeroDocumento)
    if(clienteFound?.telefonos != undefined){
      clienteFound.telefonos = data.telefonos
    }

    if(clienteFound?.direcciones != undefined){
      clienteFound.direcciones = data.direcciones
    }

    if(clienteFound?.correosElectronicos != undefined){
      clienteFound.correosElectronicos = data.correosElectronicos
    }
  }

  listarDep(){
    this.clienteService.listarDepartamentos().subscribe(
      (data:any) => {
        this.department = data
        
      }, (error:any) => {
        
        Swal.fire('Error', 'Error al cargar los departamentos', 'error');
      }
    )
  }

  listarCiudadByDep(){
    if(this.idDep > 0){
      this.renderer.removeAttribute(this.mySelect.nativeElement, 'disabled');
    } else {
      this.renderer.setAttribute(this.mySelect.nativeElement, 'disabled', 'true');
    }
    this.clienteService.listarCiudadByDepartamento(this.idDep).subscribe(
      (data:any) => {
        this.ciudades = data
      }, (error:any) => {
        
      }
    )
  }

  metodo(cliente:Cliente){
    this.datos.cedulaCliente = cliente.numeroDocumento
    this.telefonos = cliente.telefonos
    this.direcciones = cliente.direcciones
    this.correos = cliente.correosElectronicos
    this.datosPersonales.fechaNacimiento = cliente.fechaNacimiento
    this.datosPersonales.lugarNacimiento = cliente.lugarNacimiento
    this.datosPersonales.fechaExpedicionDocumento = cliente.fechaExpedicionDocumento
    this.datosPersonales.lugarExpedicionDocumento = cliente.lugarExpedicionDocumento

  }


  back() {
    if (!this.first) {
      this.page--
      this.listarClientes();
        this.proSubscription = this.clienteService.proSubject.subscribe(
          (con: boolean) => {
            this.isCon = con;
            this.cont = this.cont - this.size;
            this.proSubscription.unsubscribe()
          }
        );
    }
  }

  goToPage(page: number) {
    this.page = page
    this.listarClientes()
      this.proSubscription = this.clienteService.proSubject.subscribe(
        (con: boolean) => {
          this.isCon = con;
          this.cont = this.initialCon + (this.page * this.size);
          this.proSubscription.unsubscribe()
        }
      );
  }


  next() {
    if (!this.last) {
      this.page++
      this.listarClientes()
        this.proSubscription = this.clienteService.proSubject.subscribe(
          (con: boolean) => {
            this.isCon = con;
            this.cont = this.cont + this.size;
            this.proSubscription.unsubscribe()
          }
        );
      
    }
  }

}






