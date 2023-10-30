import { Component, OnInit } from '@angular/core';
import { ObligacionesService } from 'src/app/Services/Consignaciones/Obligaciones/obligaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados-obligacion',
  templateUrl: './estados-obligacion.component.html',
  styleUrls: ['./estados-obligacion.component.css']
})
export class EstadosObligacionComponent implements OnInit {

  page:number = 1
  estado:string = ''
  estados:any[] = []
  botonSave:boolean = false
  botonUpdate:boolean = false

  modal:any = {
    idEstado: 0,
    estado: ''
  }

  constructor(private obligacionService:ObligacionesService) { }

  ngOnInit(): void {
    this.getAll()
  }

  save(){
    if(this.estado == null || this.estado == ''){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Estado Que Desea Crear',
        timer: 3000
      })
      return
    }

    this.botonSave = true
    setTimeout(() => {
      this.obligacionService.saveEstado(this.estado).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Estado Guardado Con Éxito',
            timer: 3000
          })
          this.botonSave = false
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }, (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Al Guardar El Estado',
            timer: 3000
          })
          this.botonSave = false
          console.log(error);
        }
      )  
    }, 2000);
    
  }

  getAll(){
    this.obligacionService.getAllEstado().subscribe(
      (data:any) => {
        this.estados = data
        console.log(this.estados);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  update(){
    if(this.modal.estado == '' || this.modal.estado == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite El Estado Que Desea Editar',
        timer: 3000
      })
      return
    }

    this.botonUpdate = true

    setTimeout(() => {
      this.obligacionService.updateEstado(this.modal).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Estado Actualizado Con Éxito',
            timer: 3000
          })
          setTimeout(() => {
            window.location.reload()
          }, 2000);
          this.botonUpdate = false
        }, (error:any) => {
          console.log(error);
          this.botonUpdate = false
        }
      )
    }, 2000);
    
  }

  editar(id:number, estado:string){
    this.modal.idEstado = id
    this.modal.estado = estado
  }

}
