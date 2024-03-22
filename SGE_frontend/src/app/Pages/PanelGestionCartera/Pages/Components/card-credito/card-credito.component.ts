import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-credito',
  templateUrl: './card-credito.component.html',
  styleUrls: ['./card-credito.component.css']
})
export class CardCreditoComponent implements OnInit {

  @Input() btn: any;

  constructor() { }

  ngOnInit(): void {
  }

}
