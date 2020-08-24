import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../../servicios/auth.service';
import {map} from 'rxjs/operators';
import {Session} from '../../../modelos/session';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  private usuario: Session;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (!this.authService.isLogueado()) {
      this.router.navigate(['/autenticacion']);
      return false;
    }

    return this.authService.obtenerAcceso().pipe(map(respuesta => {

      return respuesta;
    }));

  }
}
