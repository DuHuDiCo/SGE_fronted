import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosService {

  constructor(private http: HttpClient) { }

  public listarUsuarios() {
    return this.http.get(`${baseUrl}/users/all`)
  }

  public filtrarUsuarios(nombres:string) {
    return this.http.get(`${baseUrl}/users/find/${nombres}`)
  }

  public eliminarUsuario(idUsuario: Number, username: string | null) {
    return this.http.delete(`${baseUrl}/users/delete/${idUsuario}?username=${username}`)
  }
}

