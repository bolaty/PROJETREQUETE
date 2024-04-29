import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from 'src/app/services/language.service';

import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-suivi-requete',
  templateUrl: './suivi-requete.component.html',
  styleUrls: ['./suivi-requete.component.scss'],
})
export class SuiviRequeteComponent {
   LienServeur: any = 'http://localhost:22248/'; // lien dev
  // LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod • remuci
  //LienServeur: any = 'https://reclamationserveur.mgdigitalplus.com:1022/'; // lien test local • bly

  maVariableSubscription?: Subscription;

  recupinfo: any = '';
  recupinfoconnect: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  statutValreq: any = '';
  var_off_on: any = 'N';
  ListeComboStatut: any = [];
  files: any;
  formData: any;
  tab_infos_client: any = [];
  tab_enregistrement_traitement: any = [];
  ListeComboSatisfaction: any = [];
  recupEnregistrerFichier: any = [];
  ListeComboEtapeSelonReq: any = [];
  FormObjet: any;
  statutDocument: boolean = false;
  afficher_doc: boolean = false;
  base64Image: string = '';
  tab_service: any = [
    {
      CODESERVICE: '01',
      LIBELLE: 'INFORMATIQUE',
    },
    {
      CODESERVICE: '02',
      LIBELLE: 'COMMERCIAL',
    },
    {
      CODESERVICE: '03',
      LIBELLE: 'CAISSE',
    },
    {
      CODESERVICE: '03',
      LIBELLE: 'ADMINISTRATIF',
    },
  ];
  formulaire_suivi: any = [
    {
      id: 'offcanvasObjet',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'objet',
    },
    {
      id: 'offcanvaService',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'service',
    },
    {
      id: 'offCanvasStatut',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'statut',
    },
    {
      id: 'invoice-observation',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'observation',
    },
    {
      id: 'dropzone-multi-fichier',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'choix fichier',
    },
  ];
  formulaire_avis: any = [
    {
      id: 'offcanvaSatisfaction',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'satisfaction',
    },
    {
      id: 'invoice-observation-avis',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'observation',
    },
  ];

  constructor(
    public AdminService: AdminService,
    public LanguageService: LanguageService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  voirTraitement1() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    if (this.recupinfo.RQ_NOMRAPPORT != '') this.afficher_doc = true;
    else this.afficher_doc = false;
    $('#sendInvoiceOffcanvas').offcanvas('show');
  }

  voirTraitement() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    let Option = 'RequeteClientsClasse.svc/pvgInfosDuClient';
    let body = {
      Objets: [
        {
          OE_PARAM: [this.recupinfo.CU_CODECOMPTEUTULISATEUR],
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_infos_client = success;
        this.tab_infos_client = this.tab_infos_client.pvgInfosDuClientResult;

        console.log('this.tab_infos_client', this.tab_infos_client);
      },
      (error) => {}
    );
  }

