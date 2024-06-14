import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-gestion',
  templateUrl: './historial-gestion.component.html',
  styleUrls: ['./historial-gestion.component.css']
})
export class HistorialGestionComponent implements OnInit {

  // ARRAYS
  deliveryEvents: any[] = [
    {
      time: new Date('2023-06-13T11:26:00'),
      status: 'In transit',
      description: 'El paquete se recibió en la estación'
    },
    {
      time: new Date('2023-06-13T11:08:00'),
      status: 'In transit',
      description: 'El paquete se recibió en la estación'
    },
    {
      time: new Date('2023-06-13T09:48:00'),
      status: 'In transit',
      description: 'El paquete se recibió en la estación'
    },
    {
      time: new Date('2023-06-13T06:46:00'),
      status: 'Arrived at Colombia',
      description: 'El paquete ha pasado la aduana'
    },
    {
      time: new Date('2023-06-13T05:31:00'),
      status: 'Arrived at Bogota',
      description: 'El paquete fue recibido por la aduana de importación: Bogotá'
    },
    {
      time: new Date('2023-06-10T16:20:00'),
      status: 'Arrived at Bogota',
      description: 'El paquete ha llegado a la estación: Bogotá'
    },
    {
      time: new Date('2023-06-07T12:55:00'),
      status: 'In transit to Colombia',
      description: 'El paquete ha salido del puerto de origen: MACAO'
    },
    {
      time: new Date('2023-06-06T07:43:00'),
      status: 'Customs clearance',
      description: 'El paquete ha pasado la aduana'
    },
    {
      time: new Date('2023-06-06T00:15:00'),
      status: 'Logistics transfer',
      description: 'El paquete ha sido entregado al siguiente proveedor de servicios logísticos'
    },
    {
      time: new Date('2023-06-05T16:52:00'),
      status: 'Processing for overseas shipment',
      description: 'El paquete ha salido del centro de clasificación: Shenzhen'
    },
    {
      time: new Date('2023-06-05T13:51:00'),
      status: 'Collected at Dongguan',
      description: 'El paquete se recibió en el punto de recolección de Dongguan'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
