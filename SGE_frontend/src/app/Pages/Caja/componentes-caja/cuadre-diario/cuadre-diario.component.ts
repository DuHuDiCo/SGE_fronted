import { Component, OnInit } from '@angular/core';
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
export class CuadreDiarioComponent {

  //variables
  fechaCuadre: string = '';
  ingresosDiario: IngresosDiariosArray[] = [];
  cuadreDiario: CuadreDiario = {
    length: 0,
    idCuadreDiario: 0,
    valorCartera: 0,
    valorIniciales: 0,
    valorContado: 0,
    valorGastos: 0,
    valorBancolombia: 0,
    fechaCreacion: new Date(),
    fechaCuadre: new Date(),
    valorTotalCuadre: 0,
    usuario: {
      idUsuario: 0,
      username: ''
    }
  };

  fechaInicial: string = '';
  fechaFinal: string = '';
  resultadosBusqueda: any[] = [];

  // ARRAYS PDF
  ingresosDiarioPDF: string[][] = [];
  cuadreDiarioPDF: string[][] = [];


  constructor(private cuadreDiarioService: CajaService) { }

  // Agregar un cuadre diario
  crearCuadreDiario() {
    if (this.fechaCuadre == null || this.fechaCuadre.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Fecha cuadre diario vacia',
        text: 'Seleccione una fecha para poder crear el cuadre diario',
        timer: 3000
      })
      return
    }

    this.getIngresos().pipe(
      switchMap(() => {
        if (this.ingresosDiario.length > 0) {
          var fechaCuadre = new Date(this.fechaCuadre).toISOString();
          var obj = { fechaCuadre: fechaCuadre };

          this.convertirArray()

          return this.cuadreDiarioService.createCuadreDiario(obj).pipe(
            tap((data: any) => {
              this.cuadreDiario = data;
              console.log(data);
            }),
            catchError((error: Error) => {
              console.log(error);
              return of([]);
            })
          );

          return '';
        } else {
          console.log("No hay ingresos para crear el cuadre diario.");
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
    var arrayingresosDiario: string[] = [];
    for (var i = 0; i < this.ingresosDiario.length; i++) {
      const fecha = new Date(this.ingresosDiario[i].fechaIngreso);
      const formattedDate = fecha.toLocaleDateString('es-CO');
      arrayingresosDiario.push(formattedDate);

      arrayingresosDiario.push(this.ingresosDiario[i].valorIngreso.toString());
      arrayingresosDiario.push(this.ingresosDiario[i].tipoIngreso.nombre);
    }
    this.ingresosDiarioPDF.push(arrayingresosDiario);
    console.log(this.ingresosDiarioPDF);

    var arrayCuadreDiario: string[] = [];

    arrayCuadreDiario.push(this.cuadreDiario.valorCartera.toString());
    arrayCuadreDiario.push(this.cuadreDiario.valorIniciales.toString());
    arrayCuadreDiario.push(this.cuadreDiario.valorContado.toString());
    arrayCuadreDiario.push(this.cuadreDiario.valorGastos.toString());
    arrayCuadreDiario.push(this.cuadreDiario.valorBancolombia.toString());
    arrayCuadreDiario.push(this.cuadreDiario.valorTotalCuadre.toString());
    this.cuadreDiarioPDF.push(arrayCuadreDiario);
    console.log(this.cuadreDiarioPDF);

  }

  //Buscar un cuadre diario modal
  abrirModalBuscar() {
    //validaciones
    if (this.fechaInicial == null || this.fechaInicial.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha inicial vacia',
        text: 'Seleccione una fecha inicial para buscar un cuadre mensual',
        timer: 3000
      })
      return
    }

    if (this.fechaFinal == null || this.fechaFinal.trim() == '') {
      Swal.fire({
        icon: 'error',
        title: 'Campo fecha final vacia',
        text: 'Seleccione una fecha final para buscar un cuadre mensual',
        timer: 3000
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
    doc.text('Detalles de Ingresos', 10, 10);

    // Generar la segunda tabla
    autoTable(doc, {
      head: [['Fecha', 'Cartera', 'Iniciales', 'Contado', 'Gastos', 'Bancolombia', 'Total']],
      body: this.cuadreDiarioPDF,
      startY: 20,
      theme: 'grid',
    });

    // Guardar el PDF
    doc.save('reporte.pdf');
  }


}
