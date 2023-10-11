import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css']
})
export class SubirArchivosComponent implements OnInit {

  botonComenzar:boolean = true
  botonCedula:boolean = false
  botonFactura:boolean = false
  botonCredito:boolean = false
  botonAutorizacion:boolean = false
  datosPersonales:boolean = false
  botonCedulaCliente:boolean = false
  botonPagare:boolean = false
  botonGuardar:boolean = false

  background_color:string = '#960010'
  width:number = 10
  display:string = 'none'


  constructor() { }

  ngOnInit(): void {
  }

  cambiarInputs(accion:string){
    switch (accion) {
      case 'COMENZAR':
      this.botonComenzar = false
      this.botonCedula = true
      Swal.fire({
        icon: 'success',
        title: 'El Proceso Ha Comenzado',
        text: 'Digite la Información Correspondiente',
        timer: 2500
      })
        break;
      case 'CEDULA':
        this.botonCedula = false
        this.botonFactura = true
        this.display = 'block'
        Swal.fire({
          icon: 'info',
          title: 'Paso #1 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
        case 'FACTURA':
        this.botonFactura = false
        this.botonCredito = true
        this.width = 20
        Swal.fire({
          icon: 'info',
          title: 'Paso #2 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
        case 'CREDITO':
        this.botonCredito = false
        this.botonAutorizacion = true
        this.width = 40
        Swal.fire({
          icon: 'info',
          title: 'Paso #3 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
        case 'AUTORIZACION':
        this.botonAutorizacion = false
        this.datosPersonales = true
        this.width = 60
        Swal.fire({
          icon: 'info',
          title: 'Paso #4 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
        case 'DATOSPERSONALES':
        this.datosPersonales = false
        this.botonCedulaCliente = true
        this.width = 80
        Swal.fire({
          icon: 'info',
          title: 'Paso #5 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
        case 'CEDULACLIENTE':
        this.botonCedulaCliente = false
        this.botonPagare = true
        this.width = 90
        Swal.fire({
          icon: 'info',
          title: 'Paso #6 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
        case 'PAGARE':
        this.botonPagare = false
        this.botonGuardar = true
        this.width = 100
        this.display = 'none'
        Swal.fire({
          icon: 'success',
          title: 'Paso #7 Completado',
          text: 'El Registro se Ha Completado',
          timer: 2500
        })
        break;
    }
  }

}
