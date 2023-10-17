import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { Archivo, Base64, EditarArchivo } from 'src/app/Types/Archivo/Archivos';
import { TipoArchivo } from 'src/app/Types/Archivo/TipoArchivo';
import { Obligacion } from 'src/app/Types/Consignaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-archivos',
  templateUrl: './buscar-archivos.component.html',
  styleUrls: ['./buscar-archivos.component.css']
})
export class BuscarArchivosComponent implements OnInit {

  cedula:string = ''
  url:string = ''
  dataUri:string = 'data:image/jpg;base64'
  base64Pdf:string = ''
  cards:boolean = false
  tabla:boolean = false
  filtro:boolean = false
  tipoArc:number = 0
  numeroArc:number = 0

  obligacion: any[] = []
  archivos:any[] = []
  datos:any[] = []
  tiposArchivos:TipoArchivo[] = []
  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  modal:EditarArchivo = {
    idArchivo: 0,
    base64: '',
    username: '',
    tipoArchivo: '',
    nombreOriginal: ''
  }

  subirArchivo:Archivo = {
    numeroObligacion: '',
    base64: [],
    username: ''
  }

  base64: Base64 = {
    base46: '',
    tipoArchivo: '',
    nombreArchivo: ''
  }
  constructor(private buscarService:SubirArchivoService, private authService:AuthenticationService, private tipoArchivoService:TipoArchivoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllTipo()
  }

  @ViewChild('pdfEmbed') pdfEmbed!: ElementRef;

  //BUSCAR POR CÉDULA
  filter(){
    if(this.cedula.trim() == '' || this.cedula.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Una Cédula',
        timer: 2500
      })
      return
    }
    this.filtro = true
    setTimeout(() => {
      this.buscarService.filter(this.cedula).subscribe(
        (data:any) => {
          this.datos = data
          data.forEach((element:any) => {
            this.obligacion.push(element.cuentaPorCobrar)
            this.numeroArc = element.archivos.length
          });
          
          this.tabla = true
          this.filtro = false
          this.cedula = ''
            Swal.fire({
              icon: 'info',
              title: 'Estas Son Las Obligaciones Encontradas',
              text: 'Elija Una Obligación',
              timer: 2500
            })
          console.log(this.datos);
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Al Buscar Los Archivos',
            timer: 2500
          })
          this.filtro = false
          console.log(error);
        }
      )
    }, 2000);
  }

  getAllTipo(){
    this.tipoArchivoService.getAll().subscribe(
      (data:any) => {
        this.tiposArchivos = data
        this.tipoArc = data.length
        console.log(data);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  saveOne(){
    console.log(this.subirArchivo);
    
    this.buscarService.saveOne(this.subirArchivo).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'Archivo Guardado Con éxito', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 2000);
        
      }, (error:any) => {
        Swal.fire('Error', 'Erro al Guardar El Archivo', 'error')
        console.log(error);
      }
    )
  }

  //LLENAR LAS CARDS
  llenarCards(position:number, obligacion:string){

    this.subirArchivo.numeroObligacion = obligacion
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.subirArchivo.username = user

    Swal.fire({
      icon: 'success',
      title: 'Felicidades',
      text: 'Estos Son Los Archivos Encontrados',
      timer: 2500
    })
    this.archivos = this.datos[position].archivos
    this.archivos.forEach((element:any, index:number) => {
      var tipo = this.tiposArchivos.find((t:any) => t.tipoArchivo == element.tipoArchivo.tipoArchivo)
      if(tipo != null || tipo != undefined){
        var position = this.tiposArchivos.indexOf(tipo)
        this.tiposArchivos.splice(position, 1)
      }
    });
    this.cards = true
    this.tabla = false
  }

  //LLENAR LOS MODALES CON SU PDF
  pdf(base64:string){
    const embed = this.pdfEmbed.nativeElement;
    embed.src = base64;
  }

  //ABRIR EL MODAL PARA EDITAR
  abrirModal(id:number){
    var archivo = this.archivos.find((a:any) => a.idArchivo == id)
    if(archivo != null || archivo != undefined){
      this.modal.idArchivo = archivo.idArchivo
      this.modal.nombreOriginal = archivo.nombreOriginal
      this.modal.tipoArchivo = archivo.tipoArchivo.tipoArchivo
      console.log(this.modal);
    }
  }

  //EDITAR UN ARCHIVO
  editar(){
    var user = this.authService.getUsername()

    if (user == null || user == undefined) {
      return
    }
    this.modal.username = user
    
    this.buscarService.update(this.modal).subscribe(
        (data:any) => {
          Swal.fire('Felicidades', 'Archivo Actualizado Con éxito', 'success')
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        console.log(this.modal);
        }, (error:any) => {
          Swal.fire('Error', 'Erro al Actualizar El Archivo', 'error')
          console.log(error);
        }
      )
  }

  //ELIMINAR UN ARCHIVO
  eliminar(id:number){
    Swal.fire({
      title: 'Eliminar El Archivo',
      text: '¿Estas seguro de Este Archivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            this.buscarService.delete(id).subscribe(
              (data: any) => {
                this.archivos = this.archivos.filter((archivos:any) => archivos.idArchivo != id);
                Swal.fire('Archivo Eliminado', 'El Archivo ha sido Eliminado Exitosamente', 'success')
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
              },
              (error:any) => {
                Swal.fire('Error', 'Error al Eliminar El Archivo', 'error')
                console.log(error);
              }
            )
          }, 2000);
        }
    })    
  }

  //METODOS PARA CONVERTIR EN BASE64
  public obtenerFile(event: any) {
    var archivo = event.target.files[0];

    if (archivo.size > 1048576) {
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      this.modal.base64 = ''
      return
    }

    if (archivo.size > 1048576) {
      Swal.fire('Error', 'El Archivo Es Demasiado Pesado', 'error')
      this.base64.base46 = ''
      return
    }

    this.extraerBase64(archivo).then((file: any) => {
      this.modal.base64 = file.base;
      this.base64.base46 = file.base;
      this.modal.nombreOriginal = archivo.name
      this.base64.nombreArchivo = archivo.name
      this.subirArchivo.base64.push(this.base64)
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
