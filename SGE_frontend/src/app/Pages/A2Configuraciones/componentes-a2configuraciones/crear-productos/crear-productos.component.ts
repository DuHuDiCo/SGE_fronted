import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css'],
})
export class CrearProductosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit() {
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
