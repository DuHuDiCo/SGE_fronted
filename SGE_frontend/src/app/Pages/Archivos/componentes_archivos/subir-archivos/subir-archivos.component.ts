import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ObtenerCedulaService } from 'src/app/Services/Archivo/ObtenerCedula/obtener-cedula.service';
import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { Archivo, Base64 } from 'src/app/Types/Archivo/Archivos';
import { DomSanitizer } from '@angular/platform-browser';
import { TipoArchivo } from 'src/app/Types/Archivo/TipoArchivo';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css'],
})
export class SubirArchivosComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  // VARIABLES
  confirmarComenzar: boolean = false;
  disabledSelect: boolean = false;
  disabledCargar: boolean = true;
  botonComenzar: boolean = true;
  botonGuardar: boolean = false;
  botonCedula: boolean = false;
  disabledVer: boolean = true;
  cantidadArchivos: number = 0;
  widthProgress: number = 0;
  arrProgress: number = 0;
  background_color: string = '#960010';
  numeroObligacion: string = '';
  tipoArchivo: string = '';
  display: string = 'none';
  cedula: string = '';

  // ARRAYS
  numeroObligacionRecibida: string | null = null;
  tiposArchivosSelected: string[] = [];
  tiposArchivos: string[] = [];
  obligacion: any = [];
  archivos: any[] = [];

  // OBJETOS
  archivo: Archivo = {
    numeroObligacion: '',
    base64: [],
    username: '',
  };

  base64: Base64 = {
    base46: [],
    tipoArchivo: '',
    nombreArchivo: '',
  };

  archivosCargados: any = [
    {
      base64: '',
      tipoArchivo: '',
    },
  ];

  constructor(
    private subirService: SubirArchivoService,
    private authService: AuthenticationService,
    private tipoArchivoService: TipoArchivoService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private obtenerCedulaService: ObtenerCedulaService
  ) {}

  ngOnInit(): void {
    this.getAllTipoArchivo();
    setTimeout(() => {
      this.subirService.currentData.subscribe((data) => {
        if (data) {
          this.numeroObligacionRecibida = data;
          this.numeroO(this.numeroObligacion, 0);
          // console.log('obligacion recibida:', this.numeroObligacionRecibida);
        }
      });
    }, 300);
  }

  getAllTipoArchivo() {
    this.tipoArchivoService.getAll().subscribe(
      (data: any) => {
        this.tiposArchivos = data.map(
          (element: TipoArchivo) => element.tipoArchivo
        );
      },
      (error: any) => console.log(error)
    );
  }

  onIsEmpty(obligacion: string) {
    this.subirService.isEmpty(obligacion).subscribe(
      () => {},
      (error: any) => {
        console.log(error);
      }
    );
  }

  cancelarArchivos() {
    var pos = this.archivo.base64.findIndex(
      (a: Base64) => (a.tipoArchivo = this.tipoArchivo)
    );
    this.archivo.base64[pos].base46 = [];
    this.cantidadArchivos = 0;
    this.disabledSelect = false;
    this.disabledCargar = false;
    this.disabledVer = false;
    this.fileInput.nativeElement.value = '';
  }

  obtenerFile(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const archivo = input.files[0];

    if (archivo.size > 1048576) {
      // Verifica si es muy pesado (>1MB)
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error');
      return;
    }

    // Extrae base64 del archivo y almacena la imagen
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      this.archivo.base64.push({
        base46: [reader.result as string],
        tipoArchivo: 'imagen',
        nombreArchivo: archivo.name,
      });
      this.cantidadArchivos = 1; // Actualiza el contador
    };

    reader.onerror = () =>
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la imagen.',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-4',
        },
      });
    if (this.tipoArchivo != '') {
      if (archivo.size > 1048576) {
        Swal.fire({
          icon: 'error',
          title: 'El archivo es demasiado pesado.',
          text: 'Error',
          denyButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'btn border-0 rounded-pill px-4',
          },
        });
        this.base64.base46 = [];
        return;
      }

      if (input.files) {
        var pos = this.archivo.base64.findIndex(
          (a: Base64) => a.tipoArchivo == this.tipoArchivo
        );

        if (this.archivo.base64[pos]?.base46.length > 0) {
          this.archivo.base64[pos].base46 = [];
        }

        for (let i = 0; i < input.files.length; i++) {
          this.extraerBase64(input.files[i]).then((file: any) => {
            this.archivo.base64[pos].base46.push(file.base);
            this.archivo.base64[pos].nombreArchivo = 'ARCHIVO';
          });
        }
        this.cantidadArchivos = input.files.length;
        if (this.cantidadArchivos > 0) {
          this.disabledCargar = false;
        }
      }

      this.disabledSelect = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acción inválida',
        text: 'Seleccione el tipo de archivo.',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-4',
        },
      });
      (input as HTMLInputElement).value = '';
    }
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve): any => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = () => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

  onSave() {
    if (this.tiposArchivosSelected.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe cargar al menos un archivo con un tipo de archivo seleccionado.',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    this.subirService.save(this.archivo).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Archivos guardados exitosamente.',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'btn border-0 rounded-pill px-4',
          },
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard-archivos/buscar-archivos']);
        }, 2000);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar los archivos.',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'btn border-0 rounded-pill px-4',
          },
        });
        console.log(error);
      }
    );
  }

  triggerFileInput(input: string): void {
    const fileInput = document.getElementById(input) as HTMLInputElement;
    fileInput.click();
  }

  onSubirArchivos() {
    let traerCedula = this.obtenerCedulaService.getCedula();
    let traerObligacion = this.obtenerCedulaService.getObligacion();

    this.cedula = traerCedula;
    this.obligacion = traerObligacion;

    this.numeroO(this.obligacion, 0);

    this.confirmarComenzar = true;
  }

  numeroO(obligacion: string, pos: number) {
    this.display = 'block';
    // console.log(this.obligacion[pos]?.archivos);

    this.archivos = this.obligacion[pos]?.archivos;

    var user = this.authService.getUsername();

    if (user == null || user == undefined) {
      return;
    }

    this.archivo.base64 = Array.from(
      { length: this.tiposArchivos.length },
      (_, index) => ({
        base46: [],
        tipoArchivo: this.tiposArchivos[index],
        nombreArchivo: '',
      })
    );

    this.archivo.numeroObligacion = obligacion;
    this.archivo.username = user;

    if (this.numeroObligacionRecibida == null) {
      this.onIsEmpty(obligacion);
    } else {
      this.botonComenzar = false;
      this.botonCedula = false;
    }
  }

  cargarArchivos() {
    if (!this.tiposArchivosSelected.includes(this.tipoArchivo)) {
      this.archivosCargados = []; // Reinicia los archivos cargados

      if (this.widthProgress === 0) {
        this.arrProgress = this.tiposArchivos.length;
      }

      // Aumenta el progreso solo si no ha alcanzado el 100%
      if (this.widthProgress < 100) {
        this.widthProgress += 100 / this.arrProgress; // Aumenta el progreso
        // Asegura que el progreso no supere el 100%
        if (this.widthProgress > 100) {
          this.widthProgress = 100;
        }
      }
      // Agrega el tipo de archivo seleccionado al array
      this.tiposArchivosSelected.push(this.tipoArchivo);

      for (let index = 0; index < this.archivo.base64.length; index++) {
        var obj = {
          base64: {},
          tipoArchivo: '',
        };
        if (this.archivo.base64[index].base46[0] != undefined) {
          obj.base64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.archivo.base64[index].base46[0]
          );
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
      // console.log(this.archivo);
      // console.log(this.archivosCargados);
    }
    // console.log(this.archivosCargados);

    this.tipoArchivo = '';
    this.disabledSelect = false;
    this.cantidadArchivos = 0;
    this.disabledCargar = true;
    this.disabledVer = false;

    Swal.fire({
      icon: 'success',
      title: 'Datos Guardados',
      text: 'Archivos Cargados',
      timer: 2500,
    });
    // console.log(this.tiposArchivosSelected);
  }

  eliminarArchivos(tipoArchivo: string) {
    if (!this.archivosCargados.includes(this.tiposArchivosSelected)) {
      if (this.widthProgress > 0) {
        this.widthProgress -= 100 / this.tiposArchivos.length; // Disminuye el progreso
        if (this.widthProgress < 0) {
          this.widthProgress = 0; // Asegura que no sea menor que 0%
        }
      }
      console.log(this.widthProgress);

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

      var pos = this.archivo.base64.findIndex(
        (a: Base64) => a.tipoArchivo == tipoArchivo
      );
      this.tiposArchivosSelected.splice(pos, 1);

      // UNSHIFT: SIRVE PARA PUSHEARLO EN LA PRIMER POSICION DEL ARRAY
      this.tiposArchivos.unshift(tipoArchivo);
      // console.log(this.archivo);
      // console.log(this.tiposArchivosSelected);
    }
  }

  onCancelarVolver() {
    this.router.navigate(['/dashboard-archivos/buscar-archivos']);
  }
}
