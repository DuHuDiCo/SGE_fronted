import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoArchivo } from 'src/app/Types/Archivo/TipoArchivo';

@Injectable({
  providedIn: 'root'
})
export class TipoArchivoService {

  url = 'http://192.168.1.241:8008/api/v1'

  constructor(private http: HttpClient) { }

  save(tipoArchivo: string) {
    return this.http.post(`${this.url}/tipoArchivo/saveTipoArchivo`, tipoArchivo)
  }

  getAll() {
    return this.http.get(`${this.url}/tipoArchivo/getAllTiposArchivo`)
  }

  getById(id: number) {
    return this.http.get(`${this.url}/tipoArchivo/getTipoArchivo/${id}`)
  }

  delete(idTipoArchivo: number) {
    return this.http.delete(`${this.url}/tipoArchivo/eliminarTipoArchivo?idTipoArchivo=${idTipoArchivo}`)
  }

  update(tipoArchivo: TipoArchivo) {
    return this.http.put(`${this.url}/tipoArchivo/editarTipoArchivo`, tipoArchivo)
  }
}
