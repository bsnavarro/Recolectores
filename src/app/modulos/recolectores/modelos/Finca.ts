import {Deserialize} from './deserialize';


export class Finca implements Deserialize {
  codigo: string;
  nombreFinca: boolean;
  fechaInspeccion: Date;


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
