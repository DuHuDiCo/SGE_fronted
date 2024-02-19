import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import { TipoVencimiento } from 'src/app/Types/Cartera/Gestion/Gestion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-vencimiento',
  templateUrl: './tipo-vencimiento.component.html',
  styleUrls: ['./tipo-vencimiento.component.css']
})
export class TipoVencimientoComponent implements OnInit {

  constructor(private cuentasCobrar:CuentasCobrarService) { }

  tiposVen:TipoVencimiento[] = []
  tipoVencimiento:TipoVencimiento = {
    idTipoVencimiento: 0,
    tipoVencimiento: ''
  }

  newTipoVen:TipoVencimiento = {
    idTipoVencimiento: 0,
    tipoVencimiento: ''
  }

  crearVen:boolean = false
  updateVen:boolean = false

  ngOnInit(): void {
    this.getTipoVen()
  }

  getTipoVen(){
    this.cuentasCobrar.getTipoVencimiento().subscribe(
      (data:any) => { 
        this.tiposVen = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  save(){
    if(this.tipoVencimiento.tipoVencimiento.trim() == '' || this.tipoVencimiento.tipoVencimiento.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Un Tipo De Vencimiento',
        timer: 3000
      })
      return
    }
    
    this.crearVen = true
    setTimeout(() => {
      this.cuentasCobrar.saveTipoVencimiento(this.tipoVencimiento).subscribe(
        (data:any) => {
          this.crearVen = false
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'Tipo De Vencimiento Creado Con Éxito',
            timer: 3000
          })
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }, (error:any) => {
          console.log(error);
          this.crearVen = false
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Al Guardar Los Cambios',
            timer: 3000
          })
          return
        }
      )
    }, 2000);
  }

  getTipoVenById(id:number){
    this.cuentasCobrar.getTipoVencimientoById(id).subscribe(
      (data:any) => {
        this.newTipoVen = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  updateTipoVen(){
    if(this.newTipoVen.tipoVencimiento.trim() == '' || this.newTipoVen.tipoVencimiento.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite Un Tipo De Vencimiento',
        timer: 3000
      })
      return
    }
    
    this.updateVen = true

    this.cuentasCobrar.updateTipoVencimiento(this.newTipoVen).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Datos Actualizados Con Éxito',
          timer: 3000
        })
        this.updateVen = false
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }, (error:any) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Actualizar Los Datos',
          timer: 3000
        })
        this.updateVen = false
      }
    )
  }

}
