import { Component, OnInit } from '@angular/core';
import { ObligacionesService } from 'src/app/Services/Consignaciones/Obligaciones/obligaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-obligacion',
  templateUrl: './tipo-obligacion.component.html',
  styleUrls: ['./tipo-obligacion.component.css']
})
export class TipoObligacionComponent implements OnInit {

  botonSave:boolean = false
  botonUpdate:boolean = false
  tipo:string = ''
  page:number = 1

  tipos:any[] = []

  modal:any = {
    tipoCuentaPorCobrar: 0,
    tipoCuenta: ''
  }

  constructor(private obligacionService:ObligacionesService) { }

  ngOnInit(): void {
    this.getAll()
  }

  save(){
    if(this.tipo.trim() == '' || this.tipo.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Tipo Que Desea Crear',
        timer: 3000
      })
      return
    }

    this.botonSave = true

    setTimeout(() => {
      this.obligacionService.saveTipo(this.tipo).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'El Tipo De Obligación ha sido Guardado con Éxito',
            timer: 3000
          })
          this.botonSave = false
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }, (error:any) => {
          this.botonSave = false
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al Crear El Tipo',
            timer: 3000
          })
          console.log(error);
        }
      )
    }, 3000);
    
  }

  getAll(){
    this.obligacionService.getAllTipo().subscribe(
      (data:any) => {
        this.tipos = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  editar(id:number, tipo:string){
    this.modal.tipoCuentaPorCobrar = id
    this.modal.tipoCuenta = tipo
  }

  update(){
    if(this.modal.tipoCuenta.trim() == '' || this.modal.tipoCuenta.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Tipo Que Desea Editar',
        timer: 3000
      })
      return
    }
    this.botonUpdate = true

    setTimeout(() => {
      this.obligacionService.updateTipo(this.modal).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'El Tipo De Obligación ha sido Actualizado con Éxito',
            timer: 3000
          })
          this.botonUpdate = false
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Al Actualizar el Tipo',
            timer: 3000
          })
          this.botonUpdate = false
          console.log(error);
        }
      )
    }, 2000);

    
  }

}
