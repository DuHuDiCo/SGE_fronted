import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { TipoArchivoService } from 'src/app/Services/Archivo/TipoArchivo/tipo-archivo.service';
import { CajaService } from 'src/app/Services/Caja/caja.service';
import { TiposReportes } from 'src/app/Types/Caja/TipoReportes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-reporte',
  templateUrl: './tipo-reporte.component.html',
  styleUrls: ['./tipo-reporte.component.css']
})
export class TipoReporteComponent implements OnInit {

  constructor(private tipoReporteService: CajaService) { }

   //variables
   tiposReportesArray: TiposReportes[] = []

   tiposReportes: any = {
    NOMBRE: '',
   }

  ngOnInit(): void {
    this.getTiposReportes()
  }

  getTiposReportes(){
    console.log("metodo tomado");
    
    this.tipoReporteService.getTipoDeReporte().subscribe(
      (data:any) =>{
        console.log("Datos cargados con exito");
        this.tiposReportesArray = data;
        console.log(data);
        
      }, (error:any) => {
        console.log(error);
      }
    )
  }

  save(){
    if(this.tiposReportes.NOMBRE.trim() == '' || this.tiposReportes.NOMBRE.trim() == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Digite un tipo de reporte',
        timer: 3000
      })
      return
    }
    this.tipoReporteService.crearTipoDeReporte(this.tiposReportes).subscribe(
      (data: any) =>{
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Tipo de ingreso creado Con Éxito',
          timer: 3000
        })
        console.log(data);

        this.tiposReportesArray.push(data);
        this.tiposReportes = '';

      }, catchError((error: Error) => {
        console.log("Error al crear el tipo de reporte:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar el tipo de reporte',
          timer: 3000
        })
        return of([]);
      })
    )
  }

}
