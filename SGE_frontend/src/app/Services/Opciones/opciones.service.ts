import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevaContraseña } from 'src/app/Types/Usuario';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {

  isUpdate:boolean = false

  constructor(private http:HttpClient) { }

  setUpdate(update:boolean){
    localStorage.setItem("Is_updateable", update.toString())
  }

  getUpdate(){
    var update = localStorage.getItem("Is_updateable")
    if(update != null || update != undefined){
      return JSON.parse(update.toLowerCase())
    }
    return null
  }

  changePassowrd(contraseña:NuevaContraseña){
    return this.http.put(`http://192.168.1.171:9000/api/v1/users/changeFirstPassword`, contraseña)
  }


}
