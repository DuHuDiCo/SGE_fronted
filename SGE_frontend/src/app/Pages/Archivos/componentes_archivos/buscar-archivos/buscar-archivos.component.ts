import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';
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
  obligacion: any[] = []
  archivos:any[] = []
  datos:any[] = []
  constructor(private buscarService:SubirArchivoService) { }

  ngOnInit(): void {
  }

  @ViewChild('pdfEmbed') pdfEmbed!: ElementRef;

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

  llenarCards(position:number){
    Swal.fire({
      icon: 'success',
      title: 'Felicidades',
      text: 'Estos Son Los Archivos Encontrados',
      timer: 2500
    })
    this.archivos = this.datos[position].archivos
    this.cards = true
    this.tabla = false
  }

  pdf(base64:string){
    const embed = this.pdfEmbed.nativeElement;
    embed.src = base64;
  }

  editar(){
    alert('Editar')
  }

  eliminar(id:number){
    Swal.fire({
      title: 'Eliminar El Tipo De Archivo',
      text: '¿Estas seguro de El Tipo De Archivo?',
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
                this.archivos = this.archivos.filter((archivos:any) => archivos.idArchivo != archivos);
                Swal.fire('Tipo De Archivo Eliminado', 'El Tipo De Archivo ha sido Eliminado Exitosamente', 'success')
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
              },
              (error:any) => {
                Swal.fire('Error', 'Error al Eliminar El Tipo de Archivo', 'error')
                console.log(error);
              }
            )
          }, 2000);
        }
    })    
}


}
