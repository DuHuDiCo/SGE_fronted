import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Archivo, EditarArchivo } from 'src/app/Types/Archivo/Archivos';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  url = 'http://192.168.1.241:8008/api/v1'

  constructor(private http: HttpClient) { }

  private numeroObligacion = new BehaviorSubject<any>(null);
  currentData = this.numeroObligacion.asObservable();

  private archivos = new BehaviorSubject<any[]>([]);
  arch = this.archivos.asObservable();

  send(date:any){
    this.numeroObligacion.next(date);
  }

  sendFiles(archivos: any[]){
    this.archivos.next(archivos)
  }

  save(archivo: Archivo) {
    return this.http.post(`${this.url}/archivo/saveArchivo`, archivo)
  }

  filter(cedula: string) {
    return this.http.get(`${this.url}/archivo/getArchivosByCedula/${cedula}`)
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/archivo/deleteArchivo/${id}`)
  }

  update(archivo: EditarArchivo) {
    return this.http.put(`${this.url}/archivo/updateArchivo`, archivo)
  }

  saveOne(archivo: Archivo) {
    return this.http.post(`${this.url}/archivo/saveOneArchivo`, archivo)
  }

  isEmpty(numeroObligacion: string) {
    return this.http.get(`${this.url}/archivo/isEmpty?numeroObligacion=${numeroObligacion}`)
  }
}
