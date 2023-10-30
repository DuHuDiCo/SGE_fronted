import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Types/Usuario';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class GuardarUsuariosAdminService {

  usuario:any = {}

  constructor(private http:HttpClient) { }

  public crearUsuario(usuario:Usuario,username:string){
    return this.http.post(`${baseUrl}/usuarios/save${username}`, usuario)
  }

  setUsuario(user:any){
    this.usuario = user
  }

  getUsuario(){
    return this.usuario;
  }

}
