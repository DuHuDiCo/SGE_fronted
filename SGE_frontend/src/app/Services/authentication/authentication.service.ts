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

}
