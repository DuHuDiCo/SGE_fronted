import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clasificacion-juridica',
  templateUrl: './clasificacion-juridica.component.html',
  styleUrls: ['./clasificacion-juridica.component.css']
})
export class ClasificacionJuridicaComponent implements OnInit {

  clasificacionJuridica:any = {
    idClasificacionJuridica: 0,
    clasificacionJuridica: ""
  }

  newClasificacionJuridica:any = {
    idClasificacionJuridica: 0,
    clasificacionJuridica: ""
  }

  clasificacionArray:any[] = []

  crearClas:boolean = false
  updateClas:boolean = false

  constructor(private cuentasCobrar:CuentasCobrarService) { }

  ngOnInit(): void {
    this.getAll()
  }

  save(){
    if(this.clasificacionJuridica.clasificacionJuridica.trim() == '' || this.clasificacionJuridica.clasificacionJuridica.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El nombre de la Clasificación',
        timer: 2500
      })
      return
    }

    this.crearClas = true
    this.cuentasCobrar.saveClasificacionJuridica(this.clasificacionJuridica).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Clasificación Guardada Exitosamente',
          timer: 2500
        })
        this.crearClas = false
      }, (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al Guardar La Clasificación',
          timer: 2500
        })
        console.log(error);
        this.crearClas = false
      }
    )
  }

  getAll(){
    this.cuentasCobrar.getAllClasificacionJuridica().subscribe(
      (data:any) => {
        this.clasificacionArray = data
        
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getById(id:number){
    this.cuentasCobrar.getClasificacionJuridicaById(id).subscribe(
      (data:any) => {
        this.newClasificacionJuridica = data
        
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  update(){
    if(this.newClasificacionJuridica.clasificacionJuridica.trim() == '' || this.newClasificacionJuridica.clasificacionJuridica.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El nombre de la Clasificación',
        timer: 2500
      })
      return
    }

    this.updateClas = true
    this.cuentasCobrar.updateClasificacionJuridica(this.newClasificacionJuridica).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Clasificación Actualizada',
          timer: 2500
        })
        this.updateClas = false
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }, (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Actualizar La Clasificación',
          timer: 2500
        })
        console.log(error);
        this.updateClas = false
      }
    )
  }



}
