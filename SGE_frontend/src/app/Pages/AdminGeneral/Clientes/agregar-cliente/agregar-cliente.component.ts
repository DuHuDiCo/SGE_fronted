import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BuscarClientesService } from 'src/app/Services/clientes/BuscarClientes/buscar-clientes.service';
import { AgregarUnClienteService } from 'src/app/Services/clientes/agregar-un-cliente.service';
import { Ciudad } from 'src/app/Types/Ciudades';
import { Cliente } from 'src/app/Types/ClienteDTO';
import { Departamento } from 'src/app/Types/Departamento';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})

export class AgregarClienteComponent implements OnInit {

  @ViewChild('depart')
  mySelect!: ElementRef<HTMLSelectElement>;

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

  department: Departamento[] = []

  ciudades: Ciudad[] = []

  idDep: number = 0

  constructor(private agregarCliente: AgregarUnClienteService, private router: Router, private clienteService: BuscarClientesService, private renderer: Renderer2, private elementRef: ElementRef) { }


  ngOnInit(): void {
    this.listarDep()
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

    if (this.cliente.username == '' || this.cliente.username == null) {
      Swal.fire('Error', 'Debe colocar el Usuario', 'error')
      return
    }

    if (this.cliente.tipoDocumento == '' || this.cliente.tipoDocumento == null) {
      Swal.fire('Error', 'Debe colocar el Tipo de Documento del Cliente', 'error')
      return
    }

    if (this.cliente.numeroDocumento == '' || this.cliente.numeroDocumento == null || this.cliente.numeroDocumento.length > 10) {
      Swal.fire('Error', 'Error al Ingresar el Numero de Documento del Cliente', 'error')
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

    if (this.cliente.telefono.numero == '' || this.cliente.telefono.numero == null || this.cliente.telefono.numero.length > 10) {
      Swal.fire('Error', 'Error al Ingresar el Numero del Cliente', 'error')
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

    var depa = this.department.find((d: any) => d.id == this.idDep)
    if (depa != null) {
      this.cliente.direccion.departamento = depa.name
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
        this.router.navigate(['/dashboard-admin-general/buscar-cliente'])
      },
      (error) => {
        Swal.fire('ERROR', 'Error al Guardar el Cliente', 'error')
      }
    )
  }

  listarDep() {
    this.clienteService.listarDepartamentos().subscribe(
      (data: any) => {
        this.department = data
        console.log(data);
      }, (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los departamentos', 'error');
      }
    )
  }

  listarCiudadByDep() {
    if (this.idDep > 0) {
      this.renderer.removeAttribute(this.mySelect.nativeElement, 'disabled');
    } else {
      this.renderer.setAttribute(this.mySelect.nativeElement, 'disabled', 'true');
    }


    this.clienteService.listarCiudadByDepartamento(this.idDep).subscribe(
      (data: any) => {
        this.ciudades = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

}