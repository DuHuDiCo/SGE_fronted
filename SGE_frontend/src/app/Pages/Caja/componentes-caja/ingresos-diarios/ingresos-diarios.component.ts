import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { catchError, of, tap } from 'rxjs';
import { CajaService } from 'src/app/Services/Caja/caja.service';
import { CuadreDiario, IngresosDiariosArray } from 'src/app/Types/Caja/CuadreDiario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresos-diarios',
  templateUrl: './ingresos-diarios.component.html',
  styleUrls: ['./ingresos-diarios.component.css']
})
export class IngresosDiariosComponent{
currency: number | undefined;

  constructor(private cajaService: CajaService) { }

  isEditing: boolean = false;
  idIngreso: number = 0;
  fechaIngreso: string = '';

  ingresosDiariosArray: IngresosDiariosArray[] = [];
  tipoIngreso: any = [];

  ingresosDiarios: any = {
      valorIngreso: 0,
      fechaIngreso: '',
      tipoIngreso: ''
  }

  ModalCrear() {
    this.isEditing = false; 
    this.ingresosDiarios = { valorIngreso: 0, fechaIngreso: '', tipoIngreso: '' }; 
  }

  ModalEditar(ingreso: IngresosDiariosArray) {
    console.log(ingreso);
    this.idIngreso = ingreso.idIngresosDiarios;
    this.isEditing = true;
  
    const fechaFormateada = typeof ingreso.fechaIngreso === 'string'
      ? new Date(ingreso.fechaIngreso)  
      : ingreso.fechaIngreso; 
  
    this.ingresosDiarios = {
      valorIngreso: ingreso.valorIngreso,
      fechaIngreso: fechaFormateada instanceof Date && !isNaN(fechaFormateada.getTime())
        ? fechaFormateada.toISOString().substring(0, 10) 
        : '', 
      tipoIngreso: ingreso.tipoIngreso?.nombre     
    };
    console.log(this.ingresosDiarios);
  }
  
  ngOnInit(): void {
    this.cajaService.getTiposDeIngresos().pipe(
      tap((data: any)=>{
        this.tipoIngreso = data;
        console.log(this.tipoIngreso);
        
        console.log(data);
        console.log("Datos tipo ingresos cargados");
        
      }),catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    ).subscribe()
  }

  getIngresosDiarios() {
    if (this.fechaIngreso == null) {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha ingresos vacia',
        text: 'Seleccione una fecha para poder buscarla',
        timer: 3000
      })
      return
    }
    this.cajaService.getIngresosByFecha(this.fechaIngreso).pipe(
      tap((data: any) => {
        this.ingresosDiariosArray = data; 
        console.log(data);
        
      }), catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    ).subscribe()
  }

  createIngresosDiarios() {

    if (this.ingresosDiarios.valorIngreso <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campo valor incorrecto',
        text: 'Digite un valor valido o positivo',
        timer: 3000
      })
      return
    }

    if (this.ingresosDiarios.fechaIngreso == null) {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha vacia',
        text: 'Seleccione la fecha de ingreso',
        timer: 3000
      })
      return
    }

    if (this.ingresosDiarios.tipoIngreso == null) {
      Swal.fire({
        icon: 'error',
        title: 'Capo tipo ingreso vacio',
        text: 'Seleccione un tipo de ingreso',
        timer: 3000
      })
      return
    }
    this.cajaService.createIngresosDiarios(this.ingresosDiarios).pipe(
      tap((data:any) =>{
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Ingresos diarios creado Con Éxito',
          timer: 3000
        })
        console.log(data);

        if (this.ingresosDiarios.fechaIngreso != this.cajaService.getIngresosByFecha(this.fechaIngreso)) {
          console.log("No pertenece");
        }else{
          this.ingresosDiariosArray.push(data);
        }
      })
    ).subscribe()

    console.log('Datos a enviar:', this.ingresosDiarios); 
  }

  updateIngresosDiarios(ingreso: IngresosDiariosArray) {
    if (this.ingresosDiarios.valorIngreso <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campo valor incorrecto',
        text: 'Digite un valor valido o positivo',
        timer: 3000
      })
      return
    }

    if (this.ingresosDiarios.fechaIngreso == null) {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha vacia',
        text: 'Seleccione la fecha de ingreso',
        timer: 3000
      })
      return
    }

    if (this.ingresosDiarios.tipoIngreso == null) {
      Swal.fire({
        icon: 'error',
        title: 'Capo tipo ingreso vacio',
        text: 'Seleccione un tipo de ingreso',
        timer: 3000
      })
      return
    }

    this.cajaService.updateIngresosDiarios(ingreso, this.idIngreso).pipe(
      tap((data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados',
          text: 'Ingresos diarios actualizados Con Éxito',
          timer: 3000
        })
        
        var pos = this.ingresosDiariosArray.findIndex((i: any ) => i.idIngresosDiarios == this.idIngreso)
        this.ingresosDiariosArray[pos] = data

        console.log(ingreso);
      }),
      catchError((error: Error) => {
        console.error(error);
        return of([]);
      })
    ).subscribe();
  }

  deleteIngresosDiarios(idIngreso: number){
    Swal.fire({
      title: "Eliminar ingreso diario",
      text: "¿Estás seguro de que quieres eliminar el ingreso diario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cajaService.deleteIngresosDiarios(idIngreso).pipe(
          tap(() => {
            Swal.fire({
              title: "Ingreso diario eliminada",
              text: "El ingreso diario fue eliminada con éxito.",
              icon: "success"
            });

            this.ingresosDiariosArray = this.ingresosDiariosArray.filter((ingreso: any) => ingreso.idIngresosDiarios !== idIngreso);
          }),
          catchError((error: Error) => {
            Swal.fire('Error al eliminar el ingreso diario', 'No se pudo eliminar el ingreso diario correctamente en el sistema.', 'error');
            console.error(error);
            return of([]);  
          })
        ).subscribe();
      }
    });
  }
}
