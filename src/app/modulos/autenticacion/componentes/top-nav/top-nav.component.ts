import {Component, OnInit} from '@angular/core';
import {NavService} from '../../servicios/nav-service';
import {DatosModulo} from '../../modelos/DatosModulo';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  public datosModulo: DatosModulo;

  constructor(public navService: NavService) {
    this.navService.datosModulo.pipe().subscribe((data: DatosModulo) => this.datosModulo = data);
  }

  ngOnInit() {
  }

}
