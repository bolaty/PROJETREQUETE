import { Component, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-editions',
  templateUrl: './editions.component.html',
  styleUrls: ['./editions.component.scss'],
})
export class EditionsComponent {
  maVariableSubscription?: Subscription;

  info_connexion: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  @ViewChild('agence') charger_l_agence: any;
  cocherDecocherCombo: any = 'd';
  affichage_etat: boolean = true;
  affiche_option_1: boolean = false;
  affiche_option_2: boolean = false;
  affiche_option_3: boolean = false;
  invoice_label: any = '';
  active_1: any = '';
  active_2: any = '';
  active_3: any = '';
  tab_exercice: any = [];
  tab_agence: any = [];
  recuptab_agence: any = [];
  tab_periodicite: any = [];
  tab_periode: any = [];
  tab_date: any = [];

  formulaire_edition_1: any = [
    {
      id: 'idAgence',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'agence',
    },
    {
      id: 'idExercice',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'exercice',
    },
    {
      id: 'idPeriodicite',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'périodicité',
    },
    {
      id: 'idPeriode',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'période',
    },
    {
      id: 'idDateDebut',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date de début',
    },
    {
      id: 'idDateFin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date de fin',
    },
  ];
  formulaire_edition_2: any = [
    {
      id: 'idAgence',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'agence',
    },
    {
      id: 'idExercice',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'exercice',
    },
    {
      id: 'idPeriodicite',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'périodicité',
    },
    {
      id: 'idPeriode',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'période',
    },
    {
      id: 'idDateDebut',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date de début',
    },
    {
      id: 'idDateFin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date de fin',
    },
  ];
  formulaire_edition_3: any = [
    {
      id: 'idAgence',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'agence',
    },
    {
      id: 'idExercice',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'exercice',
    },
    {
      id: 'idPeriodicite',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'périodicité',
    },
    {
      id: 'idPeriode',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'période',
    },
    {
      id: 'idDateDebut',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date de début',
    },
    {
      id: 'idDateFin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date de fin',
    },
  ];

  constructor(
    public LanguageService: LanguageService,
    public AdminService: AdminService,
    private toastr: ToastrService
  ) {}

  SelectInvoice(etat: any) {
    this.invoice_label = etat;
    this.active_1 = this.active_2 = this.active_3 = '';
    this.affiche_option_1 =
      this.affiche_option_2 =
      this.affiche_option_3 =
        false;

    if (etat == 'bceao') {
      this.active_1 = 'active';
      this.affiche_option_1 = true;
    } else if (etat == 'statistique') {
      this.active_2 = 'active';
      this.affiche_option_2 = true;
    } else {
      this.active_3 = 'active';
      this.affiche_option_3 = true;
    }
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

        if (this.tab_exercice[0].SL_RESULTAT == 'TRUE') {
          this.ListeComboAgence();
        } else {
          this.AdminService.CloseLoader();
          this.toastr.info(this.tab_exercice[0].SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(this.tab_exercice[0].SL_MESSAGE, 'warning', {
          positionClass: 'toast-bottom-left',
        });
      }
    );
  }

