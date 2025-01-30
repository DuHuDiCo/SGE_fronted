import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObtenerCedulaService {
  constructor() {}

  private cedulaService: string = '';
  private obligacionService: string = '';

  setCedula(cedula: string) {
    this.cedulaService = cedula;
  }
  setObligacion(obligacion: string) {
    this.obligacionService = obligacion;
  }

  getCedula(): string {
    return this.cedulaService;
  }
  getObligacion(): string {
    return this.obligacionService;
  }
}
