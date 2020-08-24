import {Deserialize} from './deserialize';


export class PersonaR implements Deserialize {

  identificacion: string;
  nacionalidad: string;
  zona: string;
  estatusMigratorio: boolean;
  numeroFolio: boolean;
  nombreCompleto: string;
  nombre: string;
  primerApellid: string;
  segundoApellido: string;
  edad: number;
  fechaNacimiento: Date;
  grupoFamiliar: boolean;
  fechaRegistro: Date;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
