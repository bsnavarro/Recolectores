import {Deserialize} from './deserialize';

export class FacturaGasto implements Deserialize {
  consecutivo: string;
  clave: string;
  nombreEmisor: string;
  numeroCedulaEmisor: string;
  codigoActividad: string;
  nombreReceptor: string;
  numeroCedulaReceptor: string;
  fechaFactura: string;
  tipo: string;
  mensaje: string;
  totalFactura: number;
  montoTotalImpuesto: number;
  diasdiff: number;
  diasVence: number;


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

