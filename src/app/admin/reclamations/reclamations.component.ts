import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

import { ToastrService } from 'ngx-toastr';

declare var $: any;



@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss'],
})
export class ReclamationsComponent {
  recupinfo: any = JSON.parse(sessionStorage.getItem("infoLogin") || '');
  base64Image: string="";
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
      label: 'durée du traitement',
    },
    {
      id: 'modalDureefin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'durée du traitement',
    },
    {
      id: 'invoice-observation-avis',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Description',
    }
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
  ListeComboAgence:any=[]
  ListeTypeRequete:any=[]
  ListeComboModeCollecte:any=[]
  retourRequeteEnregistrement:any=[]
  ListeRetourRequete:any=[]
  ListeComboOperateur:any=[]
  ListeTypeRequete_1:any=[]
  ListeComboAvisrecevabilite:any=[]
  tab_enregistrement_traitement:any=[]
  ListeComboEtapes:any=[]
  recupEtape:any=[]
  ListeClients:any=[]
  statutliste:boolean=false
  SearchValue:any
  statutClientExiste:boolean=true
  statutFrmulaire:string='ENREGISTREMENT'
  constructor(
    public AdminService:AdminService,
    private toastr: ToastrService
    ) {}

  //
  ComboAgence() {
    let Option = 'RequeteClientsClasse.svc/pvgReqAgenceCombo';
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
        this.ListeComboAgence = success;
        this.ListeComboAgence = this.ListeComboAgence.pvgReqAgenceComboResult;
        if (this.ListeComboAgence[0].clsResultat.SL_RESULTAT == 'TRUE') {
         this.ComboEtapeParam()
        } else {
        
        }
      },
      (error) => {
       
      }
    );
  }
  ComboEtapeParam() {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteEtapeParamCombo';
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
        this.ListeComboEtapes = success;
        this.ListeComboEtapes = this.ListeComboEtapes.pvgListeReqrequeteEtapeParamComboResult;
        if (this.ListeComboEtapes[0].clsResultat.SL_RESULTAT == 'TRUE') {
         this.ComboOperateur()
        } else {
        
        }
      },
      (error) => {
       
      }
    );
  }
  ComboOperateur() {
    let Option = 'RequeteClientsClasse.svc/pvgListeUtilisateursCombo';
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
        this.ListeComboOperateur = success;
        this.ListeComboOperateur = this.ListeComboOperateur.pvgListeUtilisateursComboResult;
        if (this.ListeComboOperateur[0].clsResultat.SL_RESULTAT == 'TRUE') {
         this.ComboTypeRequete()
        } else {
        
        }
      },
      (error) => {
       
      }
    );
  }
  ComboTypeRequete() {
    let Option = 'RequeteClientsClasse.svc/pvgReqtyperequeteCombo';
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
        this.ListeTypeRequete = success;
        this.ListeTypeRequete = this.ListeTypeRequete.pvgReqtyperequeteComboResult;
        if (this.ListeTypeRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ListeTypeRequete_1 = []
          for(let i=0;i<this.ListeTypeRequete.length;i++){
            if(this.ListeTypeRequete[i].NR_CODENATUREREQUETE == '01'){
               this.ListeTypeRequete_1.push(this.ListeTypeRequete[i])
            }
          }
          this.ComboModeCollecte()
        } else {
        
        }
      },
      (error) => {
       
      }
    );
  }

  ComboModeCollecte() {
    let Option = 'RequeteClientsClasse.svc/pvgReqmodecollecteCombo';
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
        this.ListeComboModeCollecte = success;
        this.ListeComboModeCollecte = this.ListeComboModeCollecte.pvgReqmodecollecteComboResult;
        if (this.ListeComboModeCollecte[0].clsResultat.SL_RESULTAT == 'TRUE') {
         this.ComboAvisrecevabilite()
        } else {
        
        }
      },
      (error) => {
       
      }
    );
  }
  ComboAvisrecevabilite() {
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
        this.ListeComboAvisrecevabilite = success;
        this.ListeComboAvisrecevabilite = this.ListeComboAvisrecevabilite.pvgReqstatutrecevabiliteComboResult;
        if (this.ListeComboAvisrecevabilite[0].clsResultat.SL_RESULTAT == 'TRUE') {
         
        } else {
        
        }
      },
      (error) => {
       
      }
    );
  }
  handleFileInput(event:any) {
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
  EnregistrementRequete(tableau_recu: any) {
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
                  "CU_CODECOMPTEUTULISATEUR": this.statutClientExiste == false ? this.ListeClients[0].CU_CODECOMPTEUTULISATEUR : "",// this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
                  "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": "",//this.formulaire_plaintes_reclamations[8].valeur,
                  "MC_CODEMODECOLLETE": this.formulaire_plaintes_reclamations[7].valeur,//"01",
                  "NS_CODENIVEAUSATISFACTION": "",
                  "RQ_CODEREQUETE": "",
                  "RQ_CODEREQUETERELANCEE": "",
                  "RQ_DATECLOTUREREQUETE": "01/01/1900",
                  "RQ_DATEDEBUTTRAITEMENTREQUETE": "01/01/1900",
                  "RQ_DATEFINTRAITEMENTREQUETE": "01/01/1900",
                  "RQ_DATESAISIEREQUETE": date, //"01/01/1900",
                  "RQ_DATETRANSFERTREQUETE": "01/01/1900",
                  "RQ_DELAITRAITEMENTREQUETE": "",
                  "RQ_DESCRIPTIONREQUETE": this.formulaire_plaintes_reclamations[6].valeur,//"DESCRIPTION DE LA REQUETE",
                  "RQ_DUREETRAITEMENTREQUETE": "",
                  "RQ_AFFICHERINFOCLIENT": "O",
                  "RQ_LOCALISATIONCLIENT": this.statutClientExiste == false ? "" : this.formulaire_plaintes_reclamations[4].valeur,// this.formulaire_plaintes_reclamations[4].valeur,//"LOCALISATION DU CLIENT",
                  "RQ_NUMERORECOMPTE": this.statutClientExiste == false ? this.ListeClients[0].CU_NUMEROUTILISATEUR : this.formulaire_plaintes_reclamations[0].valeur,//this.formulaire_plaintes_reclamations[0].valeur,//"0",
                  "RQ_NUMEROREQUETE": "0",
                  "RQ_OBJETREQUETE": "RECLAMATION",
                  "RQ_OBSERVATIONAGENTTRAITEMENTREQUETE": "",
                  "RQ_OBSERVATIONDELAITRAITEMENTREQUETE": "",
                  "RQ_SIGNATURE": this.base64Image,
                  "RQ_SIGNATURE1": "",
                  "RS_CODESTATUTRECEVABILITE": "",
                  "SR_CODESERVICE": "",
                  "TR_CODETYEREQUETE": this.formulaire_plaintes_reclamations[5].valeur,//"00001",
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "0"
                  }
              }
              ]
          };
      
        this.AdminService.AppelServeur(body, Options).subscribe(
          (success) => {
            this.retourRequeteEnregistrement = success;
            this.retourRequeteEnregistrement = this.retourRequeteEnregistrement.pvgMajReqrequeteResult;
            this.AdminService.CloseLoader()
            if (this.retourRequeteEnregistrement.clsResultat.SL_RESULTAT == 'FALSE') {
              //this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
              this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
            } else {
             // this.toastr.success(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
              this.toastr.success(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
              this.viderChamp()
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader()
           // this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
            this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
          }
        );
     
    }
  }
  EnregistrementCompteClient(tableau_recu: any) {
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
          'RequeteClientsClasse.svc/pvgMajUtilisateurs'; // le chemin d'appel du service web
        //objet d'envoi
        let body = {
          "Objets": [
              {
                "AG_CODEAGENCE": this.formulaire_plaintes_reclamations[3].valeur,
                "CU_ADRESSEGEOGRAPHIQUEUTILISATEUR": ".",
                "CU_CLESESSION": "",
                "CU_CODECOMPTEUTULISATEUR": "",
                "CU_CONTACT": this.formulaire_plaintes_reclamations[2].valeur,//"2250747839553",
                "CU_DATECLOTURE": "01/01/1900",
                "CU_DATECREATION": date,//"01/01/1900",
                "CU_DATEPIECE": "01/01/1900",
                "CU_EMAIL":this.formulaire_plaintes_reclamations[10].valeur,// "d.baz1008@gmail.com",
                "CU_LOGIN": this.formulaire_plaintes_reclamations[11].valeur,//"d.baz1008@gmail.com",
                "CU_MOTDEPASSE": this.formulaire_plaintes_reclamations[12].valeur,//"2250747839553",
                "CU_NOMBRECONNECTION": "0",
                "CU_NOMUTILISATEUR": this.formulaire_plaintes_reclamations[1].valeur,//"bolaty",
                "CU_NUMEROPIECE": "XXXX",
                "CU_NUMEROUTILISATEUR": this.formulaire_plaintes_reclamations[0].valeur,
                "CU_TOKEN": "",
                "PI_CODEPIECE": "00001",
                "TU_CODETYPEUTILISATEUR": "0002",
                "clsReqmicclient": {
                  "OP_CODEOPERATEUR": "",
                  "OP_CODEOPERATEURZENITH": "dddd",
                  "AG_CODEAGENCE": this.recupinfo[0].AG_CODEAGENCE,
                  "PV_CODEPOINTVENTE": "100000001",
                  "CU_CODECOMPTEUTULISATEUR": this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,
                  "SR_CODESERVICE": "01",
                  "OP_DATESAISIE":  date,
                },
                "clsReqmicprospect": null,
                "clsReqoperateur": null,
                "clsReqtontineepargnantjournalier": null,
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "0"
                  }
              }
              ]
          };
          this.AdminService.ShowLoader()
        this.AdminService.AppelServeur(body, Options).subscribe(
          (success) => {
            this.retourRequeteEnregistrement = success;
            this.retourRequeteEnregistrement = this.retourRequeteEnregistrement.pvgMajUtilisateursResult;
            if (this.retourRequeteEnregistrement.clsResultat.SL_RESULTAT == 'FALSE') {
             // this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
              this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
              this.AdminService.CloseLoader()
            } else {
              //this.toastr.success(this.retourRequeteEnregistrement[0].clsResultat.SL_MESSAGE, 'Echec');
              this.EnregistrementRequete(this.formulaire_plaintes_reclamations)
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader()
           // this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
            this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
          }
        );
     
    }
  }

  EnregistrementRequeteAffectation(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      if (
        this.AdminService.ComparerDeuxDates(this.formulaire_attr_reclamations[1].valeur) >
        this.AdminService.ComparerDeuxDates(
          this.formulaire_attr_reclamations[2].valeur
        )
      ) {
        $('#' + tableau_recu[1].id).css('background-color', 'MistyRose');
        $('#' + tableau_recu[2].id).css('background-color', 'MistyRose');
        this.toastr.error('La date de début ne doit pas être plus grande que la date de fin', 'error', { positionClass: 'toast-bottom-left'});
      }else{
        var d = new Date()
        var date = d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
        var jour = d.getDate()
        if(jour < 10){
          var date = '0'+ d.getDate() +'-0'+(d.getMonth()+1)+'-'+d.getFullYear()
          console.log(date)
        }
          var recuperation = JSON.parse(sessionStorage.getItem("infoReque") || "")
          let Options =
            'RequeteClientsClasse.svc/pvgMajReqrequeteEtape'; // le chemin d'appel du service web
          //objet d'envoi
          let body = {
            "Objets": [
                {
                  "AG_CODEAGENCE": this.recupinfo[0].AG_CODEAGENCE,
                  "AT_DATECLOTUREETAPE": "01/01/1900",
                  "AT_DATEDEBUTTRAITEMENTETAPE": this.formulaire_attr_reclamations[1].valeur,
                  "AT_DATEFINTRAITEMENTETAPE": this.formulaire_attr_reclamations[2].valeur,
                  "AT_DESCRIPTION": this.formulaire_attr_reclamations[3].valeur,
                  "AT_INDEXETAPE": "0",
                  "AT_NUMEROORDRE": "0",
                  "CU_CODECOMPTEUTULISATEURAGENTENCHARGE": this.formulaire_attr_reclamations[0].valeur,
                  "NS_CODENIVEAUSATISFACTION": "",
                  "RE_CODEETAPE": this.recupEtape.RE_CODEETAPE,
                  "RQ_CODEREQUETE": recuperation.RQ_CODEREQUETE,
                  "RQ_DATESAISIE": date,
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "0"
                  }
                }
                ]
            };
          this.AdminService.ShowLoader()
          this.AdminService.AppelServeur(body, Options).subscribe(
            (success) => {
              this.retourRequeteEnregistrement = success;
              this.retourRequeteEnregistrement = this.retourRequeteEnregistrement.pvgMajReqrequeteEtapeResult;
              this.AdminService.CloseLoader()
              if (this.retourRequeteEnregistrement.clsResultat.SL_RESULTAT == 'FALSE') {
                //this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
                this.toastr.error(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
              } else {
               // this.toastr.success(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
                this.toastr.success(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
  
                this.viderChampAff()
              }
            },
            (error: any) => {
              this.AdminService.CloseLoader()
             // this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE);
              this.toastr.warning(this.retourRequeteEnregistrement.clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
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
                  "RS_CODESTATUTRECEVABILITE": this.formulaire_avis[0].valeur,
                  "SR_CODESERVICE": this.recupinfo.SR_CODESERVICE.valeur,
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
  selectionEtape(info:any){
    this.recupEtape = info
}
  ViderChamp(){
    for (let index = 0; index < this.formulaire_avis.length; index++) {
      this.formulaire_avis[index].valeur = ""
    }
  }
  ListeRequete() {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
    var body = {}
     if (
      this.recupinfo[0].CU_NOMUTILISATEUR.includes('ADMIN') 
    ) {
       body = {
        "Objets": [
            {
                "OE_PARAM": ["01"],
                "clsObjetEnvoi": {
                    "ET_CODEETABLISSEMENT": "",
                    "AN_CODEANTENNE": "",
                    "TYPEOPERATION": "01"
                }
            }
        ]
      };
    }else{
       body = {
        "Objets": [
            {
                "OE_PARAM": ["01",this.recupinfo[0].CU_CODECOMPTEUTULISATEUR],
                "clsObjetEnvoi": {
                    "ET_CODEETABLISSEMENT": "",
                    "AN_CODEANTENNE": "",
                    "TYPEOPERATION": "01"
                }
            }
        ]
      };
    }
    
    this.AdminService.ShowLoader()
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeRetourRequete = success;
        this.ListeRetourRequete = this.ListeRetourRequete.pvgListeReqrequeteResult;
        this.AdminService.CloseLoader()
        if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
         this.statutliste = true
        } else {
          this.toastr.info(this.ListeRetourRequete[0].clsResultat.SL_MESSAGE, 'info', { positionClass: 'toast-bottom-left'});
          this.statutliste = false
        }
      },
      (error) => {
        this.AdminService.CloseLoader()
        this.statutliste = false
        this.toastr.warning(this.ListeRetourRequete[0].clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
      }
    );
  }
  RechercherSelonEcran(){
    if(this.statutFrmulaire == "ENREGISTREMENT"){
      this.listeClients();
    }else{

    }
  }
  listeClients() {
    let Option = 'RequeteClientsClasse.svc/pvgListeUtilisateursRecherche';
    
    if(this.SearchValue == undefined) {
      this.toastr.error("veuillez renseigner un numero client svp", 'error', { positionClass: 'toast-bottom-left'});
    }else{
        
        let body = {
          "Objets": [
              {
                  "OE_PARAM": ["0002",this.SearchValue,"","","01"],
                  "clsObjetEnvoi": {
                      "ET_CODEETABLISSEMENT": "",
                      "AN_CODEANTENNE": "",
                      "TYPEOPERATION": "01"
                  }
              }
          ]
      };
    // $(".datatables-basic").DataTable().destroy();
      this.AdminService.AppelServeur(body, Option).subscribe(
        (success: any) => {
          this.ListeClients = success;
          this.ListeClients = this.ListeClients.pvgListeUtilisateursRechercheResult;
          if (this.ListeClients[0].clsResultat.SL_RESULTAT == 'TRUE') {
            this.AdminService.CloseLoader()
            this.toastr.success(this.ListeClients[0].clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
            this.statutClientExiste = false;
          } else {
            this.AdminService.CloseLoader()
            this.toastr.error(this.ListeClients[0].clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
            this.statutClientExiste = true;
          }
        },
        (error) => {
          this.AdminService.CloseLoader()
          this.toastr.warning(this.ListeClients[0].clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
          this.statutClientExiste = true;
        }
      );


    }

    
  }

  checkStatusForm(infoEcran:any){
    if(infoEcran == "Liste"){
       this.statutFrmulaire = "LISTE";
        this.SearchValue = ""
       this.ListeRequete()
    }else{
     this.statutFrmulaire = "ENREGISTREMENT";
      this.SearchValue = ""
    }
}
  recupListe(info:any){
    sessionStorage.setItem("infoReque", JSON.stringify(info));
    if(info.CU_CODECOMPTEUTULISATEUR != "" &&  info.CU_CODECOMPTEUTULISATEURAGENTENCHARGE != ""){
      this.formulaire_attr_reclamations[0].valeur = info.CU_CODECOMPTEUTULISATEURAGENTENCHARGE
    }else{
      this.formulaire_attr_reclamations[0].valeur = info.CU_CODECOMPTEUTULISATEUR
    }
  }
  viderChamp(){
    this.formulaire_plaintes_reclamations[0].valeur = ""
    this.formulaire_plaintes_reclamations[1].valeur = ""
    this.formulaire_plaintes_reclamations[2].valeur = ""
    this.formulaire_plaintes_reclamations[3].valeur = ""
    this.formulaire_plaintes_reclamations[4].valeur = ""
    this.formulaire_plaintes_reclamations[5].valeur = ""
    this.formulaire_plaintes_reclamations[6].valeur = ""
    this.formulaire_plaintes_reclamations[7].valeur = ""
    this.formulaire_plaintes_reclamations[8].valeur = ""
    this.formulaire_plaintes_reclamations[9].valeur = ""
    this.formulaire_plaintes_reclamations[10].valeur = ""
    this.formulaire_plaintes_reclamations[11].valeur = ""
    this.formulaire_plaintes_reclamations[12].valeur = ""
  }
  viderChampAff(){
    this.formulaire_attr_reclamations[0].valeur = ""
    this.formulaire_attr_reclamations[1].valeur = ""
    this.formulaire_attr_reclamations[2].valeur = ""
    this.formulaire_attr_reclamations[3].valeur = ""
   $("#addNewAddress").modal("hide");
  }
  ngOnInit(): void {
    this.ComboAgence()
    this.formulaire_plaintes_reclamations[8].valeur = this.recupinfo[0].CU_NOMUTILISATEUR
  }
}
