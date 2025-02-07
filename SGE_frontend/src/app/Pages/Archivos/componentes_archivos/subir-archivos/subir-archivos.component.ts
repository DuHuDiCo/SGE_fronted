import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ObtenerCedulaService } from 'src/app/Services/Archivo/ObtenerCedula/obtener-cedula.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  isMediumScreen: boolean = false;
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

  archivosSubidos: { tituloArchivo: string; subidoBoolean: boolean }[] = [];

  constructor(
    private obtenerCedulaService: ObtenerCedulaService,
    private tipoArchivoService: TipoArchivoService,
    private authService: AuthenticationService,
    private subirService: SubirArchivoService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private changeDetertorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllTipoArchivo();
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth(); // Verificar el ancho de la pantalla al redimensionar la ventana
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
    if (this.archivosSubidos.length > 0) {
      // console.log('no se puede hacer click');
      return;
    }
    const fileInput = document.getElementById(input) as HTMLInputElement;
    fileInput.click();
  }

  // Se activa cuando se arrastra el archivo
  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (this.archivosSubidos.length > 0) {
      return;
    }
    this.isDragging = true;
  }

  // Se activa cuando se deja de arrastrar el archivo
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    if (this.archivosSubidos.length > 0) {
      return;
    }
    this.isDragging = false;
  }

  // Se activa cuando se suelta el archivo
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (this.archivosSubidos.length > 0) {
      return;
    }
    this.isDragging = false;

    // Verifica si hay archivos en el evento de arrastrar y soltar
    if (event.dataTransfer?.files) {
      const files = event.dataTransfer.files; // Obtiene todos los archivos

      // Verifica si se seleccionó un tipo de archivo
      if (this.tipoArchivo === '') {
        Swal.fire({
          title: 'Seleccione un tipo de archivo',
          icon: 'error',
          timer: 2000,
          text: 'No se pudo cargar el archivo.',
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'text-white btn border-0 rounded-pill px-4',
          },
        });
        return;
      }

      // Array para almacenar las promesas de conversión a base64
      const base64Promises: Promise<string>[] = [];

      if (files.length > 2) {
        Swal.fire({
          title: 'Error',
          text: `Solo se pueden subir 2 archivos a la vez.`,
          icon: 'error',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4',
            confirmButton: 'text-white btn border-0 rounded-pill px-4',
          },
        });
        return;
      } else {
        // Itera sobre todos los archivos
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (file.type !== 'application/pdf') {
            Swal.fire({
              title: 'Error',
              text: `Solo se admiten archivos pdf.`,
              icon: 'error',
              confirmButtonColor: '#d40000',
              customClass: {
                popup: 'rounded-4',
                confirmButton: 'text-white btn border-0 rounded-pill px-4',
              },
            });
            return;
          } else {
            // Valida el tamaño del archivo (2MB máximo)
            if (file.size > 2248576) {
              Swal.fire({
                title: 'Error',
                text: `El archivo "${file.name}" es demasiado pesado (más de 2MB).`,
                icon: 'error',
                confirmButtonColor: '#d40000',
                customClass: {
                  popup: 'rounded-4',
                  confirmButton: 'text-white btn border-0 rounded-pill px-4',
                },
              });
              this.archivosSubidos.push({
                tituloArchivo: file.name,
                subidoBoolean: false,
              });
            } else {
              this.archivosSubidos.push({
                tituloArchivo: file.name,
                subidoBoolean: true,
              });
              // Convierte el archivo a base64 y agrega la promesa al array
              base64Promises.push(this.convertFileToBase64(file));
            }
          }
        }

        // Si no hay archivos válidos, termina la función
        if (base64Promises.length === 0) {
          return;
        }

        // Espera a que todas las conversiones se completen
        Promise.all(base64Promises).then((base64Results) => {
          // Asigna los base64 al objeto base64
          this.base64 = {
            base46: base64Results,
            tipoArchivo: this.tipoArchivo,
            nombreArchivo: files[0]?.name ?? '', // Puedes ajustar esto si necesitas nombres de archivos múltiples
          };

          // Actualiza la cantidad de archivos y habilita el botón de carga
          this.cantidadArchivos = base64Results.length;
          if (this.cantidadArchivos > 0 && this.archivosSubidos.length > 0) {
            this.disabledCargar = false;
          }
        });
      }
    }
  }

  obtenerFile(event: Event) {
    let input = event.target as HTMLInputElement;

    if (this.tipoArchivo !== '') {
      // Verifica si hay archivos seleccionados
      if (input.files && input.files.length > 0) {
        // Array para almacenar las promesas de conversión a base64
        const base64Promises: Promise<string>[] = [];

        if (input.files.length > 2) {
          Swal.fire({
            title: 'Error',
            text: `Solo se pueden subir 2 archivos a la vez.`,
            icon: 'error',
            timer: 2000,
            confirmButtonColor: '#d40000',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
          return;
        } else {
          for (let i = 0; i < input.files.length; i++) {
            const file = input.files[i];

            // Verifica que el archivo sea solo PDF
            if (file.type !== 'application/pdf') {
              Swal.fire({
                title: 'Error',
                text: `Solo se admiten archivos pdf.`,
                icon: 'error',
                confirmButtonColor: '#d40000',
                customClass: {
                  popup: 'rounded-4',
                  confirmButton: 'text-white btn border-0 rounded-pill px-4',
                },
              });
              return;
            } else {
              // Valida el tamaño del archivo (2MB máximo)
              if (file.size > 2248576) {
                Swal.fire({
                  title: 'Error',
                  text: `El archivo "${file.name}" es demasiado pesado (más de 2MB).`,
                  icon: 'error',
                  confirmButtonColor: '#d40000',
                  customClass: {
                    popup: 'rounded-4',
                    confirmButton: 'text-white btn border-0 rounded-pill px-4',
                  },
                });
                this.archivosSubidos.push({
                  tituloArchivo: file.name,
                  subidoBoolean: false,
                });
              } else {
                this.archivosSubidos.push({
                  tituloArchivo: file.name,
                  subidoBoolean: true,
                });
                base64Promises.push(this.convertFileToBase64(file));
              }
            }
          }

          Promise.all(base64Promises).then((base64Results) => {
            // Asigna los base64 al objeto base64
            this.base64 = {
              base46: base64Results,
              tipoArchivo: this.tipoArchivo,
              nombreArchivo: input.files ? input.files[0]?.name ?? '' : '', // Puedes ajustar esto si necesitas nombres de archivos múltiples
            };

            this.cantidadArchivos = input.files ? this.base64.base46.length : 0;
            if (this.cantidadArchivos > 0 && this.archivosSubidos.length > 0) {
              this.disabledCargar = false;
            }
          });
        }
      }
    } else {
      Swal.fire({
        title: 'Seleccione un tipo de archivo',
        icon: 'error',
        timer: 2000,
        text: 'No se pudo cargar el archivo.',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
      input.value = ''; // Limpia el input de archivo cargado
      return;
    }
  }

  // Convertir archivo a base64
  convertFileToBase64 = async ($event: any): Promise<string> => {
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
      let objetoBase64: {
        base46: string[];
        tipoArchivo: string;
        nombreArchivo: string;
      } = {
        base46: [],
        tipoArchivo: this.base64.tipoArchivo,
        nombreArchivo: this.base64.nombreArchivo,
      };

      let objetoMiniatura: {
        base46: SafeResourceUrl[];
        tipoArchivo: string;
        nombreArchivo: string;
      } = {
        base46: [],
        tipoArchivo: this.base64.tipoArchivo,
        nombreArchivo: this.base64.nombreArchivo,
      };

      // insertar a cantidad de archivos cargados al array de base64.base46
      for (let i = 0; i < this.base64.base46.length; i++) {
        objetoBase64.base46.push(this.base64.base46[i]);
        objetoMiniatura.base46.push(
          this.sanitizer.bypassSecurityTrustResourceUrl(this.base64.base46[i])
        );
      }
      this.archivosCargados.push(objetoBase64);
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
          confirmButton: 'text-white btn border-0 rounded-pill px-5',
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
          confirmButton: 'text-white btn border-0 rounded-pill px-5',
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
          confirmButton: 'text-white btn border-0 rounded-pill px-5',
        },
      });
      return;
    }

    this.archivo.base64 = this.archivosCargados;
    this.archivo.numeroObligacion = this.obligacion;
    this.archivo.username = this.authService.getUsername() ?? '';

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
            confirmButton: 'text-white btn border-0 rounded-pill px-5',
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
            confirmButton: 'text-white btn border-0 rounded-pill px-5', // Botón rojo para Eliminar
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
    this.archivosSubidos = [];
  }

  onCancelarCargarArchivos() {
    this.archivosSubidos = [];
    this.cantidadArchivos = 0;
    this.disabledCargar = true;
    this.tipoArchivo = '';
  }

  // Eliminar archivos
  eliminarArchivos(tipoArchivo: string, index: number): void {
    Swal.fire({
      title: 'Quieres eliminar este archivo: ',
      text: tipoArchivo + ' (' + (index + 1) + ')',
      showDenyButton: true,
      confirmButtonText: 'Si, confirmo',
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#d40000',
      denyButtonColor: 'gray',
      customClass: {
        popup: 'rounded-4',
        confirmButton: 'text-white btn b rounded-pill',
        denyButton: 'btn btn-secondary rounded-pill',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar el archivo específico de la lista de miniaturas
        const archivoIndex = this.miniaturaVerArchivos.findIndex(
          (archivoMiniatura: any) =>
            archivoMiniatura.tipoArchivo === tipoArchivo
        );

        if (archivoIndex !== -1) {
          this.miniaturaVerArchivos[archivoIndex].base46.splice(index, 1);

          // Si no quedan archivos en base46, eliminar el objeto completo
          if (this.miniaturaVerArchivos[archivoIndex].base46.length === 0) {
            this.miniaturaVerArchivos.splice(archivoIndex, 1);

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
        }

        // Eliminar el archivo específico de la lista de archivos cargados
        const archivoCargadoIndex = this.archivosCargados.findIndex(
          (archivo: any) => archivo.tipoArchivo === tipoArchivo
        );

        if (archivoCargadoIndex !== -1) {
          this.archivosCargados[archivoCargadoIndex].base46.splice(index, 1);

          // Si no quedan archivos en base46, eliminar el objeto completo
          if (this.archivosCargados[archivoCargadoIndex].base46.length === 0) {
            this.archivosCargados.splice(archivoCargadoIndex, 1);
          }
        }

        // Limpiar el base64 del archivo eliminado en this.archivo.base64
        const archivoBase64Index = this.archivo.base64.findIndex(
          (archivo: Base64) => archivo.tipoArchivo === tipoArchivo
        );

        if (archivoBase64Index !== -1) {
          this.archivo.base64[archivoBase64Index].base46.splice(index, 1);

          // Si no quedan archivos en base46, eliminar el objeto completo
          if (this.archivo.base64[archivoBase64Index].base46.length === 0) {
            this.archivo.base64.splice(archivoBase64Index, 1);
          }
        }

        // Desactivar disabledVer si no hay más objetos en miniaturaVerArchivos
        if (this.miniaturaVerArchivos.length === 0) {
          this.disabledVer = true;
        }

        // Forzar la actualización del carrusel
        this.changeDetertorRef.detectChanges();
        // Reiniciar el carrusel para que el primer elemento esté activo
        this.reiniciarCarrusel();

        Swal.fire({
          title: 'Eliminado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            popup: 'rounded-4',
          },
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Cancelado',
          showConfirmButton: false,
          icon: 'info',
          timer: 1000,
          customClass: {
            popup: 'rounded-4 py-5',
          },
        });
        return;
      }
    });
  }

  // Cancelar y volver
  onCancelarVolver(): void {
    this.router.navigate(['/dashboard-archivos/buscar-archivos']);
  }

  // activar desactivar carrusel
  isActive(miniaturaIndex: number, base46Index: number): boolean {
    return miniaturaIndex === 0 && base46Index === 0;
  }

  reiniciarCarrusel() {
    const carruselItems = document.querySelectorAll('.carousel-item');
    if (carruselItems.length > 0) {
      // Eliminar la clase 'active' de todos los elementos
      carruselItems.forEach((item) => item.classList.remove('active'));

      // Agregar la clase 'active' al primer elemento visible
      carruselItems[0].classList.add('active');
    }
  }

  anteriorSlide() {
    const carruselItems = document.querySelectorAll('.carousel-item');
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem) {
      activeItem.classList.remove('active');
      const prevItem =
        activeItem.previousElementSibling ||
        carruselItems[carruselItems.length - 1];
      prevItem.classList.add('active');
    }
  }

  siguienteSlide() {
    const carruselItems = document.querySelectorAll('.carousel-item');
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem) {
      activeItem.classList.remove('active');
      const nextItem = activeItem.nextElementSibling || carruselItems[0];
      nextItem.classList.add('active');
    }
  }

  checkScreenWidth() {
    this.isMediumScreen = window.innerWidth >= 768; // 768px es el breakpoint "md" de Bootstrap
  }
}
