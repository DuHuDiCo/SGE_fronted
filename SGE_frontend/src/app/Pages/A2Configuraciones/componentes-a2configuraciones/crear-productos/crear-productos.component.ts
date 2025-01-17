import { ProductosService } from 'src/app/Services/A2Configuraciones/Productos/productos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css'],
})
export class CrearProductosComponent implements OnInit {
  // Lista de categorías de productos disponibles
  categoriaProducto: { idProducto: number; descripcionProducto: string }[] = [
    { idProducto: 1, descripcionProducto: 'COMPUTADOR' },
    { idProducto: 2, descripcionProducto: 'DISPENSADOR' },
    { idProducto: 3, descripcionProducto: 'NEVERAS' },
    { idProducto: 4, descripcionProducto: 'LAVADORAS' },
    { idProducto: 5, descripcionProducto: 'ESTUFAS' },
    { idProducto: 6, descripcionProducto: 'CALENTADORES' },
    { idProducto: 7, descripcionProducto: 'V.H.S.' },
    { idProducto: 8, descripcionProducto: 'TELEVISORES' },
    { idProducto: 9, descripcionProducto: 'GRABADORAS' },
    { idProducto: 10, descripcionProducto: 'EQUIPOS DE SONIDO' },
    { idProducto: 11, descripcionProducto: 'HORNOS MICROONDAS' },
    { idProducto: 12, descripcionProducto: 'ENFRIADOR' },
    { idProducto: 13, descripcionProducto: 'CD.' },
    { idProducto: 14, descripcionProducto: 'SILLA MAJESTIC' },
    { idProducto: 15, descripcionProducto: 'SILLA CLUB' },
    { idProducto: 16, descripcionProducto: 'MESA' },
    { idProducto: 17, descripcionProducto: 'MESA BAHIA' },
    { idProducto: 18, descripcionProducto: 'SILLA BAMBINI' },
    { idProducto: 19, descripcionProducto: 'CUBIERTA' },
    { idProducto: 20, descripcionProducto: 'VIDEOGRABADORA' },
    { idProducto: 21, descripcionProducto: 'PIPETA' },
    { idProducto: 22, descripcionProducto: 'REGULADOR' },
    { idProducto: 23, descripcionProducto: 'COLCHONES' },
    { idProducto: 24, descripcionProducto: 'JUEGO DE SALA' },
    { idProducto: 25, descripcionProducto: 'SOFACAMA' },
    { idProducto: 26, descripcionProducto: 'CLOSET' },
    { idProducto: 27, descripcionProducto: 'SOPORTE' },
    { idProducto: 28, descripcionProducto: 'VITRINA' },
    { idProducto: 29, descripcionProducto: 'CONGELADOR' },
    { idProducto: 30, descripcionProducto: 'BIBLIOTECA' },
    { idProducto: 31, descripcionProducto: 'HORNO' },
    { idProducto: 32, descripcionProducto: 'SILLACAMA' },
    { idProducto: 33, descripcionProducto: 'COCINETA' },
    { idProducto: 34, descripcionProducto: 'VENTILADOR' },
    { idProducto: 35, descripcionProducto: 'GABINETE' },
    { idProducto: 36, descripcionProducto: 'CAMPANA' },
    { idProducto: 37, descripcionProducto: 'ARMARIO' },
    { idProducto: 38, descripcionProducto: 'ASPIRADORA' },
    { idProducto: 39, descripcionProducto: 'COMPUTADOR' },
    { idProducto: 40, descripcionProducto: 'BRILLADORA' },
    { idProducto: 41, descripcionProducto: 'VARIOS HOGAR' },
    { idProducto: 42, descripcionProducto: 'AIRE ACONDICIONADO' },
    { idProducto: 43, descripcionProducto: 'ARRENDAMIENTOS' },
    { idProducto: 44, descripcionProducto: 'INSTALACIONES LOCAL' },
    { idProducto: 45, descripcionProducto: 'TRITURADOR' },
    { idProducto: 46, descripcionProducto: 'ALMOHADAS' },
    { idProducto: 47, descripcionProducto: 'IMPLEMENTOS HOGAR' },
    { idProducto: 48, descripcionProducto: 'FILMADORA' },
    { idProducto: 49, descripcionProducto: 'CAMARA FOTOGRAFICA' },
    { idProducto: 50, descripcionProducto: 'SECADORES' },
    { idProducto: 51, descripcionProducto: 'SECADORA' },
    { idProducto: 52, descripcionProducto: 'MAQUINAS' },
    { idProducto: 53, descripcionProducto: 'TELEFONO CELULAR' },
    { idProducto: 54, descripcionProducto: 'TELEFONO INALAMBRICO' },
    { idProducto: 55, descripcionProducto: 'LAMPARA' },
    { idProducto: 56, descripcionProducto: 'ESTUCHE PARA CAMARA DIGITAL' },
    { idProducto: 57, descripcionProducto: 'TARJETA DE MEMORIA' },
    { idProducto: 58, descripcionProducto: 'CARGADOR' },
    { idProducto: 59, descripcionProducto: 'REPRODUCTOR DE MP4' },
    { idProducto: 60, descripcionProducto: 'PUBLICidProductoAD' },
    { idProducto: 61, descripcionProducto: 'INSTALACION' },
    { idProducto: 62, descripcionProducto: 'MUEBLES' },
    { idProducto: 63, descripcionProducto: 'SILLAS' },
    { idProducto: 64, descripcionProducto: 'ESQUINERO' },
    { idProducto: 65, descripcionProducto: 'LICUADORAS' },
    { idProducto: 66, descripcionProducto: 'DVD' },
    { idProducto: 67, descripcionProducto: 'MOTOS' },
    { idProducto: 68, descripcionProducto: 'BICICLETAS' },
    { idProducto: 69, descripcionProducto: 'FAX' },
    { idProducto: 70, descripcionProducto: 'ENFRIADORES' },
    { idProducto: 71, descripcionProducto: 'SISTEMA DE TEATRO EN CASA' },
    { idProducto: 72, descripcionProducto: 'IMPRESORAS' },
    { idProducto: 73, descripcionProducto: 'MESA PARA TV' },
    { idProducto: 74, descripcionProducto: 'JUEGO DE COMEDOR' },
    { idProducto: 75, descripcionProducto: 'CLOSET' },
    { idProducto: 76, descripcionProducto: 'GABINETE COCINA' },
    { idProducto: 77, descripcionProducto: 'JUEGO DE ALCOBAS' },
    { idProducto: 78, descripcionProducto: 'MESA PARA EQUIPO' },
    { idProducto: 79, descripcionProducto: 'CENTRO DE COMPUTO' },
    { idProducto: 80, descripcionProducto: 'CAMA' },
    { idProducto: 81, descripcionProducto: 'CELULARES' },
    { idProducto: 82, descripcionProducto: 'INVENTARIO' },
    { idProducto: 83, descripcionProducto: 'SERVICIOS' },
  ];

