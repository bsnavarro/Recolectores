import {Component, Input, OnInit} from '@angular/core';
import {Persona} from "../../../modelos/persona";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {

  fechaNacimento;
  private _persona: Persona;
  get persona(): Persona {
    return this._persona;
  }

  @Input()
  set persona(val: Persona) {
    this._persona = val;
    this.fechaNacimento = new FormControl(new Date(val.fechaNacimiento));
  }

  constructor() {
  }

  ngOnInit() {
  }

  actualizarPersona() {

  }

}
