import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-edit-dato',
  templateUrl: './modal-edit-dato.component.html',
  styleUrls: ['./modal-edit-dato.component.css']
})
export class ModalEditDatoComponent implements AfterViewInit {

  @ViewChildren('call, location, email, reference, infoLaboral') botones!: QueryList<ElementRef>;

  tipoDato: string = ''
  ocupacion: string = ''

  constructor() { }

  ngAfterViewInit(): void {
    // Inicialización de tooltips después de que el DOM está completamente renderizado
    this.botones.forEach(boton => {
      $(boton.nativeElement).tooltip({
        title: boton.nativeElement.getAttribute('data-title'),
        placement: 'bottom'
      });
    });
  }

  asignarDato(dato: string) {
    this.tipoDato = dato
  }



}