  ComboStatut() {
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
        this.ListeComboStatut = success;
        this.ListeComboStatut =
          this.ListeComboStatut.pvgReqstatutrecevabiliteComboResult;

        this.TestEpateRequete();

        if (this.ListeComboStatut[0].clsResultat.SL_RESULTAT == 'TRUE') {
        } else {
        }
      },
      (error) => {}
    );
  }

  ComboSatisfaction() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    let Option = 'RequeteClientsClasse.svc/pvgReqniveausatisfactionCombo';
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
        this.ListeComboSatisfaction = success;
        this.ListeComboSatisfaction =
          this.ListeComboSatisfaction.pvgReqniveausatisfactionComboResult;
        this.ComboReqrequeteselonEtape(this.recupinfo.RQ_CODEREQUETE);
        console.log('this.ListeComboSatisfaction', this.ListeComboSatisfaction);
        if (this.ListeComboSatisfaction[0].clsResultat.SL_RESULTAT == 'TRUE') {
          // traduction combo satisfaction
          for (
            let index = 0;
            index < this.ListeComboSatisfaction.length;
            index++
          ) {
            this.ListeComboSatisfaction[
              index
            ].NS_LIBELLENIVEAUSATISFACTION_TRANSLATE = this.Translate(
              this.ListeComboSatisfaction[index].NS_LIBELLENIVEAUSATISFACTION,
              this.LanguageService.langue_en_cours
            );
          }
        } else {
        }
      },
      (error) => {}
    );
  }
  ConsultationTraitement(info: any): void {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    if (this.recupinfo.RQ_DATECLOTUREREQUETE != '01/01/1900') {
      $('#sendInvoiceOffcanvas2').offcanvas('show');
    } else {
      this.toastr.error(
        "Le traitement de la requete n'est pas encore terminé",
        'error',
        { positionClass: 'toast-bottom-left' }
      );
    }
  }

  TestEpateRequete() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    if (this.recupinfo.RQ_DATECLOTUREREQUETE == '01/01/1900') {
      this.statutValreq = 'En cours de traitement';
    } else {
      this.statutValreq = 'Cloturée';
    }

    this.ComboSatisfaction();
  }

  Valider(tableau_recu: any) {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }
      let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
      //objet d'envoi
      let body = {
        Objets: [
          {
            AC_CODEACTIONCORRECTIVE: '',
            CU_CODECOMPTEUTULISATEUR: this.recupinfo.CU_CODECOMPTEUTULISATEUR, // this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
            CU_CODECOMPTEUTULISATEURAGENTENCHARGE:
              this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE, //this.formulaire_suivi[8].valeur,
            MC_CODEMODECOLLETE: this.recupinfo.MC_CODEMODECOLLETE, //"01",
            NS_CODENIVEAUSATISFACTION: '',
            RQ_CODEREQUETE: this.recupinfo.RQ_CODEREQUETE,
            RQ_CODEREQUETERELANCEE: '',
            RQ_DATECLOTUREREQUETE: date,
            RQ_DATEDEBUTTRAITEMENTREQUETE: date,
            RQ_DATEFINTRAITEMENTREQUETE: date,
            RQ_DATESAISIEREQUETE: this.recupinfo.RQ_DATESAISIEREQUETE,
            RQ_DATETRANSFERTREQUETE: this.recupinfo.RQ_DATETRANSFERTREQUETE,
            RQ_DELAITRAITEMENTREQUETE: '',
            RQ_DESCRIPTIONREQUETE: this.recupinfo.RQ_DESCRIPTIONREQUETE, //"DESCRIPTION DE LA REQUETE",
            RQ_DUREETRAITEMENTREQUETE: '',
            RQ_LOCALISATIONCLIENT: this.recupinfo.RQ_LOCALISATIONCLIENT, //"LOCALISATION DU CLIENT",
            RQ_NUMERORECOMPTE: this.recupinfo.RQ_NUMERORECOMPTE, //"0",
            RQ_NUMEROREQUETE: this.recupinfo.RQ_NUMEROREQUETE,
            RQ_OBJETREQUETE: this.formulaire_suivi[0].valeur,
            RQ_OBSERVATIONAGENTTRAITEMENTREQUETE:
              this.formulaire_suivi[3].valeur,
            RQ_OBSERVATIONDELAITRAITEMENTREQUETE: '',
            RQ_AFFICHERINFOCLIENT: 'O',
            RQ_SIGNATURE: this.base64Image,
            RQ_SIGNATURE1: '',
            RS_CODESTATUTRECEVABILITE: this.recupinfo.RS_CODESTATUTRECEVABILITE, //this.formulaire_suivi[2].valeur,
            SR_CODESERVICE: this.recupinfo.SR_CODESERVICE, //this.formulaire_suivi[1].valeur,
            TR_CODETYEREQUETE: this.recupinfo.TR_CODETYEREQUETE, //"00001",
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '1',
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

  ValiderTraitement(tableau_recu: any) {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }
      let Options = 'RequeteClientsClasse.svc/pvgMajReqrequeteEtape'; // le chemin d'appel du service web
      //objet d'envoi
      let body = {
        Objets: [
          {
            AG_CODEAGENCE: this.recupinfoconnect[0].AG_CODEAGENCE,
            AT_DATECLOTUREETAPE: date,
            AT_DATEDEBUTTRAITEMENTETAPE: date,
            AT_DATEFINTRAITEMENTETAPE: date,
            AT_OBSERVATION: this.formulaire_suivi[3].valeur,
            AT_INDEXETAPE: this.recupinfo.AT_INDEXETAPE, //"1",
            AT_NUMEROORDRE: '0',
            CU_CODECOMPTEUTULISATEURAGENTENCHARGE:
              this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE, //"10000000000000000000000000001",
            NS_CODENIVEAUSATISFACTION: '',
            RE_CODEETAPE: this.recupinfo.RE_CODEETAPE, //"1",
            RQ_CODEREQUETE: this.recupinfo.RQ_CODEREQUETE,
            RQ_DATESAISIE: date,
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
            if (
              this.base64Image == '' ||
              this.base64Image == undefined ||
              this.base64Image == null
            ) {
            } else {
              this.SaveRapport();
            }

            this.toastr.success(
              this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
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

  CheckWordCount() {
    if (
      this.formulaire_suivi[3].valeur == undefined ||
      this.formulaire_suivi[3].valeur == ''
    ) {
      this.statutDocument = false;
    } else {
      this.statutDocument = true;
    }
  }

  HandleFileInput(event: any) {
    this.files = event.target.files;
    this.formData = new FormData();

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

        this.formData.append('DOCUMENT_FICHIER', file, file.name);
        this.formData.append(
          'AG_CODEAGENCE',
          this.recupinfoconnect[0].AG_CODEAGENCE
        );
        this.formData.append('RQ_CODEREQUETE', this.recupinfo.RQ_CODEREQUETE);
        this.formData.append('AT_INDEXETAPE', this.recupinfo.AT_INDEXETAPE);
        this.formData.append('AT_DATEFINTRAITEMENTETAPE', date);
        this.formData.append('RE_CODEETAPE', this.recupinfo.RE_CODEETAPE);
        this.formData.append('AT_OBSERVATION', this.formulaire_suivi[3].valeur);
      };
      reader.readAsDataURL(file);
    }

    var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }
  }

  SaveRapport() {
    if (this.files.length == 0) {
      this.AdminService.NotificationErreur(
        'Veuillez selectionner un document !'
      );
    } else {
      this.http
        .post(
          `${this.LienServeur}RequeteClientsClasse.svc/pvgpvgMajReqrequeteEtapeUPloadFile`,
          this.formData
        )
        .subscribe(
          (success) => {
            this.recupEnregistrerFichier = success;
            this.recupEnregistrerFichier =
              this.recupEnregistrerFichier.pvgpvgMajReqrequeteEtapeUPloadFileResult;
            if (
              this.recupEnregistrerFichier.clsResultat.SL_RESULTAT == 'FALSE'
            ) {
            } else {
            }
          },
          (error: any) => {
            $('#modal_de_modification').LoadingOverlay('hide');
          }
        );
    }
  }

  ViderChamp() {
    for (let index = 0; index < this.formulaire_suivi.length; index++) {
      this.formulaire_suivi[index].valeur = '';
    }
  }

  EnregistrerAvis(tableau_recu: any) {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }
      let Options = 'RequeteClientsClasse.svc/pvgMajReqrequeteAvisclient'; // le chemin d'appel du service web
      //objet d'envoi
      let body = {
        Objets: [
          {
            AC_CODEACTIONCORRECTIVE: '',
            CU_CODECOMPTEUTULISATEUR: this.recupinfo.CU_CODECOMPTEUTULISATEUR, // this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
            CU_CODECOMPTEUTULISATEURAGENTENCHARGE:
              this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE, //this.formulaire_suivi[8].valeur,
            MC_CODEMODECOLLETE: this.recupinfo.MC_CODEMODECOLLETE, //"01",
            NS_CODENIVEAUSATISFACTION: this.formulaire_avis[0].valeur,
            RQ_CODEREQUETE: this.recupinfo.RQ_CODEREQUETE,
            RQ_CODEREQUETERELANCEE: '',
            RQ_DATECLOTUREREQUETE: this.recupinfo.RQ_DATECLOTUREREQUETE,
            RQ_DATEDEBUTTRAITEMENTREQUETE:
              this.recupinfo.RQ_DATEDEBUTTRAITEMENTREQUETE,
            RQ_DATEFINTRAITEMENTREQUETE:
              this.recupinfo.RQ_DATEFINTRAITEMENTREQUETE,
            RQ_DATESAISIEREQUETE: this.recupinfo.RQ_DATESAISIEREQUETE,
            RQ_DATETRANSFERTREQUETE: this.recupinfo.RQ_DATETRANSFERTREQUETE,
            RQ_DELAITRAITEMENTREQUETE: '',
            RQ_DESCRIPTIONREQUETE: this.recupinfo.RQ_DESCRIPTIONREQUETE, //"DESCRIPTION DE LA REQUETE",
            RQ_DUREETRAITEMENTREQUETE: '',
            RQ_LOCALISATIONCLIENT: this.recupinfo.RQ_LOCALISATIONCLIENT, //"LOCALISATION DU CLIENT",
            RQ_NUMERORECOMPTE: this.recupinfo.RQ_NUMERORECOMPTE, //"0",
            RQ_NUMEROREQUETE: this.recupinfo.RQ_NUMEROREQUETE,
            RQ_OBJETREQUETE: this.recupinfo.RQ_OBJETREQUETE,
            RQ_OBSERVATIONAGENTTRAITEMENTREQUETE:
              this.formulaire_avis[1].valeur,
            RQ_OBSERVATIONDELAITRAITEMENTREQUETE:
              this.formulaire_avis[1].valeur,
            RQ_AFFICHERINFOCLIENT: 'O',
            RQ_SIGNATURE: '',
            RQ_SIGNATURE1: '',
            RS_CODESTATUTRECEVABILITE: this.recupinfo.RS_CODESTATUTRECEVABILITE,
            SR_CODESERVICE: this.recupinfo.SR_CODESERVICE,
            TR_CODETYEREQUETE: this.recupinfo.TR_CODETYEREQUETE, //"00001",
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '11',
            },
          },
        ],
      };

      this.AdminService.AppelServeur(body, Options).subscribe(
        (success) => {
          this.tab_enregistrement_traitement = success;
          this.tab_enregistrement_traitement =
            this.tab_enregistrement_traitement.pvgMajReqrequeteAvisclientResult;
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
            if (this.formulaire_avis[0].valeur == '002') {
              this.RelanceRequetePrincipale();
            }
            // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
            this.toastr.success(
              this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
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

  RelanceRequetePrincipale() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
    //objet d'envoi
    let body = {
      Objets: [
        {
          AC_CODEACTIONCORRECTIVE: '',
          CU_CODECOMPTEUTULISATEUR: this.recupinfo.CU_CODECOMPTEUTULISATEUR,
          CU_CODECOMPTEUTULISATEURAGENTENCHARGE:
            this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,
          MC_CODEMODECOLLETE: this.recupinfo.MC_CODEMODECOLLETE,
          NS_CODENIVEAUSATISFACTION: this.recupinfo.NS_CODENIVEAUSATISFACTION,
          RQ_CODEREQUETE: '0',
          RQ_CODEREQUETERELANCEE: this.recupinfo.RQ_CODEREQUETE,
          RQ_DATECLOTUREREQUETE: '01/01/1900', //this.recupinfo.RQ_DATECLOTUREREQUETE,
          RQ_DATEDEBUTTRAITEMENTREQUETE: '01/01/1900', //this.recupinfo.RQ_DATEDEBUTTRAITEMENTREQUETE,
          RQ_DATEFINTRAITEMENTREQUETE: '01/01/1900', //this.recupinfo.RQ_DATEFINTRAITEMENTREQUETE,
          RQ_DATESAISIEREQUETE: this.recupinfo.RQ_DATESAISIEREQUETE,
          RQ_DATETRANSFERTREQUETE: this.recupinfo.RQ_DATETRANSFERTREQUETE,
          RQ_DELAITRAITEMENTREQUETE: '',
          RQ_DESCRIPTIONREQUETE: this.recupinfo.RQ_DESCRIPTIONREQUETE,
          RQ_DUREETRAITEMENTREQUETE: '',
          RQ_LOCALISATIONCLIENT: this.recupinfo.RQ_LOCALISATIONCLIENT,
          RQ_NUMERORECOMPTE: this.recupinfo.RQ_NUMERORECOMPTE,
          RQ_NUMEROREQUETE: this.recupinfo.RQ_NUMEROREQUETE,
          RQ_OBJETREQUETE: this.recupinfo.RQ_OBJETREQUETE,
          RQ_OBSERVATIONAGENTTRAITEMENTREQUETE: '', // this.recupinfo.RQ_OBSERVATIONAGENTTRAITEMENTREQUETE,
          RQ_OBSERVATIONDELAITRAITEMENTREQUETE: '', //this.recupinfo.RQ_OBSERVATIONDELAITRAITEMENTREQUETE,
          RQ_AFFICHERINFOCLIENT: 'O',
          RQ_SIGNATURE: '',
          RQ_SIGNATURE1: '',
          RS_CODESTATUTRECEVABILITE: '', //this.recupinfo.RS_CODESTATUTRECEVABILITE,
          SR_CODESERVICE: this.recupinfo.SR_CODESERVICE,
          TR_CODETYEREQUETE: this.recupinfo.TR_CODETYEREQUETE,
          RT_CODETYPERELANCE: '01',
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '8',
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

  ComboReqrequeteselonEtape(info: any) {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteEtapeparRequete';
    let body = {
      Objets: [
        {
          OE_PARAM: [info],
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
        if (this.ListeComboEtapeSelonReq[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.var_off_on = 'N';
          for (
            let index = 0;
            index < this.ListeComboEtapeSelonReq.length;
            index++
          ) {
            if (
              this.ListeComboEtapeSelonReq[index].RQ_CODEREQUETE ==
              this.recupinfo.RQ_CODEREQUETE
            ) {
              this.var_off_on = this.ListeComboEtapeSelonReq[index].AT_ACTIF;
              break;
            }
          }
        }
      },
      (error) => {}
    );
  }

  AfficherFichier() {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    window.open(
      `${this.recupinfo.RQ_LIENRAPPORT}${this.recupinfo.RQ_NOMRAPPORT}`,
      '_blank'
    );
  }

  // Fonction à exécuter lorsque la variable change
  ObserveChangeForTranslate(): void {
    // traduction combo satisfaction
    for (let index = 0; index < this.ListeComboSatisfaction.length; index++) {
      this.ListeComboSatisfaction[
        index
      ].NS_LIBELLENIVEAUSATISFACTION_TRANSLATE = this.Translate(
        this.ListeComboSatisfaction[index].NS_LIBELLENIVEAUSATISFACTION,
        this.LanguageService.langue_en_cours
      );
    }
  }

  ngOnDestroy(): void {
    // Assurez-vous de vous désabonner pour éviter les fuites de mémoire
    this.maVariableSubscription?.unsubscribe();
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

  ngOnInit(): void {
    this.recupinfo = JSON.parse(sessionStorage.getItem('infoReque') || '');

    setTimeout(() => {
      this.ComboStatut();
      this.voirTraitement();
    }, 1000);

    this.formulaire_suivi[0].valeur =
      this.recupinfo.TR_LIBELLETYEREQUETE_TRANSLATE; // this.recupinfo.RQ_DESCRIPTIONREQUETE;
    if (this.recupinfo.RS_CODESTATUTRECEVABILITE == '') {
      this.toastr.error(
        "L'étude de recevabilité de la requete doit etre faite",
        'error',
        { positionClass: 'toast-bottom-left' }
      );
      setTimeout(() => {
        window.location.href = 'admin/reclamations/liste';
      }, 3000);
    }

    if (this.recupinfo.CU_NOMUTILISATEUR.includes('ADMIN')) {
      this.toastr.error('Acces interdit pour un administrateur', 'error', {
        positionClass: 'toast-bottom-left',
      });
      setTimeout(() => {
        window.location.href = 'admin/reclamations/liste';
      }, 3000);
    }

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
