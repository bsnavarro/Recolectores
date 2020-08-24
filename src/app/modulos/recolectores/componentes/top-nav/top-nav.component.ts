import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../../../modelos/session';
import {AuthService} from '../../../../servicios/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NavService} from '../../servicios/nav-service';
import {DatosModulo} from '../../modelos/DatosModulo';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  @Input() nombreModulo: string;
  @Input() mostrarMenu: boolean;
  @Input() ocultarUsuario: boolean;
  @Input() mostrarHome: boolean;
  public usuario: Session;

  constructor(public navService: NavService,
              private authService: AuthService,
              private router: Router) {
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }

  moduleDataSubscription: Subscription;

  ngOnInit() {
    this.moduleDataSubscription = this.navService.navInfo.pipe(
    ).subscribe((value) => {
      const datosModulo = new DatosModulo(value);
      this.mostrarMenu = datosModulo.mostrarMenu;
      this.ocultarUsuario = datosModulo.ocultarUsuario;
      this.nombreModulo = datosModulo.nombreModulo;
      this.mostrarHome = datosModulo.mostrarHome;
    });

  }

  salir(): void {
    this.authService.cerrarSession().subscribe(() => {
      this.router.navigate(['/autenticacion']);
    });
  }
}
