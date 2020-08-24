import {Component, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../../servicios/nav-service';
import {DatosModulo} from '../../modelos/DatosModulo';
import {Session} from '../../../../modelos/session';
import {AuthService} from '../../../../servicios/auth.service';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {delay, filter} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {MatSidenav} from '@angular/material';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  public datosModulo: DatosModulo;
  private usuario: Session;
  public opened: boolean;
  @ViewChild('sidenav',  {static: false})
  public sidenav: MatSidenav;


  constructor(public navService: NavService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.navService.datosModulo.pipe(delay(0)).subscribe((data: DatosModulo) => this.datosModulo = data);
    this.navService.abrirmenu.pipe(delay(100)).subscribe((open) => { this.sidenav.toggle(open); });
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }

  ngOnInit() {
  }

  getUsuario(): Session {
    return this.usuario;
  }

  goSistemas(): any {
    this.router.navigate(['/departamento', this.route.snapshot.params.departamento]);
    this.sidenav.close().then(() => this.sidenav.open());
  }

  salir(): void {
    this.authService.cerrarSession().subscribe(() => {
      this.router.navigate(['/autenticacion']);
    });
  }

  setSeleccion(param: any): void {
    this.navService.parametro.next(param);
  }
}
