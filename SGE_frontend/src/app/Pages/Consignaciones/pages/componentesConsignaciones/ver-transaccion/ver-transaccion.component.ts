import { Component, OnInit } from '@angular/core';
import { WompiService } from 'src/app/Services/Consignaciones/Wompi/wompi.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

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

  constructor(private wompi: WompiService) { }

  ngOnInit(): void {
    this.setDefaultDates();
    this.getTransactions();
  }

  setDefaultDates() {
    const hoy = new Date();
    const primerDia = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    this.filtro.dateInicio = formatDate(primerDia, 'yyyy-MM-dd', 'en-US');
    this.filtro.dateFin    = formatDate(ultimoDia, 'yyyy-MM-dd', 'en-US');
  }

  getTransactions() {
    this.spinner = true;

    const filtroParaBackend = {
      ...this.filtro,
      page: this.filtro.page 
    };

    console.log('Enviando al backend:', filtroParaBackend);

    this.wompi.getTransactions(filtroParaBackend).subscribe({
      next: (resp: any) => {
        this.transacciones = Array.isArray(resp.content) ? resp.content : [];
        this.totalPaginas   = resp.totalPages || 0;
        this.spinner        = false;
      },
      error: (err) => {
        this.spinner        = false;
        this.transacciones  = [];
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error cargando transacciones'
        });
      }
    });
  }

  aplicarFiltro() {
    
    const inicio = new Date(this.filtro.dateInicio);
    const fin    = new Date(this.filtro.dateFin);
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

  trackById(index: number, item: any) {
    return item.id ?? index;
  }
}
