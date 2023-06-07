import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class RolesSystemService {

  

  constructor(private http:HttpClient) { }

  public saveRoles(roles:string []){
    return this.http.post(`${baseUrl}/roles/saveRoles`, roles)
  }

  public getRolesSystem(){
    return this.http.get(`${baseUrl}/roles/getAllRoles`)
  
  
  }

  
}
