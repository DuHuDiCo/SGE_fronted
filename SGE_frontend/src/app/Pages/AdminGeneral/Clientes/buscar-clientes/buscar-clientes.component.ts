import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { BuscarClientesService } from 'src/app/Services/clientes/BuscarClientes/buscar-clientes.service';
import { Ciudad } from 'src/app/Types/Ciudades';
import { Cliente } from 'src/app/Types/Cliente';
import { DatosContacto, Direccion, Telefono } from 'src/app/Types/DatosCliente';
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

  pageTelefono: number = 1;
  pageDireccion: number = 1;
  pageCorreo: number = 1;

  cliente: Cliente[] = []

  datosPersonales:any = {
    fechaNacimiento: '',
    lugarNacimiento: '',
    fechaExpedicionDocumento: '',
    lugarExpedicionDocumento: ''
  }

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  cedula: string = ''

  telefono: boolean = false
  direccion: boolean = false
  correo: boolean = false

  datos:DatosContacto = {
    username: '',
    cedulaCliente: this.cedula,
    telefonos: [],
    direcciones: [],
    correos: []
  }

  telefonos:any[] = []
  direcciones:any[] = []
  correos:any[] = []

  correoTrue:any[] = []
  telefonoTrue:any[] = []
  direccionTrue:any[] = []

  telefonoEmpty:boolean = false
  direccionEmpty:boolean = false
  correoEmpty:boolean = false

  idDep:number = 0

  ciudades:Ciudad[] = []

  department:Departamento[] = []

  newTelefono:Telefono = {
    "indicativo": "",
    "numero": ""
  }
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

  //METODO PARA LISTAR CLIENTES
  private listarClientes() {
    this.clienteService.listarClientes().subscribe(
      (data: any) => {
        this.cliente = data;
        this.telefonos = data.telefonos
        this.direcciones = data.direcciones
        this.correos = data.correosElectronicos
        console.log(this.cliente);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los clientes', 'error');
      }
    );
  }

  //METODO PARA FILTRAR UN CLIENTE POR SU CEDULA
  public filtrar() {
    this.cliente = [];
    if (this.cedula) {
      this.clienteService.filtrarClientes(this.cedula).subscribe(
        (data: any) => {
          this.cliente.push(data);
          console.log(this.cliente);
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Error al filtrar los Clientes', 'error');
        }
      );
    } else {
      this.listarClientes();
    }
  }

  //METODO PARA ELIMINAR UN CLIENTE
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
            console.log(error
            );

            if(error = error.error.text){
              Swal.fire('Error', 'Error al Eliminar el Cliente, Solo los SuperAdministradores Pueden eliminar clientes', 'error')
            }

            
          }
        )
      }
    })

  }

  //METODO PARA ABRIR Y CERRAR LOS INPUTS
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

    acordeon() {
      this.telefonoEmpty = this.telefonos.length === 0;
      this.direccionEmpty = this.direcciones.length === 0;
      this.correoEmpty = this.correos.length === 0;
  }
  

  //METODO PARA GUARDAR LOS DATOS
  guardarDatos(boton:string){

    this.datos.telefonos = [];
    this.datos.direcciones = [];
    this.datos.correos = [];

    var depa = this.department.find((d:any) => d.id == this.idDep)
    if(depa != null){
      this.newDireccion.departamento = depa.name
    }

    this.validarCampos()

    console.log(this.datos);

    var username = this.authService.getUsername()
    if(username == null || username == ''){
      return
    } 
    this.datos.username = username

    this.clienteService.updateDatos(this.datos).subscribe(
      (data:any) => {
        this.limpiarCampos(boton);
        this.actualizarEnVista(data);
        this.acordeon()
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  //VALIDACIONES DE LOS INPUTS
  validarCampos(){
    if(this.telefono === true){
      const telefonoInd = this.newTelefono.indicativo.trim();
      if(this.newTelefono.indicativo.trim() == '' || isNaN(parseInt(telefonoInd))){
        Swal.fire('Error', 'Digite el indicativo o utilice datos Válidos', 'error')
        return
      } 
      const telefonoNum = this.newTelefono.numero.trim();
      if(this.newTelefono.numero.trim() == '' || isNaN(parseInt(telefonoNum)) || this.newTelefono.numero.trim().length > 10 || this.newTelefono.numero.trim().length < 10){
        Swal.fire('Error', 'Digite el Numero o utilice datos Válidos', 'error')
        return
      } else {
        this.datos.telefonos.push(this.newTelefono)
        Swal.fire('Felicidades', 'El Teléfono ha sido agregado con éxito', 'success')
      }
    }
    if(this.direccion === true){
      if(this.newDireccion.pais.trim() == '' || this.newDireccion.pais.trim() == null){
        Swal.fire('Error', 'Debe de llenar El Pais', 'error')
        return
      }
      
      if(this.newDireccion.departamento.trim() == '' || this.newDireccion.departamento.trim() == null){
        Swal.fire('Error', 'Debe de llenar El Departamento', 'error')
        return
      }
      if(this.newDireccion.ciudad.trim() == '' || this.newDireccion.ciudad.trim() == null){
        Swal.fire('Error', 'Debe de llenar La Ciudad', 'error')
        return
      }
      if(this.newDireccion.direccion.trim() == '' || this.newDireccion.direccion.trim() == null){
        Swal.fire('Error', 'Debe de llenar la Direccion', 'error')
        return
      }
      else {
        this.datos.direcciones.push(this.newDireccion)
        Swal.fire('Felicidades', 'La Nueva Direccion ha sido agregada con éxito', 'success')
      }
    }


    if(this.correo === true){
      if(this.newCorreo.trim() == null || this.newCorreo.trim() == ''){
        Swal.fire('Error', 'Si desea Agregar un Nuevo Correo debe de llenar el campo', 'error')
        return
      }
      if(!this.newCorreo.trim().includes('@')){
        Swal.fire('Error', 'Debe de ingresar un Correo Electronico Válido', 'error')
        return
      } else {
        this.datos.correos.push(this.newCorreo)
        Swal.fire('Felicidades', 'El Correo ha sido agregado con éxito', 'success')
      }
    }
  }

  //METODO PARA LIMPIAR LOS CAMPOS
  limpiarCampos(boton:string){
    switch (boton) {
      case "confirmarTel":
        this.newTelefono  = {
          "indicativo": '',
          "numero": ''
        }
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

  //METODO PARA ACTUALIZAR LOS DATOS EN EL MODAL
  actualizarEnVista(data:any){
    var clienteFound = this.cliente.find((c:any) => c.numeroDocumento == data.numeroDocumento)
    if(clienteFound?.telefonos != undefined){
      clienteFound.telefonos = data.telefonos
      this.telefonoTrue = data.telefonos.filter((t:any) => t.isCurrent != false)
      this.telefonos = data.telefonos.filter((t:any) => t.isCurrent != true)
    }
    

    if(clienteFound?.direcciones != undefined){
      clienteFound.direcciones = data.direcciones
      this.direccionTrue = data.direcciones.filter((d:any) => d.isCurrent != false)
      this.direcciones = data.direcciones.filter((t:any) => t.isCurrent != true)
    }

    if(clienteFound?.correosElectronicos != undefined){
      clienteFound.correosElectronicos = data.correosElectronicos
      this.correoTrue = data.correosElectronicos.filter((cor:any) => cor.isCurrent != false)
      this.correos = data.correosElectronicos.filter((t:any) => t.isCurrent != true)
    }
  }

  // LISTAR DEPARTAMENTOS
  listarDep(){
    this.clienteService.listarDepartamentos().subscribe(
      (data:any) => {
        this.department = data
        console.log(data);
      }, (error:any) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los departamentos', 'error');
      }
    )
  }

  //LISTAR CIUDADES POR DEPARTAMENTO
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
        console.log(error);
      }
    )
  }

  //METODO PARA TRAER DATOS DEL CLIENTE
  metodo(cliente:Cliente){
    this.datos.cedulaCliente = cliente.numeroDocumento
    this.telefonos = cliente.telefonos
    if(this.telefonos != undefined){
      this.telefonoTrue = this.telefonos.filter((telTrue:any) => telTrue.isCurrent != false)
      this.telefonos = this.telefonos.filter((tel:any) => tel.isCurrent != true)
    }
    this.direcciones = cliente.direcciones
    if(this.direcciones != undefined){
      this.direccionTrue = this.direcciones.filter((dirTrue:any) => dirTrue.isCurrent != false)
      this.direcciones = this.direcciones.filter((dir:any) => dir.isCurrent != true)
    }
    this.correos = cliente.correosElectronicos
    if(this.correos != undefined){
      this.correoTrue = this.correos.filter((corTrue:any) => corTrue.isCurrent != false)
      this.correos = this.correos.filter((cor:any) => cor.isCurrent != true)
    }
    this.datosPersonales.fechaNacimiento = cliente.fechaNacimiento
    this.datosPersonales.lugarNacimiento = cliente.lugarNacimiento
    this.datosPersonales.fechaExpedicionDocumento = cliente.fechaExpedicionDocumento
    this.datosPersonales.lugarExpedicionDocumento = cliente.lugarExpedicionDocumento
    this.acordeon();

  }



}