  // Lista de vendedores fijos disponibles
  vendedoresFijos: { idVendedor: number; nombreVendedor: string }[] = [
    { idVendedor: 1, nombreVendedor: 'Marlon Vivas' },
    { idVendedor: 2, nombreVendedor: 'Juan Perez' },
    { idVendedor: 3, nombreVendedor: 'Carlos Perez' },
    { idVendedor: 4, nombreVendedor: 'Maria Perez' },
    { idVendedor: 5, nombreVendedor: 'Pedro Perez' },
  ];

  // Objeto que almacena los datos del nuevo producto
  public producto: {
    descripcion: string;
    codigo: string;
    idCategoriaProducto: number;
    vendedorFijo: string;
  } = {
    descripcion: '',
    codigo: '',
    idCategoriaProducto: 0,
    vendedorFijo: '',
  };

  constructor(
    private router: Router,
    private productoService: ProductosService // Inyecta el servicio ProductosService para manejar operaciones con productos
  ) {}

  ngOnInit(): void {}

  // Método que se ejecuta al enviar el formulario
  onFormSubmit() {
    // Verifica si la descripción del producto está vacía o es nula
    if (this.producto.descripcion == '' || this.producto.descripcion == null) {
      Swal.fire('Error', 'La descripción es requerida', 'error');
      return; // Sale de la función si la descripción es inválida
    }
    // Verifica si el código del producto está vacío o es nulo
    if (this.producto.codigo == '' || this.producto.codigo == null) {
      Swal.fire('Error', 'El código es requerido', 'error');
      return; // Sale de la función si el código es inválido
    }
    // Verifica si la categoría del producto está seleccionada
    if (
      this.producto.idCategoriaProducto == 0 ||
      this.producto.idCategoriaProducto == null
    ) {
      Swal.fire('Error', 'Categoria requerida', 'error');
      return; // Sale de la función si la categoría es inválida
    }
    // Verifica si un vendedor fijo ha sido seleccionado
    if (
      this.producto.vendedorFijo == '' ||
      this.producto.vendedorFijo == null
    ) {
      Swal.fire('Error', 'Elija un vendedor', 'error');
      return; // Sale de la función si no hay vendedor seleccionado
    }

    // Llama al servicio para agregar un nuevo producto
    this.productoService?.añadirProducto(this.producto)?.subscribe(
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
    this.router.navigate(['dashboard-a2configuraciones/inicio']); // Redirige al usuario a la página de inicio
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.producto = {
      descripcion: '', // Resetea la descripción
      codigo: '', // Resetea el código
      idCategoriaProducto: 0, // Resetea la categoría
      vendedorFijo: '', // Resetea el vendedor
    };
  }
}
