import {Persona} from "./persona";
import {PersonaRelacionFolioTipo} from "./PersonaRelacionFolioTipo";

export class PersonaRelacionFolio {
  numeroFolio: number;
  identificacion: string;
  tipoIdentificacion: string;
  identificacionRelacion: string;
  tipoIdentificacionRelacion: string;
  nucleo: boolean;
  persona: Persona;
  inactivo: boolean;
  personaRelacion: Persona;
  personaRelacionFolioTipoByIdRelacionFolio: PersonaRelacionFolioTipo;
  nombreRelacion: string;
  nombreNucleo: string;
  idRelacionFolio: number;
  fechaIngreso: Date;
  estadoRelacion: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
