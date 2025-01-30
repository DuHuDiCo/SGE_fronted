import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ObtenerCedulaService } from 'src/app/Services/Archivo/ObtenerCedula/obtener-cedula.service';
import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Archivo, Base64, EditarArchivo } from 'src/app/Types/Archivo/Archivos';
import { TipoArchivo } from 'src/app/Types/Archivo/TipoArchivo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-archivos',
  templateUrl: './buscar-archivos.component.html',
  styleUrls: ['./buscar-archivos.component.css'],
})
export class BuscarArchivosComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;

  cedula: string = '';
  url: string = '';
  dataUri: string = 'data:image/jpg;base64';
  base64Pdf: string = '';
  numeroObligacionRecibida: String = '';
  tipoArchivo: string = '';
  cards: boolean = false;
  tabla: boolean = false;
  filtro: boolean = false;
  tipoArc: number = 0;
  numeroArc: number = 0;

  obligacion: any[] = [];
  archivos: any[] = [];
  datos: any[] = [];
  tiposArchivos: TipoArchivo[] = [];
  rolesArray: string[] = [
    'Cartera',
    'Caja',
    'Archivos',
    'Ventas',
    'Servicios',
    'Consignaciones',
    'SUPERADMINISTRADOR',
    'SST',
  ];
  permisos: string[] = [
    'ELIMINAR ARCHIVOS',
    'EDITAR ARCHIVOS',
    'SUBIR UN ARCHIVO',
    'SUBIR ARCHIVOS',
    'CREAR TIPOS ARCHIVO',
    'EDITAR TIPOS ARCHIVO',
  ];

  modal: EditarArchivo = {
    idArchivo: 0,
    base64: '',
    username: '',
    tipoArchivo: '',
    nombreOriginal: '',
  };

  subirArchivo: Archivo = {
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
    private buscarService: SubirArchivoService,
    private router: Router,
    private subirService: SubirArchivoService,
    private authService: AuthenticationService,
    private tipoArchivoService: TipoArchivoService,
    private obtenerCedulaService: ObtenerCedulaService
  ) {}

  ngOnInit(): void {
    this.getAllTipo();
    setTimeout(() => {
      this.subirService.arch.subscribe((data) => {
        // console.log(data);

        if (data.length > 0) {
          this.archivos = data;
          this.subirArchivo.numeroObligacion =
            this.archivos[0].numeroObligacion;
          this.cards = true;
          // console.log(this.archivos);
          // console.log(this.subirArchivo.numeroObligacion);
          this.eliminarTiposArchivos();
        }
      });
    }, 300);
  }

  @ViewChild('pdfEmbed') pdfEmbed!: ElementRef;

  //BUSCAR POR CÉDULA
  onfilter() {
    if (this.cedula.trim() == '' || this.cedula.trim() == null) {
      Swal.fire({
        title: 'Error',
        text: 'Digite una cédula',
        icon: 'error',
        timer: 2500,
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4', // Clase para redondear el modal
          confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
        },
      });
      return;
    }
    this.filtro = true;
    this.obligacion = [];
    this.buscarService.filter(this.cedula).subscribe(
      (data: any) => {
        this.datos = data;
        // console.log(this.datos);

        data.forEach((element: any) => {
          this.obligacion.push(element.cuentaPorCobrar);
          this.numeroArc = element.archivos.length;
        });
        this.tabla = true;
        this.filtro = false;
        Swal.fire({
          icon: 'success',
          title: 'Estas son las obligaciones encontradas',
          text: 'Elija una obligación',
          timer: 2500,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'btn border-0 rounded-pill px-5', // Botón rojo para Eliminar
          },
        });
        // this.cedula = '';
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al buscar los archivos, cedula no encontrada.',
          timer: 2500,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'btn border-0 rounded-pill px-5', // Botón rojo para Eliminar
          },
        });
        this.filtro = false;
        console.log(error);

        this.cedula = '';
      }
    );
  }

  isEmpty(obligacion: string) {
    this.subirService.isEmpty(obligacion).subscribe(
      (data: any) => {
        // console.log(data);

        if (data) {
          Swal.fire({
            title: 'Información',
            text: 'Esta obligacion no contiene archivos, puede subirlos a continuación.',
            icon: 'info',
            timer: 2000,
            confirmButtonColor: '#d40000',
            customClass: {
              popup: 'rounded-4', // Clase para redondear el modal
              confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
            },
          });
          // console.log(data);
          setTimeout(() => {
            this.subirService.send(obligacion);
            // console.log('obligacion enviada:', obligacion);
          
            this.obtenerCedulaService.setCedula(this.cedula);
            this.obtenerCedulaService.setObligacion(obligacion);
            this.router.navigate(['/dashboard-archivos/subir-archivos']);
          }, 2000);
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Archivos cargados',
            text: 'Estos son los archivos encontrados',
            timer: 2500,
            confirmButtonColor: '#d40000',
            customClass: {
              popup: 'rounded-4', // Clase para redondear el modal
              confirmButton: 'btn border-0 rounded-pill px-5', // Botón rojo para Eliminar
            },
          });
          // console.log(data);

          this.cards = true;
          this.tabla = false;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAllTipo() {
    this.tipoArchivoService.getAll().subscribe(
      (data: any) => {
        this.tiposArchivos = data;
        this.tipoArc = data.length;
        // console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //LLENAR LOS MODALES CON SU PDF
  pdf(base64: string) {
    const embed = this.pdfEmbed.nativeElement;
    embed.src = base64;
  }

  obtenerFile(event: any, accion: string) {
    const archivo = event.target.files[0];

    if (!archivo) {
      console.error('No se ha seleccionado ningun archivo.');
      return;
    }

    if (archivo.size > 1048576) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El archivo es demasiado pesado',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4', // Clase para redondear el modal
          confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
        },
      });
      return;
    }

    this.extraerBase64(archivo)
      .then((file: any) => {
        const base64SinP = file.base;

        this.subirArchivo.base64 = [];

        if (accion == 'guardar') {
          const obj = {
            base46: [base64SinP],
            nombreArchivo: archivo.name,
            tipoArchivo: this.base64.tipoArchivo,
          };

          this.subirArchivo.base64.push(obj);
          // console.log(this.subirArchivo);
        } else {
          this.modal.base64 = base64SinP;
        }
      })
      .catch((error) => {
        console.error('Error al extraer el archivo base64:', error);
      });
  }

  // Modal guardar uno
  saveOne() {
    if (
      !this.base64 ||
      !this.base64.tipoArchivo ||
      this.base64.tipoArchivo.trim() === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione el tipo de archivo.',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4', // Clase para redondear el modal
          confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
        },
      });
      return;
    }

    if (
      !this.subirArchivo ||
      !this.subirArchivo.base64 ||
      this.subirArchivo.base64.length === 0 ||
      !this.subirArchivo.base64[0].base46
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione algún archivo.',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4', // Clase para redondear el modal
          confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
        },
      });
      return;
    }

    this.buscarService.saveOne(this.subirArchivo).subscribe(
      (data: any) => {
        Swal.fire({
          title: 'Datos Guardados',
          text: 'Archivo guardado con éxito.',
          icon: 'success',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
        // console.log(data);
        this.archivos.push(data[0]);
        this.eliminarTiposArchivos();

        this.fileInput.nativeElement.value = '';

        // Cierra el modal
        const button = document.getElementById(
          'myButtonSaveOne'
        ) as HTMLButtonElement;
        if (button) {
          button.click();
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar el archivo',
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
        console.log(error);
      }
    );
  }

  onVolver() {
    this.cards = false; // Cambiar el estado para ocultar el detalle
  }

  // Método para extraer base64
  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject): any => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } catch (e) {
        reject(e);
      }
    });

  //ABRIR EL MODAL PARA EDITAR
  abrirModal(id: number) {
    var archivo = this.archivos.find((a: any) => a.idArchivo == id);
    if (archivo != null || archivo != undefined) {
      this.modal.idArchivo = archivo.idArchivo;
      this.modal.nombreOriginal = archivo.nombreOriginal;
      this.modal.tipoArchivo = archivo.tipoArchivo.tipoArchivo;
    }
  }

  //EDITAR UN ARCHIVO
  editar() {
    var user = this.authService.getUsername();

    if (user == null || user == undefined) {
      return;
    }
    this.modal.username = user;

    if (this.modal.base64.trim() == '' || this.modal.base64.trim() == null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione algun archivo.',
        confirmButtonColor: '#d40000',
        customClass: {
          popup: 'rounded-4', // Clase para redondear el modal
          confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
        },
      });
      return;
    }
    console.log(this.modal);

    this.buscarService.update(this.modal).subscribe(
      (data: any) => {
        const position2 = this.archivos.findIndex(
          (a: any) => a.idArchivo == this.modal.idArchivo
        );
        this.archivos[position2] = data;

        Swal.fire({
          title: 'Datos guardados',
          text: 'Archivo actualizado con éxito',
          icon: 'success',
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
        this.fileInput.nativeElement.value = '';
        // console.log(data);

        // Cierra el modal
        const button = document.getElementById(
          'myButtonEditar'
        ) as HTMLButtonElement;
        if (button) {
          button.click();
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar el archivo',
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
        console.log(error);
      }
    );
  }

  //ELIMINAR UN ARCHIVO
  eliminar(id: number) {
    Swal.fire({
      title: 'Eliminar el archivo',
      text: '¿Estás seguro de eliminar este archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d40000',
      customClass: {
        popup: 'rounded-4', // Clase para redondear el modal
        confirmButton: 'btn b rounded-pill', // Botón rojo para Eliminar
        cancelButton: 'btn btn-secondary rounded-pill', // Botón secundario para Cancelar
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.buscarService.delete(id).subscribe(
            (data: any) => {
              this.archivos = this.archivos.filter(
                (archivos: any) => archivos.idArchivo != id
              );
            },
            (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar el archivo',
                confirmButtonColor: '#d40000',
                customClass: {
                  popup: 'rounded-4', // Clase para redondear el modal
                  confirmButton: 'btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
                },
              });

              console.log(error);
            }
          );
        }, 2000);
      }
    });
  }

  //LLENAR LAS CARDS
  llenarCards(position: number, obligacion: any) {
    this.subirArchivo.numeroObligacion = obligacion;

    var user = this.authService.getUsername();

    if (user == null || user == undefined) {
      return;
    }
    this.subirArchivo.username = user;

    this.isEmpty(obligacion);

    this.archivos = this.datos[position].archivos;

    this.eliminarTiposArchivos();
  }

  eliminarTiposArchivos() {
    for (let i = 0; i < this.archivos.length; i++) {
      const tiposArchivosExistentes = this.archivos[i].tipoArchivo.tipoArchivo;

      for (let x = 0; x < this.tiposArchivos.length; x++) {
        const tiposArchivosTodos = this.tiposArchivos[x].tipoArchivo;
        if (tiposArchivosTodos === tiposArchivosExistentes) {
          this.tiposArchivos.splice(x, 1);
          // console.log(this.tiposArchivos);
        }
      }
    }
  }
}
