import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-link',
  templateUrl: './crear-link.component.html',
  styleUrls: ['./crear-link.component.css']
})
export class CrearLinkComponent {

  datos = {
    name: '',
    description: '',
    single_use: true,
    collect_shipping: true,
    currency: 'COP',
    amount_in_cents: 0 
  };
  valorEditable: boolean = false;

  constructor(
    private router: Router, private http: HttpClient) { }

  generarLink() {
    if (!this.validarCampos()) return;

    this.datos.amount_in_cents = this.datos.amount_in_cents * 100;
    console.log(" Enviando al backend:", this.datos);

    this.http.post<any>('http://192.168.1.241:8025/api/v1/wompi/payment_links', this.datos)
      .subscribe({
        next: (respuesta) => {
          console.log(" Respuesta backend:", respuesta);

          const linkGenerado = respuesta?.payment_link;

          Swal.fire({
            icon: 'success',
            title: 'Link generado correctamente',
          }).then(() => {
            this.router.navigate(['dashboard-consignaciones/mostrar-informacion'], {
              state: {
                datosUsuario: {
                  ...this.datos,
                  linkPago: linkGenerado   
                },
                valorEditable: this.valorEditable
              }
            });
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo generar el link, intenta de nuevo'
          });
        }
      });
  }

  private validarCampos(): boolean {
    if (!this.datos.name.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del producto o servicio es requerido'
      });
      return false;
    }

    if (!this.datos.description.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La descripción es requerida'
      });
      return false;
    }

    if (!this.valorEditable) {
      if (!this.datos.amount_in_cents || this.datos.amount_in_cents < 1000) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El valor debe ser mayor o igual a $1000'
        });
        return false;
      }
    }

    if (!this.datos.currency) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar una moneda'
      });
      return false;
    }

    return true;
  }

  calcularTotal(): number {
    return this.datos.amount_in_cents || 0;
  }

  limpiar() {
    this.datos = {
      name: '',
      description: '',
      amount_in_cents: 0,
      single_use: false,
      collect_shipping: false,
      currency: 'COP',
    };
    this.valorEditable = false;
  }
}