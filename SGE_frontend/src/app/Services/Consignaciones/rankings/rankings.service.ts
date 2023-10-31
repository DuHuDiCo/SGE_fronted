import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/utils/helper';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  constructor(private http: HttpClient) { }

  url = 'http://192.168.1.183:8007/api/v1'

  getEstadisticas(username:string){
      return this.http.get(`${baseUrl}/consignacion/getEstadisticas?username=${username}`)

  }
}
