import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PersonaRelacionFolioService} from "../../../servicios/personaRelacionFolio.service";
import {Formulario} from "../../../modelos/Formulario";

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-modal-formularios',
  templateUrl: './modal-formularios.component.html',
  styleUrls: ['./modal-formularios.component.css']
})
export class ModalFormulariosComponent implements OnInit {

  collectionSize;
  page = 1;
  pageSize = 5;

  constructor(
    public personaService: PersonaRelacionFolioService,
    public dialogRef: MatDialogRef<ModalFormulariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  // @Input() public persona: Persona;
  @Input() public formulario: Array<Formulario>;

  ngOnInit() {
    this.collectionSize = this.formulario.length;
  }

  generarReporte(audit: Formulario, descargar: boolean) {
    this.personaService.generarReporte(audit.idFormulario, audit.idTipoFormulario).subscribe(value => {

      if (value && value.pdf) {

        value.pdf.forEach(function (value) {
          var blob = ModalFormulariosComponent.converBase64toBlob(value.documento, 'application/pdf');
          if (!descargar) {
            window.open(URL.createObjectURL(blob), "documento.pdf");
          } else {
            const data = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = data;
            link.download = audit.idTipoFormulario + "_" + audit.idFormulario + ".pdf";
            link.click();
            setTimeout(function () {
              window.URL.revokeObjectURL(data);
            }, 100);
          }

        });
      }

      if (value.estado) {
        this.formulario = value.data;
      }
    });
  }

  static converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    content = content.replace(/^[^,]+,/, '');
    content = content.replace(/\s/g, '');
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

}
