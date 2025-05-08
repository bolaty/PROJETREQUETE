import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/services/language.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, forkJoin } from 'rxjs';
// import { Dropzone } from 'src/app/services/dropzone';
//@ts-ignore
import Dropzone from 'dropzone';
import { AppConfigService } from '../../AppConfigService.service'; // Importez le service correctement
declare var $: any;

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss'],
})
export class ReclamationsComponent {
  //LienServeur: any = 'http://localhost:22248/'; // lien dev
  // LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod • remuci
  //LienServeur: any = 'https://reclamationserveur.mgdigitalplus.com:1022/'; // lien prod remuci •
  // LienServeur: any = 'https://reclamationserveurtest.mgdigitalplus.com:1041/'; // lien test local remuci•
  //LienServeur: any = 'https://reclamationserveurprod.gesci-ci.info:1810/'; // lien gesci prod•
  LienServeur: any = this.AppConfigService.getConfig('apiBaseUrl'); //
  // LienServeur: any = 'https://reclamationserveurprod.maphar.net:1027/'; // lien maphar prod•

  maVariableSubscription?: Subscription;

  recupinfo: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  maxWords: any = 30;
  code_contentieux: any;
  files: any;
  le_code_contentieux: any;
  formData: any;
  base64Image: string = '';
  btn_filter: string = 'enrg';
  option_body: any = '';
  doc_decode: any = '';
  objet_langue: any = '';
  type_doc_decode: any = '';
  background_color: any = [
    '#FFE6E6',
    '#A6CF98',
    '#FFB5DA',
    '#F4538A',
    '#B7C9F2',
    '#B5C0D0',
    '#B784B7',
    '#D5F0C1',
    '#DC84F3',
    '#5FBDFF',
    '#F3F3F3',
    '#27A7A4',
    '#BFC0FD',
    '#BF6498',
    '#FCD170',
    '#3BE23B',
    '#FDBBBB',
    '#3BA3E5',
  ];
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
    {
      id: 'Email',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Email',
    },
    {
      id: 'Login',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'Login',
    },
    {
      id: 'passe',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mot de passe',
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
      obligatoire: 'O',
      label: 'date debut du etape',
    },
    {
      id: 'modalDureefin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date fin du etape',
    },
    {
      id: 'invoice-observation-avis',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Description',
    },
  ];
  formulaire_avis: any = [
    {
      id: 'avisSatisfaction',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'satisfaction',
    },
    {
      id: 'NoteObservation',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'observation',
    },
    {
      id: 'dtdedebut',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date debut du reclamation',
    },
    {
      id: 'dtdefin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'date fin du reclamation',
    },
  ];
  modal_transmission_tribunal: any = [
    {
      id: 'avisSatisfaction',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'observation',
    },
    {
      id: 'NoteObservation',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'montant',
    },
  ];
  modal_cloture_procedure: any = [
    {
      id: 'avisSatisfaction',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'observation',
    },
    {
      id: 'NoteObservation',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'montant',
    },
  ];
  tab_req_afficher_historique: any = [];
  tab_req_enregistree_historique: any = [];
  tab_req_en_cours_trait_historique: any = [];
  tab_req_cloturee_historique: any = [];
  recupEnregistrerFichierRequete: any = [];
  recupEnregistrerFichierProcedure: any = [];
  tab_cloture_procedure: any = [];
  tab_liste_contentieux: any = [];
  tab_transmission_tribunal: any = [];
  recupEnregistrerFichier: any = [];
  ListConsultDocReq: any = [];
  ListeComboAgence: any = [];
  ListeTypeRequete: any = [];
  ListeComboModeCollecte: any = [];
  retourRequeteEnregistrement: any = [];
  ListeRetourRequete: any = [];
  ListeComboOperateur: any = [];
  ListeComboParOperateur: any = [];
  ListeComboAgenceParOperateur: any = [];
  ListeTypeRequete_1: any = [];
  ListeComboAvisrecevabilite: any = [];
  tab_enregistrement_traitement: any = [];
  ListeComboEtapes: any = [];
  recupEtape: any = [];
  ListeClients: any = [];
  tab_req_enregistree: any = [];
  tab_req_en_cours_trait: any = [];
  tab_req_cloturee: any = [];
  tab_req_afficher: any = [];
  tab_liste_contentieux_pour_doc: any = [];
  search_bar: boolean = false;
  afficher_tri: boolean = false;
  consultation_doc_req: boolean = false;
  consultation_doc_cont: boolean = false;
  statutliste: boolean = false;
  statut_info_utilisateur: boolean = false;
  btn_etape: boolean = false;
  SearchValue: any;
  SearchValueCode: any;
  SearchValuePhone: any;
  statutClientExiste: boolean = true;
  statutFrmulaire: string = 'ENREGISTREMENT';
  var_checked_enrg: any = '';
  var_checked_trai: any = '';
  var_checked_clo: any = '';
  valeur_authorization: any = '';
  statutDateDebut: boolean = true;
  statutDatefin: boolean = true;
  recupValEtape: any = '';
  var_off_on: any = 'N';
  ListeComboEtapeSelonReq: any = [];
  tab_infos_client: any = [];
  ListConsultEtapeSelonReq: any = [];
  formDataArray: any = [];
  tab_data_doc: any = [];
  tab_doc_show_req: any = [];
  tab_doc_show_cont: any = [];
  FormObjet: any;
  statutTraitement: boolean = false;
  cloture: boolean = true;
  voirlist: any;
  DATECLOTUREAVISREQ: any = '01/01/1900';
  ObservationsCloture: any = '';
  long_sentence: boolean = false;
  show_loader: boolean = false;
  phone_or_code: boolean = false;

  constructor(
    public AdminService: AdminService,
    private toastr: ToastrService,
    public LanguageService: LanguageService,
    private http: HttpClient,
    private AppConfigService: AppConfigService
  ) {}

  //
  ComboAgence() {
    let Option = 'RequeteClientsClasse.svc/pvgReqAgenceCombo';
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeComboAgence = success;
        this.ListeComboAgence = this.ListeComboAgence.pvgReqAgenceComboResult;
        if (this.ListeComboAgence[0].clsResultat.SL_RESULTAT == 'TRUE') {
          // traduction combo agence
          this.ListeComboAgenceParOperateur = [];
          var agenceOp = this.recupinfo[0].CU_CODECOMPTEUTULISATEUR.substring(
            0,
            4
          );
          for (let index = 0; index < this.ListeComboAgence.length; index++) {
            if (agenceOp == this.ListeComboAgence[index].AG_CODEAGENCE) {
              this.ListeComboAgence[index].AG_RAISONSOCIAL_TRANSLATE =
                this.Translate(
                  this.ListeComboAgence[index].AG_RAISONSOCIAL,
                  this.LanguageService.langue_en_cours
                );
              this.ListeComboAgenceParOperateur.push(
                this.ListeComboAgence[index]
              );
            }
          }

          this.ComboEtapeParam();
        } else {
        }
      },
      (error) => {}
    );
  }

  ComboEtapeParam() {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteEtapeParamCombo';
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeComboEtapes = success;
        this.ListeComboEtapes =
          this.ListeComboEtapes.pvgListeReqrequeteEtapeParamComboResult;
        console.log('this.ListeComboEtapes', this.ListeComboEtapes);
        if (this.ListeComboEtapes[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ComboOperateur();
        }
      },
      (error) => {}
    );
  }

  ComboEtapeParamSimple() {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteEtapeParamCombo';
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeComboEtapes = success;
        this.ListeComboEtapes =
          this.ListeComboEtapes.pvgListeReqrequeteEtapeParamComboResult;

        for (let index = 0; index < this.ListeComboEtapes.length; index++) {
          this.ListeComboEtapes[index].RE_ACTIF = 'N';
        }
        this.cloture = false;
      },
      (error) => {}
    );
  }

  ComboOperateur() {
    let Option = 'RequeteClientsClasse.svc/pvgListeUtilisateursCombo';
    let body = {
      Objets: [
        {
          //OE_PARAM: [this.recupinfo[0].AG_CODEAGENCE, '0001'],
          OE_PARAM: ['0001'],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeComboOperateur = success;
        this.ListeComboOperateur =
          this.ListeComboOperateur.pvgListeUtilisateursComboResult;
        if (this.ListeComboOperateur[0].clsResultat.SL_RESULTAT == 'TRUE') {
          for (let i = 0; i < this.ListeComboOperateur.length; i++) {
            if (
              this.ListeComboOperateur[i].CU_NOMUTILISATEUR.includes('ADMIN')
            ) {
              this.ListeComboOperateur.splice(i, 1);
              //break;
            }
          }
          this.ComboTypeRequete();
        } else {
        }
      },
      (error) => {}
    );
  }
  ComboTypeRequete() {
    let Option = 'RequeteClientsClasse.svc/pvgReqtyperequeteCombo';
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeTypeRequete = success;
        this.ListeTypeRequete =
          this.ListeTypeRequete.pvgReqtyperequeteComboResult;
        if (this.ListeTypeRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ListeTypeRequete_1 = [];
          for (let i = 0; i < this.ListeTypeRequete.length; i++) {
            if (this.ListeTypeRequete[i].NR_CODENATUREREQUETE == '01') {
              this.ListeTypeRequete_1.push(this.ListeTypeRequete[i]);
            }
          }

          for (let index = 0; index < this.ListeTypeRequete_1.length; index++) {
            // verifier la langue en cours
            this.ListeTypeRequete_1[index].TR_LIBELLETYEREQUETE_TRANSLATE =
              this.Translate(
                this.ListeTypeRequete_1[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );
          }

          this.ComboModeCollecte();
        } else {
        }
      },
      (error) => {}
    );
  }

  ComboModeCollecte() {
    let Option = 'RequeteClientsClasse.svc/pvgReqmodecollecteCombo';
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeComboModeCollecte = success;
        this.ListeComboModeCollecte =
          this.ListeComboModeCollecte.pvgReqmodecollecteComboResult;
        if (this.ListeComboModeCollecte[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.formulaire_plaintes_reclamations[7].valeur = '';
          if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0002') {
            this.formulaire_plaintes_reclamations[7].valeur =
              this.ListeComboModeCollecte[2].MC_CODEMODECOLLETE;
          }

          for (
            let index = 0;
            index < this.ListeComboModeCollecte.length;
            index++
          ) {
            // verifier la langue en cours
            this.ListeComboModeCollecte[index].MC_LIBELLEMODECOLLETE_TRANSLATE =
              this.Translate(
                this.ListeComboModeCollecte[index].MC_LIBELLEMODECOLLETE,
                this.LanguageService.langue_en_cours
              );
          }

          this.ComboAvisrecevabilite();
        } else {
        }
      },
      (error) => {}
    );
  }

  ComboAvisrecevabilite() {
    let Option = 'RequeteClientsClasse.svc/pvgReqstatutrecevabiliteCombo';
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeComboAvisrecevabilite = success;
        this.ListeComboAvisrecevabilite =
          this.ListeComboAvisrecevabilite.pvgReqstatutrecevabiliteComboResult;
        if (
          this.ListeComboAvisrecevabilite[0].clsResultat.SL_RESULTAT == 'TRUE'
        ) {
          this.formulaire_avis[0].valeur = '01';
        } else {
        }
      },
      (error) => {}
    );
  }

  HandleFileInput(event: any) {
    this.files = event.target.files;
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      if (file.size > 4 * 1024 * 1024) {
        this.toastr.error(
          `Le fichier "${file.name}" est trop volumineux. Veuillez sélectionner un fichier de taille inférieure à 4 Mo.`,
          'Echec'
        );
        // continue; // ignorer ce fichier et passer au suivant
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    }

    /*var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
  }

  HandleFileInputContentieux(event: any) {
    this.files = event.target.files;
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      if (file.size > 4 * 1024 * 1024) {
        this.toastr.error(
          `Le fichier "${file.name}" est trop volumineux. Veuillez sélectionner un fichier de taille inférieure à 4 Mo.`,
          'Echec'
        );
        // continue; // ignorer ce fichier et passer au suivant
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    }

    /*var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
  }

  HandleFileInputContentieuxCloture(event: any) {
    this.files = event.target.files;
    this.formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      if (file.size > 4 * 1024 * 1024) {
        this.toastr.error(
          `Le fichier "${file.name}" est trop volumineux. Veuillez sélectionner un fichier de taille inférieure à 4 Mo.`,
          'Echec'
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result.split(',')[1];
        this.formData.append('DOCUMENT_FICHIER', file, file.name);
        this.formData.append(
          'CT_CODEREQUETECONTENTIEUX',
          this.code_contentieux
        );
      };
      reader.readAsDataURL(file);
    }

    /*var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
  }

  SaveRapportProcedure(code_contentieux: any, btn: any) {
    if (this.files.length == 0) {
      this.AdminService.CloseLoader();
      if (btn == 'T') $('#transmissionauntribunal').modal('show');
      if (btn == 'C') $('#clotureprocedurejudiciaire').modal('show');
      this.toastr.success('Veuillez selectionner un document !', 'success', {
        positionClass: 'toast-bottom-left',
      });
    } else {
      if (btn == 'T') {
        this.formData = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];

          this.formData.append('DOCUMENT_FICHIER', file, file.name);
          this.formData.append('CT_CODEREQUETECONTENTIEUX', code_contentieux);
        }
      }

      this.http
        .post(
          `${this.LienServeur}RequeteClientsClasse.svc/pvgMajReqrequeteContentieuxUPloadFile`,
          this.formData
        )
        .subscribe(
          (success) => {
            this.recupEnregistrerFichierProcedure = success;

            this.recupEnregistrerFichierProcedure =
              this.recupEnregistrerFichierProcedure.pvgMajReqrequeteContentieuxUPloadFileResult;

            if (btn == 'C') {
              this.AdminService.CloseLoader();
              $('#clotureprocedurejudiciaire').modal('hide');
              this.modal_cloture_procedure[0].valeur = '';
              this.modal_cloture_procedure[1].valeur = '';
              this.toastr.success(
                this.tab_cloture_procedure.clsResultat.SL_MESSAGE,
                'success',
                { positionClass: 'toast-bottom-left' }
              );
            } else {
              this.AdminService.CloseLoader();
              $('#transmissionauntribunal').modal('hide');
              this.modal_transmission_tribunal[0].valeur = '';
              this.modal_transmission_tribunal[1].valeur = '';
              this.toastr.success(
                this.tab_transmission_tribunal.clsResultat.SL_MESSAGE,
                'success',
                { positionClass: 'toast-bottom-left' }
              );
            }

            this.ListeRequeteBis();

            if (
              this.recupEnregistrerFichierProcedure.clsResultat.SL_RESULTAT ==
              'FALSE'
            ) {
            }
          },
          (error: any) => {}
        );
    }
  }

  SaveRapportRequete() {
    /* if (this.formData.length == 0) {
      this.AdminService.NotificationErreur(
        'Veuillez selectionner un document !'
      );
    } else { */
    // this.FormObjet.append('RQ_CODEREQUETE', code_requete);

    // for (let i = 0; i < this.formDataArray.length; i++) {
    this.http
      .post(
        `${this.LienServeur}RequeteClientsClasse.svc/pvgpvgMajReqrequeteUPloadFile`,
        this.formData
      )
      .subscribe(
        (success) => {
          this.recupEnregistrerFichierRequete = success;

          this.recupEnregistrerFichierRequete =
            this.recupEnregistrerFichierRequete.pvgpvgMajReqrequeteUPloadFileResult;

          if (
            this.recupEnregistrerFichierRequete.clsResultat.SL_RESULTAT ==
            'TRUE'
          ) {
            this.base64Image = '';
            this.ListeRequeteBis();
            this.viderChamp();
            this.toastr.success(
              this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
          }
        },
        (error: any) => {}
      );
    // }
    // }
  }

  EnregistrementRequete(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      /* var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }*/

      var d = new Date();
      var jour = d.getDate();
      var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
      var annee = d.getFullYear();

      // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
      var date =
        (jour < 10 ? '0' + jour : jour) +
        '-' +
        (mois < 10 ? '0' + mois : mois) +
        '-' +
        annee;
      let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
      //objet d'envoi
      if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0002') {
        let body = {
          Objets: [
            {
              AC_CODEACTIONCORRECTIVE: '',
              CU_CODECOMPTEUTULISATEUR:
                this.recupinfo[0].CU_CODECOMPTEUTULISATEUR, // this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
              CU_CODECOMPTEUTULISATEURAGENTENCHARGE: '', //this.formulaire_plaintes_reclamations[8].valeur,
              MC_CODEMODECOLLETE:
                this.formulaire_plaintes_reclamations[7].valeur, //"01",
              NS_CODENIVEAUSATISFACTION: '',
              RQ_CODEREQUETE: '',
              RQ_CODEREQUETERELANCEE: '',
              RQ_DATECLOTUREREQUETE: '01/01/1900',
              RQ_DATEDEBUTTRAITEMENTREQUETE: '01/01/1900',
              RQ_DATEFINTRAITEMENTREQUETE: '01/01/1900',
              RQ_DATESAISIEREQUETE: date, //"01/01/1900",
              RQ_DATETRANSFERTREQUETE: '01/01/1900',
              RQ_DELAITRAITEMENTREQUETE: '',
              RQ_DESCRIPTIONREQUETE:
                this.formulaire_plaintes_reclamations[6].valeur, //"DESCRIPTION DE LA REQUETE",
              RQ_DUREETRAITEMENTREQUETE: '',
              RQ_AFFICHERINFOCLIENT: 'O',
              RQ_LOCALISATIONCLIENT: '', // this.formulaire_plaintes_reclamations[4].valeur,//"LOCALISATION DU CLIENT",
              RQ_NUMERORECOMPTE: this.recupinfo[0].CU_NUMEROUTILISATEUR, //this.formulaire_plaintes_reclamations[0].valeur,//"0",
              RQ_NUMEROREQUETE: '0',
              RQ_OBJETREQUETE: 'RECLAMATION',
              RQ_OBSERVATIONAGENTTRAITEMENTREQUETE: '',
              RQ_OBSERVATIONDELAITRAITEMENTREQUETE: '',
              RQ_SIGNATURE: this.base64Image,
              RQ_SIGNATURE1: '',
              RS_CODESTATUTRECEVABILITE: '',
              SR_CODESERVICE: '',
              TR_CODETYEREQUETE:
                this.formulaire_plaintes_reclamations[5].valeur, //"00001",
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '5',
              },
            },
          ],
        };

        this.AdminService.AppelServeur(body, Options).subscribe(
          (success) => {
            this.retourRequeteEnregistrement = success;
            this.retourRequeteEnregistrement =
              this.retourRequeteEnregistrement.pvgMajReqrequeteResult;
            this.AdminService.CloseLoader();
            if (
              this.retourRequeteEnregistrement.clsResultat.SL_RESULTAT ==
              'FALSE'
            ) {
              //this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
              this.toastr.error(
                this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
                'error',
                { positionClass: 'toast-bottom-left' }
              );
            } else {
              if (
                this.base64Image == '' ||
                this.base64Image == undefined ||
                this.base64Image == null
              ) {
                this.ListeRequete();
                this.toastr.success(
                  this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
                  'success',
                  { positionClass: 'toast-bottom-left' }
                );
                this.viderChamp();
              } else {
                this.formData = new FormData();

                for (let i = 0; i < this.files.length; i++) {
                  const file = this.files[i];

                  this.formData.append('DOCUMENT_FICHIER', file, file.name);
                  this.formData.append(
                    'RQ_CODEREQUETE',
                    this.retourRequeteEnregistrement.RQ_CODEREQUETE
                  );
                }

                this.SaveRapportRequete();
              }
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader();
            this.toastr.warning(
              this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
              'warning',
              { positionClass: 'toast-bottom-left' }
            );
          }
        );
      } else {
        let body = {
          Objets: [
            {
              AC_CODEACTIONCORRECTIVE: '',
              CU_CODECOMPTEUTULISATEUR:
                this.statutClientExiste == false
                  ? this.ListeClients[0].CU_CODECOMPTEUTULISATEUR
                  : this.retourRequeteEnregistrement.CU_CODECOMPTEUTULISATEUR, // this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
              CU_CODECOMPTEUTULISATEURAGENTENCHARGE: '', //this.formulaire_plaintes_reclamations[8].valeur,
              MC_CODEMODECOLLETE:
                this.formulaire_plaintes_reclamations[7].valeur, //"01",
              NS_CODENIVEAUSATISFACTION: '',
              RQ_CODEREQUETE: '',
              RQ_CODEREQUETERELANCEE: '',
              RQ_DATECLOTUREREQUETE: '01/01/1900',
              RQ_DATEDEBUTTRAITEMENTREQUETE: '01/01/1900',
              RQ_DATEFINTRAITEMENTREQUETE: '01/01/1900',
              RQ_DATESAISIEREQUETE: date, //"01/01/1900",
              RQ_DATETRANSFERTREQUETE: '01/01/1900',
              RQ_DELAITRAITEMENTREQUETE: '',
              RQ_DESCRIPTIONREQUETE:
                this.formulaire_plaintes_reclamations[6].valeur, //"DESCRIPTION DE LA REQUETE",
              RQ_DUREETRAITEMENTREQUETE: '',
              RQ_AFFICHERINFOCLIENT: 'O',
              RQ_LOCALISATIONCLIENT:
                this.statutClientExiste == false
                  ? ''
                  : this.formulaire_plaintes_reclamations[4].valeur, // this.formulaire_plaintes_reclamations[4].valeur,//"LOCALISATION DU CLIENT",
              RQ_NUMERORECOMPTE:
                this.statutClientExiste == false
                  ? this.ListeClients[0].CU_NUMEROUTILISATEUR
                  : this.formulaire_plaintes_reclamations[0].valeur, //this.formulaire_plaintes_reclamations[0].valeur,//"0",
              RQ_NUMEROREQUETE: '0',
              RQ_OBJETREQUETE: 'RECLAMATION',
              RQ_OBSERVATIONAGENTTRAITEMENTREQUETE: '',
              RQ_OBSERVATIONDELAITRAITEMENTREQUETE: '',
              RQ_SIGNATURE: this.base64Image,
              RQ_SIGNATURE1: '',
              RS_CODESTATUTRECEVABILITE: '',
              SR_CODESERVICE: '',
              TR_CODETYEREQUETE:
                this.formulaire_plaintes_reclamations[5].valeur, //"00001",
              CU_CODECOMPTEUTULISATEURASSOCIER:
                this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '0',
              },
            },
          ],
        };

        this.AdminService.AppelServeur(body, Options).subscribe(
          (success) => {
            this.retourRequeteEnregistrement = success;
            this.retourRequeteEnregistrement =
              this.retourRequeteEnregistrement.pvgMajReqrequeteResult;
            this.AdminService.CloseLoader();
            if (
              this.retourRequeteEnregistrement.clsResultat.SL_RESULTAT ==
              'FALSE'
            ) {
              this.toastr.error(
                this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
                'error',
                { positionClass: 'toast-bottom-left' }
              );
            } else {
              if (
                this.base64Image == '' ||
                this.base64Image == undefined ||
                this.base64Image == null
              ) {
                this.ListeRequete();
                this.toastr.success(
                  this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
                  'success',
                  { positionClass: 'toast-bottom-left' }
                );
                this.viderChamp();
              } else {
                this.formData = new FormData();

                for (let i = 0; i < this.files.length; i++) {
                  const file = this.files[i];

                  this.formData.append('DOCUMENT_FICHIER', file, file.name);
                  this.formData.append(
                    'RQ_CODEREQUETE',
                    this.retourRequeteEnregistrement.RQ_CODEREQUETE
                  );
                }

                this.SaveRapportRequete();
              }
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader();
            // this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
            this.toastr.warning(
              this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
              'warning',
              { positionClass: 'toast-bottom-left' }
            );
          }
        );
      }
    }
  }

  EnregistrementCompteClient(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      /*var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }*/
      var d = new Date();
      var jour = d.getDate();
      var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
      var annee = d.getFullYear();

      // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
      var date =
        (jour < 10 ? '0' + jour : jour) +
        '-' +
        (mois < 10 ? '0' + mois : mois) +
        '-' +
        annee;
      let Options = 'RequeteClientsClasse.svc/pvgMajUtilisateurs'; // le chemin d'appel du service web
      //objet d'envoi
      let body = {
        Objets: [
          {
            AG_CODEAGENCE: this.formulaire_plaintes_reclamations[3].valeur,
            CU_ADRESSEGEOGRAPHIQUEUTILISATEUR: '.',
            CU_CLESESSION: '',
            CU_CODECOMPTEUTULISATEUR: '',
            CU_CONTACT: this.formulaire_plaintes_reclamations[2].valeur, //"2250747839553",
            CU_DATECLOTURE: '01/01/1900',
            CU_DATECREATION: date, //"01/01/1900",
            CU_DATEPIECE: '01/01/1900',
            CU_EMAIL: this.formulaire_plaintes_reclamations[10].valeur, // "d.baz1008@gmail.com",
            CU_LOGIN: this.formulaire_plaintes_reclamations[11].valeur, //"d.baz1008@gmail.com",
            CU_MOTDEPASSE: this.formulaire_plaintes_reclamations[12].valeur, //"2250747839553",
            CU_NOMBRECONNECTION: '0',
            CU_NOMUTILISATEUR: this.formulaire_plaintes_reclamations[1].valeur, //"bolaty",
            CU_NUMEROPIECE: 'XXXX',
            CU_NUMEROUTILISATEUR:
              this.formulaire_plaintes_reclamations[0].valeur,
            CU_TOKEN: '',
            PI_CODEPIECE: '00001',
            TU_CODETYPEUTILISATEUR: '0002',
            clsReqmicclient: {
              OP_CODEOPERATEUR: '',
              OP_CODEOPERATEURZENITH: 'dddd',
              AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE,
              PV_CODEPOINTVENTE: '100000001',
              CU_CODECOMPTEUTULISATEUR:
                this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,
              SR_CODESERVICE: '01',
              OP_DATESAISIE: date,
            },
            clsReqmicprospect: null,
            clsReqoperateur: null,
            clsReqtontineepargnantjournalier: null,
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '0',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Options).subscribe(
        (success) => {
          this.retourRequeteEnregistrement = success;
          this.retourRequeteEnregistrement =
            this.retourRequeteEnregistrement.pvgMajUtilisateursResult;
          if (
            this.retourRequeteEnregistrement.clsResultat.SL_RESULTAT == 'FALSE'
          ) {
            // this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
            this.toastr.error(
              this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
              'error',
              { positionClass: 'toast-bottom-left' }
            );
            this.AdminService.CloseLoader();
          } else {
            this.EnregistrementRequete(this.formulaire_plaintes_reclamations);
          }
        },
        (error: any) => {
          this.AdminService.CloseLoader();
          // this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
          this.toastr.warning(
            this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }
  }

  EnregistrementRequeteAffectation(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      if (
        this.AdminService.ComparerDeuxDates(
          this.formulaire_attr_reclamations[1].valeur
        ) >
        this.AdminService.ComparerDeuxDates(
          this.formulaire_attr_reclamations[2].valeur
        )
      ) {
        $('#' + tableau_recu[1].id).css('background-color', 'MistyRose');
        $('#' + tableau_recu[2].id).css('background-color', 'MistyRose');
        this.toastr.error(
          'La date de début ne doit pas être plus grande que la date de fin',
          'error',
          { positionClass: 'toast-bottom-left' }
        );
      } else if (
        this.AdminService.ComparerDeuxDates(
          recuperation.RQ_DATEDEBUTTRAITEMENTREQUETE
        ) >
        this.AdminService.ComparerDeuxDates(
          this.formulaire_attr_reclamations[1].valeur
        )
      ) {
        $('#' + tableau_recu[1].id).css('background-color', 'MistyRose');
        this.toastr.error(
          "La date de debut d'une étape ne doit pas être inférieur à la date de debut de la reclamation",
          'error',
          { positionClass: 'toast-bottom-left' }
        );
      } else if (
        this.AdminService.ComparerDeuxDates(
          this.formulaire_attr_reclamations[2].valeur
        ) >
        this.AdminService.ComparerDeuxDates(
          recuperation.RQ_DATEFINTRAITEMENTREQUETE
        )
      ) {
        $('#' + tableau_recu[2].id).css('background-color', 'MistyRose');
        this.toastr.error(
          "La date de fin d'une étape ne doit pas être supérieur à la date de fin de la reclamation",
          'error',
          { positionClass: 'toast-bottom-left' }
        );
      } else {
        /*var d = new Date();
        var date =
          d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        var jour = d.getDate();
        if (jour < 10) {
          var date =
            '0' +
            d.getDate() +
            '-0' +
            (d.getMonth() + 1) +
            '-' +
            d.getFullYear();
          console.log(date);
        }*/
        var d = new Date();
        var jour = d.getDate();
        var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
        var annee = d.getFullYear();

        // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
        var date =
          (jour < 10 ? '0' + jour : jour) +
          '-' +
          (mois < 10 ? '0' + mois : mois) +
          '-' +
          annee;
        var CodeAgenceUtilisateur =
          this.formulaire_attr_reclamations[0].valeur.substring(0, 4);
        let Options = 'RequeteClientsClasse.svc/pvgMajReqrequeteEtape'; // le chemin d'appel du service web
        //objet d'envoi
        let body = {
          Objets: [
            {
              AG_CODEAGENCE: CodeAgenceUtilisateur, //this.recupinfo[0].AG_CODEAGENCE,
              AT_DATECLOTUREETAPE: '01/01/1900',
              AT_DATEDEBUTTRAITEMENTETAPE:
                this.formulaire_attr_reclamations[1].valeur,
              AT_DATEFINTRAITEMENTETAPE:
                this.formulaire_attr_reclamations[2].valeur,
              AT_DESCRIPTION: this.formulaire_attr_reclamations[3].valeur,
              AT_INDEXETAPE: '0',
              AT_NUMEROORDRE: '0',
              CU_CODECOMPTEUTULISATEURAGENTENCHARGE:
                this.formulaire_attr_reclamations[0].valeur,
              NS_CODENIVEAUSATISFACTION: '',
              RE_CODEETAPE: this.recupEtape.RE_CODEETAPE,
              RQ_CODEREQUETE: recuperation.RQ_CODEREQUETE,
              AT_ACTIF: this.valeur_authorization,
              RQ_DATESAISIE: date,
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '0',
              },
            },
          ],
        };
        this.AdminService.ShowLoader();
        this.AdminService.AppelServeur(body, Options).subscribe(
          (success) => {
            this.retourRequeteEnregistrement = success;
            this.retourRequeteEnregistrement =
              this.retourRequeteEnregistrement.pvgMajReqrequeteEtapeResult;
            this.AdminService.CloseLoader();
            if (
              this.retourRequeteEnregistrement.clsResultat.SL_RESULTAT ==
              'FALSE'
            ) {
              //this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
              this.toastr.error(
                this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
                'error',
                { positionClass: 'toast-bottom-left' }
              );
            } else {
              // this.toastr.success(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
              this.toastr.success(
                this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
                'success',
                { positionClass: 'toast-bottom-left' }
              );
              this.ListeRequeteBis();
              this.viderChampAff();
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader();
            // this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
            this.toastr.warning(
              this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE,
              'warning',
              { positionClass: 'toast-bottom-left' }
            );
          }
        );
      }
    }
  }

  EnregistrerAvis(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      /*var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }*/

      var d = new Date();
      var jour = d.getDate();
      var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
      var annee = d.getFullYear();

      // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
      var date =
        (jour < 10 ? '0' + jour : jour) +
        '-' +
        (mois < 10 ? '0' + mois : mois) +
        '-' +
        annee;

      if (!this.long_sentence) {
        $('#' + tableau_recu[2].id).css('background-color', 'white');
        $('#' + tableau_recu[3].id).css('background-color', 'white');

        if (
          this.AdminService.ComparerDeuxDates(tableau_recu[2].valeur) >
          this.AdminService.ComparerDeuxDates(tableau_recu[3].valeur)
        ) {
          $('#' + tableau_recu[3].id).css('background-color', 'MistyRose');
          this.toastr.error(
            'La date de fin ne doit pas être plus petite que la date de début',
            'error',
            { positionClass: 'toast-bottom-left' }
          );
        } else {
          let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
          //objet d'envoi
          let body = {
            Objets: [
              {
                AC_CODEACTIONCORRECTIVE: '',
                CU_CODECOMPTEUTULISATEUR:
                  this.recupValEtape.CU_CODECOMPTEUTULISATEUR, // this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
                CU_CODECOMPTEUTULISATEURAGENTENCHARGE:
                  this.recupValEtape.CU_CODECOMPTEUTULISATEURAGENTENCHARGE, //this.formulaire_suivi[8].valeur,
                MC_CODEMODECOLLETE: this.recupValEtape.MC_CODEMODECOLLETE, //"01",
                NS_CODENIVEAUSATISFACTION:
                  this.recupValEtape.NS_CODENIVEAUSATISFACTION,
                RQ_CODEREQUETE: this.recupValEtape.RQ_CODEREQUETE,
                RQ_CODEREQUETERELANCEE: '',
                RQ_DATECLOTUREREQUETE: '01/01/1900',
                RQ_DATEDEBUTTRAITEMENTREQUETE: this.formulaire_avis[2].valeur,
                RQ_DATEFINTRAITEMENTREQUETE: this.formulaire_avis[3].valeur,
                RQ_DATESAISIEREQUETE: this.recupValEtape.RQ_DATESAISIEREQUETE,
                RQ_DATETRANSFERTREQUETE:
                  this.recupValEtape.RQ_DATETRANSFERTREQUETE,
                RQ_DELAITRAITEMENTREQUETE: '',
                RQ_DESCRIPTIONREQUETE: this.recupValEtape.RQ_DESCRIPTIONREQUETE, //"DESCRIPTION DE LA REQUETE",
                RQ_DUREETRAITEMENTREQUETE: '',
                RQ_LOCALISATIONCLIENT: this.recupValEtape.RQ_LOCALISATIONCLIENT, //"LOCALISATION DU CLIENT",
                RQ_NUMERORECOMPTE: this.recupValEtape.RQ_NUMERORECOMPTE, //"0",
                RQ_NUMEROREQUETE: this.recupValEtape.RQ_NUMEROREQUETE,
                RQ_OBJETREQUETE: this.recupValEtape.RQ_OBJETREQUETE,
                RQ_OBSERVATIONAGENTTRAITEMENTREQUETE:
                  this.recupValEtape.RQ_OBSERVATIONAGENTTRAITEMENTREQUETE,
                RQ_OBSERVATIONDELAITRAITEMENTREQUETE:
                  this.formulaire_avis[1].valeur,
                RQ_AFFICHERINFOCLIENT: 'O',
                RQ_SIGNATURE: '',
                RQ_SIGNATURE1: '',
                RS_CODESTATUTRECEVABILITE: this.formulaire_avis[0].valeur,
                SR_CODESERVICE: this.recupValEtape.SR_CODESERVICE,
                TR_CODETYEREQUETE: this.recupValEtape.TR_CODETYEREQUETE, //"00001",
                clsObjetEnvoi: {
                  ET_CODEETABLISSEMENT: '',
                  AN_CODEANTENNE: '',
                  TYPEOPERATION: '1',
                },
              },
            ],
          };
          this.AdminService.ShowLoader();
          this.AdminService.AppelServeur(body, Options).subscribe(
            (success) => {
              this.tab_enregistrement_traitement = success;
              this.tab_enregistrement_traitement =
                this.tab_enregistrement_traitement.pvgMajReqrequeteResult;
              this.AdminService.CloseLoader();
              if (
                this.tab_enregistrement_traitement.clsResultat.SL_RESULTAT ==
                'FALSE'
              ) {
                //this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
                this.toastr.error(
                  this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
                  'error',
                  { positionClass: 'toast-bottom-left' }
                );
              } else {
                // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);

                this.ListeRequete();
                this.toastr.success(
                  this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
                  'success',
                  { positionClass: 'toast-bottom-left' }
                );
                this.ViderChamp();
                $('#addNewAddress2').modal('hide');
              }
            },
            (error: any) => {
              this.AdminService.CloseLoader();
              // this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
              this.toastr.warning(
                this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
                'warning',
                { positionClass: 'toast-bottom-left' }
              );
            }
          );
        }
      } else {
        this.toastr.error(
          `Vous avez saisi trop de mots. Veuillez limiter votre saisie à ${this.maxWords} mots.`,
          'error',
          { positionClass: 'toast-bottom-left' }
        );
      }
    }
  }

  gestionAvisReq() {
    if (this.formulaire_avis[0].valeur == '01') {
      this.statutDateDebut = true;
      this.statutDatefin = true;
      this.formulaire_avis[2].obligatoire = 'O';
      this.formulaire_avis[3].obligatoire = 'O';
      this.formulaire_avis[2].valeur = '';
      this.formulaire_avis[3].valeur = '';
    } else {
      this.statutDateDebut = false;
      this.statutDatefin = false;
      this.formulaire_avis[2].valeur = '01/01/1900';
      this.formulaire_avis[3].valeur = '01/01/1900';
      this.formulaire_avis[2].obligatoire = 'N';
      this.formulaire_avis[3].obligatoire = 'N';
    }
  }

  ClotureEtape() {
    if (
      this.recupEtape.RE_CODEETAPE == '' ||
      this.recupEtape.RE_CODEETAPE == undefined
    ) {
      this.toastr.error('Veuillez selectionner une étape !', 'error', {
        positionClass: 'toast-bottom-left',
      });
    } else {
      /*var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }*/

      var d = new Date();
      var jour = d.getDate();
      var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
      var annee = d.getFullYear();

      // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
      var date =
        (jour < 10 ? '0' + jour : jour) +
        '-' +
        (mois < 10 ? '0' + mois : mois) +
        '-' +
        annee;
      var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
      let Options = 'RequeteClientsClasse.svc/pvgMajReqrequeteEtape'; // le chemin d'appel du service web
      //objet d'envoi
      let body = {
        Objets: [
          {
            AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE,
            AT_DATECLOTUREETAPE: date,
            AT_INDEXETAPE: this.recupEtape.RE_CODEETAPE,
            RE_CODEETAPE: this.recupEtape.RE_CODEETAPE,
            RQ_CODEREQUETE: recuperation.RQ_CODEREQUETE,
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '3',
            },
          },
        ],
      };

      this.AdminService.AppelServeur(body, Options).subscribe(
        (success) => {
          this.tab_enregistrement_traitement = success;
          this.tab_enregistrement_traitement =
            this.tab_enregistrement_traitement.pvgMajReqrequeteEtapeResult;
          this.AdminService.CloseLoader();
          if (
            this.tab_enregistrement_traitement.clsResultat.SL_RESULTAT ==
            'FALSE'
          ) {
            //this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
            this.toastr.error(
              this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
              'error',
              { positionClass: 'toast-bottom-left' }
            );
          } else {
            // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
            this.toastr.success(
              this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
            this.ComboReqrequeteselonEtape(this.recupEtape.RQ_CODEREQUETE);
            this.ViderChamp();
          }
        },
        (error: any) => {
          this.AdminService.CloseLoader();
          // this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
          this.toastr.warning(
            this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }
  }

  ListeConsultationselonEtape() {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteEtapeConsultation';
    var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
    var CodeAgenceUtilisateur =
      recuperation.CU_CODECOMPTEUTULISATEURASSOCIER != ''
        ? recuperation.CU_CODECOMPTEUTULISATEURASSOCIER.substring(0, 4)
        : recuperation.CU_CODECOMPTEUTULISATEUR.substring(0, 4);
    let body;

    if (
      recuperation.RQ_CODEREQUETERELANCEE != '' &&
      recuperation.RQ_DATESAISIEREQUETE != '01/01/1900' &&
      recuperation.RQ_DATEDEBUTTRAITEMENTREQUETE == '01/01/1900' &&
      recuperation.RQ_DATECLOTUREREQUETE == '01/01/1900'
    ) {
      body = {
        Objets: [
          {
            OE_PARAM: [
              CodeAgenceUtilisateur, //this.recupinfo[0].AG_CODEAGENCE,
              recuperation.RQ_CODEREQUETERELANCEE,
              '',
              '',
              '01',
            ],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
    } else {
      body = {
        Objets: [
          {
            OE_PARAM: [
              CodeAgenceUtilisateur, //this.recupinfo[0].AG_CODEAGENCE,
              recuperation.RQ_CODEREQUETE,
              '',
              '',
              '01',
            ],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
    }

    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListConsultEtapeSelonReq = success;
        this.ListConsultEtapeSelonReq =
          this.ListConsultEtapeSelonReq.pvgListeReqrequeteEtapeConsultationResult;

        this.statutTraitement = false;
        if (
          this.ListConsultEtapeSelonReq[0].clsResultat.SL_RESULTAT == 'TRUE'
        ) {
          for (let i = 0; i < this.ListConsultEtapeSelonReq.length; i++) {
            if (
              this.recupEtape.RE_CODEETAPE ==
              this.ListConsultEtapeSelonReq[i].RE_CODEETAPE
            ) {
              this.voirlist = this.ListConsultEtapeSelonReq[i];
              console.log('voirlist_doc', this.voirlist);
              this.statutTraitement = true;

              //  traitement des dates pour retirer l'heure
              var received =
                this.voirlist.AT_DATEDEBUTTRAITEMENTETAPE.split(':')[0];
              this.voirlist.AT_DATEDEBUTTRAITEMENTETAPE = received.substr(
                0,
                10
              );

              var received = this.voirlist.RQ_DATESAISIE.split(':')[0];
              this.voirlist.RQ_DATESAISIE = received.substr(0, 10);

              break;
            }
          }
        }
        this.show_loader = false;
      },
      (error) => {
        this.show_loader = false;
        this.statutTraitement = false;
      }
    );
  }

  selectionEtapeConsultation(info: any, index_etape: any) {
    this.show_loader = true;
    this.recupEtape = info;

    this.option_body = document.getElementById('idColor');
    for (let index = 0; index < this.ListeComboEtapes.length; index++) {
      if (index == index_etape) {
        this.option_body.style.backgroundColor = this.background_color[index];
      }
    }

    this.ListeConsultationselonEtape();
  }

  SelectionEtapeConsultationHistoCloture(info: any, index_etape: any) {
    this.recupEtape = info;

    this.option_body = document.getElementById('idColor');
    for (let index = 0; index < this.ListeComboEtapes.length; index++) {
      if (index == index_etape) {
        this.option_body.style.backgroundColor = this.background_color[index];
      }
    }

    this.ListeConsultationHistorique('cloture');
  }

  selectionEtape(info: any) {
    this.btn_etape = true;
    this.recupEtape = info;
  }

  ViderChamp() {
    for (let index = 0; index < this.formulaire_avis.length; index++) {
      this.formulaire_avis[index].valeur = '';
    }
  }

  ListeRequete() {
    var Option = '';
    var body = {};
    if (this.recupinfo[0].CU_NOMUTILISATEUR.includes('ADMIN')) {
      var CodeAgenceUtilisateur =
        this.recupinfo[0].CU_CODECOMPTEUTULISATEUR.substring(0, 4);
      Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
      body = {
        Objets: [
          {
            OE_PARAM: ['01', '', CodeAgenceUtilisateur],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeRetourRequete = success;
          this.ListeRetourRequete =
            this.ListeRetourRequete.pvgListeReqrequeteResult;
          this.AdminService.CloseLoader();
          if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.statutliste = true;
            this.tab_req_enregistree = [];
            this.tab_req_en_cours_trait = [];
            this.tab_req_cloturee = [];
            for (
              let index = 0;
              index < this.ListeRetourRequete.length;
              index++
            ) {
              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_enregistree.push(this.ListeRetourRequete[index]);
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_en_cours_trait.push(
                  this.ListeRetourRequete[index]
                );
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE !=
                  '01/01/1900'
              ) {
                this.tab_req_cloturee.push(this.ListeRetourRequete[index]);
              }
            }
            console.log(this.tab_req_cloturee);
            // initialisation des boutons de tri des requetes
            this.var_checked_enrg = 'checked';
            this.var_checked_trai = '';
            this.var_checked_clo = '';

            // traduction :: traduction de chaque bloc
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_enregistree[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_en_cours_trait[
                index
              ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );

              this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (let index = 0; index < this.tab_req_cloturee.length; index++) {
              // verifier la langue en cours
              this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_cloturee[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }
            // traduction

            // initialisation de l'affichage sur les requetes enregistrée
            this.tab_req_afficher = [];
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              this.tab_req_afficher.push(this.tab_req_enregistree[index]);
            }

            this.afficher_tri = true;
          } else {
            this.toastr.info(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'info',
              { positionClass: 'toast-bottom-left' }
            );
            this.statutliste = false;
            this.afficher_tri = false;
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.statutliste = false;
          this.afficher_tri = false;
          this.toastr.warning(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    } else if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0001') {
      Option = 'RequeteClientsClasse.svc/pvgChargerDansDataSetParOperateurs';
      body = {
        Objets: [
          {
            OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeRetourRequete = success;
          this.ListeRetourRequete =
            this.ListeRetourRequete.pvgChargerDansDataSetParOperateursResult;
          this.AdminService.CloseLoader();
          if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.statutliste = true;
            this.tab_req_enregistree = [];
            this.tab_req_en_cours_trait = [];
            this.tab_req_cloturee = [];
            for (
              let index = 0;
              index < this.ListeRetourRequete.length;
              index++
            ) {
              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATECLOTUREETAPE ==
                  '01/01/1900'
              ) {
                this.tab_req_enregistree.push(this.ListeRetourRequete[index]);
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATEDEBUTTRAITEMENTETAPE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATECLOTUREETAPE ==
                  '01/01/1900'
              ) {
                this.tab_req_en_cours_trait.push(
                  this.ListeRetourRequete[index]
                );
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATEDEBUTTRAITEMENTETAPE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATECLOTUREETAPE !=
                  '01/01/1900'
              ) {
                this.tab_req_cloturee.push(this.ListeRetourRequete[index]);
              }
            }

            // initialisation des boutons de tri des requetes
            this.var_checked_enrg = 'checked';
            this.var_checked_trai = '';
            this.var_checked_clo = '';

            // traduction :: traduction de chaque bloc
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_enregistree[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_en_cours_trait[
                index
              ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );

              this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (let index = 0; index < this.tab_req_cloturee.length; index++) {
              // verifier la langue en cours
              this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_cloturee[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }
            // traduction

            // initialisation de l'affichage sur les requetes enregistrée
            this.tab_req_afficher = [];
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              this.tab_req_afficher.push(this.tab_req_enregistree[index]);
            }

            this.afficher_tri = true;
          } else {
            this.toastr.info(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'info',
              { positionClass: 'toast-bottom-left' }
            );
            this.statutliste = false;
            this.afficher_tri = false;
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.statutliste = false;
          this.afficher_tri = false;
          this.toastr.warning(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    } else {
      Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
      body = {
        Objets: [
          {
            OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeRetourRequete = success;
          this.ListeRetourRequete =
            this.ListeRetourRequete.pvgListeReqrequeteResult;
          this.AdminService.CloseLoader();
          if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.statutliste = true;
            this.tab_req_enregistree = [];
            this.tab_req_en_cours_trait = [];
            this.tab_req_cloturee = [];
            for (
              let index = 0;
              index < this.ListeRetourRequete.length;
              index++
            ) {
              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_enregistree.push(this.ListeRetourRequete[index]);
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_en_cours_trait.push(
                  this.ListeRetourRequete[index]
                );
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE !=
                  '01/01/1900'
              ) {
                this.tab_req_cloturee.push(this.ListeRetourRequete[index]);
              }
            }

            // initialisation des boutons de tri des requetes
            this.var_checked_enrg = 'checked';
            this.var_checked_trai = '';
            this.var_checked_clo = '';

            // traduction :: traduction de chaque bloc
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_enregistree[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_en_cours_trait[
                index
              ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );

              this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (let index = 0; index < this.tab_req_cloturee.length; index++) {
              // verifier la langue en cours
              this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_cloturee[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }
            // traduction

            // initialisation de l'affichage sur les requetes enregistrée
            this.tab_req_afficher = [];
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              this.tab_req_afficher.push(this.tab_req_enregistree[index]);
            }

            this.afficher_tri = true;
          } else {
            this.toastr.info(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'info',
              { positionClass: 'toast-bottom-left' }
            );
            this.statutliste = false;
            this.afficher_tri = false;
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.statutliste = false;
          this.afficher_tri = false;
          this.toastr.warning(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }

    console.log('table_des_requetes', this.tab_req_afficher);
  }

  ListeRequeteBis() {
    var Option = '';
    var body = {};
    if (this.recupinfo[0].CU_NOMUTILISATEUR.includes('ADMIN')) {
      Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
      body = {
        Objets: [
          {
            OE_PARAM: ['01'],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeRetourRequete = success;
          this.ListeRetourRequete =
            this.ListeRetourRequete.pvgListeReqrequeteResult;
          this.AdminService.CloseLoader();
          if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.statutliste = true;
            this.tab_req_enregistree = [];
            this.tab_req_en_cours_trait = [];
            this.tab_req_cloturee = [];
            for (
              let index = 0;
              index < this.ListeRetourRequete.length;
              index++
            ) {
              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_enregistree.push(this.ListeRetourRequete[index]);
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_en_cours_trait.push(
                  this.ListeRetourRequete[index]
                );
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE !=
                  '01/01/1900'
              ) {
                this.tab_req_cloturee.push(this.ListeRetourRequete[index]);
              }
            }
            console.log(this.tab_req_cloturee);
            // initialisation des boutons de tri des requetes
            this.var_checked_enrg = 'checked';
            this.var_checked_trai = '';
            this.var_checked_clo = '';

            // traduction :: traduction de chaque bloc
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_enregistree[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_en_cours_trait[
                index
              ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );

              this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (let index = 0; index < this.tab_req_cloturee.length; index++) {
              // verifier la langue en cours
              this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_cloturee[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }
            // traduction

            // initialisation de l'affichage sur les requetes enregistrée
            this.tab_req_afficher = [];

            if (this.btn_filter == 'enrg') {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_enregistree[index]);
              }

              this.var_checked_enrg = 'checked';
              this.var_checked_trai = '';
              this.var_checked_clo = '';
            } else if (this.btn_filter == 'trai') {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_en_cours_trait[index]);
              }

              this.var_checked_enrg = '';
              this.var_checked_trai = 'checked';
              this.var_checked_clo = '';

              // Changer l'onglet actif vers "en cours de traitement"
              const listeTabLink_trai = document.getElementById(
                'btnradio2'
              ) as HTMLAnchorElement;
              if (listeTabLink_trai) {
                listeTabLink_trai.click(); // Cliquez sur l'onglet "Liste" pour le rendre actif
              }
            } else {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_cloturee[index]);
              }

              this.var_checked_enrg = '';
              this.var_checked_trai = '';
              this.var_checked_clo = 'checked';

              // Changer l'onglet actif vers "en cours de traitement"
              const listeTabLink_clo = document.getElementById(
                'btnradio3'
              ) as HTMLAnchorElement;
              if (listeTabLink_clo) {
                listeTabLink_clo.click(); // Cliquez sur l'onglet "Liste" pour le rendre actif
              }
            }

            this.afficher_tri = true;
          } else {
            this.toastr.info(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'info',
              { positionClass: 'toast-bottom-left' }
            );
            this.statutliste = false;
            this.afficher_tri = false;
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.statutliste = false;
          this.afficher_tri = false;
          this.toastr.warning(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    } else if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0001') {
      Option = 'RequeteClientsClasse.svc/pvgChargerDansDataSetParOperateurs';
      body = {
        Objets: [
          {
            OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeRetourRequete = success;
          this.ListeRetourRequete =
            this.ListeRetourRequete.pvgChargerDansDataSetParOperateursResult;
          this.AdminService.CloseLoader();
          if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.statutliste = true;
            this.tab_req_enregistree = [];
            this.tab_req_en_cours_trait = [];
            this.tab_req_cloturee = [];
            for (
              let index = 0;
              index < this.ListeRetourRequete.length;
              index++
            ) {
              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATECLOTUREETAPE ==
                  '01/01/1900'
              ) {
                this.tab_req_enregistree.push(this.ListeRetourRequete[index]);
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATEDEBUTTRAITEMENTETAPE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATECLOTUREETAPE ==
                  '01/01/1900'
              ) {
                this.tab_req_en_cours_trait.push(
                  this.ListeRetourRequete[index]
                );
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATEDEBUTTRAITEMENTETAPE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].AT_DATECLOTUREETAPE !=
                  '01/01/1900'
              ) {
                this.tab_req_cloturee.push(this.ListeRetourRequete[index]);
              }
            }

            // initialisation des boutons de tri des requetes
            this.var_checked_enrg = 'checked';
            this.var_checked_trai = '';
            this.var_checked_clo = '';

            // traduction :: traduction de chaque bloc
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_enregistree[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_en_cours_trait[
                index
              ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );

              this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (let index = 0; index < this.tab_req_cloturee.length; index++) {
              // verifier la langue en cours
              this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_cloturee[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }
            // traduction

            // initialisation de l'affichage sur les requetes enregistrée
            this.tab_req_afficher = [];

            if (this.btn_filter == 'enrg') {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_enregistree[index]);
              }
            } else if (this.btn_filter == 'trai') {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_en_cours_trait[index]);
              }
            } else {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_cloturee[index]);
              }
            }

            this.afficher_tri = true;
          } else {
            this.toastr.info(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'info',
              { positionClass: 'toast-bottom-left' }
            );
            this.statutliste = false;
            this.afficher_tri = false;
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.statutliste = false;
          this.afficher_tri = false;
          this.toastr.warning(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    } else {
      Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
      body = {
        Objets: [
          {
            OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeRetourRequete = success;
          this.ListeRetourRequete =
            this.ListeRetourRequete.pvgListeReqrequeteResult;
          this.AdminService.CloseLoader();
          if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.statutliste = true;
            this.tab_req_enregistree = [];
            this.tab_req_en_cours_trait = [];
            this.tab_req_cloturee = [];
            for (
              let index = 0;
              index < this.ListeRetourRequete.length;
              index++
            ) {
              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_enregistree.push(this.ListeRetourRequete[index]);
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                  '01/01/1900'
              ) {
                this.tab_req_en_cours_trait.push(
                  this.ListeRetourRequete[index]
                );
              }

              if (
                this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                  '01/01/1900' &&
                this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE !=
                  '01/01/1900'
              ) {
                this.tab_req_cloturee.push(this.ListeRetourRequete[index]);
              }
            }

            // initialisation des boutons de tri des requetes
            this.var_checked_enrg = 'checked';
            this.var_checked_trai = '';
            this.var_checked_clo = '';

            // traduction :: traduction de chaque bloc
            for (
              let index = 0;
              index < this.tab_req_enregistree.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_enregistree[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_enregistree[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (
              let index = 0;
              index < this.tab_req_en_cours_trait.length;
              index++
            ) {
              // verifier la langue en cours
              this.tab_req_en_cours_trait[
                index
              ].TR_LIBELLETYEREQUETE_TRANSLATE = this.Translate(
                this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
                this.LanguageService.langue_en_cours
              );

              this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }

            for (let index = 0; index < this.tab_req_cloturee.length; index++) {
              // verifier la langue en cours
              this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE,
                  this.LanguageService.langue_en_cours
                );

              this.tab_req_cloturee[index].RE_LIBELLEETAPE_TRANSLATE =
                this.Translate(
                  this.tab_req_cloturee[index].RE_LIBELLEETAPE,
                  this.LanguageService.langue_en_cours
                );
            }
            // traduction

            // initialisation de l'affichage sur les requetes enregistrée
            this.tab_req_afficher = [];

            if (this.btn_filter == 'enrg') {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_enregistree[index]);
              }
            } else if (this.btn_filter == 'trai') {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_en_cours_trait[index]);
              }
            } else {
              for (
                let index = 0;
                index < this.tab_req_enregistree.length;
                index++
              ) {
                this.tab_req_afficher.push(this.tab_req_cloturee[index]);
              }
            }

            this.afficher_tri = true;
          } else {
            this.toastr.info(
              this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
              'info',
              { positionClass: 'toast-bottom-left' }
            );
            this.statutliste = false;
            this.afficher_tri = false;
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.statutliste = false;
          this.afficher_tri = false;
          this.toastr.warning(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }

    console.log('table_des_requetes', this.tab_req_afficher);
  }

  ListeRequeteold() {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
    var body = {};
    if (this.recupinfo[0].CU_NOMUTILISATEUR.includes('ADMIN')) {
      body = {
        Objets: [
          {
            OE_PARAM: ['01'],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
    } else {
      body = {
        Objets: [
          {
            OE_PARAM: ['01', this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          },
        ],
      };
    }

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeRetourRequete = success;
        this.ListeRetourRequete =
          this.ListeRetourRequete.pvgListeReqrequeteResult;
        this.AdminService.CloseLoader();
        if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.statutliste = true;

          this.tab_req_enregistree = [];
          this.tab_req_en_cours_trait = [];
          this.tab_req_cloturee = [];
          for (let index = 0; index < this.ListeRetourRequete.length; index++) {
            if (
              this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                '01/01/1900'
            ) {
              this.tab_req_enregistree.push(this.ListeRetourRequete[index]);
            }

            if (
              this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                '01/01/1900'
            ) {
              this.tab_req_en_cours_trait.push(this.ListeRetourRequete[index]);
            }

            if (
              this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE !=
                '01/01/1900'
            ) {
              this.tab_req_cloturee.push(this.ListeRetourRequete[index]);
            }
          }

          // initialisation des boutons de tri des requetes
          this.var_checked_enrg = 'checked';
          this.var_checked_trai = '';
          this.var_checked_clo = '';

          // initialisation de l'affichage sur les requetes enregistrée
          this.tab_req_afficher = [];
          for (
            let index = 0;
            index < this.tab_req_enregistree.length;
            index++
          ) {
            this.tab_req_afficher.push(this.tab_req_enregistree[index]);
          }
        } else {
          this.toastr.info(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'info',
            { positionClass: 'toast-bottom-left' }
          );
          this.statutliste = false;
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.statutliste = false;
        this.toastr.warning(
          this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  ClotureRequetePrincipale() {
    this.AdminService.ShowLoader();
    $('#addNewAddressClotureDefinitive').modal('hide');

    /* var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
    var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
    let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
    //objet d'envoi
    let body = {
      Objets: [
        {
          AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE,
          RQ_CODEREQUETE: recuperation.RQ_CODEREQUETE,
          RQ_OBSERVATIONAGENTTRAITEMENTREQUETE: this.ObservationsCloture,
          CU_CODECOMPTEUTULISATEUR: recuperation.CU_CODECOMPTEUTULISATEUR,
          RQ_DATECLOTUREREQUETE: date,
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '6',
          },
        },
      ],
    };

    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_enregistrement_traitement = success;
        this.tab_enregistrement_traitement =
          this.tab_enregistrement_traitement.pvgMajReqrequeteResult;
        this.AdminService.CloseLoader();
        if (
          this.tab_enregistrement_traitement.clsResultat.SL_RESULTAT == 'FALSE'
        ) {
          $('#addNewAddressClotureDefinitive').modal('show');
          //this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
          this.toastr.error(
            this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
        } else {
          // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
          this.toastr.success(
            this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
            'success',
            { positionClass: 'toast-bottom-left' }
          );
          this.ObservationsCloture = '';
          this.ListeRequeteBis();
          this.NotifierLesOperateursTraitants(recuperation.RQ_CODEREQUETE);
          $('#addNewAddressClotureDefinitive').modal('hide');
        }
      },
      (error: any) => {
        $('#addNewAddressClotureDefinitive').modal('show');
        this.AdminService.CloseLoader();
        // this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
        this.toastr.warning(
          this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  NotifierLesOperateursTraitants(RQ_CODEREQUETE: any) {
    let Option =
      'RequeteClientsClasse.svc/pvgChargerDansDataSetParOperateursNotif';
    let body = {
      Objets: [
        {
          OE_PARAM: [RQ_CODEREQUETE],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    // this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe((success: any) => {
      this.ListeRetourRequete = success;
      this.ListeRetourRequete =
        this.ListeRetourRequete.pvgChargerDansDataSetParOperateursNotifResult;
      // this.AdminService.CloseLoader();
    });
  }

  AnnulationClotureRequetePrincipale() {
    this.AdminService.ShowLoader();
    $('#addNewAddressAnnulationClotureDefinitive').modal('hide');

    /*var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
    var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
    let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
    //objet d'envoi
    let body = {
      Objets: [
        {
          AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE,
          RQ_OBSERVATIONAGENTTRAITEMENTREQUETE: this.ObservationsCloture,
          CU_CODECOMPTEUTULISATEUR: recuperation.CU_CODECOMPTEUTULISATEUR,
          RQ_CODEREQUETE: recuperation.RQ_CODEREQUETE,
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '7',
          },
        },
      ],
    };

    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_enregistrement_traitement = success;
        this.tab_enregistrement_traitement =
          this.tab_enregistrement_traitement.pvgMajReqrequeteResult;
        this.AdminService.CloseLoader();
        if (
          this.tab_enregistrement_traitement.clsResultat.SL_RESULTAT == 'FALSE'
        ) {
          $('#addNewAddressAnnulationClotureDefinitive').modal('show');
          //this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
          this.toastr.error(
            this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
        } else {
          // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
          this.ObservationsCloture = '';
          this.ListeRequeteBis();
          this.toastr.success(
            this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
            'success',
            { positionClass: 'toast-bottom-left' }
          );
          // $('#addNewAddressAnnulationClotureDefinitive').modal('hide');
        }
      },
      (error: any) => {
        $('#addNewAddressAnnulationClotureDefinitive').modal('show');
        this.AdminService.CloseLoader();
        // this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
        this.toastr.warning(
          this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  TransmissionTribunal() {
    this.AdminService.ShowLoader();
    $('#transmissionauntribunal').modal('hide');

    /*var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
    var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
    let Options = 'RequeteClientsClasse.svc/pvgMajReqrequeteContentieux';
    //objet d'envoi
    let body = {
      Objets: [
        {
          CU_CODECOMPTEUTULISATEUR: this.recupValEtape.CU_CODECOMPTEUTULISATEUR,
          CT_CODEREQUETECONTENTIEUX: '',
          CT_DATECLOTURECONTENTIEUX: '01/01/1900',
          CT_DATEOUVERTURECONTENTIEUX: date,
          CT_MONTANTCONTENTIEUXEXTIME:
            this.modal_transmission_tribunal[1].valeur.replaceAll(' ', ''),
          CT_MONTANTCONTENTIEUXREEL:
            this.modal_transmission_tribunal[1].valeur.replaceAll(' ', ''),
          CT_OBSERVATION1: this.modal_transmission_tribunal[0].valeur,
          CT_OBSERVATION2: this.modal_transmission_tribunal[0].valeur,
          FICHIERSJOINT: '',
          RQ_CODEREQUETE: this.recupValEtape.RQ_CODEREQUETE,
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: recuperation.CU_CODECOMPTEUTULISATEUR,
            TYPEOPERATION: '0',
          },
        },
      ],
    };

    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_transmission_tribunal = success;
        this.tab_transmission_tribunal =
          this.tab_transmission_tribunal.pvgMajReqrequeteContentieuxResult;

        if (this.tab_transmission_tribunal.clsResultat.SL_RESULTAT == 'FALSE') {
          this.AdminService.CloseLoader();
          $('#transmissionauntribunal').modal('show');
          this.toastr.error(
            this.tab_transmission_tribunal.clsResultat.SL_MESSAGE,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
        } else {
          if (
            this.base64Image == '' ||
            this.base64Image == undefined ||
            this.base64Image == null
          ) {
            this.AdminService.CloseLoader();
            this.modal_transmission_tribunal[0].valeur = '';
            this.modal_transmission_tribunal[1].valeur = '';
            // $('#transmissionauntribunal').modal('hide');
            this.toastr.success(
              this.tab_transmission_tribunal.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
            this.ListeRequeteBis();
          } else {
            this.ListeContentieux('T');
          }
        }
      },
      (error: any) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_transmission_tribunal.clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  ListeContentieux(btn: any) {
    /* var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
    var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
    let Options = 'RequeteClientsClasse.svc/pvgListeReqrequeteContentieux'; // le chemin d'appel du service web
    //objet d'envoi
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };

    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_liste_contentieux = success;
        this.tab_liste_contentieux =
          this.tab_liste_contentieux.pvgListeReqrequeteContentieuxResult;

        if (this.tab_liste_contentieux[0].clsResultat.SL_RESULTAT == 'FALSE') {
          this.AdminService.CloseLoader();
          $('#transmissionauntribunal').modal('show');
          // Clôture impossible. Vous devez d'abord transmettre la requête à un tribunal
          this.toastr.error(
            this.LanguageService.tribunal_message_clo,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
        } else {
          if (btn == 'T') {
            for (
              let index = 0;
              index < this.tab_liste_contentieux.length;
              index++
            ) {
              if (
                this.tab_liste_contentieux[index].RQ_CODEREQUETE ==
                this.recupValEtape.RQ_CODEREQUETE
              ) {
                this.SaveRapportProcedure(
                  this.tab_liste_contentieux[index].CT_CODEREQUETECONTENTIEUX,
                  'T'
                );
                break;
              }
            }
          } else {
            let code_existe = false;
            this.tab_liste_contentieux.forEach((element: any) => {
              if (
                element.RQ_CODEREQUETE === this.recupValEtape.RQ_CODEREQUETE
              ) {
                this.code_contentieux = element.CT_CODEREQUETECONTENTIEUX;
                $('#clotureprocedurejudiciaire').modal('show');

                code_existe = true;
              }
            });

            // Si le code n'existe pas, envoyer un message
            if (!code_existe) {
              this.AdminService.CloseLoader();
              this.toastr.error(
                this.LanguageService.tribunal_message_clo,
                'error',
                { positionClass: 'toast-bottom-left' }
              );
            }
          }
        }
      },
      (error: any) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_liste_contentieux.clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  ClotureProcedure(code_contentieux: any) {
    this.AdminService.ShowLoader();
    $('#clotureprocedurejudiciaire').modal('hide');

    /*var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }*/

    var d = new Date();
    var jour = d.getDate();
    var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
    var annee = d.getFullYear();

    // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
    var date =
      (jour < 10 ? '0' + jour : jour) +
      '-' +
      (mois < 10 ? '0' + mois : mois) +
      '-' +
      annee;
    var recuperation = JSON.parse(sessionStorage.getItem('infoReque') || '');
    let Options = 'RequeteClientsClasse.svc/pvgMajReqrequeteContentieux'; // le chemin d'appel du service web
    //objet d'envoi
    let body = {
      Objets: [
        {
          CU_CODECOMPTEUTULISATEUR: this.recupValEtape.CU_CODECOMPTEUTULISATEUR,
          CT_CODEREQUETECONTENTIEUX: code_contentieux,
          CT_DATECLOTURECONTENTIEUX: date,
          CT_DATEOUVERTURECONTENTIEUX: '01/01/1900',
          CT_MONTANTCONTENTIEUXEXTIME:
            this.modal_cloture_procedure[1].valeur.replaceAll(' ', ''),
          CT_MONTANTCONTENTIEUXREEL:
            this.modal_cloture_procedure[1].valeur.replaceAll(' ', ''),
          CT_OBSERVATION1: this.modal_cloture_procedure[0].valeur,
          CT_OBSERVATION2: this.modal_cloture_procedure[0].valeur,
          FICHIERSJOINT: '',
          RQ_CODEREQUETE: this.recupValEtape.RQ_CODEREQUETE,
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '3',
          },
        },
      ],
    };

    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_cloture_procedure = success;
        this.tab_cloture_procedure =
          this.tab_cloture_procedure.pvgMajReqrequeteContentieuxResult;

        if (this.tab_cloture_procedure.clsResultat.SL_RESULTAT == 'FALSE') {
          this.AdminService.CloseLoader();
          $('#clotureprocedurejudiciaire').modal('show');
          this.toastr.error(
            this.tab_cloture_procedure.clsResultat.SL_MESSAGE,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
        } else {
          if (
            this.base64Image == '' ||
            this.base64Image == undefined ||
            this.base64Image == null
          ) {
            this.AdminService.CloseLoader();
            this.toastr.success(
              this.tab_cloture_procedure.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
            this.modal_cloture_procedure[0].valeur = '';
            this.modal_cloture_procedure[1].valeur = '';
            $('#clotureprocedurejudiciaire').modal('hide');
            this.ListeRequeteBis();
          } else {
            this.SaveRapportProcedure('', 'C');
          }
        }
      },
      (error: any) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_cloture_procedure.clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  //RE_ACTIF
  testStatusetape(index: any) {
    var choixetp = true;
    this.ListeComboEtapes[index].RE_ACTIF == 'O'
      ? (this.ListeComboEtapes[index].RE_ACTIF = 'N')
      : (this.ListeComboEtapes[index].RE_ACTIF = 'O');
    for (var i = 0; i < this.ListeComboEtapes.length; i++) {
      if (this.ListeComboEtapes[i].RE_ACTIF == 'N') {
        choixetp = false;
        break;
      }
    }
    choixetp == true ? (this.cloture = true) : (this.cloture = false);
  }

  AuthorizationCustomerInformation() {
    this.valeur_authorization =
      this.recupValEtape.AT_ACTIF == 'O'
        ? (this.recupValEtape.AT_ACTIF = 'N')
        : (this.recupValEtape.AT_ACTIF = 'O');
  }

  // procedure qui permet de filter les requetes selon le statut
  OnChecked(bouton: any) {
    this.tab_req_afficher = [];
    // initialisation des boutons de tri des requetes
    this.var_checked_enrg = '';
    this.var_checked_trai = '';
    this.var_checked_clo = '';
    this.btn_filter = bouton;

    if (bouton == 'enrg') {
      this.var_checked_enrg = 'checked';
      for (let index = 0; index < this.tab_req_enregistree.length; index++) {
        this.tab_req_afficher.push(this.tab_req_enregistree[index]);
      }

      /* for (let index = 0; index < this.tab_req_afficher.length; index++) {
        // verifier la langue en cours
        this.tab_req_afficher[index].TR_LIBELLETYEREQUETE = this.Translate(
          this.tab_req_afficher[index].TR_LIBELLETYEREQUETE,
          this.LanguageService.langue_en_cours
        );
      } */
    } else if (bouton == 'trai') {
      this.var_checked_trai = 'checked';
      for (let index = 0; index < this.tab_req_en_cours_trait.length; index++) {
        this.tab_req_afficher.push(this.tab_req_en_cours_trait[index]);
      }
    } else {
      this.var_checked_clo = 'checked';
      for (let index = 0; index < this.tab_req_cloturee.length; index++) {
        this.tab_req_afficher.push(this.tab_req_cloturee[index]);
      }

      // modifie la couleur de la carte si elle a un avis favorable de la par du client
      setTimeout(() => {
        for (let index = 0; index < this.tab_req_afficher.length; index++) {
          if (this.tab_req_afficher[index].NS_CODENIVEAUSATISFACTION == '001') {
            $(`#card${index}`).css('background-color', '#b7e4c7');
          } else if (
            this.tab_req_afficher[index].NS_CODENIVEAUSATISFACTION == '002'
          ) {
            $(`#card${index}`).css('background-color', '#ffccd5');
          }
        }
      }, 1000);
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

  RechercherSelonEcran(elem: any) {
    if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0002') {
    }

    if (this.recupinfo[0].TU_CODETYPEUTILISATEUR != '0002') {
      if (this.statutFrmulaire == 'ENREGISTREMENT') {
        this.listeClients(elem);
      } else {
      }
    }
  }

  listeClients(elem: any) {
    let Option =
      'RequeteClientsClasse.svc/pvgListeUtilisateursRechercheParAgence';

    if (
      elem == 'code' &&
      (this.SearchValueCode == '' || this.SearchValueCode == undefined)
    ) {
      this.toastr.error('Veuillez renseigner un code', 'error', {
        positionClass: 'toast-bottom-left',
      });
    } else if (
      elem == 'telephone' &&
      (this.SearchValuePhone == '' || this.SearchValuePhone == undefined)
    ) {
      this.toastr.error('Veuillez renseigner un numéro de téléphone', 'error', {
        positionClass: 'toast-bottom-left',
      });
    } else {
      let body;
      var CodeAgenceUtilisateur =
        this.recupinfo[0].CU_CODECOMPTEUTULISATEUR.substring(0, 4);
      if (elem == 'telephone') {
        // dans le cas d'une recherche avec numero de telephone
        body = {
          Objets: [
            {
              OE_PARAM: [
                '0002',
                '',
                this.SearchValuePhone,
                CodeAgenceUtilisateur,
                '01',
              ],
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '01',
              },
            },
          ],
        };
      } else {
        // dans le cas d'une recherche avec code client
        body = {
          Objets: [
            {
              OE_PARAM: [
                '0002',
                this.SearchValueCode,
                '',
                CodeAgenceUtilisateur,
                '01',
              ],
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '01',
              },
            },
          ],
        };
      }

      // $(".datatables-basic").DataTable().destroy();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeClients = success;
          this.ListeClients =
            this.ListeClients.pvgListeUtilisateursRechercheParAgenceResult;
          if (this.ListeClients[0].clsResultat.SL_RESULTAT == 'TRUE') {
            var agenceOp = this.recupinfo[0].CU_CODECOMPTEUTULISATEUR.substring(
              0,
              4
            );
            this.AdminService.CloseLoader();
            if (this.ListeClients[0].AG_CODEAGENCE == agenceOp) {
              this.toastr.success(
                this.ListeClients[0].clsResultat.SL_MESSAGE,
                'success',
                { positionClass: 'toast-bottom-left' }
              );
              this.statutClientExiste = false;
            } else {
              this.toastr.error(
                "Operation impossbile ce client n'appartient pas à votre agence !!!",
                'error',
                { positionClass: 'toast-bottom-left' }
              );
            }
          } else {
            this.AdminService.CloseLoader();
            this.toastr.error(
              this.ListeClients[0].clsResultat.SL_MESSAGE,
              'error',
              { positionClass: 'toast-bottom-left' }
            );
            this.statutClientExiste = true;
          }
        },
        (error) => {
          this.AdminService.CloseLoader();
          this.toastr.warning(
            this.ListeClients[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
          this.statutClientExiste = true;
        }
      );
    }
  }

  generateLoginAndPassword() {
    const nomPrenoms = this.formulaire_plaintes_reclamations[1].valeur;
    const login = this.generateLogin(nomPrenoms);
    const motDePasse = this.generatePassword();

    this.formulaire_plaintes_reclamations[11].valeur = login;
    this.formulaire_plaintes_reclamations[12].valeur = motDePasse;
  }

  generateLogin(nomPrenoms: string): string {
    const login = nomPrenoms.toLowerCase().replace(/[^a-z0-9]/g, '');
    return login;
  }

  generatePassword(): string {
    const length = 8;
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  recupListeConsult(info: any) {
    this.statutTraitement = false;

    sessionStorage.setItem('infoReque', JSON.stringify(info));
    this.recupValEtape = info;
    if (
      info.CU_CODECOMPTEUTULISATEUR != '' &&
      info.CU_CODECOMPTEUTULISATEURAGENTENCHARGE != ''
    ) {
      this.formulaire_attr_reclamations[0].valeur =
        info.CU_CODECOMPTEUTULISATEURAGENTENCHARGE;
    } else {
      this.formulaire_attr_reclamations[0].valeur =
        info.CU_CODECOMPTEUTULISATEUR;
    }

    this.recupEtape = {};
    this.option_body = document.getElementById('idColor');
    for (let index = 0; index < this.ListeComboEtapes.length; index++) {
      this.option_body.style.backgroundColor = '';
    }

    this.ngOnInit();
  }

  recupListeCloture(info: any) {
    sessionStorage.setItem('infoReque', JSON.stringify(info));
    this.recupValEtape = info;
    this.ComboEtapeParamSimple();
  }

  recup_elem_tribunal(info: any, btn: any) {
    sessionStorage.setItem('infoReque', JSON.stringify(info));
    this.recupValEtape = info;

    if (btn == 'C') this.ListeContentieux('C');
    if (btn == 'T') $('#transmissionauntribunal').modal('show');
  }

  recupListe(info: any) {
    this.btn_etape = false;
    sessionStorage.setItem('infoReque', JSON.stringify(info));
    this.ComboReqrequeteselonEtape(info.RQ_CODEREQUETE);
    this.recupValEtape = info;
    console.log('recupValEtape', this.recupValEtape);
    if (
      info.CU_CODECOMPTEUTULISATEUR != '' &&
      info.CU_CODECOMPTEUTULISATEURAGENTENCHARGE != ''
    ) {
      this.formulaire_attr_reclamations[0].valeur =
        info.CU_CODECOMPTEUTULISATEURAGENTENCHARGE;
    } else {
      this.formulaire_attr_reclamations[0].valeur =
        info.CU_CODECOMPTEUTULISATEUR;
    }
    // this.ComboEtapeParamSimple()
    this.ListeComboParOperateur = [];
    var agenceReq = this.recupValEtape.CU_CODECOMPTEUTULISATEUR.substring(0, 4);
    var agenceOp = '';
    for (var i = 0; i < this.ListeComboOperateur.length; i++) {
      agenceOp = this.ListeComboOperateur[i].CU_CODECOMPTEUTULISATEUR.substring(
        0,
        4
      );
      if (agenceReq == agenceOp) {
        this.ListeComboParOperateur.push(this.ListeComboOperateur[i]);
      }
    }
    /* if (info.RQ_NOMRAPPORT != '') this.consultation_doc_req = true;
    else this.consultation_doc_req = false; */
    for (let index = 0; index < this.formulaire_avis.length; index++) {
      this.formulaire_avis[index].valeur = '';
    }

    this.statutDateDebut = true; // remettre les champs date par defaut
    this.statutDatefin = true; // remettre les champs date par defaut
    this.formulaire_avis[2].obligatoire = 'O';
    this.formulaire_avis[3].obligatoire = 'O';

    this.ngOnInit();
  }

  ListeConsultationHistorique(list_step: any) {
    var Option = '';
    var body = {};

    Option = 'RequeteClientsClasse.svc/pvgChargerDansDataSetListeHistorique';
    body = {
      Objets: [
        {
          OE_PARAM: [
            this.recupinfo[0].AG_CODEAGENCE,
            this.recupValEtape.RQ_CODEREQUETE,
          ],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };

    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeRetourRequete = success;
        this.ListeRetourRequete =
          this.ListeRetourRequete.pvgListeReqrequeteResult;

        if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.tab_req_enregistree_historique = [];
          this.tab_req_en_cours_trait_historique = [];
          this.tab_req_cloturee_historique = [];
          for (let index = 0; index < this.ListeRetourRequete.length; index++) {
            if (
              this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE ==
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                '01/01/1900'
            ) {
              this.tab_req_enregistree_historique.push(
                this.ListeRetourRequete[index]
              );
            }

            if (
              this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE ==
                '01/01/1900'
            ) {
              this.tab_req_en_cours_trait_historique.push(
                this.ListeRetourRequete[index]
              );
            }

            if (
              this.ListeRetourRequete[index].RQ_DATESAISIEREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATEDEBUTTRAITEMENTREQUETE !=
                '01/01/1900' &&
              this.ListeRetourRequete[index].RQ_DATECLOTUREREQUETE !=
                '01/01/1900'
            ) {
              this.tab_req_cloturee_historique.push(
                this.ListeRetourRequete[index]
              );
            }
          }
          console.log(
            'tab_req_enregistree_historique',
            this.tab_req_enregistree_historique
          );
          console.log(
            'tab_req_en_cours_trait_historique',
            this.tab_req_en_cours_trait_historique
          );
          console.log(
            'tab_req_cloturee_historique',
            this.tab_req_cloturee_historique
          );

          this.statutTraitement = false;

          this.tab_req_afficher_historique = [];
          if (list_step == 'cloture') {
            this.tab_req_afficher_historique.push(
              this.tab_req_cloturee_historique
            );
          }

          for (let i = 0; i < this.tab_req_afficher_historique.length; i++) {
            if (
              this.recupEtape.RE_CODEETAPE ==
              this.tab_req_afficher_historique[i].RE_CODEETAPE
            ) {
              this.voirlist = this.tab_req_afficher_historique[i];
              console.log('voirlist_doc', this.voirlist);
              this.statutTraitement = true;

              //  traitement des dates pour retirer l'heure
              var received =
                this.voirlist.AT_DATEDEBUTTRAITEMENTETAPE.split(':')[0];
              this.voirlist.AT_DATEDEBUTTRAITEMENTETAPE = received.substr(
                0,
                10
              );

              var received = this.voirlist.RQ_DATESAISIE.split(':')[0];
              this.voirlist.RQ_DATESAISIE = received.substr(0, 10);

              break;
            }
          }
        } else {
          this.toastr.info(
            this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
            'info',
            { positionClass: 'toast-bottom-left' }
          );
          this.statutliste = false;
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.statutliste = false;
        this.toastr.warning(
          this.ListeRetourRequete[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );

    console.log('table_des_requetes', this.tab_req_afficher);
  }

  ComboReqrequeteselonEtape(info_code_req: any) {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteEtapeparRequete';
    let body = {
      Objets: [
        {
          OE_PARAM: [info_code_req],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeComboEtapeSelonReq = success;
        this.ListeComboEtapeSelonReq =
          this.ListeComboEtapeSelonReq.pvgListeReqrequeteEtapeparRequeteResult;

        console.log(
          'this.ListeComboEtapeSelonReq',
          this.ListeComboEtapeSelonReq
        );

        this.var_off_on = 'N';
        if (this.ListeComboEtapeSelonReq[0].clsResultat.SL_RESULTAT == 'TRUE') {
          for (let i = 0; i < this.ListeComboEtapeSelonReq.length; i++) {
            for (let j = 0; j < this.ListeComboEtapes.length; j++) {
              if (
                this.ListeComboEtapeSelonReq[i].RE_CODEETAPE ==
                  this.ListeComboEtapes[j].RE_CODEETAPE &&
                this.ListeComboEtapeSelonReq[i].AT_DATECLOTUREETAPE ==
                  '01/01/1900'
              ) {
                this.ListeComboEtapes[j].RE_ACTIF = 'N';
              }
            }
          }

          for (
            let index = 0;
            index < this.ListeComboEtapeSelonReq.length;
            index++
          ) {
            if (
              this.ListeComboEtapeSelonReq[index].RQ_CODEREQUETE ==
              this.recupValEtape.RQ_CODEREQUETE
            ) {
              this.var_off_on = this.ListeComboEtapeSelonReq[index].AT_ACTIF;
              break;
            }
          }
        } else {
          for (let j = 0; j < this.ListeComboEtapes.length; j++) {
            this.ListeComboEtapes[j].RE_ACTIF = 'O';
          }
        }

        // this.GetFilesRequete(info_code_req);
      },
      (error) => {}
    );
  }

  GetFilesRequete(info_code_req: any, code_contentieux: any) {
    if (code_contentieux == undefined || code_contentieux == null) {
      code_contentieux = '';
    }
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteDoc';
    let body = {
      Objets: [
        {
          OE_PARAM: [info_code_req, code_contentieux],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_data_doc = success;
        this.tab_data_doc = this.tab_data_doc.pvgListeReqrequeteDocResult;

        console.log('this.tab_data_doc', this.tab_data_doc);

        this.consultation_doc_req = false;
        this.consultation_doc_cont = false;

        for (let index = 0; index < this.tab_data_doc.length; index++) {
          if (this.tab_data_doc[index].clsDocumentAssociesALaRequetes != null) {
            this.consultation_doc_req = true;
            this.tab_doc_show_req = [];
            for (
              let index2 = 0;
              index2 <
              this.tab_data_doc[index].clsDocumentAssociesALaRequetes.length;
              index2++
            ) {
              this.tab_doc_show_req.push(
                this.tab_data_doc[index].clsDocumentAssociesALaRequetes[index2]
                  .RQ_NOMRAPPORT
              );
            }
          }

          if (
            this.tab_data_doc[index].clsDocumentAssociesAuContentieux != null
          ) {
            this.consultation_doc_cont = true;
            this.tab_doc_show_cont = [];
            for (
              let index3 = 0;
              index3 <
              this.tab_data_doc[index].clsDocumentAssociesAuContentieux.length;
              index3++
            ) {
              this.tab_doc_show_cont.push(
                this.tab_data_doc[index].clsDocumentAssociesAuContentieux[
                  index3
                ].FICHIERSJOINT
              );
            }
          }
        }

        setTimeout(() => {
          $('#offcanvasEndInfoClient').offcanvas('show');
        }, 1000);
        console.log('this.tab_infos_client', this.tab_infos_client);
      },
      (error) => {
        this.consultation_doc_req = false;
        this.consultation_doc_cont = false;
      }
    );
  }

  checkStatusForm(infoEcran: any, type_user: any) {
    this.phone_or_code = false;
    if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0001')
      this.statutClientExiste = true;
    this.ListeClients = [];
    this.SearchValueCode = '';
    this.SearchValuePhone = '';

    if (type_user == 'simple') {
      this.search_bar = true;
    } else {
      this.search_bar = false;
    }

    if (infoEcran == 'Liste') {
      this.statutFrmulaire = 'LISTE';
      this.SearchValue = '';
      this.afficher_tri = false;
      this.ListeRequete();
    } else {
      this.statutFrmulaire = 'ENREGISTREMENT';
      this.SearchValue = '';
    }
  }

  viderChamp() {
    this.formulaire_plaintes_reclamations[0].valeur = '';
    this.formulaire_plaintes_reclamations[1].valeur = '';
    this.formulaire_plaintes_reclamations[2].valeur = '';
    this.formulaire_plaintes_reclamations[3].valeur = '';
    this.formulaire_plaintes_reclamations[4].valeur = '';
    this.formulaire_plaintes_reclamations[5].valeur = '';
    this.formulaire_plaintes_reclamations[6].valeur = '';
    this.formulaire_plaintes_reclamations[7].valeur = '';
    this.formulaire_plaintes_reclamations[8].valeur =
      this.recupinfo[0].CU_NOMUTILISATEUR;
    this.formulaire_plaintes_reclamations[9].valeur = '';
    this.formulaire_plaintes_reclamations[10].valeur = '';
    this.formulaire_plaintes_reclamations[11].valeur = '';
    this.formulaire_plaintes_reclamations[12].valeur = '';
  }

  viderChampAff() {
    this.formulaire_attr_reclamations[0].valeur = '';
    this.formulaire_attr_reclamations[1].valeur = '';
    this.formulaire_attr_reclamations[2].valeur = '';
    this.formulaire_attr_reclamations[3].valeur = '';
    $('#addNewAddress').modal('hide');
  }

  CheckWordCount() {
    this.formulaire_avis[1].valeur = this.formulaire_avis[1].valeur.trim();

    const words = this.formulaire_avis[1].valeur.split(' ');
    this.long_sentence = false;
    if (words.length > this.maxWords) {
      // this.formulaire_avis[1].valeur = words.slice(0, 30).join(' ');
      this.long_sentence = true;
      this.toastr.error(
        `Vous avez saisi trop de mots. Veuillez limiter votre saisie à ${this.maxWords} mots.`,
        'error',
        { positionClass: 'toast-bottom-left' }
      );
    }
  }

  ListeContentieuxPourDoc(req_item: any) {
    this.recupValEtape = req_item;
    let Options = 'RequeteClientsClasse.svc/pvgListeReqrequeteContentieux';

    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };

    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_liste_contentieux_pour_doc = success;
        this.tab_liste_contentieux_pour_doc =
          this.tab_liste_contentieux_pour_doc.pvgListeReqrequeteContentieuxResult;
        this.AdminService.CloseLoader();
        if (
          this.tab_liste_contentieux_pour_doc[0].clsResultat.SL_RESULTAT ==
          'TRUE'
        ) {
          for (
            let index = 0;
            index < this.tab_liste_contentieux_pour_doc.length;
            index++
          ) {
            if (
              this.tab_liste_contentieux_pour_doc[index].RQ_CODEREQUETE ==
              req_item.RQ_CODEREQUETE
            ) {
              this.le_code_contentieux =
                this.tab_liste_contentieux_pour_doc[
                  index
                ].CT_CODEREQUETECONTENTIEUX;
              break;
            }
          }
        }

        this.GetInfoClient(req_item);
      },
      (error: any) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.tab_liste_contentieux.clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  GetInfoClient(req_item: any) {
    let Option = 'RequeteClientsClasse.svc/pvgInfosDuClient';
    let body = {
      Objets: [
        {
          OE_PARAM: [
            req_item.CU_CODECOMPTEUTULISATEUR,
            req_item.CU_CODECOMPTEUTULISATEURASSOCIER,
          ],
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.statut_info_utilisateur = true;
        this.tab_infos_client = success;
        this.tab_infos_client = this.tab_infos_client.pvgInfosDuClientResult;

        this.GetFilesRequete(req_item.RQ_CODEREQUETE, this.le_code_contentieux);
      },
      (error) => {}
    );
  }

  FilterTicket(num_ticket: any) {
    this.tab_req_afficher = [];

    if (num_ticket == '') {
      if (this.btn_filter == 'enrg') {
        for (let index = 0; index < this.tab_req_enregistree.length; index++) {
          this.tab_req_afficher.push(this.tab_req_enregistree[index]);
        }
      } else if (this.btn_filter == 'trai') {
        for (
          let index = 0;
          index < this.tab_req_en_cours_trait.length;
          index++
        ) {
          this.tab_req_afficher.push(this.tab_req_en_cours_trait[index]);
        }
      } else {
        for (let index = 0; index < this.tab_req_cloturee.length; index++) {
          this.tab_req_afficher.push(this.tab_req_cloturee[index]);
        }
      }
    } else {
      if (this.btn_filter == 'enrg') {
        for (let index = 0; index < this.tab_req_enregistree.length; index++) {
          if (num_ticket == this.tab_req_enregistree[index].RQ_CODEREQUETE) {
            this.tab_req_afficher.push(this.tab_req_enregistree[index]);
          }
        }
        this.SearchValue = '';
      } else if (this.btn_filter == 'trai') {
        for (
          let index = 0;
          index < this.tab_req_en_cours_trait.length;
          index++
        ) {
          if (num_ticket == this.tab_req_en_cours_trait[index].RQ_CODEREQUETE) {
            this.tab_req_afficher.push(this.tab_req_en_cours_trait[index]);
          }
        }
        this.SearchValue = '';
      } else {
        for (let index = 0; index < this.tab_req_cloturee.length; index++) {
          if (num_ticket == this.tab_req_cloturee[index].RQ_CODEREQUETE) {
            this.tab_req_afficher.push(this.tab_req_cloturee[index]);
          }
        }
        this.SearchValue = '';
      }
    }
  }

  ConsulterPJ(doc_show: any) {
    window.open(`${this.recupValEtape.RQ_LIENRAPPORT}${doc_show}`, '_blank');
  }

  // Fonction à exécuter lorsque la variable change
  ObserveChangeForTranslate(): void {
    // traduction :: traduction de chaque bloc de la liste de reclamation
    for (let index = 0; index < this.tab_req_enregistree.length; index++) {
      // verifier la langue en cours
      this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE_TRANSLATE =
        this.Translate(
          this.tab_req_enregistree[index].TR_LIBELLETYEREQUETE,
          this.LanguageService.langue_en_cours
        );

      this.tab_req_enregistree[index].RE_LIBELLEETAPE_TRANSLATE =
        this.Translate(
          this.tab_req_enregistree[index].RE_LIBELLEETAPE,
          this.LanguageService.langue_en_cours
        );
    }

    for (let index = 0; index < this.tab_req_en_cours_trait.length; index++) {
      // verifier la langue en cours
      this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE_TRANSLATE =
        this.Translate(
          this.tab_req_en_cours_trait[index].TR_LIBELLETYEREQUETE,
          this.LanguageService.langue_en_cours
        );

      this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE_TRANSLATE =
        this.Translate(
          this.tab_req_en_cours_trait[index].RE_LIBELLEETAPE,
          this.LanguageService.langue_en_cours
        );
    }

    for (let index = 0; index < this.tab_req_cloturee.length; index++) {
      // verifier la langue en cours
      this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE_TRANSLATE =
        this.Translate(
          this.tab_req_cloturee[index].TR_LIBELLETYEREQUETE,
          this.LanguageService.langue_en_cours
        );

      this.tab_req_cloturee[index].RE_LIBELLEETAPE_TRANSLATE = this.Translate(
        this.tab_req_cloturee[index].RE_LIBELLEETAPE,
        this.LanguageService.langue_en_cours
      );
    }

    // traduction combo agence
    for (let index = 0; index < this.ListeComboAgence.length; index++) {
      this.ListeComboAgence[index].AG_RAISONSOCIAL_TRANSLATE = this.Translate(
        this.ListeComboAgence[index].AG_RAISONSOCIAL,
        this.LanguageService.langue_en_cours
      );
    }

    // traduction combo type de reclamation
    for (let index = 0; index < this.ListeTypeRequete_1.length; index++) {
      // verifier la langue en cours
      this.ListeTypeRequete_1[index].TR_LIBELLETYEREQUETE_TRANSLATE =
        this.Translate(
          this.ListeTypeRequete_1[index].TR_LIBELLETYEREQUETE,
          this.LanguageService.langue_en_cours
        );
    }

    // traduction du combo mode de collecte
    for (let index = 0; index < this.ListeComboModeCollecte.length; index++) {
      // verifier la langue en cours
      this.ListeComboModeCollecte[index].MC_LIBELLEMODECOLLETE_TRANSLATE =
        this.Translate(
          this.ListeComboModeCollecte[index].MC_LIBELLEMODECOLLETE,
          this.LanguageService.langue_en_cours
        );
    }

    // traduction
  }

  ngOnDestroy(): void {
    // Assurez-vous de vous désabonner pour éviter les fuites de mémoire
    this.maVariableSubscription?.unsubscribe();
  }

  RechercheAvecTouche1(e: any, elem: any) {
    // Vérifier si la touche pressée est Entrée
    if (e.key === 'Enter') {
      // Appeler la fonction lorsque la touche Entrée est pressée
      this.RechercherSelonEcran(elem);
    }
  }

  RechercheAvecTouche2(e: any) {
    // Vérifier si la touche pressée est Entrée
    if (e.key === 'Enter') {
      // Appeler la fonction lorsque la touche Entrée est pressée
      this.FilterTicket(this.SearchValue);
    }
  }

  RechercheAvecToucheAdmin1(e: any) {
    // Vérifier si la touche pressée est Entrée
    if (e.key === 'Enter') {
      // Appeler la fonction lorsque la touche Entrée est pressée
      this.FilterTicket(this.SearchValue);
    }
  }

  uploadFiles() {
    var fileInput = document.getElementById('fileInput');
    //@ts-ignore
    var files = fileInput.files;
    var formData = new FormData();

    // Ajouter chaque fichier à l'objet FormData
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('files[]', file);
      // formData.push(file);
    }
    console.log('formData', formData);
    return;

    // Envoyer les fichiers au serveur via une requête AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        alert('Fichiers téléchargés avec succès !');
      } else {
        alert('Une erreur est survenue lors du téléchargement des fichiers.');
      }
    };
    xhr.send(formData);
  }

  ChoixRecherche(elem: any) {
    this.SearchValueCode = '';
    this.SearchValuePhone = '';

    if (elem == 'phone') this.phone_or_code = true;
    else this.phone_or_code = false;
  }

  ngOnInit(): void {
    this.btn_etape = false;
    this.ComboAgence();
    this.formulaire_plaintes_reclamations[8].valeur =
      this.recupinfo[0].CU_NOMUTILISATEUR;

    if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0002') {
      this.statutClientExiste = false;
    }

    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
    setTimeout(() => {
      if (sessionStorage.getItem('langselect')) {
        var lg = sessionStorage.getItem('langselect') || '';
        this.LanguageService.changeLanguage(lg);
      }
    }, 1000);

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

    // Multiple Dropzone
    /* const previewTemplate = `<div class="dz-preview dz-file-preview">
      <div class="dz-details">
        <div class="dz-thumbnail">
          <img data-dz-thumbnail>
          <span class="dz-nopreview">No preview</span>
          <div class="dz-success-mark"></div>
          <div class="dz-error-mark"></div>
          <div class="dz-error-message"><span data-dz-errormessage></span></div>
          <div class="progress">
            <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
          </div>
        </div>
        <div class="dz-filename" data-dz-name></div>
        <div class="dz-size" data-dz-size></div>
      </div>
      </div>`;

    // --------------------------------------------------------------------
    const dropzoneMulti = document.querySelector('#dropzone-multi');
    if (dropzoneMulti) {
      const myDropzoneMulti = new Dropzone(dropzoneMulti, {
        previewTemplate: previewTemplate,
        parallelUploads: 1,
        maxFilesize: 5,
        addRemoveLinks: true,
      });
    } */
  }

  ngafterViewInit() {
    // Initialiser Dropzone
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone('#myDropzone', {
      url: '/upload', // URL où les fichiers seront envoyés
      uploadMultiple: true, // Autoriser le téléchargement de plusieurs fichiers
      parallelUploads: 2, // Nombre maximum de téléchargements parallèles
      maxFiles: 5, // Nombre maximum de fichiers autorisés
      acceptedFiles: '.jpg, .png, .pdf', // Types de fichiers autorisés
      dictDefaultMessage:
        'Cliquez ici ou faites glisser des fichiers pour les télécharger',
      // Ajoutez d'autres options de configuration selon vos besoins
    });

    // Gérer les événements Dropzone
    //@ts-ignore
    myDropzone.on('success', function (file, response) {
      console.log('Fichier téléchargé avec succès:', file, response);
      // Ajoutez ici le code pour traiter la réponse du serveur après le téléchargement réussi
    });
    //@ts-ignore
    myDropzone.on('error', function (file, message) {
      console.error('Erreur lors du téléchargement du fichier:', file, message);
      // Ajoutez ici le code pour gérer les erreurs de téléchargement
    });
  }
}
