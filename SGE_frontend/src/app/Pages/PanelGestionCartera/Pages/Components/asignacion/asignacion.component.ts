import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  @Input() btn: any;

  constructor() { }

  ngOnInit(): void {
  }

}
