import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-btn-panel',
  templateUrl: './btn-panel.component.html',
  styleUrls: ['./btn-panel.component.css']
})
export class BtnPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

}