  ListeComboAgence() {
    let Option = 'RequeteClientsClasse.svc/pvgInsertIntoDatasetAgenceWeb';

    let body = {
      EX_EXERCICE: this.info_connexion[0].EX_EXERCICE,
    };

    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_agence = success;

        if (this.tab_agence[0].SL_RESULTAT == 'TRUE') {
          // traduction combo agence
          for (let index = 0; index < this.tab_agence.length; index++) {
            this.tab_agence[index].AG_RAISONSOCIAL_TRANSLATE = this.Translate(
              this.tab_agence[index].AG_RAISONSOCIAL,
              this.LanguageService.langue_en_cours
            );
          }

          this.ListeComboPeriodicite();
        } else {
          this.AdminService.CloseLoader();
          this.toastr.info(this.tab_agence[0].SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(this.tab_agence[0].SL_MESSAGE, 'warning', {
          positionClass: 'toast-bottom-left',
        });
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

    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_periodicite = success;

        this.AdminService.CloseLoader();
        if (this.tab_periodicite[0].SL_RESULTAT == 'FALSE') {
          this.toastr.info(this.tab_periodicite[0].SL_MESSAGE, 'info', {
            positionClass: 'toast-bottom-left',
          });
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(this.tab_periodicite[0].SL_MESSAGE, 'warning', {
          positionClass: 'toast-bottom-left',
        });
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
        
        if(this.affiche_option_1 == true) {
          this.resetdate()
        }
        if(this.affiche_option_2 == true) {
          this.resetdate2()
        }
        if(this.affiche_option_3 == true) {
          this.resetdate3()
        }
        this.AdminService.CloseLoader();
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(this.tab_periode[0].SL_MESSAGE, 'warning', {
          positionClass: 'toast-bottom-left',
        });
      }
    );
  }
  resetdate(){
    this.formulaire_edition_1[3].valeur = ""
    this.formulaire_edition_1[4].valeur = ""
    this.formulaire_edition_1[5].valeur = ""
  }

  resetdate2(){
    this.formulaire_edition_2[3].valeur = ""
    this.formulaire_edition_2[4].valeur = ""
    this.formulaire_edition_2[5].valeur = ""
  }

  resetdate3(){
    this.formulaire_edition_3[3].valeur = ""
    this.formulaire_edition_3[4].valeur = ""
    this.formulaire_edition_3[5].valeur = ""
  }
  ChangeDate(periodicite: any, periode: any) {
    let Option = 'RequeteClientsClasse.svc/pvgPeriodiciteDateDebutFin';
    var body = {
      EX_EXERCICE: "",//this.info_connexion[0].EX_EXERCICE,
      MO_CODEMOIS: "",
      PE_CODEPERIODICITE: ""
    };
    if(this.affiche_option_1 == true){
       body = {
        EX_EXERCICE: this.formulaire_edition_1[1].valeur,//this.info_connexion[0].EX_EXERCICE,
        MO_CODEMOIS: periode,
        PE_CODEPERIODICITE: periodicite,
      };
    }
    if(this.affiche_option_2 == true){
      body = {
        EX_EXERCICE: this.formulaire_edition_2[1].valeur,//this.info_connexion[0].EX_EXERCICE,
        MO_CODEMOIS: periode,
        PE_CODEPERIODICITE: periodicite,
      };
    }
    if(this.affiche_option_3 == true){
      body = {
        EX_EXERCICE: this.formulaire_edition_3[1].valeur,//this.info_connexion[0].EX_EXERCICE,
        MO_CODEMOIS: periode,
        PE_CODEPERIODICITE: periodicite,
      };
    }
    

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_date = success;

        this.AdminService.CloseLoader();
        if (this.tab_date[0].SL_RESULTAT == 'TRUE') {
          if (this.invoice_label == 'bceao') {
            this.formulaire_edition_1[4].valeur = this.tab_date[0].MO_DATEDEBUT;
            this.formulaire_edition_1[5].valeur = this.tab_date[0].MO_DATEFIN;

            this.formulaire_edition_2[4].valeur = '';
            this.formulaire_edition_2[5].valeur = '';
            this.formulaire_edition_3[4].valeur = '';
            this.formulaire_edition_3[5].valeur = '';
          } else if (this.invoice_label == 'statistique') {
            this.formulaire_edition_2[4].valeur = this.tab_date[0].MO_DATEDEBUT;
            this.formulaire_edition_2[5].valeur = this.tab_date[0].MO_DATEFIN;

            this.formulaire_edition_1[4].valeur = '';
            this.formulaire_edition_1[5].valeur = '';
            this.formulaire_edition_3[4].valeur = '';
            this.formulaire_edition_3[5].valeur = '';
          } else if (this.invoice_label == 'frequence') {
            this.formulaire_edition_3[4].valeur = this.tab_date[0].MO_DATEDEBUT;
            this.formulaire_edition_3[5].valeur = this.tab_date[0].MO_DATEFIN;

            this.formulaire_edition_1[4].valeur = '';
            this.formulaire_edition_1[5].valeur = '';
            this.formulaire_edition_2[4].valeur = '';
            this.formulaire_edition_2[5].valeur = '';
          }
        } else {
          if (this.invoice_label == 'bceao') {
            this.formulaire_edition_1[4].valeur =
              this.info_connexion[0].JT_DATEJOURNEETRAVAIL;
            this.formulaire_edition_1[5].valeur =
              this.info_connexion[0].JT_DATEJOURNEETRAVAIL;

            this.formulaire_edition_2[4].valeur = '';
            this.formulaire_edition_2[5].valeur = '';
            this.formulaire_edition_3[4].valeur = '';
            this.formulaire_edition_3[5].valeur = '';
          } else if (this.invoice_label == 'statistique') {
            this.formulaire_edition_2[4].valeur =
              this.info_connexion[0].JT_DATEJOURNEETRAVAIL;
            this.formulaire_edition_2[5].valeur =
              this.info_connexion[0].JT_DATEJOURNEETRAVAIL;

            this.formulaire_edition_1[4].valeur = '';
            this.formulaire_edition_1[5].valeur = '';
            this.formulaire_edition_3[4].valeur = '';
            this.formulaire_edition_3[5].valeur = '';
          } else if (this.invoice_label == 'frequence') {
            this.formulaire_edition_3[4].valeur = this.tab_date[0].MO_DATEDEBUT;
            this.formulaire_edition_3[5].valeur = this.tab_date[0].MO_DATEFIN;

            this.formulaire_edition_1[4].valeur = '';
            this.formulaire_edition_1[5].valeur = '';
            this.formulaire_edition_2[4].valeur = '';
            this.formulaire_edition_2[5].valeur = '';
          }
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(this.tab_date[0].SL_MESSAGE, 'warning', {
          positionClass: 'toast-bottom-left',
        });
      }
    );
  }

