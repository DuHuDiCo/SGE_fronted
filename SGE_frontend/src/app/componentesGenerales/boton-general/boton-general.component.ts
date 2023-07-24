import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-general',
  templateUrl: './boton-general.component.html',
  styleUrls: ['./boton-general.component.css']
})
export class BotonGeneralComponent implements OnInit {

  constructor(private router:Router) { }

  showButton: boolean = false; // Variable para controlar la visibilidad del botón

  ngOnInit(): void {
  }

  redireccionar() {
    // Reemplaza 'opciones' con el nombre de la ruta a la que deseas redirigir
    this.router.navigate(['/opciones']);
  }

}
