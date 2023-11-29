import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { clasificacion } from 'src/app/Types/Cartera/Clasificacion/Clasificacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {

  constructor(private clasificacionService:CuentasCobrarService) { }

  // ARRAY CLASIFICACIONES
  ClasificacionArray:clasificacion[] = []

  clasificacion:clasificacion = {
    idClasificacion: 0,
    tipoClasificacion: ''
  }

  clasificacionModal:any = {
    idClasificacion: 0,
    newClasificacion: ''
  }

  crearButton:boolean = false
  editarButton:boolean = false

  ngOnInit(): void {
    this.getClasificacion()
  }

  getClasificacion(){
    this.clasificacionService.getClasificacion().subscribe(
      (data:any) => {
        this.ClasificacionArray = data
        console.log(this.ClasificacionArray);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getById(id:number){
    this.clasificacionModal = {
      idClasificacion: 0,
      tipoClasificacion: ''
    }
    this.clasificacionService.getClasificacionById(id).subscribe(
      (data:any) => {
        this.clasificacionModal.idClasificacion = data.idClasificacion
        this.clasificacionModal.newClasificacion = data.tipoClasificacion
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  saveClasificacion(){

    if(this.clasificacion.tipoClasificacion.trim() == '' || this.clasificacion.tipoClasificacion.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Un Tipo de Clasificación',
        timer: 3000
      })
      return
    }
    this.crearButton = true
    setTimeout(() => {
      this.clasificacionService.saveClasificacion(this.clasificacion).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Clasificación Creada Exitosamente',
            timer: 3000
          })
          this.crearButton = false
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al Crear La Clasificación',
            timer: 3000
          })
          this.crearButton = false
        }
      )
  
      this.clasificacion = {
        idClasificacion: 0,
        tipoClasificacion: '' 
      }
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }, 3000);

  }

  updateClasificacion(){

    if(this.clasificacionModal.newClasificacion == '' || this.clasificacionModal.newClasificacion == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Un Tipo De Clasificación',
        timer: 3000
      })
      return
    }
    console.log(this.clasificacionModal);
    this.editarButton = true
    setTimeout(() => {
      this.clasificacionService.updateClasificacion(this.clasificacionModal).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Clasificación Actualizada Exitosamente',
            timer: 3000
          })
          this.editarButton = false
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Al Actualizar La Clasificación',
            timer: 3000
          })
          this.editarButton = false
        }
      )
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }, 3000);
  }

}