import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-pago',
  templateUrl: './detalles-pago.component.html',
  styleUrls: ['./detalles-pago.component.css']
})
export class DetallesPagoComponent implements OnInit {

  transaccion: any = null;
  spinner: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.spinner = true
    
    this.transaccion = history.state.transaccion;
    if (!this.transaccion) {
      const guardada = localStorage.getItem('transaccionSeleccionada');
      if (guardada) this.transaccion = JSON.parse(guardada);
    }
    if (!this.transaccion) {
      this.router.navigate(['/dashboard-consignaciones/ver-transaccion']);
    }
  }

  traducirEstado(estado: string): string {
    switch (estado) {
      case 'APPROVED':
        return 'APROBADO';
      case 'DECLINED':
        return 'RECHAZADO';
      case 'VOIDED':
        return 'TRANSACCIÓN ANULADA';
      default:
        return estado;
    }
  }

  medioPago(medioPago: string): any {
    switch (medioPago) {
      case 'CARD':
        return 'TARJETA';
    }
  }
  
  volver(): void {
    this.router.navigate(['/dashboard-consignaciones/ver-transaccion']);
  }

}
