import {Deserialize} from './deserialize';

export class Respuesta implements Deserialize {
  estado: boolean;
  mensaje: string;
  tipo: string;
  codigo: number;
  data: any;
  pdf: any;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
