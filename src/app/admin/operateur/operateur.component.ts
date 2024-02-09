import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-operateur',
  templateUrl: './operateur.component.html',
  styleUrls: ['./operateur.component.scss']
})
export class OperateurComponent {
  ecran_affiche: any = sessionStorage.getItem('choix_ecran')
  tab_eng_operateur: any = []
  ListeComboAgence: any = []
  formulaire_operateur: any = [
    {
      id: 'nom',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom',
    },
    {
      id: 'prenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'prénoms',
    },
    {
      id: 'email',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'email',
    },
    {
      id: 'agence',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'agence',
    },
    {
      id: 'telephone',
      type: 'telephone',
      valeur: '',
      obligatoire: 'N',
      label: 'numéro de téléphone',
    },
    {
      id: 'login',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'login',
    },
    {
      id: 'motdepasse',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'mot de passe',
    },
  ];

  constructor(
    public AdminService:AdminService,
    private toastr: ToastrService
    ) {}




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
          //  this.ComboOperateur()
          } else {
          
          }
        },
        (error) => {
         
        }
      );
    }

  EnregistrementCompteOperateur(tableau_recu: any) {
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
                "AG_CODEAGENCE": this.formulaire_operateur[3].valeur,
                "CU_ADRESSEGEOGRAPHIQUEUTILISATEUR": ".",
                "CU_CLESESSION": "",
                "CU_CODECOMPTEUTULISATEUR": "",
                "CU_CONTACT": this.formulaire_operateur[4].valeur,//"2250747839553",
                "CU_DATECLOTURE": "01/01/1900",
                "CU_DATECREATION": date,//"01/01/1900",
                "CU_DATEPIECE": "01/01/1900",
                "CU_EMAIL":this.formulaire_operateur[2].valeur,// "d.baz1008@gmail.com",
                "CU_LOGIN": this.formulaire_operateur[5].valeur,//"d.baz1008@gmail.com",
                "CU_MOTDEPASSE": this.formulaire_operateur[6].valeur,//"2250747839553",
                "CU_NOMBRECONNECTION": "0",
                "CU_NOMUTILISATEUR": `${this.formulaire_operateur[0].valeur} ${this.formulaire_operateur[1].valeur}`,//"bolaty",
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
            this.tab_eng_operateur = success;
            this.tab_eng_operateur = this.tab_eng_operateur.pvgMajUtilisateursResult;
            if (this.tab_eng_operateur.clsResultat.SL_RESULTAT == 'FALSE') {
             // this.toastr.error(this.tab_eng_operateur.clsResultat.SL_MESSAGE);
              this.toastr.error(this.tab_eng_operateur.clsResultat.SL_MESSAGE, 'error', { positionClass: 'toast-bottom-left'});
              this.AdminService.CloseLoader()
            } else {
              this.toastr.success(this.tab_eng_operateur.clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
              for (let index = 0; index < tableau_recu.length; index++) {
                tableau_recu[index].valeur = ""
              }
              this.AdminService.CloseLoader()
            }
          },
          (error: any) => {
            this.AdminService.CloseLoader()
           // this.toastr.warning(this.tab_eng_operateur.clsResultat.SL_MESSAGE);
            this.toastr.warning(this.tab_eng_operateur.clsResultat.SL_MESSAGE, 'warning', { positionClass: 'toast-bottom-left'});
          }
        );
    }
  }

  ngOnInit(): void {
  //  this.ecran_affiche = this.ecran_affiche == "" ? "client" : "operateur"
    this.ComboAgence()
  }

}
