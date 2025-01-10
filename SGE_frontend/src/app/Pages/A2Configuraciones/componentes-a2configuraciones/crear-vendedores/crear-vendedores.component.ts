import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-vendedores',
  templateUrl: './crear-vendedores.component.html',
  styleUrls: ['./crear-vendedores.component.css'],
})
export class CrearVendedoresComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onFormSubmit() {
    Swal.fire({
      icon: 'success',
      title: 'Vendedor agregado',
      showConfirmButton: false,
      timer: 1000,
    });
  }
}
