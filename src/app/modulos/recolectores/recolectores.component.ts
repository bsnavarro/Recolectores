import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Session} from '../../modelos/session';
import {AuthService} from '../../servicios/auth.service';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {DatosModulo} from './modelos/DatosModulo';
import {NavService} from './servicios/nav-service';
import {Subscription} from 'rxjs';
import {MantenimientoFincasComponent} from "./componentes/modals-mantenimientos/mantenimiento-fincas/mantenimiento-fincas.component";
import {MantenimientoPersonasComponent} from "./componentes/modals-mantenimientos/mantenimiento-personas/mantenimiento-personas.component";


@Component({
  selector: 'app-recolectores',
  templateUrl: './recolectores.component.html',
  styleUrls: ['./recolectores.component.css']
})
export class RecolectoresComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('appDrawer') appDrawer: ElementRef;

  private usuario: Session;

  moduleDataSubscription: Subscription;
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
    this.moduleDataSubscription = this.navService.navInfo.pipe(
    ).subscribe((value) => {
      this.datosModulo = value as DatosModulo;
    });
    this.prepararMenu();
  }

  prepararMenu(): void {
    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarHome = false;
    this.datosModulo.mostrarMenu = true;
    this.datosModulo.nombreModulo = 'Portal Recolectores';
    this.datosModulo.navItems = [
      {
        displayName: 'Mantenimientos',
        iconName: 'settings',
        route: 'EntregaAbono',
        children: [
          {
            displayName: 'Mantenimiento Personas',
            iconName: 'people',
            esModal: true,
            disableClickOutside: false,
            modal: MantenimientoPersonasComponent,
            height: '95%',
            width: '95%',
            parametrosModal: {}
          },
          {
            displayName: 'Mantenimiento Fincas',
            iconName: 'place',
            esModal: true,
            disableClickOutside: false,
            modal: MantenimientoFincasComponent,
            height: '95%',
            width: '95%',
            parametrosModal: {}
          },
        ]
      },
      {
        displayName: 'Estado Salud',
        iconName: 'insert_drive_file',
        route: 'recolectores/estadosalud'
      },
      {
        displayName: 'Manual Módulo',
        iconName: 'book',
        // manual: true,
        // linkManual: 'assets/Manual/ManualModuloContratosCafe.pdf'
      },
    ];
    this.navService.updateDatosModulos(this.datosModulo);
  }

  getUsuario(): Session {
    return this.usuario;
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }


}
