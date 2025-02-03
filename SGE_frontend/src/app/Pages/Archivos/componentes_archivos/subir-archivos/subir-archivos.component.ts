import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ObtenerCedulaService } from 'src/app/Services/Archivo/ObtenerCedula/obtener-cedula.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Archivo, Base64 } from 'src/app/Types/Archivo/Archivos';
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
  disabledCargar: boolean = true;
  disabledVer: boolean = true;
  isDragging: boolean = false;
  cantidadArchivos: number = 0;
  widthProgress: number = 0;
  arrProgress: number = 0;
  background_color: string = '#960010';
  tipoArchivo: string = '';
  cedula: string = '';

  // ARRAYS
  tiposArchivosSelected: string[] = [];
  tiposArchivos: string[] = [];
  obligacion: any = [];
  archivos: any[] = [];
  archivosCargados: any = [];
  miniaturaVerArchivos: any = [];

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

  constructor(
    private obtenerCedulaService: ObtenerCedulaService,
    private tipoArchivoService: TipoArchivoService,
    private authService: AuthenticationService,
    private subirService: SubirArchivoService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTipoArchivo();
  }

  // Obtener tipos de archivo
  getAllTipoArchivo(): void {
    this.tipoArchivoService.getAll().subscribe(
      (data: any) => {
        this.tiposArchivos = data.map((element: any) => element.tipoArchivo);
      },
      (error: any) => console.error(error)
    );
  }

  // Continuar con el proceso desde la primera vista
  onContinuar() {
    let traerCedula = this.obtenerCedulaService.getCedula();
    let traerObligacion = this.obtenerCedulaService.getObligacion();
    this.cedula = traerCedula;
    this.obligacion = traerObligacion;
    this.confirmarComenzar = true;
  }

  // Selecionar archivo automatico al dale click al icono
  ontriggerFileInput(input: string): void {
    const fileInput = document.getElementById(input) as HTMLInputElement;
    fileInput.click();
  }

  // Se activa cuando se arrastra el archivo
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  // Se activa cuando se deja de arrastrar el archivo
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  // Se activa cuando se suelta el archivo
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      let input = event.dataTransfer?.files;
      let file = event.dataTransfer.files[0];

      if (file && file.size > 1048576) {
        Swal.fire({
          title: 'Error',
          text: 'El archivo es demasiado pesado (más de 1MB).',
          icon: 'error',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'btn border-0 rounded-pill px-4',
          },
        });
        return;
      }

      if (this.tipoArchivo !== '') {
        // Convierte el archivo a base64
        this.convertFileToBase64(file).then((base64) => {
          // Asigna el base64 al objeto Archivo
          this.base64 = {
            base46: [base64 as string],
            tipoArchivo: this.tipoArchivo,
            nombreArchivo: file.name,
          };

          this.cantidadArchivos = input.length;
          if (this.cantidadArchivos > 0) {
            this.disabledCargar = false;
          }
        });
      } else {
        Swal.fire({
          title: 'Seleccione un tipo de archivo',
          icon: 'error',
          timer: 2000,
          text: 'No se pudo cargar el archivo.',
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'btn border-0 rounded-pill px-4',
          },
        });
        (input as unknown as HTMLInputElement).value = ''; // Limpia el input de archivo arrastrado
        return;
      }
    }
  }

  obtenerFile(event: Event) {
    let input = event.target as HTMLInputElement;
    let file = input.files?.[0];

    if (file && file.size > 1048576) {
      Swal.fire({
        title: 'Error',
        text: 'El archivo es demasiado pesado (mayor de 1MB).',
        icon: 'error',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-4',
        },
      });
      return;
    }

    if (this.tipoArchivo !== '') {
      // Convierte el archivo a base64
      this.convertFileToBase64(file).then((base64) => {
        // Asigna el base64 al objeto a base64
        this.base64 = {
          base46: [base64 as string],
          tipoArchivo: this.tipoArchivo,
          nombreArchivo: file?.name ?? '',
        };

        this.cantidadArchivos = input.files?.length ?? 0;
        if (this.cantidadArchivos > 0) {
          this.disabledCargar = false;
        }
      });
    } else {
      Swal.fire({
        title: 'Seleccione un tipo de archivo',
        icon: 'error',
        timer: 2000,
        text: 'No se pudo cargar el archivo.',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-4',
        },
      });
      input.value = ''; // Limpia el input de archivo cargado
      return;
    }
  }

  // Convertir archivo a base64
  convertFileToBase64 = async ($event: any): Promise<SafeResourceUrl> => {
    return new Promise((resolve) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          const base64 = reader.result as string;
          // Marca el Base64 como seguro
          const safeUrl = base64;
          resolve(safeUrl);
        };
        reader.onerror = () => {
          resolve('');
        };
      } catch (e) {
        resolve('');
      }
    });
  };

  // Cargar archivos
  cargarArchivos() {
    // Verifica si el tipo de archivo ya fue seleccionado previamente
    if (!this.tiposArchivosSelected.includes(this.tipoArchivo)) {
      // Inicializa el progreso si es la primera carga
      if (this.widthProgress === 0) {
        this.arrProgress = this.tiposArchivos.length;
      }

      // Actualiza el progreso
      if (this.widthProgress < 100) {
        this.widthProgress += 100 / this.arrProgress; // Aumenta el progreso
        if (this.widthProgress > 100) {
          this.widthProgress = 100; // Asegura que el progreso no supere el 100%
        }
      }

      // Agrega el tipo de archivo a la lista de seleccionados
      this.tiposArchivosSelected.push(this.tipoArchivo);

      // Procesa los archivos cargados de manera segura
      let objetoBase64 = {
        base46: [this.base64.base46[0]],
        tipoArchivo: this.base64.tipoArchivo,
        nombreArchivo: this.base64.nombreArchivo,
      };
      this.archivosCargados.push(objetoBase64);

      let objetoMiniatura = {
        base64: [
          this.sanitizer.bypassSecurityTrustResourceUrl(this.base64.base46[0]),
        ],
        tipoArchivo: this.base64.tipoArchivo,
        nombreArchivo: this.base64.nombreArchivo,
      };
      this.miniaturaVerArchivos.push(objetoMiniatura);

      // Filtra los tipos de archivo disponibles
      this.tiposArchivos = this.tiposArchivos.filter(
        (tipo) => tipo !== this.tipoArchivo
      );

      // Restablece el formulario
      this.resetForm();

      // Muestra un mensaje de éxito
      Swal.fire({
        title: 'Éxito',
        text: 'Archivo cargado',
        icon: 'success',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-5',
        },
      });
    } else {
      // Si el tipo de archivo ya fue seleccionado, muestra un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El tipo de archivo ya fue seleccionado.',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-5',
        },
      });
    }
  }

  // Guardar archivos
  onGuardar(): void {
    if (this.tiposArchivosSelected.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe cargar al menos un archivo',
        timer: 2000,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'btn border-0 rounded-pill px-5',
        },
      });
      return;
    }

    this.archivo.base64 = this.archivosCargados;
    this.archivo.numeroObligacion = this.obligacion;
    this.archivo.username = this.authService.getUsername() ?? '';
    console.log(this.archivosCargados);

    console.log(this.archivo);

    this.subirService.save(this.archivo).subscribe(
      () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Archivos guardados',
          icon: 'success',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'btn border-0 rounded-pill px-5',
          },
        });
        this.router.navigate(['/dashboard-archivos/buscar-archivos']);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar los archivos',
          text: 'Error',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'btn border-0 rounded-pill px-5', // Botón rojo para Eliminar
          },
        });
        console.error(error);
      }
    );
  }

  // Reiniciar formulario
  resetForm(): void {
    this.tipoArchivo = '';
    this.cantidadArchivos = 0;
    this.disabledCargar = true;
    this.disabledVer = false;
    this.fileInput.nativeElement.value = '';
  }

  onCancelarCargarArchivos() {
    this.cantidadArchivos = 0;
    this.disabledCargar = true;
    this.tipoArchivo = '';
  }

  // Eliminar archivos
  eliminarArchivos(tipoArchivo: string): void {
    if ((this.miniaturaVerArchivos = [])) {
      this.disabledVer = true;
    }

    // Eliminar el archivo de la lista de miniaturas
    this.miniaturaVerArchivos = this.miniaturaVerArchivos.filter(
      (archivoMiniatura: any) => archivoMiniatura.tipoArchivo !== tipoArchivo
    );
    // Limpiar el base64 de la miniatura del archivo eliminado
    for (let i = 0; i < this.miniaturaVerArchivos.length; i++) {
      this.miniaturaVerArchivos[i].base64 = this.miniaturaVerArchivos[
        i
      ].base64.map((archivo: Base64) =>
        archivo.tipoArchivo === tipoArchivo
          ? { ...archivo, base46: [] }
          : archivo
      );
    }

    // Eliminar el archivo de la lista de archivos cargados
    this.archivosCargados = this.archivosCargados.filter(
      (archivo: any) => archivo.tipoArchivo !== tipoArchivo
    );

    // Limpiar el base64 del archivo eliminado
    this.archivo.base64 = this.archivo.base64.map((archivo: Base64) =>
      archivo.tipoArchivo === tipoArchivo ? { ...archivo, base46: [] } : archivo
    );
    // Eliminar el tipo de archivo de la lista de seleccionados
    this.tiposArchivosSelected = this.tiposArchivosSelected.filter(
      (tipo) => tipo !== tipoArchivo
    );
    // Ajustar el progreso
    if (this.widthProgress > 0) {
      this.widthProgress -= 100 / this.arrProgress; // Disminuye el progreso
      if (this.widthProgress < 0) {
        this.widthProgress = 0; // Asegura que no sea menor que 0%
      }
    }
    // Agregar el tipo de archivo de nuevo a la lista de tipos disponibles
    this.tiposArchivos.unshift(tipoArchivo);
  }

  // Cancelar y volver
  onCancelarVolver(): void {
    this.router.navigate(['/dashboard-archivos/buscar-archivos']);
  }
}