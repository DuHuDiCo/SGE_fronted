import { Element } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { eventListeners } from '@popperjs/core';

@Component({
  selector: 'app-archivos-exs',
  templateUrl: './archivos-exs.component.html',
  styleUrls: ['./archivos-exs.component.css']
})
export class ArchivosExsComponent implements OnInit {


  
  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

}

let slider = document.querySelectorAll('.screen-box');
let index = 0;



function next(){
    slider[index].classList.remove('active');
    index = (index + 1) % slider.length;
    slider[index].classList.add('active');
    
}

function back(){
    slider[index].classList.remove('active');
    index = (index - 1 + slider.length) % slider.length;
    slider[index].classList.add('active');
}

