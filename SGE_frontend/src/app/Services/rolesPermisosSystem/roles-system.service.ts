import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class RolesSystemService {

  urlDev = "http://localhost:8003/api/v1"

  constructor(private http:HttpClient) { }

  public saveRoles(roles:string []){
    return this.http.post(`${baseUrl}/administration/saveRoles`, roles)
  }

  public getRolesSystem(){
    return this.http.get(`${baseUrl}/roles/getAllRoles`)
  
  
  }

  public validarSiExiste(username:string){
    return this.http.get(`${this.urlDev}/administration/getSuperAdmin/${username}`)
  }

  public crearSuperAdmin(){
    return this.http.get(`${this.urlDev}/administration/saveSuperAdmin`)
  }
}
