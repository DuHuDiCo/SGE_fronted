import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pestanas',
  templateUrl: './pestanas.component.html',
  styleUrls: ['./pestanas.component.css']
})
export class PestanasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public enviarDato(numero:number){
    var dato = numero
    return dato;
  }

}
