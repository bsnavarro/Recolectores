import {Component, OnInit} from '@angular/core';
import {NavService} from '../../servicios/nav-service';
import {DatosModulo} from '../../modelos/DatosModulo';
import {Session} from '../../../../modelos/session';
import {AuthService} from '../../../../servicios/auth.service';
import {Router} from '@angular/router';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
library.add(fas);

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  public datosModulo: DatosModulo;
  private usuario: Session;

  constructor(public navService: NavService, private authService: AuthService, private router: Router) {
    this.navService.datosModulo.pipe().subscribe((data: DatosModulo) => this.datosModulo = data);
    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }

  ngOnInit() {
  }

  getUsuario(): Session {
    return this.usuario;
  }

  salir(): void {
    this.authService.cerrarSession().subscribe(() => {
      this.router.navigate(['/autenticacion']);
    });
  }
}
