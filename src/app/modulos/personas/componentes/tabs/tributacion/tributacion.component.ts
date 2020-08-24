import {Component, Input, OnInit} from '@angular/core';
import {Persona} from "../../../modelos/persona";
import {PersonaRelacionFolioService} from "../../../servicios/personaRelacionFolio.service";
import {PersonaTributacion} from "../../../modelos/PersonaTributacion";
import {PersonaService} from "../../../servicios/persona.service";

@Component({
  selector: 'app-tributacion',
  templateUrl: './tributacion.component.html',
  styleUrls: ['./tributacion.component.css']
})
export class TributacionComponent implements OnInit {



  private _persona;
  get persona(): any {
    return this._persona;
  }

  @Input()
  set persona(val: any) {
    this._persona = val;
    this.consultarMH();
  }

  respuestaHacienda: any;

  constructor(
    public personaRelacionFolioService: PersonaRelacionFolioService,
    public personaService: PersonaService
  ) {
  }

  ngOnInit() {

  }

  consultarMH() {
    this.personaRelacionFolioService.consultarMH(this.persona).subscribe(respuesta => {
      if (respuesta.estado) {
        this.respuestaHacienda = respuesta.data as PersonaTributacion;
        this.respuestaHacienda.actividades = JSON.parse(this.respuestaHacienda.actividades);
        this.persona.personaTributacion = this.respuestaHacienda;
        console.log(this.persona.personaTributacion);
      } else {
        this.respuestaHacienda = undefined;
      }
    });
  }

  actualizarPersonaTributacion() {
    this.persona.personaTributacion.generaFacturaCompra = !this.persona.personaTributacion.generaFacturaCompra;
    this.personaService.actualizarPersonaTributacion(this.persona.personaTributacion).subscribe(respuesta => {
      if (respuesta.estado) {
        this.buscar();
      }
    });
  }

  buscar(): void {
    this.personaService.buscarPersona(this.persona.identificacion).subscribe();
  }

}
