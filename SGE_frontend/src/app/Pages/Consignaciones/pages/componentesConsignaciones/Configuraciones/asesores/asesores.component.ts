import { Component, OnInit } from '@angular/core';
import { ObligacionesService } from 'src/app/Services/Consignaciones/Obligaciones/obligaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: ['./asesores.component.css']
})
export class AsesoresComponent implements OnInit {

  botonSave:boolean = false
  page: number = 1

  asesores: any[] = []
  users: any[] = []

  asesor:any = {
    usuarioId: 0
  }


  constructor(private obligacionService: ObligacionesService) { }

  ngOnInit(): void {
    this.getAll()
    this.getUsersByRol()
  }

  save() {
    if(this.asesor.usuarioId == 0 || this.asesor.usuarioId == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Elija Un Usuario',
        timer: 3000
      })
      return
    }

    this.botonSave = true

    this.obligacionService.saveAsesores(this.asesor).subscribe(
      (data:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: 'El Asesor Ha Sido Creado Exitosamente',
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
          text: 'Error Al Crear El Asesor',
          timer: 3000
        })
        this.botonSave = false
        console.log(error);
      }
    )
  }

  getAll() {
    this.obligacionService.getAllAsesores().subscribe(
      (data: any) => {
        this.asesores = data
        console.log(this.asesores);
      }, (error: any) => {
        console.log(error);
      }
    )
  }
  
  getUsersByRol(){
    this.obligacionService.getUsuarioByRol(23).subscribe(
      (data:any) => {
        this.users = data
        console.log(this.users);
      }, (error:any) => {
        console.log(error);
      }
    )
  }

}
