import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { IngresarService } from 'src/app/Services/Consignaciones/IngresarConsignaciones/ingresar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Archivo, Base64 } from 'src/app/Types/Archivo/Archivos';
import { TipoArchivo } from 'src/app/Types/Archivo/TipoArchivo';
import { Obligacion } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css']
})
export class SubirArchivosComponent implements OnInit {

  botonComenzar: boolean = true
  botonCedula: boolean = false
  botonFactura: boolean = false
  botonCredito: boolean = false
  botonAutorizacion: boolean = false
  datosPersonales: boolean = false
  botonCedulaCliente: boolean = false
  botonCedulaCodeudor: boolean = false
  botonPagare: boolean = false
  botonGuardar: boolean = false
  cedula: string = ''
  tabla: boolean = false
  background_color: string = '#960010'
  width: number = 0
  display: string = 'none'

  obligacion: Obligacion[] = []
  nombresArchivos: string[] = []
  numeroObligacion: string = ''

  archivo: Archivo = {
    numeroObligacion: '',
    username: '',
    base64: []
  }

  base64: Base64 = {
    base46: '',
    tipoArchivo: '',
    nombreArchivo: ''
  }

  tiposArchivos: TipoArchivo[] = []


  constructor(private ingresarService: IngresarService, private subirService: SubirArchivoService, private authService: AuthenticationService, private tipoArchivoService: TipoArchivoService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllTipoArchivo()
  }

  cambiarInputs(accion: string) {
    switch (accion) {
      case 'COMENZAR':
        this.botonComenzar = false
        this.botonCedula = true
        Swal.fire({
          icon: 'success',
          title: 'El Proceso Ha Comenzado',
          text: 'Digite la Información Correspondiente',
          timer: 2500
        })
        break;
      case 'CEDULA':
        this.botonCedula = false
        this.botonCredito = true
        this.display = 'block'
        Swal.fire({
          icon: 'info',
          title: 'Paso #1 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
      case 'CREDITO':
        if (this.archivo.base64.length == 0) {
          Swal.fire('Error', 'Seleccione El Crédito Correspondiente', 'error')
          return
        } else {
          this.botonCredito = false
          this.botonFactura = true
          this.width = this.width + Math.round(100 / this.tiposArchivos.length)
          Swal.fire({
            icon: 'info',
            title: 'Paso #2 Completado',
            text: 'Seleccione el Archivo Correspondiente',
            timer: 2500
          })
        }
        break;
      case 'FACTURA':
        this.botonFactura = false
        this.botonAutorizacion = true
        this.width = this.width + Math.round(100 / this.tiposArchivos.length)
        Swal.fire({
          icon: 'info',
          title: 'Paso #3 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;

      case 'AUTORIZACION':
        this.botonAutorizacion = false
        this.datosPersonales = true
        this.width = this.width + Math.round(100 / this.tiposArchivos.length)
        Swal.fire({
          icon: 'info',
          title: 'Paso #4 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
      case 'DATOSPERSONALES':
        this.datosPersonales = false
        this.botonCedulaCliente = true
        this.width = this.width + Math.round(100 / this.tiposArchivos.length)
        Swal.fire({
          icon: 'info',
          title: 'Paso #5 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
      case 'CEDULACLIENTE':
        this.botonCedulaCliente = false
        this.botonCedulaCodeudor = true
        this.width = this.width + Math.round(100 / this.tiposArchivos.length)
        Swal.fire({
          icon: 'info',
          title: 'Paso #6 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
      case 'CEDULACODEUDOR':
        this.botonCedulaCodeudor = false
        this.botonPagare = true
        this.width = this.width + Math.round(100 / this.tiposArchivos.length)
        Swal.fire({
          icon: 'info',
          title: 'Paso #7 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
      case 'PAGARE':
        this.botonPagare = false
        this.botonGuardar = true
        this.width = this.width + Math.round(100 / this.tiposArchivos.length)
        this.display = 'none'
        Swal.fire({
          icon: 'success',
          title: 'Paso #8 Completado',
          text: 'El Registro se Ha Completado',
          timer: 2500
        })
        break;
    }
  }

  getObligacionByCedula() {

    const cedula = this.cedula.trim()
    if (this.cedula.trim() == '' || isNaN(parseInt(cedula))) {
      Swal.fire('Error', 'Debe de Ingresar una Cédula Válida', 'error')
      return
    }

    this.ingresarService.getObligacionByCedula(this.cedula).subscribe(
      (data: any) => {
        this.obligacion = data
        if (this.obligacion.length > 0) {
          this.tabla = true
          Swal.fire({
            icon: 'success',
            title: 'Estas Son Las Obligaciones Encontradas',
            text: 'Seleccione Una Para Continuar',
            timer: 2500
          })
          return
        }
        if (this.obligacion.length <= 0) {
          Swal.fire('Error', 'Digite Una Cédula Válida', 'error')
          this.tabla = false
          this.cedula = ''
          return
        }
      }, (error: any) => {
        Swal.fire('Error', 'Error Al Traer Las Obligaciones', 'error')
        this.cedula = ''

      }
    )
  }

  getAllTipoArchivo() {
    this.tipoArchivoService.getAll().subscribe(
      (data: any) => {
        this.tiposArchivos = data
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  numeroO(obligacion: string, accion: string) {
    this.archivo.numeroObligacion = obligacion

    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.archivo.username = user

    this.isEmpty(obligacion, accion)
  }

  obtenerFile(event: any, tipoArchivo: TipoArchivo) {
    var archivo = event.target.files[0];

    if (archivo.size > 1048576) {
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      this.base64.base46 = ''
      return
    }

    this.archivo.base64.forEach((element: any, index: number) => {
      if (element.tipoArchivo == tipoArchivo) {
        this.archivo.base64.splice(index, 1)
        this.nombresArchivos.splice(index, 1)
      }
    });

    this.extraerBase64(archivo).then((file: any) => {
      this.nombresArchivos.push(archivo.name)
      this.base64.base46 = file.base;
      this.base64.tipoArchivo = tipoArchivo.tipoArchivo
      this.base64.nombreArchivo = archivo.name
      this.archivo.base64.push(this.base64)
      this.base64 = {
        base46: '',
        tipoArchivo: '',
        nombreArchivo: ''
      }

    })
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
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

  save() {
    this.subirService.save(this.archivo).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Archivos Guardados Exitosamente',
          timer: 2500
        })
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Guardar Los Archivos',
          timer: 2500
        })
        console.log(error);
      }
    )
  }

  isEmpty(obligacion: string, accion: string) {
    this.subirService.isEmpty(obligacion).subscribe(
      (data: any) => {
        if (data) {
          this.cambiarInputs(accion)
        } else {
          Swal.fire('Error', 'Esta Obligacion Ya Contiene Archivos, Puede Subirlos A continuación', 'error')
          setTimeout(() => {
            this.router.navigate(['/dashboard-archivos/buscar-archivos'])
          }, 3000);
        }
      }, (error: any) => {
        console.log(error);
      }
    )
  }

}
