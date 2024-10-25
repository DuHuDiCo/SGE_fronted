import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { CajaService } from 'src/app/Services/Caja/caja.service';
import { CuadreDiario, IngresosDiariosArray } from 'src/app/Types/Caja/CuadreDiario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresos-diarios',
  templateUrl: './ingresos-diarios.component.html',
  styleUrls: ['./ingresos-diarios.component.css']
})
export class IngresosDiariosComponent implements OnInit {
  myItem: string | null | undefined;
  Key: string = 'ultima_fecha';
  //variables
  isEditing: boolean = false;
  idIngreso: number = 0;
  fechaIngreso: string = '';
  ingresosDiariosArray: IngresosDiariosArray[] = [];
  tipoIngreso: any = [];
  maxFechaIngreso: string | undefined;
  fechaInicial: string = '';
  fechaFinal: string = '';

  ingresosDiarios: any = {
    valorIngreso: 0,
    fechaIngreso: new Date(),
    tipoIngreso: ''
  }

  constructor(private cajaService: CajaService) { }

  ngOnInit(): void {
    this.setMaxFechaIngreso();

    const storedDate = localStorage.getItem(this.Key);
    console.log(storedDate);
    
    this.ingresosDiarios.fechaIngreso = storedDate;
    // if (storedDate) {
    // } else {
    //   this.ingresosDiarios.fechaIngreso = new Date().toISOString().split('T')[0];
    // }

    console.log('Fecha cargada en el input:', this.ingresosDiarios.fechaIngreso);
    // Cargar tipos de ingresos del servicio 
    this.cajaService.getTiposDeIngresos().pipe(
      tap((data: any) => {
        this.tipoIngreso = data;
        console.log("Datos tipo ingresos cargados");
      }),
      catchError((error: Error) => {
        console.log(error);
        return of([]);
      })
    ).subscribe();
  }

  setMaxFechaIngreso() {
    const today = new Date();
    this.maxFechaIngreso = today.toISOString().split('T')[0];
  }

  //Modal crear ingresos diarios
  ModalCrear() {
    this.isEditing = false;
    this.ingresosDiarios = { valorIngreso: 0, fechaIngreso: '', tipoIngreso: '' };
  }

  //Modal editar ingresos diarios
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

  //buscar todos los ingresos diarios
  getIngresosDiarios() {
    if (this.fechaIngreso == null || this.fechaIngreso.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha ingresos vacía',
        text: 'Seleccione una fecha para poder buscarla',
        timer: 3000
      });
      return;
    }

    this.cajaService.getIngresosByFecha(this.fechaIngreso).pipe(
      tap((data: any) => {
        this.ingresosDiariosArray = data.map((ingreso: any) => {
          ingreso.fechaIngreso = ingreso.fechaIngreso.split('T')[0];
          return ingreso;
        });

        if (this.ingresosDiariosArray.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Sin ingresos',
            text: 'No se encontraron ingresos diarios para la fecha seleccionada.',
          });
        }

        console.log(this.ingresosDiariosArray);
      }),
      catchError((error: Error) => {
        console.log(error);
        return of([]);
      })
    ).subscribe();
  }

  //crear un ingreso diario
  createIngresosDiarios() {
    if (this.ingresosDiarios.valorIngreso <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campo valor incorrecto',
        text: 'Digite un valor valido o positivo',
        timer: 3000
      });
      return;
    }

    if (this.ingresosDiarios.fechaIngreso == null || this.ingresosDiarios.fechaIngreso.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha vacia',
        text: 'Seleccione la fecha de ingreso',
        timer: 3000
      });
      return;
    }

    if (this.ingresosDiarios.tipoIngreso == null || this.ingresosDiarios.tipoIngreso.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo tipo ingreso vacio',
        text: 'Seleccione un tipo de ingreso',
        timer: 3000
      });
      return;
    }

    const fechaInicial = this.ingresosDiarios.fechaIngreso;
    const fechaFinal = this.ingresosDiarios.fechaIngreso;

    this.cajaService.getCuadreDiario(fechaInicial, fechaFinal).pipe(
      tap((cuadreDiario: any) => {
        console.log(cuadreDiario);

        if (cuadreDiario.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Ingreso no permitido',
            text: 'Ya existe un cuadre diario para esta fecha.',
          });
          return;
        }
        // this.ingresosDiarios.fechaIngreso = fechaFormateada;
        this.crearIngresoDiario()
      }), catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    ).subscribe();
  }

  crearIngresoDiario() {
    console.log(this.ingresosDiarios);

    const [year, month, day] = this.ingresosDiarios.fechaIngreso.split('-').map(Number);
    const fechaFormateada = new Date(year, month - 1, day);

    const fechaIngresoFormateadaEnviar = new Date(this.ingresosDiarios.fechaIngreso).toISOString();
    const fechaIngresoFormateada = new Date(this.ingresosDiarios.fechaIngreso).toISOString();

    const obj: any = {
      fechaIngreso: fechaFormateada,
      valorIngreso: this.ingresosDiarios.valorIngreso,
      tipoIngreso: this.ingresosDiarios.tipoIngreso
    }


    this.cajaService.createIngresosDiarios(obj).pipe(
      tap((data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Guardados',
          text: 'Ingresos diarios creado con exito',
        });
        console.log(data);

        if (fechaIngresoFormateadaEnviar != fechaIngresoFormateada) {
          console.log("No pertenece");
        } else {
          this.ingresosDiariosArray.push(data);
        }
        console.log('Datos a enviar:', this.ingresosDiarios);

        this.ingresosDiarios = {
          valorIngreso: 0,
          fechaIngreso: this.ingresosDiarios.fechaIngreso,
          tipoIngreso: ''
        };
      }), catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    ).subscribe();
  }

  guardarFecha() {
    localStorage.setItem(this.Key, this.ingresosDiarios.fechaIngreso);
    console.log('Fecha guardada en localStorage:', this.ingresosDiarios.fechaIngreso);
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

        var pos = this.ingresosDiariosArray.findIndex((i: any) => i.idIngresosDiarios == this.idIngreso)
        this.ingresosDiariosArray[pos] = data

        console.log(ingreso);
      }),
      catchError((error: Error) => {
        console.error(error);
        return of([]);
      })
    ).subscribe();
  }

  //eliminar un ingreso diario
  deleteIngresosDiarios(idIngreso: number) {
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
