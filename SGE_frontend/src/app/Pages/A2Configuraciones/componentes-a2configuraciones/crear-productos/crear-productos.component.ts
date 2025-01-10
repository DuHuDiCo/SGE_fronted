import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css'],
})
export class CrearProductosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onFormSubmit() {
    Swal.fire({
      icon: 'success',
      title: 'Producto Creado',
      showConfirmButton: false,
      timer: 1000,
    });
  }
}
