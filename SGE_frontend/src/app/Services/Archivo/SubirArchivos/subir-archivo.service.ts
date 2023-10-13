import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Archivo, EditarArchivo } from 'src/app/Types/Archivo/Archivos';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  url = 'http://192.168.1.183:8008/api/v1'

  constructor(private http:HttpClient) { }

  save(archivo:Archivo){
    return this.http.post(`${this.url}/archivo/saveArchivo`, archivo)
  }

  filter(cedula:string){
    return this.http.get(`${this.url}/archivo/getArchivosByCedula/${cedula}`)
  }

  delete(id:number){
    return this.http.delete(`${this.url}/archivo/deleteArchivo/${id}`)
  }

  update(archivo:EditarArchivo){
    return this.http.put(`${this.url}/archivo/updateArchivo`, archivo)
  }
}
