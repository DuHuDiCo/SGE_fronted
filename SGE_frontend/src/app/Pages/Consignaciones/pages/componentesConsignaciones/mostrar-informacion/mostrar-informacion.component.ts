import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WompiService } from 'src/app/Services/Consignaciones/Wompi/wompi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-informacion',
  templateUrl: './mostrar-informacion.component.html',
  styleUrls: ['./mostrar-informacion.component.css']
})
export class MostrarInformacionComponent implements OnInit {

  datosUsuario: any = null;
  precioamount_in_cents: number | null = null;
  clienteEstablece: boolean = false;
  totalTexto: string = 'Total a cobrar: COP $0';
  linkPago: string = '';
  precioMostrar: string = '0.00';
  valorEditable: boolean = false;

  constructor(private router: Router, private wompiService: WompiService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datosUsuario = navigation.extras.state['datosUsuario'] || null;
      this.valorEditable = navigation.extras.state['valorEditable'] || false;
      this.linkPago = this.datosUsuario?.linkPago || '';
      console.log(" Datos recibidos:", this.datosUsuario);
      console.log(" Link recibido:", this.linkPago);
    }
  }

  ngOnInit(): void {
    if (!this.datosUsuario) {
      this.router.navigate(['dashboard-consignaciones/crear-link']);
    } else {
      this.actualizarTotal();
    }
  }

  actualizarTotal(): void {
    this.precioamount_in_cents = this.datosUsuario.amount_in_cents ?? null;

    if (this.precioamount_in_cents !== null) {
      this.precioMostrar = (this.precioamount_in_cents / 100).toFixed(2);
    } else {
      this.precioMostrar = '0.00';
    }

    if (this.clienteEstablece) {
      this.totalTexto = 'Total a cobrar: El cliente establece el precio';
    } else if (this.precioamount_in_cents) {
      const formatted = new Intl.NumberFormat('es-CO').format(this.precioamount_in_cents);
      this.totalTexto = `Total a cobrar: COP $${formatted}`;
    } else {
      this.totalTexto = 'Total a cobrar: COP $0';
    }
  }

  volver(): void {
    this.router.navigate(['dashboard-consignaciones/crear-link']);
  }

  copiarLink(): void {
    if (!this.linkPago) {
      Swal.fire({ 
        icon: 'warning',
        title: 'Atención', 
        text: 'No hay link para copiar' });
      return;
    }

    navigator.clipboard.writeText(this.linkPago).then(() => {
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


  // desactivarLink(): void {
  //   if (!this.linkPago) return;

  //   this.wompiService.desactivarLink(this.linkPago).subscribe({
  //     next: () => {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Desactivado',
  //         text: 'El link ha sido desactivado correctamente'
  //       });
  //       // Marcar como inactivo en frontend y limpiar link
  //       this.datosUsuario.linkActivo = false;
  //       this.linkPago = '';
  //     },
  //     error: () => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'No se pudo desactivar el link'
  //       });
  //     }
  //   });
  // }

  /**
   * verificarEstadoLink
   * Verifica si el link sigue activo en backend
   * - Si está vencido o inactivo, actualiza la UI y muestra alerta
   */
  // verificarEstadoLink(): void {
  //   if (!this.linkPago) return;

  //   this.wompiService.estadoLink(this.linkPago).subscribe({
  //     next: (res: any) => {
  //       if (!res.activo) {
  //         Swal.fire({
  //           icon: 'warning',
  //           title: 'Link vencido o inactivo',
  //           text: 'Este link ya no se puede usar.'
  //         });
  //         this.linkPago = '';
  //         this.datosUsuario.linkActivo = false;
  //       }
  //     }
  //   });
  // }
}