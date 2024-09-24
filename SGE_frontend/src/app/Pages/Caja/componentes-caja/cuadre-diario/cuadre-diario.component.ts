import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { CajaService } from 'src/app/Services/Caja/caja.service';

@Component({
  selector: 'app-cuadre-diario',
  templateUrl: './cuadre-diario.component.html',
  styleUrls: ['./cuadre-diario.component.css']
})
export class CuadreDiarioComponent implements OnInit {

  fechaCuadre: Date = new Date()

  constructor(private cuadreDiario: CajaService) { }

  ngOnInit(): void {
  }

  guadarCuadreDiario() {
    var obj = {
      fechaCuadre: this.fechaCuadre
    }
    this.cuadreDiario.createCuadreDiario(obj).pipe(
      tap((data: any) => {
        console.log(data);
      }), catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    )
  }

  getIngresos() {
    this.cuadreDiario.getIngresosByFecha(this.fechaCuadre).pipe(
      tap((data: any) => {
        console.log(data);
      }), catchError((error: Error) => {
        console.log(error);
        return of([])
      })
    )
  }

}
