import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Login from 'src/app/Models/Login';
import { ROLES } from 'src/app/Types/Roles';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  

  constructor(private http:HttpClient) { }

  public authentication(jwtRequest:Login){
    return this.http.post(`${baseUrl}/generate-token`, jwtRequest);
  }


  public getUser(username: string){
    return this.http.get(`${baseUrl}/users/getUser/${username}`);
  }

  public setTokenLocalStorage(token:string):void{
    localStorage.setItem("Token", token)
  }

  public setUsernameLocalStorage(username:string):void{
    localStorage.setItem("Username", username)
  }

  public setRolesLocalStorage(username:string[]):void{
    localStorage.setItem("Roles", JSON.stringify(username))
  }

  public getToken():string | null{
    var token:string| null =  localStorage.getItem("Token")
    return token;
  }

  
  public getUsername(){
    var user:string | null = localStorage.getItem("Username")
    return user 
  }
  
  public getRoles(){
    var roles: string | null = localStorage.getItem("Roles")
    if(roles != null){
      return JSON.parse(roles);
    }else{
      this.logout();
      return null;
    }
  }


  getRolesByName(name:string){
    var roles: string | null = localStorage.getItem("Roles")
    
    var rolesToJson;

    if(roles != null){
      rolesToJson =  JSON.parse(roles);

      var cartera = rolesToJson.filter((r:any)=>r.rol == name)
      
      
      if(cartera != null || cartera != undefined){
        return cartera
      }
      return null
    }
  }


  public getRolesP(){
    var roles = this.getRoles()
    if(roles != null){
      var rol = roles.find((r:any) => r.rol == ROLES.Consignaciones)
      if(rol != null){
        return rol
      }
      return null
    }
  }

  public setSede(sede:string){
    localStorage.setItem("Sede", sede)
  }

  public getSede(){
    var sede:string | null = localStorage.getItem("Sede")
    return sede
  }

  public setFecha(fecha:string){
    localStorage.setItem("Fecha", fecha)
  }

  public getFecha(){
    var fecha:string | null = localStorage.getItem("Fecha")
    if(fecha != null || fecha != undefined){
      var fechaDate = new Date(fecha)
      return fechaDate
    }
    return null
  }


  public logout():void{
    localStorage.removeItem("Token")
    localStorage.removeItem("Username")
    localStorage.removeItem("Roles")
    localStorage.removeItem("Sede")
    localStorage.removeItem("Is_updateable")
    localStorage.removeItem("Fecha") 
  }

  public isLoggedIn():boolean{
    var token:string | null = localStorage.getItem("Token");
    var username:string | null = localStorage.getItem("Username");
    var roles:string | null = localStorage.getItem("Roles");
    if(token == undefined || token == null  || username == undefined || username == null || roles == undefined || roles == null){
      this.logout()
      return false
    }
    return true;
  }

  public obtenerRolesSistema(username:number){
    return this.http.get(`${baseUrl}/users/getRoles/${username}`)
  }


  
}
