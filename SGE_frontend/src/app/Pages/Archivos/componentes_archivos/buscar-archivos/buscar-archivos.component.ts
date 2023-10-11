import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/Services/Archivo/SubirArchivos/subir-archivo.service';

@Component({
  selector: 'app-buscar-archivos',
  templateUrl: './buscar-archivos.component.html',
  styleUrls: ['./buscar-archivos.component.css']
})
export class BuscarArchivosComponent implements OnInit {

  cedula:string = ''
  archivos:any[] = []
  constructor(private buscarService:SubirArchivoService) { }

  ngOnInit(): void {
  }

  filter(){
    this.buscarService.filter(this.cedula).subscribe(
      (data:any) => {
        this.archivos = data
        console.log(this.archivos);
      }, (error:any) => {
        console.log(error);
      }
    )
  }



}
