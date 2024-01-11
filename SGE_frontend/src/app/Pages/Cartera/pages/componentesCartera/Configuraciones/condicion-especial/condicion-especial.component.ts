import { Component, OnInit } from '@angular/core';
import { CuentasCobrarService } from 'src/app/Services/Cartera/cuentas-cobrar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-condicion-especial',
  templateUrl: './condicion-especial.component.html',
  styleUrls: ['./condicion-especial.component.css']
})
export class CondicionEspecialComponent implements OnInit {

  condicionArray:any[] = []

  condicionEspecial:any = {
    idCondicionEspecial: 0,
    condicionEspecial: ""
  }

  newCondicionEspecial:any = {
    idCondicionEspecial: 0,
    condicionEspecial: ""
  }

  crearCon:boolean = false
  updateCon:boolean = false

  constructor(private cuentasCobrar:CuentasCobrarService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.cuentasCobrar.getAllCondicionEspecial().subscribe(
      (data:any) => {
        this.condicionArray = data
        console.log(data);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  save(){
    if(this.condicionEspecial.condicionEspecial.trim() == '' || this.condicionEspecial.condicionEspecial.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El nombre de la Condición',
        timer: 2500
      })
      return
    }

    this.crearCon = true
    this.cuentasCobrar.saveCondicionEspecial(this.condicionEspecial).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Condición Creada Con Éxito',
          timer: 2500
        })
        this.crearCon = false
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }, (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al Crear La Especial',
          timer: 2500
        })
        this.crearCon = false
        console.log(error);
      }
    )
  }

  getById(id:number){
    this.cuentasCobrar.getCondicionEspecilById(id).subscribe(
      (data:any) => {
        this.newCondicionEspecial = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  update(){
    if(this.newCondicionEspecial.condicionEspecial.trim() == '' || this.newCondicionEspecial.condicionEspecial.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El nombre de la Condición',
        timer: 2500
      })
      return
    }

    this.updateCon = true
    this.cuentasCobrar.updateCondicionEspecial(this.newCondicionEspecial).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Condición Actualizada Con Éxito',
          timer: 2500
        })
        this.updateCon = false
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }, (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Al Actualizar La Condición',
          timer: 2500
        })
        this.updateCon = false
        console.log(error);
      }
    )
  }

}
