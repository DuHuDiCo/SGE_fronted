import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-vendedores',
  templateUrl: './crear-vendedores.component.html',
  styleUrls: ['./crear-vendedores.component.css'],
})
export class CrearVendedoresComponent implements OnInit {
  public vendedor = {
    nombreVendedor: '',
    codigo: '',
    documento: '',
    sede: '',
    opcion5: '',
    opcion6: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit() {
    if (
      this.vendedor.nombreVendedor == '' ||
      this.vendedor.nombreVendedor == null
    ) {
      Swal.fire('Error', 'El nombre de vendedor es requerido', 'error');
      return;
    }
    if (this.vendedor.codigo == '' || this.vendedor.codigo == null) {
      Swal.fire('Error', 'El codigo de vendedor es requerido', 'error');
      return;
    }
    if (this.vendedor.documento == '' || this.vendedor.documento == null) {
      Swal.fire('Error', 'La cedula del vendedor es requerida', 'error');
      return;
    }
    if (this.vendedor.sede == '' || this.vendedor.sede == null) {
      Swal.fire('Error', 'La sede es requerida', 'error');
      return;
    }
    if (this.vendedor.opcion5 == '' || this.vendedor.opcion5 == null) {
      Swal.fire('Error', 'Campo requerido', 'error');
      return;
    }
    if (this.vendedor.opcion6 == '' || this.vendedor.opcion6 == null) {
      Swal.fire('Error', 'Campo requerido', 'error');
      return;
    }

    // Notificacion añadir vendedor
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
