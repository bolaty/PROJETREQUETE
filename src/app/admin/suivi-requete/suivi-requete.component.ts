import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-suivi-requete',
  templateUrl: './suivi-requete.component.html',
  styleUrls: ['./suivi-requete.component.scss']
})
export class SuiviRequeteComponent {
  recupinfo: any = JSON.parse(sessionStorage.getItem("infoReque") || '');
  recupinfoconnect: any = JSON.parse(sessionStorage.getItem("infoLogin") || '');
  statutValreq:any=""
  ListeComboStatut: any = []
  tab_enregistrement_traitement: any = []
  ListeComboSatisfaction:any = []
  recupEnregistrerFichier:any = []
  FormObjet: any
  statutDocument:boolean = false
  base64Image: string="";
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
    public AdminService:AdminService,
    private http: HttpClient,
    private toastr: ToastrService
    ) {}

    voirTraitement(info: any): void {
      $("#sendInvoiceOffcanvas").offcanvas('show')

    }

    ComboStatut() {
      let Option = 'RequeteClientsClasse.svc/pvgReqstatutrecevabiliteCombo';
      let body = {
          "Objets": [
              {
                  "OE_PARAM": [],
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "01"
                  }
              }
          ]
      };
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeComboStatut = success;
          this.ListeComboStatut = this.ListeComboStatut.pvgReqstatutrecevabiliteComboResult;
          if (this.ListeComboStatut[0].clsResultat.SL_RESULTAT == 'TRUE') {
           
          } else {
          
          }
        },
        (error) => {
         
        }
      );
    }

    ComboSatisfaction() {
      let Option = 'RequeteClientsClasse.svc/pvgReqniveausatisfactionCombo';
      let body = {
          "Objets": [
              {
                  "OE_PARAM": [],
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "01"
                  }
              }
          ]
      };
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeComboSatisfaction = success;
          this.ListeComboSatisfaction = this.ListeComboSatisfaction.pvgReqniveausatisfactionComboResult;
          if (this.ListeComboSatisfaction[0].clsResultat.SL_RESULTAT == 'TRUE') {
           
          } else {
          
          }
        },
        (error) => {
         
        }
      );
    }
    ConsultationTraitement(info: any): void {
      if (this.recupinfo.RQ_DATECLOTUREREQUETE != '01/01/1900') {
        $("#sendInvoiceOffcanvas2").offcanvas('show')
      } else {
        this.toastr.error("Le traitement de la requete n'est pas encore terminé", 'error', { positionClass: 'toast-bottom-left'});
      }
    }
   TestEpateRequete(){
    if(this.recupinfo.RQ_DATECLOTUREREQUETE == "01/01/1900"){
      this.statutValreq = "En cours de traitement"
    } else {
      this.statutValreq = "Cloturée"
    }
   }

   Valider(tableau_recu: any) {
      this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
      this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
      if (
        this.AdminService.statut_traitement == true &&
        this.AdminService.statut_traitement_champ_non_obligatoire == true
      ) {
        var d = new Date()
        var date = d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
        var jour = d.getDate()
        if(jour < 10){
          var date = '0'+ d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
          console.log(date)
        }
          let Options =
            'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
          //objet d'envoi
          let body = {
            "Objets": [
                {
                    "AC_CODEACTIONCORRECTIVE": "",
                    "CU_CODECOMPTEUTULISATEUR": this.recupinfo.CU_CODECOMPTEUTULISATEUR,// this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
                    "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,//this.formulaire_suivi[8].valeur,
                    "MC_CODEMODECOLLETE":this.recupinfo.MC_CODEMODECOLLETE,//"01",
                    "NS_CODENIVEAUSATISFACTION": "",
                    "RQ_CODEREQUETE": this.recupinfo.RQ_CODEREQUETE,
                    "RQ_CODEREQUETERELANCEE": "",
                    "RQ_DATECLOTUREREQUETE": date,
                    "RQ_DATEDEBUTTRAITEMENTREQUETE": date,
                    "RQ_DATEFINTRAITEMENTREQUETE": date,
                    "RQ_DATESAISIEREQUETE": this.recupinfo.RQ_DATESAISIEREQUETE,
                    "RQ_DATETRANSFERTREQUETE": this.recupinfo.RQ_DATETRANSFERTREQUETE,
                    "RQ_DELAITRAITEMENTREQUETE": "",
                    "RQ_DESCRIPTIONREQUETE": this.recupinfo.RQ_DESCRIPTIONREQUETE,//"DESCRIPTION DE LA REQUETE",
                    "RQ_DUREETRAITEMENTREQUETE": "",
                    "RQ_LOCALISATIONCLIENT": this.recupinfo.RQ_LOCALISATIONCLIENT,//"LOCALISATION DU CLIENT",
                    "RQ_NUMERORECOMPTE":this.recupinfo.RQ_NUMERORECOMPTE,//"0",
                    "RQ_NUMEROREQUETE":this.recupinfo.RQ_NUMEROREQUETE,
                    "RQ_OBJETREQUETE": this.formulaire_suivi[0].valeur,
                    "RQ_OBSERVATIONAGENTTRAITEMENTREQUETE": this.formulaire_suivi[3].valeur,
                    "RQ_OBSERVATIONDELAITRAITEMENTREQUETE": "",
                    RQ_AFFICHERINFOCLIENT: "O",
                    "RQ_SIGNATURE": this.base64Image,
                    "RQ_SIGNATURE1": "",
                    "RS_CODESTATUTRECEVABILITE": this.recupinfo.RS_CODESTATUTRECEVABILITE,//this.formulaire_suivi[2].valeur,
                    "SR_CODESERVICE": this.recupinfo.SR_CODESERVICE,//this.formulaire_suivi[1].valeur,
                    "TR_CODETYEREQUETE": this.recupinfo.TR_CODETYEREQUETE,//"00001",
                    "clsObjetEnvoi": {
                        "ET_CODEETABLISSEMENT": "",
                        "AN_CODEANTENNE": "",
                        "TYPEOPERATION": "1"
                    }
                }
                ]
            };
        
          this.AdminService.AppelServeur(body, Options).subscribe(
            (success) => {
              this.tab_enregistrement_traitement = success;
              this.tab_enregistrement_traitement = this.tab_enregistrement_traitement.pvgMajReqrequeteResult;
              this.AdminService.CloseLoader()
              if (this.tab_enregistrement_traitement.clsResultat.SL_RESULTAT == 'FALSE') {
                //this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
                this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
              } else {
               // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
                this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
                this.ViderChamp()
              }
            },
            (error: any) => {
              this.AdminService.CloseLoader()
             // this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
              this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
            }
          );
      }
   }

   ValiderTraitement(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      var d = new Date()
      var date = d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
      var jour = d.getDate()
      if(jour < 10){
        var date = '0'+ d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
        console.log(date)
      }
        let Options =
          'RequeteClientsClasse.svc/pvgMajReqrequeteEtape'; // le chemin d'appel du service web
        //objet d'envoi
        let body = {
          "Objets": [
              {
                 /* "AC_CODEACTIONCORRECTIVE": "",
                  "CU_CODECOMPTEUTULISATEUR": this.recupinfo.CU_CODECOMPTEUTULISATEUR,// this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
                  "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,//this.formulaire_suivi[8].valeur,
                  "MC_CODEMODECOLLETE":this.recupinfo.MC_CODEMODECOLLETE,//"01",
                  "NS_CODENIVEAUSATISFACTION": "",
                  "RQ_CODEREQUETE": this.recupinfo.RQ_CODEREQUETE,
                  "RQ_CODEREQUETERELANCEE": "",
                  "RQ_DATECLOTUREREQUETE": date,
                  "RQ_DATEDEBUTTRAITEMENTREQUETE": date,
                  "RQ_DATEFINTRAITEMENTREQUETE": date,
                  "RQ_DATESAISIEREQUETE": this.recupinfo.RQ_DATESAISIEREQUETE,
                  "RQ_DATETRANSFERTREQUETE": this.recupinfo.RQ_DATETRANSFERTREQUETE,
                  "RQ_DELAITRAITEMENTREQUETE": "",
                  "RQ_DESCRIPTIONREQUETE": this.recupinfo.RQ_DESCRIPTIONREQUETE,//"DESCRIPTION DE LA REQUETE",
                  "RQ_DUREETRAITEMENTREQUETE": "",
                  "RQ_LOCALISATIONCLIENT": this.recupinfo.RQ_LOCALISATIONCLIENT,//"LOCALISATION DU CLIENT",
                  "RQ_NUMERORECOMPTE":this.recupinfo.RQ_NUMERORECOMPTE,//"0",
                  "RQ_NUMEROREQUETE":this.recupinfo.RQ_NUMEROREQUETE,
                  "RQ_OBJETREQUETE": this.formulaire_suivi[0].valeur,
                  "RQ_OBSERVATIONAGENTTRAITEMENTREQUETE": this.formulaire_suivi[3].valeur,
                  "RQ_OBSERVATIONDELAITRAITEMENTREQUETE": "",
                  RQ_AFFICHERINFOCLIENT: "O",
                  "RQ_SIGNATURE": this.base64Image,
                  "RQ_SIGNATURE1": "",
                  "RS_CODESTATUTRECEVABILITE": this.recupinfo.RS_CODESTATUTRECEVABILITE,//this.formulaire_suivi[2].valeur,
                  "SR_CODESERVICE": this.recupinfo.SR_CODESERVICE,//this.formulaire_suivi[1].valeur,
                  "TR_CODETYEREQUETE": this.recupinfo.TR_CODETYEREQUETE,//"00001",*/

                  "AG_CODEAGENCE": this.recupinfoconnect[0].AG_CODEAGENCE,
                  "AT_DATECLOTUREETAPE": date,
                  "AT_DATEDEBUTTRAITEMENTETAPE": date,
                  "AT_DATEFINTRAITEMENTETAPE": date,
                  "AT_OBSERVATION": this.formulaire_suivi[3].valeur,
                  "AT_INDEXETAPE": this.recupinfo.AT_INDEXETAPE,//"1",
                  "AT_NUMEROORDRE": "0",
                  "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,//"10000000000000000000000000001",
                  "NS_CODENIVEAUSATISFACTION": "",
                  "RE_CODEETAPE": this.recupinfo.RE_CODEETAPE,//"1",
                  "RQ_CODEREQUETE": this.recupinfo.RQ_CODEREQUETE,
                  "RQ_DATESAISIE": date,
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "5"
                  }
              }
              ]
          };
      
        this.AdminService.AppelServeur(body, Options).subscribe(
          (success) => {
            this.tab_enregistrement_traitement = success;
            this.tab_enregistrement_traitement = this.tab_enregistrement_traitement.pvgMajReqrequeteEtapeResult;
            this.AdminService.CloseLoader()
            if (this.tab_enregistrement_traitement.clsResultat.SL_RESULTAT == 'FALSE') {
              //this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
              this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
            } else {
             // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
              if(this.base64Image == "" || this.base64Image == undefined || this.base64Image == null){
                
              }else{
                this.SaveRapport()
              }
              
              this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
              this.ViderChamp()
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader()
           // this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
            this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
          }
        );
    }
 }
 checkWordCount() {
  if(this.formulaire_suivi[3].valeur == undefined || this.formulaire_suivi[3].valeur == ""){
    this.statutDocument = false
  }else{
    this.statutDocument = true
    this.formulaire_suivi[3].valeur = this.formulaire_suivi[3].valeur.trim();
    const maxWords = 30;
    const words = this.formulaire_suivi[3].valeur.split(' ');
    if (words.length > maxWords) {
      this.formulaire_suivi[3].valeur = words.slice(0, 30).join(" ");
      this.toastr.error(`Vous avez saisi trop de mots. Veuillez limiter votre saisie à ${maxWords} mots.`, 'error', { positionClass: 'toast-bottom-left'});
      //this.formulaire_suivi[3].valeur = this.formulaire_suivi[3].valeur.substring(0, this.formulaire_suivi[3].valeur.lastIndexOf(' '));
    } else {
    }
  }
  
  }

   HandleFileInput(event:any) {
    const file = event.target.files[0];
    if (file.size > 4 * 1024 * 1024) { 
      this.toastr.error('Le fichier est trop volumineux. Veuillez sélectionner un fichier de taille inférieure à 4 Mo.', 'Echec');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.base64Image = event.target.result;
      this.base64Image = this.base64Image.split(',')[1];
    };
    reader.readAsDataURL(file);
    var d = new Date()
    var date = d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
    var jour = d.getDate()
    if(jour < 10){
      var date = '0'+ d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
      console.log(date)
    }

    const formData = new FormData();
    formData.append("DOCUMENT_FICHIER", file, file.name);
    formData.append("AG_CODEAGENCE", this.recupinfoconnect[0].AG_CODEAGENCE);
    formData.append("RQ_CODEREQUETE", this.recupinfo.RQ_CODEREQUETE);
    formData.append("AT_INDEXETAPE", this.recupinfo.AT_INDEXETAPE);
    formData.append(
      "AT_DATEFINTRAITEMENTETAPE", date);
    formData.append("RE_CODEETAPE", this.recupinfo.RE_CODEETAPE);
    formData.append(
      "AT_OBSERVATION", this.formulaire_suivi[3].valeur);
    this.FormObjet = formData
  }
