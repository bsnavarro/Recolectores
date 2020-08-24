import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DatosModulo} from '../modelos/DatosModulo';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public datosModulo: BehaviorSubject<DatosModulo>;
  public parametro: BehaviorSubject<any>;
  public abrirmenu: BehaviorSubject<boolean>;

  constructor() {
    this.datosModulo = new BehaviorSubject<DatosModulo>(new DatosModulo());
    this.parametro = new BehaviorSubject<any>('');
    this.abrirmenu = new BehaviorSubject<boolean>(false);
  }
}
