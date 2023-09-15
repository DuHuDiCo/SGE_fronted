import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plataforma } from 'src/app/Types/Banco';
import { tipoPago } from 'src/app/Types/TipoPago';

@Injectable({
  providedIn: 'root'
})
export class BancoServiceService {

  url = 'http://192.168.1.186:8007/api/v1'

  constructor(private http:HttpClient) { }

  save(tipoPago:tipoPago){
    return this.http.post(`${this.url}/tipoPago/saveTipoPag`, tipoPago)
  }

  getTipoPago(){
    return this.http.get(`${this.url}/tipoPago/getAllTipoPago`)
  }

  saveBanco(banco:Plataforma){
    return this.http.post(`${this.url}/platform/savePlatform`, banco)
  }

  getBancos(){
    return this.http.get(`${this.url}/platform/getAllPlatforms`)
  }

  getBancosById(id:number){
    return this.http.get(`${this.url}/platform/getPlataformaById/${id}`)
  }

  updateBancos(banco:Plataforma){
    return this.http.put(`${this.url}/platform/plataforma`, banco)
  }


}
