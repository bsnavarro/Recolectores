import {Deserialize} from './deserialize';

export class Modulo implements Deserialize {

  public codigo: number;
  public nombre: string;
  public state: string;
  public acceso: number;
  public icon: string;
  public descripcion: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
