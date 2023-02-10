import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-archivos-n',
  templateUrl: './archivos-n.component.html',
  styleUrls: ['./archivos-n.component.css']
})
export class ArchivosNComponent implements OnInit {

  // @ViewChild('datos') : ElementRef;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {

  }
}

  const slider = document.querySelector('.screen-box');
  const index = 0;

  // next(); void {

  //     slider,[index].classList.remove('active'),
  //     index = (index + 1) % slider.length;
  //     slider,[index].classList.add('active');
  // }

  // back(); void {
  //     slider,[index].classList.remove('active'),
  //     index = (index - 1 + slider.length) % slider.length;
  //     slider,[index].classList.add('active')
  // }

