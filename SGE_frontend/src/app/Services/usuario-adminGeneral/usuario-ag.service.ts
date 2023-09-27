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

  public crearUsuario(usuario:Usuario, username:string){
    return this.http.post(`${baseUrl}/users/save/${username}`,usuario)
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

  getUsuarioByUsername(username:string){
    return this.http.get(`${baseUrl}/users/getUser/${username}`)
  }
}
