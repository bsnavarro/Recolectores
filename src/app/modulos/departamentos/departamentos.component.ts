import { Component, OnInit } from '@angular/core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {DatosModulo} from '../autenticacion/modelos/DatosModulo';
import {NavService} from './servicios/nav-service';
library.add(fas);

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  public datosModulo: DatosModulo;

  constructor(private navService: NavService) {
  }


  ngOnInit() {
    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarMenu = true;
    this.datosModulo.nombreModulo = 'Departamentos';
    this.navService.datosModulo.next(this.datosModulo);
  }
}
