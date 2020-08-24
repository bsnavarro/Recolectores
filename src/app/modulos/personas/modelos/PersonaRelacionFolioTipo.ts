export class PersonaRelacionFolioTipo {
  idRelacionFolio: number;
  descripcion: string;
  invalido: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
