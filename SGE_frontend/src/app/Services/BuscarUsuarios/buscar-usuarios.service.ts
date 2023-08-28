import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosService {

  constructor(private http: HttpClient) { }

  public listarUsuarios() {
    return this.http.get(`${baseUrl}/users/getAll`)
  }

  public filtrarUsuarios(nombres:string) {
    return this.http.get(`${baseUrl}/users/find/${nombres}`)
  }

  public desactivarUsuario(usernameUsuarios:string, password:string, datoToDelete:string) {
    return this.http.delete(`${baseUrl}/users/delete/?username=${usernameUsuarios}&password=${password}&datoToDelete=${datoToDelete}`)
  }

  public activarUsuario() {
    return this.http.delete(`${baseUrl}/users/activate/`)
  }
}

