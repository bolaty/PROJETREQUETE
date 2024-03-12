import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss'],
})
export class EditionsComponent {
  affichage_etat: boolean = true;
  invoice_label: any = '';

  constructor(public LanguageService: LanguageService) {}

  SelectInvoice(etat: any) {
    this.invoice_label = etat;
  }

  ConfirmationOptions(action: any) {
    // if (action == 'retour') this.affichage_etat = true;
    // else this.affichage_etat = false;

    if (this.invoice_label == 'bceao') {
      window.open('/admin/etat-suivi-reclamation', '_blank');
    } else if (this.invoice_label == 'statistique') {
      window.open('/admin/etat-suivi', '_blank');
    }
  }
}
