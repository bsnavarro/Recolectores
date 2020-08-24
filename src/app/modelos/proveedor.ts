import {Deserialize} from './deserialize';

export class Proveedor implements Deserialize{
  codigo: string;
  identificacion: string;
  nombre: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
