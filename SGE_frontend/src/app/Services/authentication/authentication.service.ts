import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  public authentication(jwtRequest:any){
    return this.http.post(`${baseUrl}/generate-token`, jwtRequest);
  }


  public getUser(){
    return this.http.get(`${baseUrl}/users/getUser/dudico`);
  }

  public setTokenLocalStorage(token:any){
    localStorage.setItem("Token",token);
  }

  public setUsernameLocalStorage(username:any){
    localStorage.setItem("Username", username)
  }

  public setRolesLocalStorage(username:any[]){
    localStorage.setItem("Roles", JSON.stringify(username))
  }

  public getToken(){
    var token =  localStorage.getItem("Token")
   
  }

  
  public getUsername(){
    var user = localStorage.getItem("Username")
    
  }
  
  public getRoles(){
    var roles = localStorage.getItem("Roles")
    if(roles != null){
      return JSON.parse(roles);
    }else{
      this.logout();
      return null;
    }
  }


  public logout(){
    localStorage.removeItem("Token")
    localStorage.removeItem("Username")
    localStorage.removeItem("Roles")
  }

  public isLoggedIn(){
    var token = localStorage.getItem("Token");
    var username = localStorage.getItem("Username");
    var roles = localStorage.getItem("Roles");
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
