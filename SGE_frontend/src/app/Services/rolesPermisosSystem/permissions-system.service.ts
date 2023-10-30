import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class PermissionsSystemService {

  constructor(private http:HttpClient) { }


  getAllPermissions(){
    return this.http.get(`${baseUrl}/permissions/getAllPermissions`)
  }


  savePermissions(permisos:string [], id:number){
    return this.http.post(`${baseUrl}/permissions/addPermissionsToRole/${id}`, permisos)
  }

  deletePermissions(idPermission:number, ids:any){
    return this.http.post(`${baseUrl}/permissions/deletePermissionsOfRole/${idPermission}`, ids);
  }
}
