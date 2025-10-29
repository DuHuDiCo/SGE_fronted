import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.datosUsuario = navigation.extras.state['datosUsuario'] || null;
      this.valorEditable = navigation.extras.state['valorEditable'] || false;

      this.linkPago = this.datosUsuario?.id || this.datosUsuario?.linkPago || '';

      localStorage.setItem('datosUsuario', JSON.stringify(this.datosUsuario));
      console.log(" Datos recibidos:", this.datosUsuario);
    }
  }

  ngOnInit(): void {
   
    if (!this.datosUsuario) {
      const datosGuardados = localStorage.getItem('datosUsuario');

      if (datosGuardados) {
        this.datosUsuario = JSON.parse(datosGuardados);

       
        this.linkPago =
          this.datosUsuario?.payment_link ||
          this.datosUsuario?.linkPago ||
          '';

        console.log(' Datos restaurados desde localStorage:', this.datosUsuario);
      } else {
        this.router.navigate(['dashboard-consignaciones/crear-link']);
        return;
      }
    }

    let activeStatus: any = undefined;
    
    if (this.datosUsuario && this.datosUsuario.data && this.datosUsuario.data.active !== undefined) {
      activeStatus = this.datosUsuario.data.active;
    }
    
    else if (this.datosUsuario && this.datosUsuario.active !== undefined) {
      activeStatus = this.datosUsuario.active;
    }
    
    if (!this.datosUsuario.data) {
      this.datosUsuario.data = {};
    }

    if (activeStatus !== undefined) {
      
      const isLinkActive = activeStatus === true || activeStatus === 'true';
      this.datosUsuario.data.active = isLinkActive;
    } else {
     
      this.datosUsuario.data.active = true;
    }
   
    this.actualizarTotal();
  }

  actualizarTotal(): void {
    this.precioamount_in_cents = this.datosUsuario.amount_in_cents
      ?? this.datosUsuario.data?.amount_in_cents
      ?? null;

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
    localStorage.removeItem('datosUsuario');
    this.router.navigate(['dashboard-consignaciones/crear-link']);
  }
  
  desactivarLink(): void {
    if (!this.linkPago) {
      Swal.fire({
        icon: 'warning',
        title: 'No hay link para desactivar',
      });
      return;
    }

    Swal.fire({
      title: '¿Deseas desactivar este link?',
      text: 'Una vez desactivado, el cliente no podrá usarlo para pagar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
 
        const partes = this.linkPago.split('/');
        const idLink = partes[partes.length - 1];

        if (!idLink) {
          Swal.fire({
            icon: 'error',
            title: 'No se encontró ID en linkPago',
            text: 'Verifica que linkPago contenga un ID válido.'
          });
          return;
        }

        const payload = {
          payment_link_id: idLink,
          active: false
        };

        console.log("Enviando al backend para desactivar link:", payload);

        this.http.patch('http://192.168.1.241:8025/api/v1/wompi/payment_links/active', payload)
          .subscribe({
            next: (respuesta) => {
              console.log("Link desactivado correctamente:", respuesta);

            
              if (this.datosUsuario && this.datosUsuario.data) {
                this.datosUsuario.data.active = false;
                localStorage.setItem('datosUsuario', JSON.stringify(this.datosUsuario));
              }
          
              Swal.fire({
                icon: 'success',
                title: 'Link desactivado correctamente',
                text: 'El enlace ya no está disponible para pagos.'
              }).then(() => {
                localStorage.removeItem('datosUsuario'); 
                this.router.navigate(['dashboard-consignaciones/crear-link']);
              });
             
            },
            error: (err) => {
              console.error("Error al desactivar el link:", err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo desactivar el link. Intenta de nuevo.'
              });
            }
          });
      }
    });
  }

  /**
   * Copiar el link al portapapeles
   */
  copiarLink(): void {
    if (!this.linkPago) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'No hay link para copiar'
      });
      return;
    }

    const tempInput = document.createElement('input');
    tempInput.value = this.linkPago;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      Swal.fire({
        icon: 'success',
        title: '¡Copiado!',
        text: 'El link de pago ha sido copiado al portapapeles',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo copiar el link. Inténtalo de nuevo'
      });
    } finally {
      document.body.removeChild(tempInput);
    }
  }
}
