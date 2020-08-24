import {Component, Inject, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  @Input() events: Observable<void>;
  ruta: string;
  private eventsSubscription: any;
  constructor(public dialogRef: MatDialogRef<ReporteComponent>, @Inject(MAT_DIALOG_DATA) public data: {ruta: string}) {
    this.ruta  = data.ruta;
  }

  ngOnInit() {
   // this.eventsSubscription = this.events.subscribe(() =>  this.obtenerDepartamento());
  }

}
