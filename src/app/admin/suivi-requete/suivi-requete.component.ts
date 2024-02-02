import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-suivi-requete',
  templateUrl: './suivi-requete.component.html',
  styleUrls: ['./suivi-requete.component.scss']
})
export class SuiviRequeteComponent {
    voirTraitement(info: any): void {
      $("#sendInvoiceOffcanvas").offcanvas('show')
    }

    ConsultationTraitement(info: any): void {
      $("#sendInvoiceOffcanvas2").offcanvas('show')
    }


    ngOnInit(): void {
   
    
    }
}
