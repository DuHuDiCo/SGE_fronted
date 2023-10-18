import { Component, OnInit } from '@angular/core';
import { ConsiganacionesRankingService } from 'src/app/Services/Consignaciones/consignaciones-ranking/consiganaciones-ranking.service';
import { AuthenticationService } from 'src/app/Services/authentication/authentication.service';
import { ConsignacionRanking } from 'src/app/Types/consignacionesRanking';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consignaciones-listas',
  templateUrl: './consignaciones-listas.component.html',
  styleUrls: ['./consignaciones-listas.component.css']
})
export class ConsignacionesListasComponent implements OnInit {

  constructor(private consignacionRanking: ConsiganacionesRankingService, private authService: AuthenticationService) { }

  rolesArray: string[] = ['Cartera', 'Caja', 'Archivos', 'Ventas', 'Servicios', 'Consignaciones', 'SUPERADMINISTRADOR', 'SST']

  RolesRanking: string[] = [
    //1
    "DIA",
    //2
    "MES",
    //3
    "APLICADAS",
    //4
    "DEVUELTACAJA",
    //5
    "COMPROBADAS",
    //6
    "PENDIENTES",
    //7
    "DEVUELTACONTABILIDAD",
    //8
    "DEVUELTACAJA",
    //9
    "APLICADASSEDE",
    //10
    "COMPROBADASSEDE"
  ]

  Ranking: ConsignacionRanking = {

    consignacionesToday: 0,
    consignacionesMonth: 0,
    consignacionesDevueltasCaja: 0,
    consignacionesPendientes: 0,
    consignacionesComprobadas: 0,
    consignacionesComprobadasSede: 0,
    consignacionesAplicada: 0,
    consignacionesAplicadasSede: 0,
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

    this.consignacionRanking.getEstadisticas(username).subscribe(
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
