import { Component, OnInit } from '@angular/core';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { TipoArchivo } from 'src/app/Types/Archivo/TipoArchivo';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-tipo-archivo',
  templateUrl: './tipo-archivo.component.html',
  styleUrls: ['./tipo-archivo.component.css']
})
export class TipoArchivoComponent implements OnInit {

  tipoArchivo: TipoArchivo = {
    tipoArchivo: '',
    idTipoArchivo: 0
  }

  modal: TipoArchivo = {
    idTipoArchivo: 0,
    tipoArchivo: ''
  }

  tiposArchivos: TipoArchivo[] = []

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']
  permisos: string[] = ['ELIMINAR ARCHIVOS', 'EDITAR ARCHIVOS', 'SUBIR UN ARCHIVO', 'SUBIR ARCHIVOS', 'CREAR TIPOS ARCHIVO', 'EDITAR TIPOS ARCHIVO', 'BUSCAR ARCHIVOS']

  cedula: string = ''

  constructor(private tipoArchivoService: TipoArchivoService) { }

  ngOnInit(): void {
    this.getAll()
  }

  // OBTENER TIPOS DE ARCHIVOS
  getAll() {
    this.tipoArchivoService.getAll().subscribe(
      (data: any) => {
        this.tiposArchivos = data
        console.log(this.tiposArchivos);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  // OBTENER TIPO POR ID
  getById(id: number) {
    var obj: any = this.tiposArchivos.find((a: TipoArchivo) => a.idTipoArchivo == id)
    this.modal = { ...obj }
  }

  saveTipoArchivo() {
    if (this.tipoArchivo.tipoArchivo.trim() == '' || this.tipoArchivo.tipoArchivo.trim() == null) {
      Swal.fire('Error', 'Digite El nombre Del Tipo De Archivo', 'error')
      return
    }

    this.tipoArchivoService.save(this.tipoArchivo.tipoArchivo).subscribe(
      (data: any) => {
        Swal.fire('Datos Guardados', 'Tipo De Archivo Guardado Con Éxito', 'success')
        this.tiposArchivos.push(data)
        console.log(data);
      }, (error: any) => {
        Swal.fire('Error', 'Error al Crear El Tipo De Archivo', 'error')
        console.log(error);
      }
    )

  }

  deleteTipoArchivo(idTipoArchivo: number) {
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
        this.tipoArchivoService.delete(idTipoArchivo).subscribe(
          (data: any) => {
            this.tiposArchivos = this.tiposArchivos.filter((tipoArchivo: any) => tipoArchivo.idTipoArchivo != idTipoArchivo);
            Swal.fire('Tipo De Archivo Eliminado', 'El Tipo De Archivo ha sido Eliminado Exitosamente', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al Eliminar El Tipo de Archivo', 'error')
            console.log(error);
          }
        )
      }
    })
  }

  update() {
    if (this.modal.tipoArchivo.trim() == '' || this.modal.tipoArchivo.trim() == null) {
      Swal.fire('Error', 'Digite El nombre Del Tipo De Archivo', 'error')
      return
    }
    this.tipoArchivoService.update(this.modal).subscribe(
      (data: any) => {
        Swal.fire('Datos Guardados', 'El Tipo De Archivo Ha Sido Actualizado', 'success')
        var pos = this.tiposArchivos.findIndex((t: TipoArchivo) => t.idTipoArchivo == this.modal.idTipoArchivo)
        this.tiposArchivos[pos] = data
        $('#modalEditar').modal('show');
      }, (error: any) => {
        Swal.fire('Error', 'Error al Actualizar el Tipo de Archivo', 'error')
        console.log(error);
      }
    )
  }

}
