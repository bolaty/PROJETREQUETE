import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss'],
})
export class EditionsComponent {
  affichage_etat: boolean = true;
  invoice_label: any = '';
  tab_exercice: any = [];
  tab_agence: any = [];
  tab_periodicite: any = [];
  tab_periode: any = [];
  tab_date: any = [];

  formulaire_edition_1: any = [
    {
      id: '',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'numero de compte client',
    },
    {
      id: '',
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
  ];
  formulaire_edition_2: any = [
    {
      id: '',
      type: 'numerique',
      valeur: '',
      obligatoire: 'N',
      label: 'numero de compte client',
    },
    {
      id: '',
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
  ];

  constructor(
    public LanguageService: LanguageService,
    public AdminService: AdminService,
    private toastr: ToastrService
  ) {}

  SelectInvoice(etat: any) {
    this.invoice_label = etat;
  }

  ListeComboExercice() {
    let Option = 'RequeteClientsClasse.svc/pvgInsertIntoDatasetExerciceWeb';

    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '',
          },
        },
      ],
    };

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_exercice = success;
        this.tab_exercice =
          this.tab_exercice.pvgInsertIntoDatasetExerciceWebResult;
        this.AdminService.CloseLoader();
        if (this.tab_exercice[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ListeComboAgence();
        } else {
          this.toastr.info(
            this.tab_exercice[0].clsResultat.SL_MESSAGE,
            'info',
            { positionClass: 'toast-bottom-left' }
          );
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_exercice[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  ListeComboAgence() {
    let Option = 'RequeteClientsClasse.svc/pvgInsertIntoDatasetAgenceWeb';

    let body = {
      EX_EXERCICE: '2022',
    };

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_agence = success;
        this.tab_agence = this.tab_agence.pvgInsertIntoDatasetAgenceWebResult;
        this.AdminService.CloseLoader();
        if (this.tab_agence[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ListeComboPeriodicite();
        } else {
          this.toastr.info(this.tab_agence[0].clsResultat.SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_agence[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  ListeComboPeriodicite() {
    let Option = 'RequeteClientsClasse.svc/pvgInsertIntoDatasetPeriodiciteWeb';

    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '',
          },
        },
      ],
    };

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_periodicite = success;
        this.tab_periodicite =
          this.tab_periodicite.pvgInsertIntoDatasetPeriodiciteWebResult;
        this.AdminService.CloseLoader();
        if (this.tab_periodicite[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.toastr.info(
            this.tab_periodicite[0].clsResultat.SL_MESSAGE,
            'info',
            { positionClass: 'toast-bottom-left' }
          );
        } else {
          this.toastr.info(
            this.tab_periodicite[0].clsResultat.SL_MESSAGE,
            'info',
            { positionClass: 'toast-bottom-left' }
          );
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_periodicite[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  ListeComboPeriode(code_periodicite: any) {
    let Option = 'RequeteClientsClasse.svc/pvgPeriodiciteWeb';

    let body = {
      PE_CODEPERIODICITE: code_periodicite,
    };

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_periode = success;
        this.tab_periode = this.tab_periode.pvgPeriodiciteWebResult;
        this.AdminService.CloseLoader();
        if (this.tab_periode[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.toastr.info(this.tab_periode[0].clsResultat.SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        } else {
          this.toastr.info(this.tab_periode[0].clsResultat.SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_periode[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  ChangeDate() {
    let Option = 'ServiceEdition/wsEdition.svc/pvgPeriodiciteDateDebutFin';
    let body = {
      EX_EXERCICE: '2022',
      MO_CODEMOIS: '',
      PE_CODEPERIODICITE: '',
    };

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_date = success;
        this.tab_date = this.tab_date.pvgPeriodiciteDateDebutFinResult;
        this.AdminService.CloseLoader();
        if (this.tab_date[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.toastr.info(this.tab_date[0].clsResultat.SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        } else {
          this.toastr.info(this.tab_date[0].clsResultat.SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_date[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
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

  ngOnInit(): void {
    this.ListeComboExercice();
  }
}
