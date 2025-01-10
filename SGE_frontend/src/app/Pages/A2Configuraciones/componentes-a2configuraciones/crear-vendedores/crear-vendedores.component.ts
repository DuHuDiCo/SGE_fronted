import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-vendedores',
  templateUrl: './crear-vendedores.component.html',
  styleUrls: ['./crear-vendedores.component.css'],
})
export class CrearVendedoresComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit() {
    Swal.fire({
      icon: 'success',
      title: 'Vendedor agregado',
      showConfirmButton: false,
      timer: 1000,
    });

    this.router.navigate(['dashboard-a2configuraciones/inicio']);
  }

  onVolver() {  
    this.router.navigate(['dashboard-a2configuraciones/inicio']);
  }
}
