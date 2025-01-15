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
    nombreZona: [
      'Boyaca Medellin',
      'ElectroHogar Colombia',
      'ElectroHogar Itagui',
      'ElectroHogar Rionegro',
      'ElectroHogar La Ceja',
      'ElectroHogar Guarne',
      'ElectroHogar Marinilla',
      'ElectroHogar Puerto Boyaca',
      'ElectroMagdalena Puerto Berrio',
      'Creditos SurOeste Medellin',
      'Creditos SurOeste Amaga',
      'Creditos SurOeste Fredonia',
      'Electrohogar Caldas',
      'Electrohogar Tamesis',
    ],
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  mostrarConsola() {
    console.log(this.vendedor.nombreZona.length);
  }

  onFormSubmit() {
    this.mostrarConsola();

    if (
      this.vendedor.nombreVendedor == '' ||
      this.vendedor.nombreVendedor == null
    ) {
      Swal.fire('Error', 'El nombre de vendedor es requerido', 'error');
      return;
    }
    // if (this.vendedor.nombreZona == '' || this.vendedor.nombreZona == null) {
    //   Swal.fire('Error', 'Seleccione una zona', 'error');
    //   return;
    // }

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
