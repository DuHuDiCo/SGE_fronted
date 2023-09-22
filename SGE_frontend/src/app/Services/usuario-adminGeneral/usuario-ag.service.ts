import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Types/Usuario';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAgService {

  usuario:any = {}

  constructor(private http:HttpClient) { }

  public crearUsuario(usuario:Usuario){
    return this.http.post(`${baseUrl}/usuarios/save/${usuario}`,usuario)
  }

  public listarRoles(){
    return this.http.get(`${baseUrl}/roles/getAllRoles`)
  }

  setUsuario(user:any){
    this.usuario = user
  }

  getUsuario(){
    return this.usuario;
  }
}
