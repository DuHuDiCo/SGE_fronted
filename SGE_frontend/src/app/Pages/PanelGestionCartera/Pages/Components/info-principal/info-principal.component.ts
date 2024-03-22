import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-principal',
  templateUrl: './info-principal.component.html',
  styleUrls: ['./info-principal.component.css']
})
export class InfoPrincipalComponent implements OnInit {

  @Input() btn: any;

  constructor() { }

  ngOnInit(): void {
  }

}