//http://51.210.111.16:1009/ lien prod
  SaveRapport(){
    if(this.FormObjet ==null || this.FormObjet == undefined || this.FormObjet == ""){
      this.AdminService.NotificationErreur("il faut selectionner un document svp.!!!");
    }else{ 
      this.http
        .post("http://localhost:22248/RequeteClientsClasse.svc/pvgpvgMajReqrequeteEtapeUPloadFile",
            this.FormObjet
        )
        .subscribe(
          (success) => {
            this.recupEnregistrerFichier = success;
            this.recupEnregistrerFichier = this.recupEnregistrerFichier.pvgpvgMajReqrequeteEtapeUPloadFileResult;
            if (this.recupEnregistrerFichier.clsResultat.SL_RESULTAT  == "FALSE") {
              
            } else {
             
            }
          },
          (error: any) => {
            $("#modal_de_modification").LoadingOverlay("hide");
          }
        );
    }
    
    
  }

  ViderChamp(){
    for (let index = 0; index < this.formulaire_suivi.length; index++) {
      this.formulaire_suivi[index].valeur = ""
    }
  }

  EnregistrerAvis(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      var d = new Date()
      var date = d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
      var jour = d.getDate()
      if(jour < 10){
        var date = '0'+ d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
        console.log(date)
      }
        let Options =
          'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
        //objet d'envoi
        let body = {
          "Objets": [
              {
                 

                  "AC_CODEACTIONCORRECTIVE": "",
                  "CU_CODECOMPTEUTULISATEUR": this.recupinfo.CU_CODECOMPTEUTULISATEUR,// this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
                  "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,//this.formulaire_suivi[8].valeur,
                  "MC_CODEMODECOLLETE":this.recupinfo.MC_CODEMODECOLLETE,//"01",
                  "NS_CODENIVEAUSATISFACTION": this.formulaire_avis[0].valeur,
                  "RQ_CODEREQUETE": this.recupinfo.RQ_CODEREQUETE,
                  "RQ_CODEREQUETERELANCEE": "",
                  "RQ_DATECLOTUREREQUETE": this.recupinfo.RQ_DATECLOTUREREQUETE,
                  "RQ_DATEDEBUTTRAITEMENTREQUETE": this.recupinfo.RQ_DATEDEBUTTRAITEMENTREQUETE,
                  "RQ_DATEFINTRAITEMENTREQUETE": this.recupinfo.RQ_DATEFINTRAITEMENTREQUETE,
                  "RQ_DATESAISIEREQUETE": this.recupinfo.RQ_DATESAISIEREQUETE,
                  "RQ_DATETRANSFERTREQUETE": this.recupinfo.RQ_DATETRANSFERTREQUETE,
                  "RQ_DELAITRAITEMENTREQUETE": "",
                  "RQ_DESCRIPTIONREQUETE": this.recupinfo.RQ_DESCRIPTIONREQUETE,//"DESCRIPTION DE LA REQUETE",
                  "RQ_DUREETRAITEMENTREQUETE": "",
                  "RQ_LOCALISATIONCLIENT": this.recupinfo.RQ_LOCALISATIONCLIENT,//"LOCALISATION DU CLIENT",
                  "RQ_NUMERORECOMPTE":this.recupinfo.RQ_NUMERORECOMPTE,//"0",
                  "RQ_NUMEROREQUETE":this.recupinfo.RQ_NUMEROREQUETE,
                  "RQ_OBJETREQUETE": this.recupinfo.RQ_OBJETREQUETE,
                  "RQ_OBSERVATIONAGENTTRAITEMENTREQUETE":  this.recupinfo.RQ_OBSERVATIONAGENTTRAITEMENTREQUETE,
                  "RQ_OBSERVATIONDELAITRAITEMENTREQUETE": this.formulaire_avis[1].valeur,
                  RQ_AFFICHERINFOCLIENT: "O",
                  "RQ_SIGNATURE": "",
                  "RQ_SIGNATURE1": "",
                  "RS_CODESTATUTRECEVABILITE": this.recupinfo.RS_CODESTATUTRECEVABILITE,
                  "SR_CODESERVICE": this.recupinfo.SR_CODESERVICE,
                  "TR_CODETYEREQUETE": this.recupinfo.TR_CODETYEREQUETE,//"00001",
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "1"
                  }
              }
              ]
          };
      
        this.AdminService.AppelServeur(body, Options).subscribe(
          (success) => {
            this.tab_enregistrement_traitement = success;
            this.tab_enregistrement_traitement = this.tab_enregistrement_traitement.pvgMajReqrequeteResult;
            this.AdminService.CloseLoader()
            if (this.tab_enregistrement_traitement.clsResultat.SL_RESULTAT == 'FALSE') {
              //this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
              this.toastr.error(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
            } else {
              if(this.formulaire_avis[0].valeur == "002"){
                this.RelanceRequetePrincipale()
              }
             // this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
              this.toastr.success(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
              this.ViderChamp()
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader()
           // this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE);
            this.toastr.warning(this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
          }
        );
    }
  }

  RelanceRequetePrincipale() {
    let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
    //objet d'envoi
    let body = {
      Objets: [
        {
          "AC_CODEACTIONCORRECTIVE": "",
          "CU_CODECOMPTEUTULISATEUR": this.recupinfo.CU_CODECOMPTEUTULISATEUR,
          "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,
          "MC_CODEMODECOLLETE":this.recupinfo.MC_CODEMODECOLLETE,
          "NS_CODENIVEAUSATISFACTION": this.recupinfo.NS_CODENIVEAUSATISFACTION,
          "RQ_CODEREQUETE": "0",
          "RQ_CODEREQUETERELANCEE": this.recupinfo.RQ_CODEREQUETE,
          "RQ_DATECLOTUREREQUETE": "01/01/1900",//this.recupinfo.RQ_DATECLOTUREREQUETE,
          "RQ_DATEDEBUTTRAITEMENTREQUETE": "01/01/1900",//this.recupinfo.RQ_DATEDEBUTTRAITEMENTREQUETE,
          "RQ_DATEFINTRAITEMENTREQUETE": "01/01/1900",//this.recupinfo.RQ_DATEFINTRAITEMENTREQUETE,
          "RQ_DATESAISIEREQUETE": this.recupinfo.RQ_DATESAISIEREQUETE,
          "RQ_DATETRANSFERTREQUETE": this.recupinfo.RQ_DATETRANSFERTREQUETE,
          "RQ_DELAITRAITEMENTREQUETE": "",
          "RQ_DESCRIPTIONREQUETE": this.recupinfo.RQ_DESCRIPTIONREQUETE,
          "RQ_DUREETRAITEMENTREQUETE": "",
          "RQ_LOCALISATIONCLIENT": this.recupinfo.RQ_LOCALISATIONCLIENT,
          "RQ_NUMERORECOMPTE":this.recupinfo.RQ_NUMERORECOMPTE,
          "RQ_NUMEROREQUETE":this.recupinfo.RQ_NUMEROREQUETE,
          "RQ_OBJETREQUETE": this.recupinfo.RQ_OBJETREQUETE,
          "RQ_OBSERVATIONAGENTTRAITEMENTREQUETE": "",// this.recupinfo.RQ_OBSERVATIONAGENTTRAITEMENTREQUETE,
          "RQ_OBSERVATIONDELAITRAITEMENTREQUETE": "",//this.recupinfo.RQ_OBSERVATIONDELAITRAITEMENTREQUETE,
          "RQ_AFFICHERINFOCLIENT": "O",
          "RQ_SIGNATURE": "",
          "RQ_SIGNATURE1": "",
          "RS_CODESTATUTRECEVABILITE": "",//this.recupinfo.RS_CODESTATUTRECEVABILITE,
          "SR_CODESERVICE": this.recupinfo.SR_CODESERVICE,
          "TR_CODETYEREQUETE": this.recupinfo.TR_CODETYEREQUETE,
          "RT_CODETYPERELANCE":"01",
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


    ngOnInit(): void {
      this.ComboStatut()
      this.TestEpateRequete()
      this.ComboSatisfaction()
      this.formulaire_suivi[0].valeur =  this.recupinfo.RQ_DESCRIPTIONREQUETE
      if(this.recupinfo.RS_CODESTATUTRECEVABILITE == ""){
        this.toastr.error("l'etude de recevabilié de la requete doit etre faite", 'error', { positionClass: 'toast-bottom-left'});
        setTimeout(() => {
          window.location.href = "admin/reclamations/liste"
        }, 3000);
      }

      if(this.recupinfo.CU_NOMUTILISATEUR.includes('ADMIN') ){
        this.toastr.error("Acces interdit pour un Administrateur", 'error', { positionClass: 'toast-bottom-left'});
        setTimeout(() => {
          window.location.href = "admin/reclamations/liste"
        }, 3000);
      }

    }
}
