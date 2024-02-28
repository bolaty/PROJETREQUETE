import { Component } from '@angular/core';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss'],
})
export class EditionsComponent {
  affichage_etat: boolean = true;

  ConfirmationOptions(action: any) {
    if (action == 'retour') this.affichage_etat = true;
    else this.affichage_etat = false;
  }
}
