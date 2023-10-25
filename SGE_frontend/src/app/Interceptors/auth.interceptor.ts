import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request;
    var fecha = this.authService.getFecha()
    if (fecha != null || fecha != undefined) {
      var fechaActual = new Date()
      var diferencia = fechaActual.getTime() - fecha.getTime()
      var horasPasadas = diferencia / 3600000
      if (horasPasadas >= 10) {
        this.authService.logout()
        window.location.reload()
      } else {
        const token = this.authService.getToken();
        if (token != null) {
          authRequest = authRequest.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          })
        }
      }
    }

    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]