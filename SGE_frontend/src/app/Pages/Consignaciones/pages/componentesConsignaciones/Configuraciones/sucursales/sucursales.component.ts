import { Component, OnInit } from '@angular/core';
import { SedeService } from 'src/app/Services/Consignaciones/Sedes/sede.service';
import { Sede } from 'src/app/Types/Sede';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  constructor(private sedeService:SedeService) { }

  page:number = 1

  sede:Sede[] = []

  sedes:Sede = {
    idSede: 0,
    nombreSede: ''
  }

  modal:Sede = {
    idSede: 0,
    nombreSede: ''
  }

  ngOnInit(): void {
    this.getSedes()
  }

  getSedes(){
    this.sedeService.getSedes().subscribe(
      (data:any) => {
        this.sede = data
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  saveSede(){
    if(this.sedes.nombreSede.trim() == '' || this.sedes.nombreSede.trim() == null){
      Swal.fire('Error', 'Digite el Nombre de la Sede', 'error')
      return
    }
    this.sedeService.saveSede(this.sedes).subscribe(
      (data:any) => {
      Swal.fire('Felicidades', 'Sede Guardada Con Éxito', 'success')
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  getById(id:number){
    this.sedeService.getSedeById(id).subscribe(
      (data:any) => {
        this.modal.idSede = data.idSede
        this.modal.nombreSede = data.nombreSede
        console.log(this.modal);
        
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  updateSede(){
    this.sedeService.updateSede(this.modal).subscribe(
      (data:any) => {
        Swal.fire('Felicidades', 'Sede Actualizada Exitosamente', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }, (error:any) => {
        console.log(error);
        Swal.fire('Error', 'Error Al Actualizar la Sede', 'error')
      }
    )
  }

}
