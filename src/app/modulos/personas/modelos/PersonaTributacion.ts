import {PersonaTributacionRegimen} from "./PersonaTributacionRegimen";

export class PersonaTributacion {
  identificacion: string;
  tipoIdentificacion: string;
  codigoActividad: string;
  descripcionActividad: string;
  regimenSimplificado: boolean;
  noSujetoImpuesto: boolean;
  codigoRegimen: number;
  personaTributacionRegimenByCodigoRegimen: PersonaTributacionRegimen;
  generaFacturaCompra: boolean;
  estadoHacienda: string;
  actividades: any;
  permiteEditarGeneraFC: any;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
