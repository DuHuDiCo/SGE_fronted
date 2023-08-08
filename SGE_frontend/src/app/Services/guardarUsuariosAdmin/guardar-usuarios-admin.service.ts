import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Types/Usuario';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class GuardarUsuariosAdminService {

  constructor(private http:HttpClient) { }

  public crearUsuario(usuario:Usuario){
    return this.http.post(`${baseUrl}/usuarios/save`, usuario)
  }

}