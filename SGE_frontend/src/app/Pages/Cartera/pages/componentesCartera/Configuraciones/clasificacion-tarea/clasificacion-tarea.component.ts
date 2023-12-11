import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { Tarea, TareaUpdate } from 'src/app/Types/Cartera/Clasificacion-Tarea/Tarea';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clasificacion-tarea',
  templateUrl: './clasificacion-tarea.component.html',
  styleUrls: ['./clasificacion-tarea.component.css']
})
export class ClasificacionTareaComponent implements OnInit {

  Tarea:Tarea = {
    idClasificacionTarea: 0,
    clasificacionTarea: ''
  }

  newTarea:TareaUpdate = {
    idClasificacion: 0,
    clasificacionToUpdate: ''
  }

  clasificacionT:Tarea[] = []

  crearButton:boolean = false
  editarButton:boolean = false
  botonEliminar:boolean = false

  constructor(private clasificacionService:CuentasCobrarService) { }

  ngOnInit(): void {
    this.getClasificacion()
  }
  
  saveClasificacion(){
    if(this.Tarea.clasificacionTarea.trim() == '' || this.Tarea.clasificacionTarea.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Una Clasificación',
        timer: 3000
      })
      return
    }
    
    this.crearButton = true
    setTimeout(() => {
      this.clasificacionService.saveTareas(this.Tarea).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'Clasificación Creada Con Éxito',
            timer: 3000
          })
          this.crearButton = false
          this.Tarea = {
            clasificacionTarea: '',
            idClasificacionTarea: 0
          }

          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al Crear La Clasificación',
            timer: 3000
          })
          this.crearButton = false
          console.log(error);
        }
      )
    }, 3000);
  }

  getClasificacion(){
    this.clasificacionService.getTareas().subscribe(
      (data:any) => {
        this.clasificacionT = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getById(id:number){
    this.clasificacionService.tareasById(id).subscribe(
      (data:any) => {
        this.newTarea.idClasificacion = data.idClasificacionTarea
        this.newTarea.clasificacionToUpdate = data.clasificacionTarea        
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  updateClasificacion(){
    if(this.newTarea.clasificacionToUpdate.trim() == '' || this.newTarea.clasificacionToUpdate.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Un Tipo de Clasificación',
        timer: 3000
      })
      return
    }

    this.editarButton = true
    setTimeout(() => {
      this.clasificacionService.updateTarea(this.newTarea).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'Clasificación Creada Con Éxito',
            timer: 3000
          })
          this.editarButton = false
          this.newTarea = {
            clasificacionToUpdate: '',
            idClasificacion: 0
          }
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al Actualizar La Clasificación',
            timer: 3000
          })
          this.editarButton = false
          console.log(error);
        }
      )
    }, 3000);
  }

  deleteTarea(id:number){
    Swal.fire({
      title: 'Eliminar Clasificación',
      text: '¿Estas seguro de La Clasificación?',
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
            this.clasificacionService.deleteTarea(id).subscribe(
              (data:any) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Datos Guardados',
                  text: 'Clasificación Eliminada Con Éxito',
                  timer: 3000
                })
                this.botonEliminar = false
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
              }, (error:any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error al Eliminar La Clasificación',
                  timer: 3000
                })
                this.botonEliminar = false
                console.log(error);
              }
            )
          }, 2000);
        }
    })    
    
  }



}
