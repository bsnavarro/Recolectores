import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PersonaRelacionFolioService} from "../../../servicios/personaRelacionFolio.service";
import {FormControl, Validators} from "@angular/forms";
import {PersonaRelacionFolio} from "../../../modelos/PersonaRelacionFolio";
import Swal from "sweetalert2";
import {Persona} from "../../../modelos/persona";
import {PersonaService} from "../../../servicios/persona.service";

@Component({
  selector: 'app-modal-cambio-nucleo',
  templateUrl: './modal-cambio-nucleo.component.html',
  styleUrls: ['./modal-cambio-nucleo.component.css']
})
export class ModalCambioNucleoComponent implements OnInit {

  folioActual: PersonaRelacionFolio;
  folioRelacion: FormControl;
  public personaRelacionFolio: PersonaRelacionFolio;

  constructor(
    public personaRelacionFolioService: PersonaRelacionFolioService,
    public personaService: PersonaService,
    public dialogRef: MatDialogRef<ModalCambioNucleoComponent>,) {
    this.folioRelacion = new FormControl('', [Validators.required]);
  }

  motivos = ['Fallecimiento', 'Constitucion de un folio individual', 'Renuncia como asociado'];
  motivo: any;

  ngOnInit() {
  }

  buscarPersonaRelacion() {
    if (!this.folioRelacion.valid) {
      return;
    }

    if (Number(this.folioActual.numeroFolio) === Number(this.folioRelacion.value)) {
      return Swal.fire({icon: 'info', title: 'Ya existe', text: 'El numero de folio ya se encuentra relacionado'});
    }

    this.personaService.buscarPersona(this.folioRelacion.value, 'Folio').subscribe(respuesta => {
      if (respuesta.estado) {
        const persona = respuesta.data as Persona;
        this.personaRelacionFolio = new PersonaRelacionFolio();
        this.personaRelacionFolio.nombreRelacion = persona.nombreCompleto;
        this.personaRelacionFolio.numeroFolio = this.folioRelacion.value;
        this.personaRelacionFolio.identificacionRelacion = persona.identificacion;
        this.personaRelacionFolio.tipoIdentificacionRelacion = persona.tipoIdentificacion;
      }
    });
  }

  cambioNucleo() {
    this.personaRelacionFolioService.cambioNucleo(this.folioActual, this.personaRelacionFolio.identificacionRelacion, this.personaRelacionFolio.tipoIdentificacionRelacion, this.motivo).subscribe(respuesta => {
      if (respuesta.estado) {
        this.personaService.buscarPersona(this.folioActual.identificacionRelacion).subscribe();
        this.dialogRef.close();
      }
    });
  }
}
