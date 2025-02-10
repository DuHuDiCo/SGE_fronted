import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { set } from 'date-fns';
import jsPDF from 'jspdf';
import Login from 'src/app/Models/Login';
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
  validacionContrasena: boolean = false;

  obligacion: any[] = [];
  archivos: any[] = [];
  datos: any = {};
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
    private authenticationService: AuthenticationService,
    private tipoArchivoService: TipoArchivoService,
    private obtenerCedulaService: ObtenerCedulaService
  ) {}

  ngOnInit(): void {
    this.validacionContrasena = false;
    this.getAllTipo();
    setTimeout(() => {
      this.subirService.arch.subscribe((data) => {
        if (data.length > 0) {
          this.archivos = data;
          this.subirArchivo.numeroObligacion =
            this.archivos[0].numeroObligacion;
          this.cards = true;
          this.eliminarTiposArchivos();
        }
      });
    }, 300);
  }

  @ViewChild('pdfEmbed') pdfEmbed!: ElementRef;
  @ViewChild('cedulaInput') cedulaInput!: ElementRef;

  //BUSCAR POR CÉDULA
  onfilter() {
    const traerNombreUsuario = this.authenticationService.getUsername();

    if (this.validacionContrasena == false) {
      if (this.cedula.trim() == '' || this.cedula.trim() == null) {
        Swal.fire({
          title: 'Error',
          text: 'Digite una cédula',
          icon: 'error',
          timer: 2000,
          confirmButtonColor: '#d40000',
          customClass: {
            popup: 'rounded-4', // Clase para redondear el modal
            confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
        return;
      }

      this.filtro = true;
      this.obligacion = [];
      this.buscarService.filter(this.cedula).subscribe(
        (data: any) => {
          Swal.fire({
            title: `Ingrese la contraseña de ${traerNombreUsuario}:`,
            showClass: {
              popup: `animate__animated animate__fadeInUp animate__faster rounded-4`,
            },
            hideClass: {
              popup: `animate__animated animate__fadeOutDown animate__faster`,
            },
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off',
            },
            confirmButtonText: 'Aceptar',
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: '#d40000',
            customClass: {
              confirmButton: 'rounded-pill py-1 mt-0',
              cancelButton: 'rounded-pill py-1 mt-0',
              input: 'rounded-pill w-75 mx-auto bg-transparent mb-0',
            },
            willClose: () => {
              this.filtro = false;
              this.cedula = '';
            },
            preConfirm: (jwtRequest) => {
              return new Promise((resolve, reject) => {
                if (traerNombreUsuario) {
                  const login = new Login(traerNombreUsuario, jwtRequest);
                  this.authenticationService.authentication(login).subscribe(
                    (response: any) => {
                      Swal.fire({
                        icon: 'success',
                        title: `Autenticado como ${traerNombreUsuario}`,
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      this.validacionContrasena = true;
                      resolve(true);
                    },
                    (error: any) => {
                      Swal.fire({
                        icon: 'error',
                        title: `Contraseña incorrecta`,
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      console.log(error);
                      this.filtro = false;
                      this.cedula = '';
                      reject(false);
                    }
                  );
                } else {
                  reject(false);
                }
              });
            },
          }).then((result) => {
            if (result.isConfirmed && this.validacionContrasena) {
              this.datos = data;
              data.forEach((element: any) => {
                this.obligacion.push(element.cuentaPorCobrar);
                this.numeroArc = element.archivos.length;
              });

              this.tabla = true;
              this.filtro = false;
              setTimeout(() => {
                if (this.cedulaInput) {
                  this.cedulaInput.nativeElement.value = '';
                }
              }, 0);
            }
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al buscar los archivos, cedula no encontrada.',
            timer: 2000,
            confirmButtonColor: '#d40000',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-5',
            },
          });
          this.filtro = false;
          console.log(error);
          this.cedula = '';
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Información',
        text: 'Obligaciones encontradas',
        confirmButtonColor: '#d40000',
        timer: 1500,
        customClass: {
          popup: 'rounded-4',
          confirmButton: 'text-white btn border-0 rounded-pill px-4',
        },
      });
    }
  }

  isEmpty(obligacion: string) {
    this.subirService.isEmpty(obligacion).subscribe(
      (data: any) => {
        if (data) {
          Swal.fire({
            title: 'Información',
            text: 'Esta obligacion no contiene archivos, puede subirlos a continuación.',
            icon: 'info',
            timer: 2000,
            confirmButtonColor: '#d40000',
            customClass: {
              popup: 'rounded-4',
              confirmButton: 'text-white btn border-0 rounded-pill px-4',
            },
          });
          setTimeout(() => {
            this.subirService.send(obligacion);

            this.obtenerCedulaService.setCedula(this.cedula);
            this.obtenerCedulaService.setObligacion(obligacion);
            this.router.navigate(['/dashboard-archivos/subir-archivos']);
          }, 2000);
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Archivos cargados',
            text: 'Estos son los archivos encontrados',
            timer: 2000,
            confirmButtonColor: '#d40000',
            customClass: {
              popup: 'rounded-4', // Clase para redondear el modal
              confirmButton: 'text-white btn border-0 rounded-pill px-5',
            },
          });

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
          confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
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
          confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
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
          confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
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
            confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
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
            confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
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
    var user = this.authenticationService.getUsername();

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
          confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
        },
      });
      return;
    }

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
            confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
        this.fileInput.nativeElement.value = '';

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
            confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
          },
        });
        console.log(error);
      }
    );
  }

  onDescargarArchivo(id: number) {
    // Buscar el archivo en la lista por ID
    let archivoDescargar = this.archivos.find((arch) => arch.idArchivo === id);

    if (!archivoDescargar) {
      console.error('Archivo no encontrado');
      return;
    }

    // Obtener la extensión y los datos Base64
    let base64Data = archivoDescargar.ruta;
    const byteCharacters = atob(base64Data); // Decodifica Base64
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Leer el archivo PDF y aplicar contraseña
    const reader = new FileReader();
    reader.onload = () => {
      const pdfData = reader.result as string; // Convertir a base64 para jsPDF

      // Crear un nuevo PDF con contraseña
      console.log(this.cedula);

      const doc = new jsPDF({
        encryption: {
          userPassword: 'user123', // Contraseña para abrir el PDF
          ownerPassword: this.cedula, // Contraseña del propietario
          userPermissions: ['print', 'modify', 'copy', 'annot-forms'], // Permisos del usuario
        },
      });

      doc.addImage(pdfData, 'JPEG', 10, 10, 190, 280); // Agregar contenido del PDF como imagen

      // Descargar el PDF con contraseña
      doc.save(archivoDescargar.tipoArchivo.tipoArchivo);
    };

    reader.readAsDataURL(blob); // Convertir el Blob a Base64
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
        confirmButton: 'text-white btn b rounded-pill', // Botón rojo para Eliminar
        cancelButton: 'btn btn-secondary rounded-pill', // Botón secundario para Cancelar
      },
    }).then((result) => {
      if (result.isConfirmed) {
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
                confirmButton: 'text-white btn border-0 rounded-pill px-4', // Botón rojo para Eliminar
              },
            });

            console.log(error);
          }
        );
      }
    });
  }

  //LLENAR LAS CARDS
  llenarCards(position: number, obligacion: any) {
    this.subirArchivo.numeroObligacion = obligacion;

    var user = this.authenticationService.getUsername();

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
        }
      }
    }
  }

  // addPasswordToPDF(
  //   file: File,
  //   userPassword = 'user123',
  //   ownerPassword = 'owner123'
  // ) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = (event) => {
  //       const existingPdfData = event.target?.result;

  //       // Crear un nuevo documento jsPDF con encriptación
  //       const doc = new jsPDF({
  //         encryption: {
  //           userPassword: userPassword,
  //           ownerPassword: ownerPassword,
  //           userPermissions: ['print', 'modify', 'copy', 'annot-forms'],
  //         },
  //       });

  //       // Agregar el contenido del PDF original como imagen (workaround)
  //       if (typeof existingPdfData === 'string') {
  //         doc.addImage(existingPdfData, 'JPEG', 0, 0, 210, 297); // Ajusta dimensiones según el PDF
  //       } else {
  //         reject('Invalid PDF data');
  //       }

  //       // Convertir a Blob
  //       const pdfBlob = doc.output('blob');

  //       // Convertir a Base64
  //       const readerBase64 = new FileReader();
  //       readerBase64.readAsDataURL(pdfBlob);
  //       readerBase64.onloadend = () =>
  //         resolve((readerBase64.result as string)?.split(',')[1] ?? ''); // Solo la parte base64
  //     };

  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });
  // }

  // // Uso en tu código antes de enviarlo
  // async processAndSendFile(file: File, ) {
  //   try {
  //     const base64WithPassword: string = (await this.addPasswordToPDF(
  //       file
  //     )) as string;
  //     this.base64Promises.push(Promise.resolve(base64WithPassword));
  //   } catch (error) {
  //     console.error('Error al agregar contraseña al PDF:', error);
  //   }
  // }
}
