import {Deserialize} from './deserialize';
import {PersonaCorreo} from "./PersonaCorreo";
import {PersonaRelacionFolio} from "./PersonaRelacionFolio";
import {PersonaTributacion} from "./PersonaTributacion";
import {PersonaCaracteristicas} from "./PersonaCaracteristicas";
import {PersonaTipoIdentificacion} from "./PersonaTipoIdentificacion";

export class Persona implements Deserialize {
  identificacion: string;
  tipoIdentificacion: string;
  nombreCompleto: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  razonSocial: string;
  fechaNacimiento: Date;
  codigoNacionalidad: string;
  codigoEstadoCivil: string;
  codigoGenero: string;
  fechaRegistro: string;
  fechaModificacion: string;
  inactivo: boolean;
  cedulaPadre: string;
  cedulaMadre: string;
  caritas: boolean;
  personaPadre: Persona;
  personaMadre: Persona;
  personaRelacionFoliosNucleo: Array<PersonaRelacionFolio>;
  personaRelacionFoliosRelacion: Array<PersonaRelacionFolio>;

  codigoFolio: string;
  codigoColaborador: string;
  personaCaracteristicas: PersonaCaracteristicas;
  personaTipoIdentificacionByTipoIdentificacion: PersonaTipoIdentificacion;
  edad: number;

  // PersonaTipoIdentificacion.ts personaTipoIdentificacionByTipoIdentificacion;
  //
  // PersonaNacionalidad personaNacionalidadByCodigoNacionalidad;
  //
  // PersonaEstadoCivil personaEstadoCivilByCodigoEstadoCivil;
  //
  // PersonaGenero personaGeneroByCodigoGenero;

  correos: Array<PersonaCorreo>;

  // Collection<PersonaTelefono> personaTelefono;
  //
  personaTributacion: PersonaTributacion;
  //
  // PersonaUbicacion personaUbicacion;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
