import { Component, OnInit } from '@angular/core';
import { data, error } from 'jquery';
import { EstadoServiceService } from 'src/app/Services/Consignaciones/Estado/estado-service.service';
import { Estado } from 'src/app/Types/Estado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  page:number = 1

  constructor(private estadoService:EstadoServiceService) { }

  ngOnInit(): void {
    this.getAllEstado()
  }

  estado:Estado = {
    estado: '',
    idEstado: 0
  }

  modal:Estado = {
    idEstado: 0,
    estado: ''
  }

  estadoA:Estado[] = []

  validateEstado(){
    if(this.estado.estado.trim() == '' || this.estado.estado.trim() == null){
      Swal.fire('Error', 'Digite el nombre del Estado', 'error')
      return
    }

    this.save()
  }

  save(){
    this.estadoService.saveEstado(this.estado).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'El Estado se ha Guardado Con éxito', 'success')
        this.estado = {
          estado: '',
          idEstado: 0
        }
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }, (error:any) => {
        Swal.fire('Error', 'Error al Guardar el Estado', 'error')
        this.estado = {
          estado: '',
          idEstado: 0
        }
      }
    )
  }

  getAllEstado(){
    this.estadoService.getAll().subscribe(
      (data:any) => {
        this.estadoA = data
      }, (error:any) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los estados', 'error')
      }
    )
  }

  getEstadoById(id:number){
    this.estadoService.getEstadoById(id).subscribe(
      (data:any) => {
        this.modal.estado = data.estado
        this.modal.idEstado = id
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  updateEstado(){

    console.log(this.modal);
    
    this.estadoService.updateEstado(this.modal).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'Estado Actualizado Exitosamente', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }, (error:any) => {
        Swal.fire('Error', 'Error Al Actualizar el Estado', 'error')
        console.log(error);
      }
    )
  }

}
