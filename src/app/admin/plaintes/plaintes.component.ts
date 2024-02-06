import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

import { ToastrService } from 'ngx-toastr';

declare var $: any;


@Component({
  selector: 'app-plaintes',
  templateUrl: './plaintes.component.html',
  styleUrls: ['./plaintes.component.scss'],
})
export class PlaintesComponent {
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
  ListeComboAgence:any=[]
  ListeTypeRequete:any=[]
  ListeComboModeCollecte:any=[]
  retourRequeteEnregistrement:any=[]
  ListeRetourRequete:any=[]
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
                  "CU_CODECOMPTEUTULISATEUR": "",// this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//"1",
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
                  "RQ_LOCALISATIONCLIENT": this.formulaire_plaintes_reclamations[4].valeur,//"LOCALISATION DU CLIENT",
                  "RQ_NUMERORECOMPTE": this.formulaire_plaintes_reclamations[0].valeur,//"0",
                  "RQ_NUMEROREQUETE": "0",
                  "RQ_OBJETREQUETE": "OBJET DE LA REQUETE",
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
                "CU_CODECOMPTEUTULISATEUR": this.formulaire_plaintes_reclamations[0].valeur,
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
                "CU_NUMEROUTILISATEUR": "0",
                "CU_TOKEN": "",
                "PI_CODEPIECE": "00001",
                "TU_CODETYPEUTILISATEUR": "0001",
                "clsReqmicclient": null,
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
  ListeRequete() {
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequete';
    let body = {
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
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeRetourRequete = success;
        this.ListeRetourRequete = this.ListeRetourRequete.pvgListeReqrequeteResult;
        if (this.ListeRetourRequete[0].clsResultat.SL_RESULTAT == 'TRUE') {
         
        } else {
          this.toastr.info(this.ListeRetourRequete[0].clsResultat.SL_MESSAGE, 'info', { positionClass: 'toast-bottom-left'});
        }
      },
      (error) => {
        this.toastr.warning(this.ListeRetourRequete[0].clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
      }
    );
  }
  recupListe(info:any){
       sessionStorage.setItem("infoReque", JSON.stringify(info));
  }
  viderChamp(){
    this.toastr.warning("Le message d'avertissement", 'warning', { positionClass: 'toast-bottom-left'});
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
  ngOnInit(): void {
    this.ComboAgence()
    this.formulaire_plaintes_reclamations[8].valeur = this.recupinfo[0].CU_NOMUTILISATEUR
  }
}
