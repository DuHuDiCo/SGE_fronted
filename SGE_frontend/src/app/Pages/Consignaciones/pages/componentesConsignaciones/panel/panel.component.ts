import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  Desplazarse(selector:any):void{
    if(selector == 1){
      this.router.navigate(['/consultas']);
    }else if (selector == 2){
      this.router.navigate(['/reportes']);
    } else if (selector == 3){
      this.router.navigate(['/ingresar'])
    }
  }
}
