import { Component } from '@angular/core';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss'],
})
export class ReclamationsComponent {
  formulaire_plaintes_reclamations: any = [
    {
      id: 'formtabs-num-cpte-clt',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'numero de compte client',
    },
    {
      id: 'formtabs-nom-prenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom et prénoms',
    },
    {
      id: 'telephone',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'téléphone',
    },
    {
      id: 'formtabs-agence',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'agence',
    },
    {
      id: 'formtabs-Localisation',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'localisation',
    },
    {
      id: 'formtabs-type-plainte',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'type de plainte',
    },
    {
      id: 'invoice-description',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'description de la plainte',
    },
    {
      id: 'formtabs-mode-collecte',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mode de collecte',
    },
    {
      id: 'formtabs-nom-agent',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom agent',
    },
    {
      id: 'dropzone-multi-fichier',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'choix de fichier',
    },
  ];

  formulaire_attr_reclamations: any = [
    {
      id: 'modalOperateur',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'opérateur',
    },
    {
      id: 'modalDuree',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'durée du traitement',
    },
  ];
}
