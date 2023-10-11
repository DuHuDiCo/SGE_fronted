import { Component, OnInit } from '@angular/core';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { TipoArchivo } from 'src/app/Types/Archivo/TipoArchivo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-archivo',
  templateUrl: './tipo-archivo.component.html',
  styleUrls: ['./tipo-archivo.component.css']
})
export class TipoArchivoComponent implements OnInit {

  tipoArchivo:TipoArchivo = {
    tipoArchivo: '',
    idTipoArchivo: 0
  }

  modal:TipoArchivo = {
    idTipoArchivo: 0,
    tipoArchivo: ''
  }

  tiposArchivos:TipoArchivo[] = []

  botonGuardarTipo:boolean = false
  botonEliminar:boolean = false

  constructor(private tipoArchivoService:TipoArchivoService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.tipoArchivoService.getAll().subscribe(
      (data:any) => {
        this.tiposArchivos = data
        console.log(data);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getById(id:number){
    this.tipoArchivoService.getById(id).subscribe(
      (data:any) => {
        this.modal.idTipoArchivo = id
        this.modal.tipoArchivo = data.tipoArchivo
        console.log(data);
        
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  saveTipoArchivo(){

    if(this.tipoArchivo.tipoArchivo.trim() == '' || this.tipoArchivo.tipoArchivo.trim() == null){
      Swal.fire('Error', 'Digite El nombre Del Tipo De Archivo', 'error')
      return
    }

    this.botonGuardarTipo = true

    setTimeout(() => {
      this.tipoArchivoService.save(this.tipoArchivo.tipoArchivo).subscribe(
        (data:any) => {
          Swal.fire('Felicidades', 'Tipo De Archivo Guardado Con Éxito', 'success')
          this.botonGuardarTipo = false
          setTimeout(() => {
          window.location.reload()
          }, 2000);
        }, (error:any) => {
          Swal.fire('Error', 'Error al Crear El Tipo De Archivo', 'error')
          this.botonGuardarTipo = false
          console.log(error);
        }
      )
    }, 2000);
    
  }

  deleteTipoArchivo(idTipoArchivo:number){
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
            this.botonEliminar = true
            setTimeout(() => {
              this.tipoArchivoService.delete(idTipoArchivo).subscribe(
                (data: any) => {
                  this.tiposArchivos = this.tiposArchivos.filter((tipoArchivo:any) => tipoArchivo.idTipoArchivo != idTipoArchivo);
                  Swal.fire('Tipo De Archivo Eliminado', 'El Tipo De Archivo ha sido Eliminado Exitosamente', 'success')
                  this.botonEliminar = false
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000);
                },
                (error) => {
                  Swal.fire('Error', 'Error al Eliminar El Tipo de Archivo', 'error')
                  this.botonEliminar = false
                  console.log(error);
                }
              )
            }, 2000);
          }
      })    
  }

  update(){
    if(this.modal.tipoArchivo.trim() == '' || this.modal.tipoArchivo.trim() == null){
      Swal.fire('Error', 'Digite El nombre Del Tipo De Archivo', 'error')
      return
    }

    this.tipoArchivoService.update(this.modal).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'El Tipo De Archivo Ha Sido Actualizado', 'success')
      }, (error:any) =>{
        Swal.fire('Error', 'Error al Actualizar el Tipo de Archivo', 'error')
        console.log(error);
      }
    )
  }

}
