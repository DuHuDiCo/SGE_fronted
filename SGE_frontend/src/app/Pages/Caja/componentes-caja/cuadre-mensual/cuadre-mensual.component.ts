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
  modoCreacion: boolean = false;
  
  constructor(private cuadreMensualService: CajaService) { }
  
  //Metodo de fecha inicial y fecha final
  setFechasParaCuadre() {
    const fechaSeleccionada = new Date(this.fechaCuadre);
    const mes = fechaSeleccionada.getMonth(); 
    const año = fechaSeleccionada.getFullYear(); 
  
    this.fechaInicial = new Date(año, mes, 1).toISOString().split('T')[0]; 
    this.fechaFinal = new Date(año, mes + 1, 0).toISOString().split('T')[0]; 

    console.log(this.fechaInicial);
    console.log(this.fechaFinal);
    
  }
  
  // Agregar un cuadre diario
  crearCuadreMensual() {
    if (this.fechaCuadre == null || this.fechaCuadre.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Fecha cuadre mensual vacia',
        text: 'Seleccione una fecha para poder crear el cuadre mensual',
      })
      return
    }

    this.setFechasParaCuadre();
  
    this.getCuadresDiarios(this.fechaInicial, this.fechaFinal).subscribe(() => {
      if (this.cuadresDiario.length > 0) {
        const fechaCuadre = new Date(this.fechaCuadre).toISOString();
        const obj = { fecha: fechaCuadre };
  
        this.cuadreMensualService.createCuadreMensual(obj).pipe(
          tap((data: any) => {
            this.cuadreMensual = data;
            console.log(data);
          }),
          catchError((error: any) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al Crear el Cuadre Mensual',
              text: error.error.message,
            })
            this.cuadresDiario = []
            this.cuadreMensual = null;
            this.modoCreacion = false;
            return of([]); 
          })
        ).subscribe();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No hay cuadres diarios',
          text: 'No hay cuadres diarios para crear el cuadre mensual.',
        })
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
  getCuadreMensual(fecha: string) {
    return forkJoin({
      cuadreMensual: this.cuadreMensualService.getCuadreMensual(fecha).pipe(
        tap((data: any) => {
          if (data && data.length > 0) {
            console.log("Cuadre mensual obtenido:", data);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'No se encontraron cuadres mensuales',
              text: 'No hay cuadres mensuales en la fecha seleccionada.',
            })
          }
        }),
        catchError((error: Error) => {
          console.log("Error al obtener el cuadre mensual:", error);
          return of([]); 
        })
      ),
      cuadresDiarios: this.cuadreMensualService.getCuadreDiario(this.fechaInicial, this.fechaFinal).pipe(
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
    if (!this.fechaCuadre) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        text: 'Las fechas no pueden estar vacias.',
      });
      return; 
    }
  
    this.setFechasParaCuadre(); 
  
    this.getCuadreMensual(this.fechaCuadre).subscribe(({ cuadreMensual, cuadresDiarios }) => {
      this.cuadreMensual = cuadreMensual; 
      this.cuadresDiario = cuadresDiarios; 
      console.log("Resultados de la búsqueda: Cuadre mensual:", this.cuadreMensual);
      console.log("Resultados de la búsqueda: Cuadres diarios:", this.cuadresDiario);
      
      if (Array.isArray(this.cuadreMensual)) {
        this.resultadosBusqueda = this.cuadreMensual;
      } else {
        this.resultadosBusqueda = [this.cuadreMensual];
      }
    });
  }
  
}
