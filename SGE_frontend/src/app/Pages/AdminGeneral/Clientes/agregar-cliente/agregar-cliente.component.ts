import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  nombres: string = '';
  apellidos: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  fechaNacimiento: string = '';
  lugarNacimiento: string = '';
  telefono: string = '';
  direccion: string = '';
  ciudad: string = '';
  departamento: string = '';
  pais: string = '';
  correoElectronico: string = '';
  tipoCliente: string = '';


  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  guardarClientes() {

    if (this.nombres == '' || this.nombres == null) {
      Swal.fire('Error', 'Debe colocar el Nombre del Cliente', 'error')
      return
    }

    if (this.apellidos == '' || this.apellidos == null) {
      Swal.fire('Error', 'Debe colocar el Apellido del Cliente', 'error')
      return
    }

    if (this.tipoDocumento == '' || this.tipoDocumento == null) {
      Swal.fire('Error', 'Debe colocar elTtipo de Documento', 'error')
      return
    }

    if (this.numeroDocumento == '' || this.numeroDocumento == null) {
      Swal.fire('Error', 'Digite el Numero de Documento del Cliente', 'error')
      return
    }

    if (this.fechaNacimiento == '' || this.fechaNacimiento == null) {
      Swal.fire('Error', 'Debe colocar la Fecha de Nacimiento', 'error')
      return
    }

    if (this.lugarNacimiento == '' || this.lugarNacimiento == null) {
      Swal.fire('Error', 'Debe colocar el Lugar de Nacimiento', 'error')
      return
    }

    if (this.telefono == '' || this.telefono == null) {
      Swal.fire('Error', 'Digite el Telefono del Cliente', 'error')
      return
    }

    if (this.direccion == '' || this.direccion == null) {
      Swal.fire('Error', 'Debe colocar el Lugar de Nacimiento', 'error')
      return
    }

    if (this.ciudad == '' || this.ciudad == null) {
      Swal.fire('Error', 'Debe colocar la Cuidad', 'error')
      return
    }

    if (this.departamento == '' || this.departamento == null) {
      Swal.fire('Error', 'Debe colocar el Departamento', 'error')
      return
    }

    if (this.pais == '' || this.pais == null) {
      Swal.fire('Error', 'Debe colocar el Pais', 'error')
      return
    }

    if (this.correoElectronico == '' || this.correoElectronico == null) {
      Swal.fire('Error', 'Debe colocar el Correo Electronico', 'error')
      return
    }

    if (this.tipoCliente == '' || this.tipoCliente == null) {
      Swal.fire('Error', 'Debe colocar el Tipo de Cliente', 'error')
      return
    }
    else () => {
      Swal.fire('Guardado', 'Cliente Guardado con Exito', 'success')
      return
    }
  }

}
