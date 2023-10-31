import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosService {

  usuarioGeneral:any = {}

  public proSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public listarUsuarios(page:number, size:number) {
    return this.http.get(`${baseUrl}/users/getAll?page=${page}&size=${size}`)
  }

  public filtrarUsuarios(nombres: string) {
    return this.http.get(`${baseUrl}/users/find?nombre=${nombres}`)
  }

  public desactivarUsuario(usuario: any) {
    return this.http.post(`${baseUrl}/users/delete`, usuario);
  }

  public activarUsuario(usuario: any) {
    return this.http.post(`${baseUrl}/users/activate`, usuario)
  }

  setUsuarioGeneral(usuario:any){
    this.usuarioGeneral = usuario;
  }

  getUsuarioGeneral(){
    return this.usuarioGeneral;
  }
  
}

