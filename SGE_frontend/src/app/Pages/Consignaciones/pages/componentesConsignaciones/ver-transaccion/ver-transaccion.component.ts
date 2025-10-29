import { Component, OnInit } from '@angular/core';
import { WompiService } from 'src/app/Services/Consignaciones/Wompi/wompi.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-transaccion',
  templateUrl: './ver-transaccion.component.html',
  styleUrls: ['./ver-transaccion.component.css']
})
export class VerTransaccionComponent implements OnInit {
  filtro = {
    dateInicio: '',
    dateFin: '',
    page: 1,
    size: 10
  };

  totalPaginas: number = 0;
  spinner: boolean = false;
  transacciones: any[] = [];

  constructor(private wompi: WompiService, private router: Router) {}

  ngOnInit(): void {
    this.setDefaultDates();
    this.getTransactions();
  }

  setDefaultDates() {
    const hoy = new Date();
    const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    this.filtro.dateInicio = primerDia.toISOString().split('T')[0];
    this.filtro.dateFin = ultimoDia.toISOString().split('T')[0];
  }

  getTransactions() {
    this.spinner = true;

    const inicio = `${this.filtro.dateInicio} 00:00:00.000000`;
    const fin = `${this.filtro.dateFin} 23:59:59.999999`;

    const filtroParaBackend = {
      dateInicio: inicio,
      dateFin: fin,
      page: this.filtro.page,
      size: this.filtro.size
    };

    console.log('Enviando al backend:', filtroParaBackend);

    this.wompi.getTransactions(filtroParaBackend).subscribe({
      next: (resp: any) => {
        console.log('Respuesta del backend:', resp);

        this.transacciones = Array.isArray(resp.data)
          ? resp.data.map((t: any) => ({
              ...t,
              from_date: t.from_date ? t.from_date.replace(' ', 'T') : null,
              until_date: t.until_date ? t.until_date.replace(' ', 'T') : null
            }))
          : [];

        this.totalPaginas = resp.meta
          ? Math.ceil(resp.meta.total_results / this.filtro.size)
          : 1;

        this.spinner = false;
      },
      error: (err) => {
        this.spinner = false;
        this.transacciones = [];
        console.error('Error desde backend:', err);
      }
    });
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

  aplicarFiltro() {
    const inicio = new Date(this.filtro.dateInicio);
    const fin = new Date(this.filtro.dateFin);
    if (fin < inicio) {
      Swal.fire('Error', 'La fecha final debe ser posterior o igual a la fecha inicio', 'error');
      return;
    }

    this.filtro.page = 1;
    this.getTransactions();
  }

  cambiarPagina(page: number) {
    if (page < 1 || page > this.totalPaginas) return;

    this.filtro.page = page;
    this.getTransactions();
  }

  verDetalles(transaccion: any): void {
  
  this.router.navigate(['/dashboard-consignaciones/detalles-pago'], { state: { transaccion } });
 
} 

  trackById(index: number, item: any) {
    return item.id ?? index;
  }
}
