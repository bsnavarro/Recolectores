import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DatosModulo} from '../../modelos/DatosModulo';
import {NavService} from '../../servicios/nav-service';
import {MantenimientoPersonasComponent} from '../modals-mantenimientos/mantenimiento-personas/mantenimiento-personas.component';
import {MantenimientoFincasComponent} from '../modals-mantenimientos/mantenimiento-fincas/mantenimiento-fincas.component';

@Component({
  selector: 'app-recolectores-fincas',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit, AfterViewInit {

  public datosModulo: DatosModulo;

  constructor(public navService: NavService, ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.prepararMenu();
  }

  prepararMenu(): void {
    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarHome = true;
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


}
