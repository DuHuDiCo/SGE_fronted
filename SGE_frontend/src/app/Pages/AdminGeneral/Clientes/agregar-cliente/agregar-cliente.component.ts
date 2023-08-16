import { Component, OnInit } from '@angular/core';
import { AgregarUnClienteService } from 'src/app/Services/clientes/agregar-un-cliente.service';
import { Cliente } from 'src/app/Types/ClienteDTO';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})

export class AgregarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: new Date(),
    lugarNacimiento: "",
    fechaExpedicionDocumento: new Date(),
    lugarExpedicionDocumento: "",
    telefono: {
      indicativo: "",
      numero: "",

    },
    direccion: {
      direccion: "",
      ciudad: "",
      departamento: "",
      pais: "",
    },

    correoElectronico: {
      email: "",
    },
    username: "",

  }

  router: any;

  constructor(private agregarCliente: AgregarUnClienteService) { }


  ngOnInit(): void {
    
  }

  guardarClientes() {

    if (this.cliente.nombres == '' || this.cliente.nombres == null) {
      Swal.fire('Error', 'Debe colocar el Nombre del Cliente', 'error')
      return
    }

    if (this.cliente.apellidos == '' || this.cliente.apellidos == null) {
      Swal.fire('Error', 'Debe colocar el Apellido del Cliente', 'error')
      return
    }

    if (this.cliente.username == ''|| this.cliente.username == null) {
      Swal.fire('Error', 'Debe colocar el Usuario', 'error')
      return
    }

    if (this.cliente.tipoDocumento == '' || this.cliente.tipoDocumento == null) {
      Swal.fire('Error', 'Debe colocar el Tipo de Documento del Cliente', 'error')
      return
    }

    if (this.cliente.numeroDocumento == '' || this.cliente.numeroDocumento == null) {
      Swal.fire('Error', 'Digite el Numero de Documento del Cliente', 'error')
      return
    }

    if (this.cliente.fechaNacimiento instanceof Date || this.cliente.fechaNacimiento == null) {
      Swal.fire('Error', 'Debe colocar la Fecha de Nacimiento', 'error')
      return
    }

    if (this.cliente.lugarNacimiento == '' || this.cliente.lugarNacimiento == null) {
      Swal.fire('Error', 'Debe colocar el Lugar de Nacimiento', 'error')
      return
    }

    if (this.cliente.fechaExpedicionDocumento instanceof Date || this.cliente.fechaExpedicionDocumento == null) {
      Swal.fire('Error', 'Debe colocar la Fecha de Expedicion', 'error')
      return
    }

    if (this.cliente.lugarExpedicionDocumento == '' || this.cliente.lugarExpedicionDocumento == null) {
      Swal.fire('Error', 'Debe colocar el Lugar de Expedicion', 'error')
      return
    }

    if (this.cliente.telefono.numero == '' || this.cliente.telefono.numero == null) {
      Swal.fire('Error', 'Digite el Telefono del Cliente', 'error')
      return
    }

    if (this.cliente.telefono.indicativo == '' || this.cliente.telefono.indicativo == null) {
      Swal.fire('Error', 'Digite el Indicativo del Telefono', 'error')
      return
    }

    if (this.cliente.direccion.direccion == '' || this.cliente.direccion.direccion == null || this.cliente.direccion.ciudad == null || this.cliente.direccion.departamento == null || this.cliente.direccion.pais == null) {
      Swal.fire('Error', 'Debe colocar la Ubicacion', 'error')
      return
    }

    if (this.cliente.correoElectronico.email == '' || this.cliente.correoElectronico == null) {
      Swal.fire('Error', 'Debe colocar el Correo Electronico', 'error')
      return
    }

    this.agregarCliente.guardarClientes(this.cliente).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Guardado', 'Cliente guardado con Exito', 'success');
        this.cliente = {
          nombres: "",
          apellidos: "",
          tipoDocumento: "",
          numeroDocumento: "",
          fechaNacimiento: new Date(),
          lugarNacimiento: "",
          fechaExpedicionDocumento: new Date(),
          lugarExpedicionDocumento: "",
          telefono: {
            indicativo: "",
            numero: "",
          },
          direccion: {
            direccion: "",
            ciudad: "",
            departamento: "",
            pais: "",
          },

          correoElectronico: {
            email: "",
          },
          username: "",
        }
      },
      (error) => {
        Swal.fire('ERROR', 'Error al Guardar el Cliente', 'error')
      }
    )
  }
}
