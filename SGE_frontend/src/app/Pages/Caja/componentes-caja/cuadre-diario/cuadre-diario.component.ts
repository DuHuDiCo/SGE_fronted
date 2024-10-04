import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable'
import { catchError, of, switchMap, tap } from 'rxjs';
import { CajaService } from 'src/app/Services/Caja/caja.service';
import { CuadreDiario, IngresosDiariosArray } from 'src/app/Types/Caja/CuadreDiario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuadre-diario',
  templateUrl: './cuadre-diario.component.html',
  styleUrls: ['./cuadre-diario.component.css']
})
export class CuadreDiarioComponent implements OnInit {

  //variables
  modoCreacion: boolean = false;
  fechaCuadre: string = '';
  ingresosDiario: IngresosDiariosArray[] = [];
  cuadreDiario: CuadreDiario | null = null;

  fechaInicial: string = '';
  fechaFinal: string = '';
  resultadosBusqueda: any[] = [];
  maxFechaCuadre: string | undefined;

  // ARRAYS PDF
  ingresosDiarioPDF: string[][] = [];
  cuadreDiarioPDF: string[][] = [];

  // REFERENCIA AL PDF
  @ViewChild('content', { static: false }) content!: ElementRef;

  setMaxFechaCuadre() {
    const today = new Date();
    this.maxFechaCuadre = today.toISOString().split('T')[0];
  }

  constructor(private cuadreDiarioService: CajaService) { }
  ngOnInit(): void {
    this.setMaxFechaCuadre()
  }

  // Agregar un cuadre diario
  crearCuadreDiario() {
    if (this.fechaCuadre == null || this.fechaCuadre.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Fecha cuadre diario vacia',
        text: 'Seleccione una fecha para poder crear el cuadre diario',
      })
      return
    }

    this.getIngresos().pipe(
      switchMap(() => {
        if (this.ingresosDiario.length > 0) {
          var fechaCuadre = new Date(this.fechaCuadre).toISOString();
          var obj = { fechaCuadre: fechaCuadre };
          console.log(obj);


          return this.cuadreDiarioService.createCuadreDiario(obj).pipe(
            tap((data: any) => {
              this.cuadreDiario = data;
              this.modoCreacion = true;
              Swal.fire({
                icon: 'success',
                title: 'Cuadre Diario Creado',
                text: 'Descargando...',
              })
              this.convertirArray()
              this.generarPDF()
              console.log(data);
            }),
            catchError((error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al Crear el Cuadre Diario',
                text: error.error.message,
              })
              this.ingresosDiario = []
              this.cuadreDiario = null;
              this.modoCreacion = false;
              console.log(error);
              return of([]);
            })
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al Crear el Cuadre Diario',
            text: 'No hay ingresos para crear el cuadre diario.',
            timer: 3000
          })
          return of([]);
        }
      })
    ).subscribe();
  }

  // Obtener los ingresos diarios
  getIngresos() {
    console.log("Fecha enviada para ingresos:", this.fechaCuadre);
    return this.cuadreDiarioService.getIngresosByFecha(this.fechaCuadre).pipe(
      tap((data: any) => {
        this.ingresosDiario = data;
        console.log("Datos de ingresos:", data);
      }),
      catchError((error: Error) => {
        console.log("Error al obtener los ingresos:", error);
        return of([]);
      })
    );
  }

  // Buscar los cuadres diarios
  getCuadreDiario(fechaInicial: string, fechaFinal: string) {
    return this.cuadreDiarioService.getCuadreDiario(fechaInicial, fechaFinal).pipe(
      tap((data: any) => {
        if (data && data.length > 0) {
          this.resultadosBusqueda = data;
          console.log("Cuadre diario obtenido:", this.resultadosBusqueda);
        } else {
          console.log("No se encontraron registros de cuadre diario.");
        }
      }),
      catchError((error: Error) => {
        console.log("Error al obtener el cuadre diario:", error);
        return of([]);
      })
    );
  }

  // PREPARAR ARRAYS
  convertirArray() {
    for (var i = 0; i < this.ingresosDiario.length; i++) {
      var arrayingresosDiario: string[] = [];
      const fecha = new Date(this.ingresosDiario[i].fechaIngreso);
      const formattedDate = fecha.toLocaleDateString('es-CO');
      arrayingresosDiario.push(formattedDate);

      arrayingresosDiario.push(this.ingresosDiario[i].valorIngreso.toString());
      arrayingresosDiario.push(this.ingresosDiario[i].tipoIngreso.nombre);
      this.ingresosDiarioPDF.push(arrayingresosDiario);
    }
    console.log(this.ingresosDiarioPDF);

    var arrayCuadreDiario: string[] = [];

    const fecha = new Date(this.cuadreDiario!.fechaCreacion);
    const formattedDate = fecha.toLocaleDateString('es-CO');
    arrayCuadreDiario.push(formattedDate);
    arrayCuadreDiario.push(this.cuadreDiario!.valorCartera.toString());
    arrayCuadreDiario.push(this.cuadreDiario!.valorIniciales.toString());
    arrayCuadreDiario.push(this.cuadreDiario!.valorContado.toString());
    arrayCuadreDiario.push(this.cuadreDiario!.valorGastos.toString());
    arrayCuadreDiario.push(this.cuadreDiario!.valorBancolombia.toString());
    arrayCuadreDiario.push(this.cuadreDiario!.valorTotalCuadre.toString());
    this.cuadreDiarioPDF.push(arrayCuadreDiario);
    console.log(this.cuadreDiarioPDF);
  }

  //Buscar un cuadre diario modal
  abrirModalBuscar() {
    //validaciones
    this.modoCreacion = false;
    if (this.fechaInicial == null || this.fechaInicial.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha inicial vacia',
        text: 'Seleccione una fecha inicial para buscar un cuadre mensual',
      })
      return
    }

    if (this.fechaFinal == null || this.fechaFinal.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha final vacia',
        text: 'Seleccione una fecha final para buscar un cuadre mensual',
      })
      return
    }

    if (!this.fechaInicial || !this.fechaFinal) {
      console.error("Las fechas no pueden estar vacías.");
      return;
    }
    this.getCuadreDiario(this.fechaInicial, this.fechaFinal).subscribe((data: CuadreDiario) => {
      this.cuadreDiario = data;
      console.log("Resultados de la busqueda cuadre diario:", data);

    });
  }

  //Generar PDF
  generarPDF() {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Encabezado del PDF
    doc.setFontSize(12);
    doc.text('Ingresos Diarios', 10, 10);

    // Generar la primera tabla
    autoTable(doc, {
      head: [['Fecha', 'Valor', 'Tipo Ingreso']],
      body: this.ingresosDiarioPDF,
      startY: 20,
      theme: 'grid',
      headStyles: {
        fillColor: [150, 0, 16],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    // Añadir un salto de página si es necesario
    doc.addPage();

    // Encabezado de la segunda tabla
    doc.text('Cuadre Generado', 10, 10);

    // Generar la segunda tabla
    autoTable(doc, {
      head: [['Fecha', 'Cartera', 'Iniciales', 'Contado', 'Gastos', 'Bancolombia', 'Total']],
      body: this.cuadreDiarioPDF,
      startY: 20,
      theme: 'grid',
      headStyles: {
        fillColor: [150, 0, 16],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    // Guardar el PDF
    doc.save('reporte.pdf');
  }

}
