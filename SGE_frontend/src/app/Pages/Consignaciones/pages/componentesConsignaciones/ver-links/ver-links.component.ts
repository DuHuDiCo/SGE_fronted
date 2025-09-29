import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Link {
  payment_link: string;
  data: any,
  creation_date: string
}

@Component({
  selector: 'app-ver-links',
  templateUrl: './ver-links.component.html',
  styleUrls: ['./ver-links.component.css']
})
export class VerLinksComponent implements OnInit {

  links: Link[] = [];
  spinner = false;
  page = 1;
  size = 10;
  totalPaginas = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarLinks();
  }

  cargarLinks() {
    this.spinner = true;
    this.http.get<Link[]>('http://192.168.1.241:8025/api/v1/wompi/payment_links')
      .subscribe({
        next: (data) => {
          console.log(" Respuesta backend:", data);
          this.links = data;
          this.totalPaginas = Math.ceil(this.links.length / this.size);
          this.spinner = false;
        },
        error: (err) => {
          console.error('Error cargando links:', err);
          this.spinner = false;
        }
      });
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.page = nuevaPagina;
    }
  }

copiarLink(link: string): void {
  if (!link) {
    Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: 'No hay link para copiar'
    });
    return;
  }

  navigator.clipboard.writeText(link).then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Copiado!',
      text: 'El link de pago ha sido copiado al portapapeles',
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }).catch(() => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo copiar el link. Inténtalo de nuevo'
    });
  });
}


  trackByLink(index: number, item: Link): string {
      return item.payment_link;
    }
}