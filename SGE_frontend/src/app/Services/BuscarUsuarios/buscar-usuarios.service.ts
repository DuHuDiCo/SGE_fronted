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

  public filtrarUsuarios(nombres: string) {
    return this.http.get(`${baseUrl}/users/find/${nombres}`)
  }

  public desactivarUsuario(usuario: any) {
    return this.http.post(`${baseUrl}/users/delete`, usuario);
  }

  public activarUsuario(usuario: any) {
    return this.http.post(`${baseUrl}/users/activate`, usuario)
  }
}

