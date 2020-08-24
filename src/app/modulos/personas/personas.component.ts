import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatosModulo} from "../sistemas/modelos/DatosModulo";
import {Session} from "../../modelos/session";
import {AuthService} from "../../servicios/auth.service";
import {NavService} from "../sistemas/servicios/nav-service";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";
import {FormControl, Validators} from "@angular/forms";
import {PersonaRelacionFolioService} from "./servicios/personaRelacionFolio.service";
import {Persona} from "./modelos/persona";
import {PersonaRelacionFolioTipo} from "./modelos/PersonaRelacionFolioTipo";
import Swal from "sweetalert2";
import {PersonaService} from "./servicios/persona.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit, OnDestroy {
  private usuario: Session;
  public datosModulo: DatosModulo;

  identificacion: FormControl;
  folioRelacion: FormControl;
  persona: Persona;
  listaTiposRelacion: Array<PersonaRelacionFolioTipo>;
  idRelacionFolio: any;


  constructor(
    private authService: AuthService,
    public navService: NavService,
    private router: Router,
    public personaRelacionFolioService: PersonaRelacionFolioService,
    public personaService: PersonaService
  ) {

    this.authService.usuarioActivo.subscribe(data => this.usuario = data);
  }

  private subscriptions: Subscription[] = []
  ngOnInit() {
    this.identificacion = new FormControl('', [Validators.required]);
    this.folioRelacion = new FormControl('', [Validators.required]);

    this.personaRelacionFolioService.listaTiposRelacion().subscribe(value => {
      this.listaTiposRelacion = value.data;
    });

    this.datosModulo = new DatosModulo();
    this.datosModulo.mostrarMenu = true;
    this.datosModulo.nombreModulo = 'Consulta de personas';
    this.navService.datosModulo.next(this.datosModulo);

    this.subscriptions.push(this.personaService.personaBehaviorSubject.subscribe(respuesta => {
      if (respuesta.estado) {
        if (respuesta.mensaje) {
          Swal.fire({icon: 'info', title: 'Aviso', text: respuesta.mensaje});
        }
        this.persona = respuesta.data as Persona;
        this.identificacion.setValue(this.persona.identificacion);
      } else {
        this.persona = undefined;
      }
    }));

    this.identificacion.setValue(undefined);
    this.ngModelChangePersona();

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  buscar(): void {

    if (!this.identificacion.valid) {
      return;
    }

    this.personaService.buscarPersona(this.identificacion.value).subscribe();
  }

  ngModelChangePersona(): void {
    if (!this.identificacion.value || this.identificacion.value.toString().length < 9) {
      this.persona = undefined
    }
  }

}

