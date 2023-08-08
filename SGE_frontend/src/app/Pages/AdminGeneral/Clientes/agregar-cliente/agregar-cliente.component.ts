import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgregarUnClienteService } from 'src/app/Services/clientes/agregar-un-cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  datos = {
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    pais: '',
    correoElectronico: '',
    tipoCliente: ''
  }
  
  router: any;

  constructor(private agregarCliente: AgregarUnClienteService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  guardarClientes() {

    if (this.datos.nombres == '' || this.datos.nombres == null) {
      Swal.fire('Error', 'Debe colocar el Nombre del Cliente', 'error')
      return
    }

    if (this.datos.apellidos == '' || this.datos.apellidos == null) {
      Swal.fire('Error', 'Debe colocar el Apellido del Cliente', 'error')
      return
    }

    if (this.datos.tipoDocumento == '' || this.datos.tipoDocumento == null) {
      Swal.fire('Error', 'Debe colocar elTtipo de Documento', 'error')
      return
    }

    if (this.datos.numeroDocumento == '' || this.datos.numeroDocumento == null) {
      Swal.fire('Error', 'Digite el Numero de Documento del Cliente', 'error')
      return
    }

    if (this.datos.fechaNacimiento == '' || this.datos.fechaNacimiento == null) {
      Swal.fire('Error', 'Debe colocar la Fecha de Nacimiento', 'error')
      return
    }

    if (this.datos.lugarNacimiento == '' || this.datos.lugarNacimiento == null) {
      Swal.fire('Error', 'Debe colocar el Lugar de Nacimiento', 'error')
      return
    }

    if (this.datos.telefono == '' || this.datos.telefono == null) {
      Swal.fire('Error', 'Digite el Telefono del Cliente', 'error')
      return
    }

    if (this.datos.direccion == '' || this.datos.direccion == null) {
      Swal.fire('Error', 'Debe colocar el Lugar de Nacimiento', 'error')
      return
    }

    if (this.datos.ciudad == '' || this.datos.ciudad == null) {
      Swal.fire('Error', 'Debe colocar la Cuidad', 'error')
      return
    }

    if (this.datos.departamento == '' || this.datos.departamento == null) {
      Swal.fire('Error', 'Debe colocar el Departamento', 'error')
      return
    }

    if (this.datos.pais == '' || this.datos.pais == null) {
      Swal.fire('Error', 'Debe colocar el Pais', 'error')
      return
    }

    if (this.datos.correoElectronico == '' || this.datos.correoElectronico == null) {
      Swal.fire('Error', 'Debe colocar el Correo Electronico', 'error')
      return
    }

    if (this.datos.tipoCliente == '' || this.datos.tipoCliente == null) {
      Swal.fire('Error', 'Debe colocar el Tipo de Cliente', 'error')
      return
    }

    this.agregarCliente.guardarClientes(this.datos).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Guardado', 'Cliente guardado con Exito', 'success');
        this.datos = {
          nombres: '',
          apellidos: '',
          tipoDocumento: '',
          numeroDocumento: '',
          fechaNacimiento: '',
          lugarNacimiento: '',
          telefono: '',
          direccion: '',
          ciudad: '',
          departamento: '',
          pais: '',
          correoElectronico: '',
          tipoCliente: ''
        }
        this.router.navigate(['/AdminGeneral/Clientes/agregar-cliente'])
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el cliente', 'error')
      }
    )
  }
}
