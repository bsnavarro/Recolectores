import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../servicios/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  static setoToken(request: HttpRequest<any>): HttpRequest<any> {

    const token = localStorage.getItem('ID_SESION');

    if (!token) {
      return request;
    }

    return request.clone({
      headers: request.headers.set('Authorization', token)
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = JwtInterceptor.setoToken(request);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.evaluarRespuesta(event.body);
          }
        },
        (error: HttpErrorResponse) => {
          this.evaluarRespuesta(undefined);
        },
      ), finalize(() => {
        const msg = 'finalize';
      }));

  }

  evaluarRespuesta(respuesta: any): any {

    if (!respuesta) {
      return Swal.fire({
        title: 'Error de comunicación',
        text: '¿Desea ir a la pantalla de inicio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
        cancelButtonColor: '#dc3545',
        confirmButtonColor: '#28a745'
      }).then((resultado) => {
        if (resultado.value) {
          this.authService.removeToken();
          this.router.navigate(['/autenticacion']);
        }
      });
    }

    switch (respuesta.codigo) {
      case 0: // NO_AUTORIZADO
      case 3: {// NO_AUTORIZADO
        this.authService.removeToken();
        this.router.navigate(['/autenticacion']);
        break;
      }
      case 1: {// AUTORIZADO

        const data = this.route.data;


        break;
      }
    }
  }
}


