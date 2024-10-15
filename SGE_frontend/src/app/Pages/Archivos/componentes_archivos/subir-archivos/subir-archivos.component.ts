import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('fileInput') fileInput!: ElementRef;

  // VARIABLES
  botonComenzar: boolean = true
  botonCedula: boolean = false
  botonGuardar: boolean = false
  cedula: string = ''
  tabla: boolean = false
  background_color: string = '#960010'
  width: number = 0
  display: string = 'none'
  tipoArchivo: string = ''
  cantidadArchivos: number = 0
  disabledSelect: boolean = false
  disabledCargar: boolean = false
  numeroObligacion: string = ''

  // ARRAYS
  obligacion: Obligacion[] = []
  tiposArchivos: TipoArchivo[] = []
  tiposArchivosSelected: string[] = []
  numeroObligacionRecibida: String = '';

  // OBJETOSs
  archivo: Archivo = {
    numeroObligacion: '',
    base64: [],
    username: ''
  }

  base64: Base64 = { 
    base46: [],
    tipoArchivo: '',
    nombreArchivo: ''
  }

  constructor(private ingresarService: IngresarService, private subirService: SubirArchivoService, private authService: AuthenticationService, private tipoArchivoService: TipoArchivoService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllTipoArchivo()
    setTimeout(() => {
      this.subirService.currentData.subscribe(data => {
        if (data) {
          this.numeroObligacionRecibida = data;
          this.numeroO(this.numeroObligacion, '');
          console.log('obligacion recibida:', this.numeroObligacionRecibida);
        }
      });
    }, 300);
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
        this.display = 'block'
        Swal.fire({
          icon: 'success',
          title: 'Archivos',
          text: 'Seleccione los Archivos Correspondientes',
          timer: 2500
        })
        break;
      case 'PAGARE':
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
    this.display = 'block'
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    this.archivo.base64 = Array.from({ length: this.tiposArchivos.length }, (_, index) => ({
      base46: [],
      tipoArchivo: this.tiposArchivos[index].tipoArchivo,
      nombreArchivo: ''
    }));

    this.archivo.numeroObligacion = obligacion
    this.archivo.username = user
    if (this.numeroObligacionRecibida == null) {
      this.isEmpty(obligacion, accion)
    }else{
      this.botonComenzar = false
      this.botonCedula = false
    }
    console.log(this.archivo);
  }

  selectArchivos(event: any) {
    if (event.target.value != '') {
      this.disabledSelect = true
    }
  }

  cancelarArchivos() {
    var pos = this.archivo.base64.findIndex((a: Base64) => a.tipoArchivo = this.tipoArchivo)
    this.archivo.base64[pos].base46 = []
    this.cantidadArchivos = 0
    this.disabledSelect = false
    this.disabledCargar = true
    this.fileInput.nativeElement.value = '';
    console.log(this.archivo);
  }

  cargarArchivos() {
    console.log(this.tiposArchivosSelected);
    
    if (!this.tiposArchivosSelected.includes(this.tipoArchivo)) {
      this.width = this.width + Math.round(100 / this.tiposArchivos.length)
      this.tiposArchivosSelected.push(this.tipoArchivo)
    }
    this.tipoArchivo = ''
    this.disabledSelect = false //cambiar a false
    this.disabledCargar = false
    this.cantidadArchivos = 0
    Swal.fire({
      icon: 'success',
      title: 'Datos Guardados',
      text: 'Archivos Cargados',
      timer: 2500
    })
    console.log(this.tiposArchivosSelected);
  }

  obtenerFile(event: any) {
    const archivo = event.target as HTMLInputElement;
    if (this.tipoArchivo != '') {
 
      // if (archivo.size > 1048576) {
      //   Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      //   this.base64.base46 = []
      //   return
      // }

      if (archivo.files) {
        var pos = this.archivo.base64.findIndex((a: Base64) => a.tipoArchivo == this.tipoArchivo)

        if (this.archivo.base64[pos].base46.length > 0) {
          this.archivo.base64[pos].base46 = []
        }

        for (let i = 0; i < archivo.files.length; i++) {
          this.extraerBase64(archivo.files[i]).then((file: any) => {
            console.log(file);
            this.archivo.base64[pos].base46.push(file.base);
            this.archivo.base64[pos].nombreArchivo = 'ARCHIVO';
          })
        }
        this.cantidadArchivos = archivo.files.length
        if (this.cantidadArchivos > 0) {
          this.disabledCargar = false
        }
      }
      this.disabledSelect = true
      console.log(this.archivo);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acción Inválida',
        text: 'Seleccione el tipo de Archivo',
        timer: 2500
      })
      archivo.value = ''
    }
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
    console.log(this.archivo);

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
          Swal.fire('Error', 'Esta Obligacion Ya Contiene Archivos, Puedes visualizarlos A continuación', 'error')
          setTimeout(() => {
            this.router.navigate(['/dashboard-archivos/buscar-archivos'])
          }, 3000);
        }
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  triggerFileInput(input: string): void {
    const fileInput = document.getElementById(input) as HTMLInputElement;
    fileInput.click();
  }

}