  ConfirmationOptions(action: any) {
    // if (action == 'retour') this.affichage_etat = true;
    // else this.affichage_etat = false;
    
    if (this.invoice_label == 'bceao') {
      this.recuptab_agence = [];
    for (
      let index = 0;
      index < this.charger_l_agence.nativeElement.length;
      index++
    ) {
      if (
        index != 0 &&
        this.charger_l_agence.nativeElement[index].selected == true
      ) {
        // this.charger_l_agence.nativeElement[index].selected = true;
        var localvalue = this.charger_l_agence.nativeElement[index].value;
        localvalue = localvalue.split(': ');
        localvalue[1] = localvalue[1].replaceAll("'", "''");
        this.recuptab_agence.push(localvalue[1]);
      }
    }
      var test = 0;
      for (let index = 0; index < this.formulaire_edition_1.length; index++) {
        if (this.formulaire_edition_1[index].valeur == '') {
          test = 1;

          break;
        }
      }
       
      if (test == 1) {
       
        for (let index = 0; index < this.formulaire_edition_1.length; index++) {
          if (this.formulaire_edition_1[index].valeur == '') {
            $(`#${this.formulaire_edition_1[index].id}`).css(
              'background-color',
              'MistyRose'
            );
          } else {
            $(`#${this.formulaire_edition_1[index].id}`).css(
              'background-color',
              'white'
            );
          }
        }

        this.toastr.error(
          'Veuillez renseigner les champs obligatoire',
          'error',
          {
            positionClass: 'toast-bottom-left',
          }
        );
      } else {
        this.formulaire_edition_1[0].valeur = this.recuptab_agence.join(',')
        sessionStorage.setItem(
          'info_etat',
          JSON.stringify(this.formulaire_edition_1)
        );
        window.open('/admin/etat-suivi-reclamation', '_blank');
      }
    } else if (this.invoice_label == 'statistique') {
      var test = 0;
      for (let index = 0; index < this.formulaire_edition_2.length; index++) {
        if (this.formulaire_edition_2[index].valeur == '') {
          test = 1;

          break;
        }
      }

      if (test == 1) {
        for (let index = 0; index < this.formulaire_edition_2.length; index++) {
          if (this.formulaire_edition_1[index].valeur == '') {
            $(`#${this.formulaire_edition_2[index].id}`).css(
              'background-color',
              'MistyRose'
            );
          } else {
            $(`#${this.formulaire_edition_2[index].id}`).css(
              'background-color',
              'white'
            );
          }
        }

        this.toastr.error(
          'Veuillez renseigner les champs obligatoire',
          'error',
          {
            positionClass: 'toast-bottom-left',
          }
        );
      } else {
        //this.formulaire_edition_2[0].valeur = this.recuptab_agence.join(',')
        sessionStorage.setItem(
          'info_etat',
          JSON.stringify(this.formulaire_edition_2)
        );
        window.open('/admin/etat-suivi', '_blank');
      }
    } else if (this.invoice_label == 'frequence') {
      this.recuptab_agence = [];
    for (
      let index = 0;
      index < this.charger_l_agence.nativeElement.length;
      index++
    ) {
      if (
        index != 0 &&
        this.charger_l_agence.nativeElement[index].selected == true
      ) {
        // this.charger_l_agence.nativeElement[index].selected = true;
        var localvalue = this.charger_l_agence.nativeElement[index].value;
        localvalue = localvalue.split(': ');
        localvalue[1] = localvalue[1].replaceAll("'", "''");
        this.recuptab_agence.push(localvalue[1]);
      }
    }
      var test = 0;
      for (let index = 0; index < this.formulaire_edition_3.length; index++) {
        if (this.formulaire_edition_3[index].valeur == '') {
          test = 1;

          break;
        }
      }

      if (test == 1) {
        for (let index = 0; index < this.formulaire_edition_3.length; index++) {
          if (this.formulaire_edition_3[index].valeur == '') {
            $(`#${this.formulaire_edition_3[index].id}`).css(
              'background-color',
              'MistyRose'
            );
          } else {
            $(`#${this.formulaire_edition_3[index].id}`).css(
              'background-color',
              'white'
            );
          }
        }

        this.toastr.error(
          'Veuillez renseigner les champs obligatoire',
          'error',
          {
            positionClass: 'toast-bottom-left',
          }
        );
      } else {
        this.formulaire_edition_3[0].valeur = this.recuptab_agence.join(',')
        sessionStorage.setItem(
          'info_etat',
          JSON.stringify(this.formulaire_edition_3)
        );
        window.open('/admin/frequence-reception', '_blank');
      }
    }
  }



