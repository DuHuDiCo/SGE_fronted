import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

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
          this.resultadosBusqueda = data.map((resultado: any) => {
            if (resultado.fechaCuadre) {
              resultado.fechaCuadre = resultado.fechaCuadre.split('T')[0];
            }
            return resultado;
          });
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
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };

    for (var i = 0; i < this.ingresosDiario.length; i++) {
      var arrayingresosDiario: string[] = [];
      const fecha = new Date(this.ingresosDiario[i].fechaIngreso);
      const formattedDate = fecha.toLocaleString('es-CO');
      arrayingresosDiario.push(formattedDate);

      arrayingresosDiario.push(formatCurrency(this.ingresosDiario[i].valorIngreso));
      arrayingresosDiario.push(this.ingresosDiario[i].tipoIngreso.nombre);
      this.ingresosDiarioPDF.push(arrayingresosDiario);
    }
    console.log(this.ingresosDiarioPDF);

    var arrayCuadreDiario: string[] = [];

    const fecha = new Date(this.cuadreDiario!.fechaCreacion);
    const formattedDate = fecha.toLocaleDateString('es-CO');
    arrayCuadreDiario.push(formattedDate);
    arrayCuadreDiario.push(formatCurrency(this.cuadreDiario!.valorCartera));
    arrayCuadreDiario.push(formatCurrency(this.cuadreDiario!.valorIniciales));
    arrayCuadreDiario.push(formatCurrency(this.cuadreDiario!.valorContado));
    arrayCuadreDiario.push(formatCurrency(this.cuadreDiario!.valorGastos));
    arrayCuadreDiario.push(formatCurrency(this.cuadreDiario!.valorBancolombia));
    arrayCuadreDiario.push(formatCurrency(this.cuadreDiario!.valorTotalCuadre));
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
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('CUADRE DIARIO', 105, 10, { align: 'center' });

    // Subtítulos del encabezado
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Nombre Usuario:', 10, 20);
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.usuario.nombres + ' ' + this.cuadreDiario!.usuario.apellidos, 50, 20);

    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Almacén:', 140, 20);
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.usuario.sede, 165, 20);

    // Fecha
    const fecha = new Date(this.cuadreDiario!.fechaCreacion);
    const formattedDate = fecha.toLocaleDateString('es-CO');

    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Fecha Creación:', 10, 30);
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(formattedDate, 50, 30);

    // Línea separadora
    doc.line(10, 35, 200, 35);

    // Título debajo de la línea separadora con más espacio
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen', 105, 50, { align: 'center' }); // Ajustado a 50 para más espacio

    // Generar el resumen
    const fechaCuadre = new Date(this.cuadreDiario!.fechaCreacion);
    const formattCuadre = fechaCuadre.toLocaleDateString('es-CO');

    // Espacio adicional para el resumen
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold'); // Títulos en negrita

    doc.text('Fecha Cuadre:', 10, 60); // Ajustado a 60
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(formattCuadre, 50, 60);

    doc.setFont('helvetica', 'bold'); // Título en negrita
    doc.text('Total Cartera:', 120, 60);
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.valorCartera.toLocaleString('es-CO') + ' COP', 165, 60);

    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Total Iniciales:', 10, 70); // Ajustado a 70
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.valorIniciales.toLocaleString('es-CO') + ' COP', 50, 70);

    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Total Contado:', 120, 70);
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.valorContado.toLocaleString('es-CO') + ' COP', 165, 70);

    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Total Gastos:', 10, 80); // Ajustado a 80
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.valorGastos.toLocaleString('es-CO') + ' COP', 50, 80);

    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Total Bancolombia:', 120, 80);
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.valorBancolombia.toLocaleString('es-CO') + ' COP', 165, 80);

    doc.setFont('helvetica', 'bold'); // Títulos en negrita
    doc.text('Total Diario:', 10, 90); // Ajustado a 90
    doc.setFont('helvetica', 'normal'); // Regresar a normal para los valores
    doc.text(this.cuadreDiario!.valorTotalCuadre.toLocaleString('es-CO') + ' COP', 50, 90);

    // Más espacio entre el resumen y el título de ingresos
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Ingresos', 105, 100, { align: 'center' }); // Ajustado a 100 para más espacio


    // Generar tabla de ingresos
    autoTable(doc, {
      head: [['Fecha', 'Valor', 'Tipo Ingreso']],
      body: this.ingresosDiarioPDF,
      startY: 110, // Comienza la tabla un poco más abajo para evitar superposición
      theme: 'grid',
      headStyles: {
        fillColor: [150, 0, 16],
        textColor: [255, 255, 255],
        halign: 'center'
      },
      bodyStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    // Generar la segunda tabla
    // autoTable(doc, {
    //   head: [['Fecha Cuadre', 'Total Cartera', 'Total Iniciales', 'Total Contado', 'Total Gastos', 'Total Bancolombia', 'Total Diario']],
    //   body: this.cuadreDiarioPDF,
    //   startY: 40,
    //   theme: 'grid',
    //   headStyles: {
    //     fillColor: [150, 0, 16],
    //     textColor: [255, 255, 255],
    //     halign: 'center'
    //   },
    //   bodyStyles: {
    //     fillColor: [240, 240, 240],
    //     textColor: [0, 0, 0],
    //     halign: 'center'
    //   },
    //   alternateRowStyles: {
    //     fillColor: [255, 255, 255],
    //   },
    // });

    // Guardar el PDF
    doc.save('reporte.pdf');
  }

}
