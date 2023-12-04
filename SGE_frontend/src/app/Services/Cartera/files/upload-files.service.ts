import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private http:HttpClient) { }

  subirGestiones(files:any){
    return this.http.post("http://192.168.1.6:8021/api/v1/gestiones/saveGestiones", files)
  }
}