  CocherDecocherAg() {
    if (this.cocherDecocherCombo == 'd') {
      for (
        let index = 0;
        index < this.charger_l_agence.nativeElement.length;
        index++
      ) {
        if (index != 0) {
          this.charger_l_agence.nativeElement[index].selected = false;
        }
      }
      this.cocherDecocherCombo = 'c';
      this.tab_agence = [];
    } else {
      this.tab_agence = [];
      for (
        let index = 0;
        index < this.charger_l_agence.nativeElement.length;
        index++
      ) {
        if (index != 0) {
          this.charger_l_agence.nativeElement[index].selected = true;
        }
      }

      this.cocherDecocherCombo = 'd';

     
    }
  }

  Translate(key: any, targetLanguage: any) {
    if (
      this.LanguageService.translations &&
      key in this.LanguageService.translations
    ) {
      return this.LanguageService.translations[key];
    } else {
      // Si la traduction pour le texte demandé dans la langue cible n'est pas trouvée,
      // vous pouvez renvoyer le texte original ou une indication que la traduction est manquante.
      return key;
    }
  }

  // Fonction à exécuter lorsque la variable change
  ObserveChangeForTranslate(): void {
    for (let index = 0; index < this.tab_agence.length; index++) {
      this.tab_agence[index].AG_RAISONSOCIAL_TRANSLATE = this.Translate(
        this.tab_agence[index].AG_RAISONSOCIAL,
        this.LanguageService.langue_en_cours
      );
    }
  }

  ngOnDestroy(): void {
    // Assurez-vous de vous désabonner pour éviter les fuites de mémoire
    this.maVariableSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.ListeComboExercice();

    // Abonnez-vous au flux observable dans le service
    this.maVariableSubscription =
      this.LanguageService.getMaVariableObservable().subscribe(
        (value: boolean) => {
          // Votre fonction à exécuter lorsque la variable change
          if (value) {
            this.ObserveChangeForTranslate();
          }
        }
      );
  }
}
