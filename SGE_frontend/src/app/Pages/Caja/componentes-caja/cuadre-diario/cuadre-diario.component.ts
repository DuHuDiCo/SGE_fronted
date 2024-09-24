import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

import autoTable from 'jspdf-autotable'
import { catchError, of, tap } from 'rxjs';
import { CajaService } from 'src/app/Services/Caja/caja.service';
import { CuadreDiario, IngresosDiariosArray } from 'src/app/Types/Caja/CuadreDiario';

@Component({
  selector: 'app-cuadre-diario',
  templateUrl: './cuadre-diario.component.html',
  styleUrls: ['./cuadre-diario.component.css']
})
export class CuadreDiarioComponent implements OnInit {

  fechaCuadre: Date = new Date()
  ingresosDiario: IngresosDiariosArray[] = []
  cuadreDiario: CuadreDiario | null = null

  constructor(private cuadreDiarioService: CajaService) { }

  ngOnInit(): void {
  }

  crearCuadreDiario() {
    var obj = {
      fechaCuadre: this.fechaCuadre
    }
    this.cuadreDiarioService.createCuadreDiario(obj).pipe(
      tap((data: any) => {
        // this.getIngresos()
        this.cuadreDiario = data
      }), catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    ).subscribe()
  }

  getIngresos() {
    this.cuadreDiarioService.getIngresosByFecha(this.fechaCuadre).pipe(
      tap((data: any) => {
        this.ingresosDiario = data
      }), catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    ).subscribe()
  }


  generarPDF() {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Encabezado del PDF
    doc.setFontSize(12);
    doc.text('Ingresos Diarios', 10, 10);

    // Datos de la primera tabla
    const ingresosData = [
      ['01/01/2024', '1000', 'Ingreso A'],
      ['02/01/2024', '2000', 'Ingreso B'],
    ];

    // Generar la primera tabla
    autoTable(doc, {
      head: [['Fecha', 'Valor', 'Tipo Ingreso']],
      body: ingresosData,
      startY: 20,
      theme: 'grid',
    });

    // Añadir un salto de página si es necesario
    doc.addPage();

    // Encabezado de la segunda tabla
    doc.text('Detalles de Ingresos', 10, 10);

    // Datos de la segunda tabla
    const detallesData = [
      ['01/01/2024', '1', 'A', '1', '1', '1', '1'],
    ];

    // Generar la segunda tabla
    autoTable(doc, {
      head: [['Fecha', 'Cartera', 'Iniciales', 'Contado', 'Gastos', 'Bancolombia', 'Total']],
      body: detallesData,
      startY: 20,
      theme: 'grid',
    });

    // Guardar el PDF
    doc.save('reporte.pdf');
  }


}
