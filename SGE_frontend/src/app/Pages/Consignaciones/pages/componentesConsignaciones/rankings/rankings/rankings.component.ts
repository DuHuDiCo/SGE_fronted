import { Component, OnInit } from '@angular/core';
import { RankingsService } from 'src/app/Services/Consignaciones/rankings/rankings.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ConsignacionRanking } from 'src/app/Types/Rankings';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  constructor(private rankings:RankingsService, private authService: AuthenticationService) { }

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  Ranking: ConsignacionRanking = {

    consignacionesToday: 0,
    consignacionesMonth: 0,
    consignacionesDevueltasCaja: 0,
    consignacionesPendientes: 0,
    consignacionesComprobadas: 0,
    consignacionesComprobadasBySede: 0,
    consignacionesAplicado: 0,
    consignacionesAplicadoBySede: 0,
    consignacionesDevueltasContabilidad: 0
  }

  ngOnInit(): void {

    this.getConsignacionesRanking()
  }
  
  getConsignacionesRanking() {

    let username = this.authService.getUsername();

    if (username === null) {
      return;
    }

    this.rankings.getEstadisticas(username).subscribe(
      (data: any) => {
        this.Ranking = data
        console.log(data);
      }, (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los Rankings de las Consignaciones', 'error');
      }
    )
  }

}
