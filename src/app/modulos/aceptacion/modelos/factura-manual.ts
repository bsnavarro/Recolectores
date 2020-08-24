import {Deserialize} from './deserialize';

export class FacturaManual implements Deserialize {
  consecutivo: string;
  departamento: number;
  nombreDepartamento: string;
  referencia: number;
  tipo: string;
  proveedor: string;
  nombreProveedor: string;
  factura: string;
  total: number;
  impuesto: number;
  estdo: string;
  nombreResponsable: string;
  generaCxp: number;
  fecha: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
