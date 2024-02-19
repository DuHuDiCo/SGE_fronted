import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-general',
  templateUrl: './boton-general.component.html',
  styleUrls: ['./boton-general.component.css']
})
export class BotonGeneralComponent implements OnInit {

  constructor(private router:Router) { }

  showButton: boolean = false;

  ngOnInit(): void {
  }

  redireccionar() {
    this.router.navigate(['/opciones']);
  }

}
