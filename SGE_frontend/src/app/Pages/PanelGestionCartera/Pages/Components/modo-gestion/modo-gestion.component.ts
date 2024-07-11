import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modo-gestion',
  templateUrl: './modo-gestion.component.html',
  styleUrls: ['./modo-gestion.component.css']
})
export class ModoGestionComponent implements OnInit {

  responsableSelect: string = 'Yeimar Fernando Sánchez'

  responsables: any[] = [
    {
      tipoGarante: 'Titular',
      nombre: 'Yeimar Fernando Sánchez'
    },
    {
      tipoGarante: 'Codeudor',
      nombre: 'Duvan Huberto Diaz'
    },
    {
      tipoGarante: 'Codeudor',
      nombre: 'Johan Andres Hernandez'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  cambiarResponsable(nombre: string) {
    this.responsableSelect = nombre
  }

}
