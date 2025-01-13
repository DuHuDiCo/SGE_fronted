import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css'],
})
export class CrearProductosComponent implements OnInit {
  public producto = {
    nombreProducto: '',
    referencia: '',
    marca: '',
    opcion4: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit() {
    if (
      this.producto.nombreProducto == '' ||
      this.producto.nombreProducto == null
    ) {
      Swal.fire('Error', 'El nombre del producto es requerido', 'error');
      return;
    }
    if (this.producto.referencia == '' || this.producto.referencia == null) {
      Swal.fire('Error', 'La referencia es requerida', 'error');
      return;
    }
    if (this.producto.marca == '' || this.producto.marca == null) {
      Swal.fire('Error', 'La marca es requerida', 'error');
      return;
    }
    if (this.producto.opcion4 == '' || this.producto.opcion4 == null) {
      Swal.fire('Error', 'Opción requerida', 'error');
      return;
    }

    // Notificacion añadir producto
    Swal.fire({
      icon: 'success',
      title: 'Producto creado',
      showConfirmButton: false,
      timer: 1000,
    });

    this.router.navigate(['dashboard-a2configuraciones/inicio']);
  }

  onVolver() {
    this.router.navigate(['dashboard-a2configuraciones/inicio']);
  }
}
