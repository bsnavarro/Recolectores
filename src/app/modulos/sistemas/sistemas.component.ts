import {Component, OnInit} from '@angular/core';
import {Session} from '../../modelos/session';
import {AuthService} from '../../servicios/auth.service';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {NavService} from './servicios/nav-service';
import {DatosModulo} from './modelos/DatosModulo';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

library.add(fas);

@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.css']
})
export class SistemasComponent implements OnInit {
  private usuario: Session;
  public datosModulo: DatosModulo;

  constructor(private authService: AuthService, public navService: NavService, private router: Router) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ngOnInit();
    });

  }

  ngOnInit() {
    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarMenu = false;
    this.datosModulo.nombreModulo = 'Módulos de ' + this.getUsuario().unidad;
    // this.datosModulo.navItems = [
    //   {
    //     displayName: 'Aceptación',
    //     iconName: 'import_contacts',
    //     route: 'aceptacion',
    //     param: '100',
    //     children: []
    //   },
    //   {
    //     displayName: 'Horas planilla',
    //     iconName: 'folder',
    //     route: 'horas-planilla/',
    //     param: '111',
    //     children: []
    //   },
    //   {
    //     displayName: 'Parametros planilla',
    //     iconName: 'folder',
    //     route: 'parametros-planilla/',
    //     param: '114',
    //     children: []
    //   }
    //
    // ];
    this.navService.datosModulo.next(this.datosModulo);
    this.sistemas();
  }

  getUsuario(): Session {
    return this.usuario;
  }

  sistemas() {
    if (this.router.url.split('/').length > 3) {
      return false;
    }
    return this.router.url.split('/')[1] == 'departamento'
  }
}
