import { Component, OnInit } from '@angular/core';
import { EstadoServiceService } from 'src/app/Services/Consignaciones/estado-service.service';
import { Estado } from 'src/app/Types/Estado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  constructor(private estadoService:EstadoServiceService) { }

  ngOnInit(): void {
    this.getAllEstado()
  }

  estado:Estado = {
    estado: '',
    idEstado: 0
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

}
