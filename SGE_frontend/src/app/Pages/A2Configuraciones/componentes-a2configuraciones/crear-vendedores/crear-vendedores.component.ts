import { VendedorService } from 'src/app/Services/A2Configuraciones/Vendedor/vendedor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-vendedores',
  templateUrl: './crear-vendedores.component.html',
  styleUrls: ['./crear-vendedores.component.css'],
})
export class CrearVendedoresComponent implements OnInit {
  // Lista de zonas para elegir la ubicación del vendedor
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

  // Objeto que almacena los datos del vendedor
  public vendedor: { nombreVendedor: string; idZona: number } = {
    nombreVendedor: '',
    idZona: 0,
  };

  constructor(
    private router: Router,
    private vendedorService: VendedorService // Inyecta el servicio VendedorService para manejar los datos del vendedor
  ) {}

  ngOnInit(): void {}

  // Método que se ejecuta al enviar el formulario
  onFormSubmit() {
    // Verifica si el nombre del vendedor está vacío o nulo
    if (
      this.vendedor.nombreVendedor == '' ||
      this.vendedor.nombreVendedor == null
    ) {
      Swal.fire('Error', 'El nombre de vendedor es requerido', 'error'); // Muestra una alerta si el nombre está vacío
      return; // Sale de la función si el nombre es inválido
    }
    // Verifica si la zona no ha sido seleccionada
    if (this.vendedor.idZona == 0 || this.vendedor.idZona == null) {
      Swal.fire('Error', 'Seleccione una zona', 'error'); // Muestra una alerta si la zona no está seleccionada
      return; // Sale de la función si la zona es inválida
    }

    // Llama al servicio para agregar un nuevo vendedor
    this.vendedorService?.añadirVendedor(this.vendedor)?.subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado',
          showConfirmButton: false,
          timer: 1000,
        }); // Si la adición es exitosa, muestra una notificación de éxito
        this.router.navigate(['dashboard-a2configuraciones/inicio']); // Redirige al usuario a la página de inicio
        this.limpiarFormulario(); // Limpia los datos del formulario
      },
      (error: any) => {
        console.log(error); // Muestra el error en consola si la adición falla
        this.limpiarFormulario(); // Limpia el formulario en caso de error
      }
    );
  }

  // Método para regresar a la página de inicio sin realizar ninguna acción
  onVolver() {
    this.router.navigate(['dashboard-a2configuraciones/inicio']);
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.vendedor = {
      nombreVendedor: '',
      idZona: 0,
    };
  }
}
