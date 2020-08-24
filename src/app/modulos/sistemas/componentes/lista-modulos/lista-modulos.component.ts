import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModuloService} from "../../servicios/modulo.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Modulo} from "../../modelos/Modulo";

@Component({
  selector: 'app-lista-modulos',
  templateUrl: './lista-modulos.component.html',
  styleUrls: ['./lista-modulos.component.css']
})
export class ListaModulosComponent implements OnInit, OnDestroy {


  constructor(public moduloService: ModuloService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  private subscriptions: Subscription[] = []
  public modulos: Modulo[];

  ngOnInit() {

    this.subscriptions.push(this.moduloService.moduloBehaviorSubject.subscribe(respuesta => {
      console.log(respuesta);
      this.modulos = respuesta.data;
    }));

    this.obtenerModulos();
  }

  obtenerModulos() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.moduloService.obtenerModulos({departamento: params['departamento']}).subscribe();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

}
