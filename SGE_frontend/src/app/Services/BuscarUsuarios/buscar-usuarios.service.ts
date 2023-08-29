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

  public desactivarUsuario(desactivarUsuario:any) {
    return this.http.delete(`${baseUrl}/users/delete/`,desactivarUsuario)
  }

  public activarUsuario(activarUsuario:any) {
    return this.http.delete(`${baseUrl}/users/activate/`,activarUsuario)
  }
}

