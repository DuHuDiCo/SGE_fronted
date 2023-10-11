import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
import { IngresarService } from 'src/app/Services/Consignaciones/IngresarConsignaciones/ingresar.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Archivo, Base64 } from 'src/app/Types/Archivo/Archivos';
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
  botonPagare: boolean = false
  botonGuardar: boolean = false
  cedula: string = ''
  tabla: boolean = false
  background_color: string = '#960010'
  width: number = 10
  display: string = 'none'

  obligacion: Obligacion[] = []
  nombresArchivos:string[] = []
  numeroObligacion: string = ''

  archivo: Archivo = {
    numeroObligacion: '',
    username: '',
    base64: []
  }

  base64: Base64 = {
    base46: '',
    tipoArchivo: ''
  }


  constructor(private ingresarService: IngresarService,private subirService:SubirArchivoService , private authService: AuthenticationService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  cambiarInputs(accion: string) {
    switch (accion) {
      case 'COMENZAR':
        this.botonComenzar = false
        this.botonCedula = true
        console.log(this.archivo);
        Swal.fire({
          icon: 'success',
          title: 'El Proceso Ha Comenzado',
          text: 'Digite la Información Correspondiente',
          timer: 2500
        })
        break;
      case 'CEDULA':
        this.botonCedula = false
        this.botonFactura = true
        this.display = 'block'
        Swal.fire({
          icon: 'info',
          title: 'Paso #1 Completado',
          text: 'Seleccione el Archivo Correspondiente',
          timer: 2500
        })
        break;
      case 'FACTURA':
        if (this.archivo.base64.length == 0) {
          Swal.fire('Error', 'Seleccione La Factura Correspondiente', 'error')
          return
        } else {
          this.botonFactura = false
          this.botonCredito = true
          this.width = 20
          Swal.fire({
            icon: 'info',
            title: 'Paso #2 Completado',
            text: 'Seleccione el Archivo Correspondiente',
            timer: 2500
          })
        }

        break;
      case 'CREDITO':
        if (this.archivo.base64.length <= 1) {
          Swal.fire('Error', 'Seleccione El Crédito Correspondiente', 'error')
          return
        } else {
          this.botonCredito = false
          this.botonAutorizacion = true
          this.width = 40
          Swal.fire({
            icon: 'info',
            title: 'Paso #3 Completado',
            text: 'Seleccione el Archivo Correspondiente',
            timer: 2500
          })
        }
        break;
      case 'AUTORIZACION':
        if (this.archivo.base64.length <= 2) {
          Swal.fire('Error', 'Seleccione La Autorización Correspondiente', 'error')
          return
        } else {
          this.botonAutorizacion = false
          this.datosPersonales = true
          this.width = 60
          Swal.fire({
            icon: 'info',
            title: 'Paso #4 Completado',
            text: 'Seleccione el Archivo Correspondiente',
            timer: 2500
          })
        }

        break;
      case 'DATOSPERSONALES':
        if (this.archivo.base64.length <= 3) {
          Swal.fire('Error', 'Seleccione El Tratamiento de Datos Correspondiente', 'error')
          return
        } else {
          this.datosPersonales = false
          this.botonCedulaCliente = true
          this.width = 80
          Swal.fire({
            icon: 'info',
            title: 'Paso #5 Completado',
            text: 'Seleccione el Archivo Correspondiente',
            timer: 2500
          })
        } 
        break;
      case 'CEDULACLIENTE':
        if (this.archivo.base64.length <= 4) {
          Swal.fire('Error', 'Seleccione La Cédula Correspondiente', 'error')
          return
        } else {
          this.botonCedulaCliente = false
          this.botonPagare = true
          this.width = 90
          Swal.fire({
            icon: 'info',
            title: 'Paso #6 Completado',
            text: 'Seleccione el Archivo Correspondiente',
            timer: 2500
          })
        }
        break;
      case 'PAGARE':
        if (this.archivo.base64.length <= 5) {
          Swal.fire('Error', 'Seleccione El Pagaré Correspondiente', 'error')
          return
        } else {
          this.botonPagare = false
          this.botonGuardar = true
          this.width = 100
          this.display = 'none'
          Swal.fire({
            icon: 'success',
            title: 'Paso #7 Completado',
            text: 'El Registro se Ha Completado',
            timer: 2500
          })
        }
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
        console.log(data);
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

  numeroO(obligacion: string, accion: string) {
    this.archivo.numeroObligacion = obligacion
    this.cambiarInputs(accion)
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.archivo.username = user
  }

  public obtenerFile(event: any, tipoArchivo: string) {
    var archivo = event.target.files[0];
    
    if (archivo.size > 1048576) {
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      this.base64.base46 = ''
      return
    }

    this.archivo.base64.forEach((element:any, index:number) => {
      if(element.tipoArchivo == tipoArchivo){
        this.archivo.base64.splice(index, 1)
        this.nombresArchivos.splice(index, 1)
      }
    });

    this.extraerBase64(archivo).then((file: any) => {
      this.nombresArchivos.push(archivo.name)
      this.base64.base46 = file.base;
      this.base64.tipoArchivo = tipoArchivo
      this.archivo.base64.push(this.base64)
      this.base64 = {
        base46: '',
        tipoArchivo: ''
      }
      console.log(this.archivo);
      console.log(this.nombresArchivos);

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

  save(){
    this.subirService.save(this.archivo).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'Archivos Guardados Exitosamente',
          timer: 2500
        })
      }, (error:any) => {
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

}
