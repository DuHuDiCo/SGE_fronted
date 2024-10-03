import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { CajaService } from 'src/app/Services/Caja/caja.service';
import { TiposIngresos } from 'src/app/Types/Caja/TipoIngresos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-ingreso',
  templateUrl: './tipo-ingreso.component.html',
  styleUrls: ['./tipo-ingreso.component.css']
})
export class TipoIngresoComponent implements OnInit {

  constructor(private cajaService: CajaService) { }

  //variables
  tipoIngresosArray:TiposIngresos[] = []
  tiposIngresos: any = {
    NOMBRE: ''
  }

  ngOnInit(): void {
    this.getTiposIngresos()
  }

  //obtener todos los tipos e ingresos
  getTiposIngresos(){
    this.cajaService.getTiposDeIngresos().subscribe(
      (data:any) =>{
        console.log("Datos cargados con exito");
        this.tipoIngresosArray = data;
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  //crear tipo de ingreso
  save(){
    if(this.tiposIngresos.NOMBRE.trim() == '' || this.tiposIngresos.NOMBRE.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite un tipo de ingreso',
        timer: 3000
      })
      return
    }

    console.log(this.tiposIngresos);
    
      this.cajaService.createTipoDeIngreso(this.tiposIngresos).subscribe(
        (data:any) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos Guardados',
            text: 'Tipo de ingreso creado Con Éxito',
            timer: 3000
          })
          console.log(data);

          this.tipoIngresosArray.push(data);

        }, (error:any) => {
          console.log(error);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar los cambios',
            timer: 3000
          })
          return
        }
      )
  }
}
