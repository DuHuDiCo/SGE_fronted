import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { AgregarVariosClientesService } from 'src/app/Services/clientes/AgregarVarios/agregar-varios-clientes.service';
import { Cliente } from 'src/app/Types/Cliente';
import { nuevosClientes } from 'src/app/Types/NuevosClientes';
import baseUrl from 'src/app/utils/helper';
import Swal from 'sweetalert2';

declare var window: any;

@Component({
  selector: 'app-agregar-varios-clientes',
  templateUrl: './agregar-varios-clientes.component.html',
  styleUrls: ['./agregar-varios-clientes.component.css'],
})
export class AgregarVariosClientesComponent implements OnInit {
  files: string = '';
  delimitante: string = '';
  formdata: FormData = new FormData();
  formModal: any;

  excepciones: string[] = [];
  clientes: nuevosClientes[] = [];
  cambios: string[] = [];
  cliente: Cliente[] = [];

  mostrarClientes: boolean = false;
  tabla: boolean = false;
  botonErrores: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private variosClientes: AgregarVariosClientesService
  ) {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modal')
    );
  }

  obtenerArchivo(event: any) {
    this.files = event.target.files[0];
  }

  subirArchivos() {
    this.formdata.append('files', this.files);
    const username = this.authService.getUsername();
    if (username == null) {
      return;
    }
    this.variosClientes
      .subirArchivo(this.formdata, this.delimitante, username)
      .subscribe(
        (data: any) => {
          if (data.Exceptions.length > 0) {
            this.excepciones = data.Exceptions;
            this.clientes = data.Clientes;
            this.cambios = data.Cambios;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al subir archivo',
              confirmButtonColor: '#d40000',
              iconColor: '#d40000',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            this.formModal.show();
            this.mostrarClientes = true;
            this.botonErrores = true;
            if (data.Clientes.length == 0) {
              this.mostrarClientes = true;
              this.clientes = data.Clientes;
              this.cambios = data.Cambios;
              this.mostrarClientes = true;
              return;
            }
            this.tabla = true;
            return;
          }

          if (data.Exceptions.length == 0) {
            Swal.fire({
              icon: 'success',
              title: 'Datos Guardados',
              text: 'Estos Son Los Clientes Cargados',
              timer: 3000,
              confirmButtonColor: '#d40000',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            this.mostrarClientes = true;
            this.clientes = data.Clientes;
            this.cambios = data.Cambios;
            this.tabla = true;
            this.mostrarClientes = true;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  guardarCambios() {
    this.variosClientes.guardarArchivo(this.clientes).subscribe(
      (data: any) => {
        this.cliente = data;
        Swal.fire({
          icon: 'success',
          title: 'Datos guardados',
          text: 'Estos son los clientes guardados',
          timer: 3000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'text-white btn border-0 rounded-pill px-4',
          },
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar los cambios',
          confirmButtonColor: '#d40000',
          iconColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'text-white btn border-0 rounded-pill px-4',
          },
        });
      }
    );
  }
}
