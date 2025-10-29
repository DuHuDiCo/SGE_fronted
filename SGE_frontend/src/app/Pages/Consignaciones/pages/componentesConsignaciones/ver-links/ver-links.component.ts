import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { WompiService } from 'src/app/Services/Consignaciones/Wompi/wompi.service';

interface Link {
  payment_link: string;
  data: any;
  creation_date: string;
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

  constructor(
    private http: HttpClient,
    private wompiService: WompiService
  ) {}

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

  
  desactivarLink(linkCompleto: string): void {
    if (!linkCompleto) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay link para desactivar',
      });
      return;
    }

    // Extraer el ID desde la URL (último segmento)
    const partes = linkCompleto.split('/');
    const id = partes[partes.length - 1];

    if (!id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró un ID válido en el link.'
      });
      return;
    }

    

    Swal.fire({
      title: '¿Deseas desactivar este link?',
      text: 'El cliente no podrá usarlo para pagar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.spinner = true;
        console.log('Enviando al backend para desactivar link:', id);

        // Llamamos al servicio
        this.wompiService.desactivarLink(id).subscribe({
          next: (respuesta) => {
            console.log('Link desactivado correctamente:', respuesta);

            this.spinner = false;
            Swal.fire({
              icon: 'success',
              title: 'Link desactivado correctamente',
              text: 'El enlace ya no está disponible para pagos.'
            });

            //  Actualizamos la lista quitando el link desactivado
            this.links = this.links.filter(l => !l.payment_link.includes(id));
          },
          error: (err) => {
            this.spinner = false;
            console.error('Error al desactivar el link:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error al desactivar el link',
              text: 'No se pudo desactivar el link. Intenta de nuevo.'
            });
          }
        });
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
