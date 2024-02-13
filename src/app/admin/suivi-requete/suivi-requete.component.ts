import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-suivi-requete',
  templateUrl: './suivi-requete.component.html',
  styleUrls: ['./suivi-requete.component.scss']
})
export class SuiviRequeteComponent {
  recupinfo: any = JSON.parse(sessionStorage.getItem("infoReque") || '');
  statutValreq:any=""
  ListeComboStatut: any = []
  tab_enregistrement_traitement: any = []
  ListeComboSatisfaction:any = []
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
                    "RQ_SIGNATURE": this.base64Image,
                    "RQ_SIGNATURE1": "",
                    "RS_CODESTATUTRECEVABILITE": this.formulaire_suivi[2].valeur,
                    "SR_CODESERVICE": this.formulaire_suivi[1].valeur,
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
                  /*"AC_CODEACTIONCORRECTIVE": "",
                  "CU_CODECOMPTEUTULISATEUR": "",// this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
                  "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": "",//this.formulaire_suivi[8].valeur,
                  "MC_CODEMODECOLLETE": "",//"01",
                  "NS_CODENIVEAUSATISFACTION": this.formulaire_avis[0].valeur,
                  "RQ_CODEREQUETE": this.recupinfo.RQ_CODEREQUETE,
                  "RQ_CODEREQUETERELANCEE": "",
                  "RQ_DATECLOTUREREQUETE": date,
                  "RQ_DATEDEBUTTRAITEMENTREQUETE": date,
                  "RQ_DATEFINTRAITEMENTREQUETE": date,
                  "RQ_DATESAISIEREQUETE": "01/01/1900",
                  "RQ_DATETRANSFERTREQUETE": "01/01/1900",
                  "RQ_DELAITRAITEMENTREQUETE": "",
                  "RQ_DESCRIPTIONREQUETE": "",//"DESCRIPTION DE LA REQUETE",
                  "RQ_DUREETRAITEMENTREQUETE": "",
                  "RQ_LOCALISATIONCLIENT": "",//"LOCALISATION DU CLIENT",
                  "RQ_NUMERORECOMPTE": "0",//"0",
                  "RQ_NUMEROREQUETE": "0",
                  "RQ_OBJETREQUETE": "",
                  "RQ_OBSERVATIONAGENTTRAITEMENTREQUETE": "",
                  "RQ_OBSERVATIONDELAITRAITEMENTREQUETE": this.formulaire_avis[1].valeur,
                  "RQ_SIGNATURE": "",
                  "RQ_SIGNATURE1": "",
                  "RS_CODESTATUTRECEVABILITE": "",
                  "SR_CODESERVICE": "",
                  "TR_CODETYEREQUETE": "",//"00001",*/

                  "AC_CODEACTIONCORRECTIVE": "",
                  "CU_CODECOMPTEUTULISATEUR": this.recupinfo.CU_CODECOMPTEUTULISATEUR,// this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
                  "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": this.recupinfo.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,//this.formulaire_suivi[8].valeur,
                  "MC_CODEMODECOLLETE":this.recupinfo.MC_CODEMODECOLLETE,//"01",
                  "NS_CODENIVEAUSATISFACTION": this.formulaire_avis[0].valeur,
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
                  "RQ_OBJETREQUETE": this.recupinfo.RQ_OBJETREQUETE,
                  "RQ_OBSERVATIONAGENTTRAITEMENTREQUETE":  this.recupinfo.RQ_OBSERVATIONAGENTTRAITEMENTREQUETE,
                  "RQ_OBSERVATIONDELAITRAITEMENTREQUETE": this.formulaire_avis[1].valeur,
                  "RQ_SIGNATURE": "",
                  "RQ_SIGNATURE1": "",
                  "RS_CODESTATUTRECEVABILITE": this.formulaire_suivi[2].valeur,
                  "SR_CODESERVICE": this.formulaire_suivi[1].valeur,
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

    ngOnInit(): void {
   this.ComboStatut()
   this.TestEpateRequete()
   this.ComboSatisfaction()
   this.formulaire_suivi[0].valeur =  this.recupinfo.RQ_DESCRIPTIONREQUETE
    }
}
