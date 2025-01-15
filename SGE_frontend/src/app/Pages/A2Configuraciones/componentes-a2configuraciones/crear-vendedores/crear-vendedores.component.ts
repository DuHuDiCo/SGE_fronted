import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendedorService } from 'src/app/Services/A2Configuraciones/Vendedor/vendedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-vendedores',
  templateUrl: './crear-vendedores.component.html',
  styleUrls: ['./crear-vendedores.component.css'],
})
export class CrearVendedoresComponent implements OnInit {
  zonas: { idZona: number; nombreZona: string }[] = [
    { idZona: 1, nombreZona: 'Boyaca Medellin' },
    { idZona: 2, nombreZona: 'ElectroHogar Colombia' },
    { idZona: 3, nombreZona: 'ElectroHogar Itagui' },
    { idZona: 4, nombreZona: 'ElectroHogar Rionegro' },
    { idZona: 5, nombreZona: 'ElectroHogar La Ceja' },
    { idZona: 6, nombreZona: 'ElectroHogar Guarne' },
    { idZona: 7, nombreZona: 'ElectroHogar Marinilla' },
    { idZona: 8, nombreZona: 'ElectroHogar Puerto Boyaca' },
    { idZona: 9, nombreZona: 'ElectroMagdalena Puerto Berrio' },
    { idZona: 10, nombreZona: 'Creditos SurOeste Medellin' },
    { idZona: 11, nombreZona: 'Creditos SurOeste Amaga' },
    { idZona: 12, nombreZona: 'Creditos SurOeste Fredonia' },
    { idZona: 13, nombreZona: 'Electrohogar Caldas' },
    { idZona: 14, nombreZona: 'Electrohogar Tamesis' },
  ];

  public vendedor: { nombreVendedor: string; idZona: number } = {
    nombreVendedor: '',
    idZona: 0,
  };

  constructor(
    private router: Router,
    private vendedorService: VendedorService
  ) {}

  ngOnInit(): void {}

  onFormSubmit() {
    if (
      this.vendedor.nombreVendedor == '' ||
      this.vendedor.nombreVendedor == null
    ) {
      Swal.fire('Error', 'El nombre de vendedor es requerido', 'error');
      return;
    }
    if (this.vendedor.idZona == 0 || this.vendedor.idZona == null) {
      Swal.fire('Error', 'Seleccione una zona', 'error');
      return;
    }

    // validacion provisional 
    if (
      this.vendedor.nombreVendedor == '' ||
      this.vendedor.nombreVendedor == null
    ) {
      this.vendedorService?.añadirVendedor(this.vendedor)?.subscribe(
        (data: any) => {
          // console.log(data);

          // Notificacion añadir vendedor
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            showConfirmButton: false,
            timer: 1000,
          });
          this.router.navigate(['dashboard-a2configuraciones/inicio']);
          this.limpiarFormulario();
        },
        (error: any) => {
          console.log(error);
          this.limpiarFormulario();
        }
      );
    }

    // Limpiar formulario provisional
    this.limpiarFormulario();
  }

  // regresar a elegir formualrio de vendedor o producto
  onVolver() {
    this.router.navigate(['dashboard-a2configuraciones/inicio']);
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.vendedor = {
      nombreVendedor: '',
      idZona: 0,
    };
  }
}
