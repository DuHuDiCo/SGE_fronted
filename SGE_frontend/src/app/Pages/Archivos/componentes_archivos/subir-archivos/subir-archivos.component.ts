import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  background_color: string = '#960010'
  width: number = 0
  display: string = 'none'
  tipoArchivo: string = ''
  cantidadArchivos: number = 0
  disabledSelect: boolean = false
  disabledCargar: boolean = true
  disabledVer: boolean = true
  numeroObligacion: string = ''

  // ARRAYS
  archivos:any[] = []
  obligacion: any = []
  tiposArchivos: string[] = []
  tiposArchivosSelected: string[] = []
  numeroObligacionRecibida: string | null = null;

  // OBJETOS
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

  archivosCargados: any = [
    {
      base64: '',
      tipoArchivo: ''
    }
  ];

  constructor(private ingresarService: IngresarService, private buscarService: SubirArchivoService, private subirService: SubirArchivoService, private authService: AuthenticationService, private tipoArchivoService: TipoArchivoService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllTipoArchivo()
    setTimeout(() => {
      this.subirService.currentData.subscribe(data => {
        if (data) {
          this.numeroObligacionRecibida = data;
          this.numeroO(this.numeroObligacion, '', 0);
          console.log('obligacion recibida:', this.numeroObligacionRecibida);
        }
      });
    }, 300);
  }

  isEmpty(obligacion: string, accion: string) {
    this.subirService.isEmpty(obligacion).subscribe(
      (data: any) => {
        if (data) {
          Swal.fire('Error', 'Esta Obligacion No Contiene Archivos, Puede Subirlos A continuación', 'error')
          this.cambiarInputs(accion)
          console.log(data);
        } else {
          Swal.fire('Error', 'Esta Obligacion Ya Contiene Archivos, Puedes visualizarlos A continuación', 'error')
          console.log(data);

          setTimeout(() => {
            console.log(this.archivos);
            
            
            this.subirService.sendFiles(this.archivos);
            console.log('obligacion enviada:', obligacion);
            this.router.navigate(['/dashboard-archivos/buscar-archivos'])
          }, 3000);
        }
      }, (error: any) => {
        console.log(error);
      }
    )
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

    this.buscarService.filter(this.cedula).subscribe(
      (data: any) => {
          this.obligacion = data
        console.log(data);
        
        if (this.obligacion.length > 0) {
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
        data.forEach((element: TipoArchivo) => {
          this.tiposArchivos.push(element.tipoArchivo)
        });
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  numeroO(obligacion: string, accion: string, pos: number) {
    this.display = 'block'
    this.archivos = this.obligacion[pos].archivos
    console.log(this.obligacion[pos]);
    
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }

    this.archivo.base64 = Array.from({ length: this.tiposArchivos.length }, (_, index) => ({
      base46: [],
      tipoArchivo: this.tiposArchivos[index],
      nombreArchivo: ''
    }));

    this.archivo.numeroObligacion = obligacion
    this.archivo.username = user
    
    if (this.numeroObligacionRecibida == null) {
      this.isEmpty(obligacion, accion)
    } else {
      this.botonComenzar = false
      this.botonCedula = false
    }
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
    this.disabledCargar = false
    this.disabledVer = false
    this.fileInput.nativeElement.value = '';
    console.log(this.archivo);
  }

  eliminarArchivos(tipoArchivo: string) {
    if (!this.archivosCargados.includes(this.tiposArchivosSelected)) {
      this.width = this.width - Math.round(100 / this.tiposArchivos.length - 3);
      console.log(this.width);

      for (let index = 0; index < this.archivosCargados.length; index++) {
        if (this.archivosCargados[index].tipoArchivo == tipoArchivo) {
          this.archivosCargados.splice(index, 1);
        }
      }

      for (let i = 0; i < this.archivo.base64.length; i++) {
        if (this.archivo.base64[i].tipoArchivo == tipoArchivo) {
          this.archivo.base64[i].base46 = [];
        }
      }

      var pos = this.archivo.base64.findIndex((a: Base64) => a.tipoArchivo == tipoArchivo)
      this.tiposArchivosSelected.splice(pos, 1);

      // UNSHIFT: SIRVE PARA PUSHEARLO EN LA PRIMER POSICION DEL ARRAY
      this.tiposArchivos.unshift(tipoArchivo)
      console.log(this.archivo);
      console.log(this.tiposArchivosSelected);

    }
  }

  cargarArchivos() {
    if (!this.tiposArchivosSelected.includes(this.tipoArchivo)) {
      this.archivosCargados = [];
      this.width = this.width + Math.round(100 / this.tiposArchivos.length);
      this.tiposArchivosSelected.push(this.tipoArchivo);

      for (let index = 0; index < this.archivo.base64.length; index++) {
        var obj = {
          base64: {},
          tipoArchivo: ''
        }

        if (this.archivo.base64[index].base46[0] != undefined) {
          obj.base64 = this.sanitizer.bypassSecurityTrustResourceUrl(this.archivo.base64[index].base46[0]);
          obj.tipoArchivo = this.archivo.base64[index].tipoArchivo;
          this.archivosCargados.push(obj);
        }
      }

      for (let i = 0; i < this.tiposArchivos.length; i++) {
        if (this.tiposArchivos[i] === this.tipoArchivo) {
          this.tiposArchivos.splice(i, 1);
          break;
        }
      }

      console.log(this.archivo);
    }

    console.log(this.archivosCargados);

    this.tipoArchivo = '';
    this.disabledSelect = false;
    this.cantidadArchivos = 0;
    this.disabledCargar = true;
    this.disabledVer = false;

    Swal.fire({
      icon: 'success',
      title: 'Datos Guardados',
      text: 'Archivos Cargados',
      timer: 2500
    });
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

  triggerFileInput(input: string): void {
    const fileInput = document.getElementById(input) as HTMLInputElement;
    fileInput.click();
  }

}
