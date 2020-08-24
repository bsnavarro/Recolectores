export class PersonaTributacionRegimen {

  codigoRegimen: number;
  descripcion: string;
  inactivo: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
