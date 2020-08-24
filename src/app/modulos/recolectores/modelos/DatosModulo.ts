import {Deserialize} from './deserialize';
import {NavItem} from '../interfaces/nav-item';


export class DatosModulo implements Deserialize {
  nombreModulo: string;
  mostrarMenu: boolean;
  ocultarUsuario: boolean;
  mostrarHome: boolean;
  navItems: NavItem[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  constructor(obj?: any) {
    Object.assign(this, obj);
    return this;
  }

}
