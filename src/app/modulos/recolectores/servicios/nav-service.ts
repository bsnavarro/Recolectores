import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {DatosModulo} from '../modelos/DatosModulo';
import {NavigationEnd, Router} from '@angular/router';


@Injectable()
export class NavService {
  public appDrawer: any;
  public rutaHome: string;
  public currentUrl = new BehaviorSubject<string>(undefined);
  navInfo = new Subject();

  constructor(private router: Router) {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  private datosModulo: DatosModulo = new DatosModulo();

  get getDatosModulo(): DatosModulo {
    return this.datosModulo;
  }

  set setDatosModulo(value) {
    this.datosModulo = value;
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public updateDatosModulos(value) {
    this.datosModulo = value;
    this.navInfo.next(value);
  }

}
