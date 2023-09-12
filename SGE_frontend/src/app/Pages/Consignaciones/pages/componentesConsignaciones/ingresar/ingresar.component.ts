import { Component, OnInit } from '@angular/core';
import { Consignacion } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  consignacion:Consignacion = {
    numeroRecibo: '',
    valor: '',
    fechaPago: new Date,
    idPlataforma: 0,
    observaciones: '',
    cedula: '',
    base64: ''
  }

  validarCampos(){
    const recibo = this.consignacion.numeroRecibo.trim()
    if(this.consignacion.numeroRecibo.trim() == '' || isNaN(parseInt(recibo))){
      Swal.fire('Error', 'Debe de Ingresar el Número del Recibo', 'error')
      return
    }
    const valor = this.consignacion.valor
    if(this.consignacion.valor == '' || isNaN(parseInt(valor))){
      Swal.fire('Error', 'Debe de Ingresar el Valor de la Consignación', 'error')
      return
    }
    if(this.consignacion.fechaPago instanceof Date || this.consignacion.fechaPago == null){
      Swal.fire('Error', 'Debe de Ingresar la fecha de Pago', 'error')
      return
    }
    const cedula = this.consignacion.cedula.trim()
    if(this.consignacion.cedula.trim() == '' || isNaN(parseInt(cedula))){
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    }
    if(this.consignacion.idPlataforma == 0 || this.consignacion.idPlataforma == null){
      Swal.fire('Error', 'Debe de Seleccionar una Plataforma de Pago', 'error')
      return
    }
    if(this.consignacion.base64.trim() == '' || this.consignacion.base64 == null){
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    } else {
      this.showModal()
    }
  }

  guardarConsignacion(){
    this.validarCampos()
  }

  showModal() {
    $('#myModal').modal('show');
  }

  validarObs(){
    if(this.consignacion.observaciones.trim() == '' || this.consignacion.observaciones.trim() == null){
      Swal.fire('Error', 'Si quieres guardar una consignación debes de llenar el campo', 'error')
      return
    }
    console.log(this.consignacion);
    
  }

}
