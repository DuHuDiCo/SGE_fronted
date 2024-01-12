import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-firmas',
  templateUrl: './firmas.component.html',
  styleUrls: ['./firmas.component.css']
})
export class FirmasComponent implements OnInit {

  constructor(private cuentasCobrar:CuentasCobrarService, private sanitizer: DomSanitizer, private authService:AuthenticationService) { }

  firmasArray:any[] = []
  asesores:any[] = []

  firma:any = {
    base64: "",
    username: ""
  }

  crearFirma:boolean = false

  ngOnInit(): void {
    this.getAll()
    this.getAsesores()
  }

  getAll(){
    this.cuentasCobrar.getAllFirmas().subscribe(
      (data:any) => {
        this.firmasArray = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  save(){
    
    if(this.firma.base64 == '' || this.firma.base64 == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione Un Archivo',
        timer: 2500
      })
      return
    }

    this.crearFirma = true

    this.cuentasCobrar.saveFirma(this.firma).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Firma Guardada Con Éxito',
          timer: 2500
        })
        this.crearFirma = false
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }, (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Guardar La Imagen',
          timer: 2500
        })
        this.crearFirma = true
        console.log(error);
      }
    )
  }

  getAsesores(){
    this.cuentasCobrar.getAsesoresCartera().subscribe(
      (data:any) => {
        this.asesores = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  obtenerArchivo(event: any) {
    var archivo = event.target.files[0];

    if (archivo.size > 10000048576) {
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      this.firma.base64 = ''
      return
    }

    this.extraerBase64(archivo).then((file: any) => {
      this.firma.base64 = file.base;
    })
    
  }

  public extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

}
