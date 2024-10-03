import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, of, switchMap, tap } from 'rxjs';
import { CajaService } from 'src/app/Services/Caja/caja.service';
import { CuadreDiario } from 'src/app/Types/Caja/CuadreDiario';
import { CuadreMensual } from 'src/app/Types/Caja/CuadreMensual';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuadre-mensual',
  templateUrl: './cuadre-mensual.component.html',
  styleUrls: ['./cuadre-mensual.component.css']
})
export class CuadreMensualComponent{
  //variables
  fechaCuadre: string = ''; 
  cuadresDiario: CuadreDiario[] = [];
  cuadreMensual: CuadreMensual | null = null; 
  fechaInicial: string = ''; 
  fechaFinal: string = '';
  resultadosBusqueda: any[] = [];
  
  constructor(private cuadreMensualService: CajaService) { }
  
  //Metodo de fecha inicial y fecha final
  setFechasParaCuadre() {
    const fechaSeleccionada = new Date(this.fechaCuadre);
    const mes = fechaSeleccionada.getMonth(); 
    const año = fechaSeleccionada.getFullYear(); 
  
    this.fechaInicial = new Date(año, mes, 1).toISOString().split('T')[0]; 
    this.fechaFinal = new Date(año, mes + 1, 0).toISOString().split('T')[0]; 
  }
  
  // Agregar un cuadre diario
  crearCuadreMensual() {
    if (this.fechaCuadre == null || this.fechaCuadre.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Fecha cuadre mensual vacia',
        text: 'Seleccione una fecha para poder crear el cuadre mensual',
        timer: 3000
      })
      return
    }

    this.setFechasParaCuadre();
  
    this.getCuadresDiarios(this.fechaInicial, this.fechaFinal).subscribe(() => {
      if (this.cuadresDiario.length > 0) {
        const fechaCuadre = new Date(this.fechaCuadre).toISOString();
        const obj = { fechaCuadre: fechaCuadre };
  
        this.cuadreMensualService.createCuadreMensual(obj).pipe(
          tap((data: any) => {
            this.cuadreMensual = data;
            console.log(data);
          }),
          catchError((error: Error) => {
            console.log(error);
            return of(null); 
          })
        ).subscribe();
      } else {
        console.log("No hay cuadres diarios para crear el cuadre mensual.");
      }
    });
  }
  
  // Obtener los cuadres diarios
  getCuadresDiarios(fechaInicial: string, fechaFinal: string) {
    console.log("Fecha enviada para cuadres:", this.fechaCuadre);
    return this.cuadreMensualService.getCuadreDiario(fechaInicial, fechaFinal).pipe(
      tap((data: any) => {
        this.cuadresDiario = data;
        console.log("Datos de cuadres diarios:", data);
      }),
      catchError((error: Error) => {
        console.log("Error al obtener los cuadres diarios:", error);
        return of([]); 
      })
    );
  }

  //buscar los cuadres mensuales
  getCuadreMensual(fechaInicial: string, fechaFinal: string) {
    return forkJoin({
      cuadreMensual: this.cuadreMensualService.getCuadreMensual(fechaInicial, fechaFinal).pipe(
        tap((data: any) => {
          if (data && data.length > 0) {
            console.log("Cuadre mensual obtenido:", data);
          } else {
            console.log("No se encontraron registros de cuadre mensual.");
          }
        }),
        catchError((error: Error) => {
          console.log("Error al obtener el cuadre mensual:", error);
          return of([]); 
        })
      ),
      cuadresDiarios: this.cuadreMensualService.getCuadreDiario(fechaInicial, fechaFinal).pipe(
        tap((data: any) => {
          if (data && data.length > 0) {
            console.log("Cuadres diarios obtenidos:", data);
          } else {
            console.log("No se encontraron registros de cuadres diarios.");
          }
        }),
        catchError((error: Error) => {
          console.log("Error al obtener los cuadres diarios:", error);
          return of([]); 
        })
      )
    });
  }
  
  //buscar los cuadres mensuales modal
  abrirModalBuscar() {
    if (!this.fechaInicial || !this.fechaFinal) {
        console.error("Las fechas no pueden estar vacías.");
        return; 
    }
    
    this.getCuadreMensual(this.fechaInicial, this.fechaFinal).subscribe(({ cuadreMensual, cuadresDiarios }) => {
        this.cuadreMensual = cuadreMensual; 
        this.cuadresDiario = cuadresDiarios; 
        console.log("Resultados de la búsqueda: Cuadre mensual:", this.cuadreMensual);
        console.log("Resultados de la búsqueda: Cuadres diarios:", this.cuadresDiario);
        
        this.resultadosBusqueda = Array.isArray(this.cuadreMensual) ? this.cuadreMensual : [this.cuadreMensual];
    });
  }
}
