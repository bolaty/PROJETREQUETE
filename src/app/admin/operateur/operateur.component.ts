import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/services/language.service';

declare var $: any;

@Component({
  selector: 'app-operateur',
  templateUrl: './operateur.component.html',
  styleUrls: ['./operateur.component.scss'],
})
export class OperateurComponent {
  recupinfo: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  ecran_affiche: any = sessionStorage.getItem('choix_ecran');
  tab_eng_operateur: any = [];
  tab_droit_operateur: any = [];
  ListeComboAgence: any = [];
  ListeDroitUser: any = [];
  valtabAgence: any = [];
  ListeDroitforUser: any = [];
  ListeOperateur: any = [];
  tab_list_client: any = [];
  tab_enrg_cpte_client: any = [];
  ListeClients: any = [];
  recup_idoperateur: any = '';
  statutdroit: boolean = false;
  statutAlldroit: boolean = false;
  search_bar: any = '';
  item_client: any = {};
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

  formulaire_client: any = [
    {
      id: 'nomEtPrenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'nom et prénoms',
    },
    {
      id: 'telephone',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'téléphone',
    },
    {
      id: 'localisation',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'localisation',
    },
    {
      id: 'email',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'email',
    },
  ];

  RecupOerateurs: any = [];
  voirlist: any;
  recupclient: any = [
    {
      id: 1,
      LIBELLE: 'PROBLEME DE VERSEMENT',
      NATURE: 'PLAINTE',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '01/01/2024',
    },
    {
      id: 2,
      LIBELLE: 'PROBLEME DE RETRAIT',
      NATURE: 'RECLAMATION',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '02/01/2024',
    },
    {
      id: 1,
      LIBELLE: 'PROBLEME DE VERSEMENT',
      NATURE: 'PLAINTE',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '01/01/2024',
    },
    {
      id: 2,
      LIBELLE: 'PROBLEME DE RETRAIT',
      NATURE: 'RECLAMATION',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '02/01/2024',
    },
    {
      id: 1,
      LIBELLE: 'PROBLEME DE VERSEMENT',
      NATURE: 'PLAINTE',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '01/01/2024',
    },
    {
      id: 2,
      LIBELLE: 'PROBLEME DE RETRAIT',
      NATURE: 'RECLAMATION',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '02/01/2024',
    },
    {
      id: 1,
      LIBELLE: 'PROBLEME DE VERSEMENT',
      NATURE: 'PLAINTE',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '01/01/2024',
    },
    {
      id: 2,
      LIBELLE: 'PROBLEME DE RETRAIT',
      NATURE: 'RECLAMATION',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '02/01/2024',
    },
    {
      id: 1,
      LIBELLE: 'PROBLEME DE VERSEMENT',
      NATURE: 'PLAINTE',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '01/01/2024',
    },
    {
      id: 2,
      LIBELLE: 'PROBLEME DE RETRAIT',
      NATURE: 'RECLAMATION',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '02/01/2024',
    },
    {
      id: 1,
      LIBELLE: 'PROBLEME DE VERSEMENT',
      NATURE: 'PLAINTE',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '01/01/2024',
    },
    {
      id: 2,
      LIBELLE: 'PROBLEME DE RETRAIT',
      NATURE: 'RECLAMATION',
      STATUT: 'NOUVELLE PLAINTE',
      DATE: '02/01/2024',
    },
  ];
  statuFormulaire: any = 'ENREGISTREMENT';
  statusOrderListe: boolean = false;
  affiche_liste_client: boolean = false;

  checkedMnuReclamation: any = 'checked';
  checkedMnuRelance: any = '';
  checkedMnuOperateur: any = '';
  checkedMnuClient: any = '';
  checkedMnuEdition: any = '';
  checkedCreationDeReclamation: any = '';
  checkedCreationOperateur: any = '';
  checkedCreationClient: any = '';
  checkedEditionBceao: any = '';
  checkedEditionStatistique: any = '';
  checkedEditionFrequence: any = '';

  constructor(
    public AdminService: AdminService,
    private toastr: ToastrService,
    public LanguageService: LanguageService
  ) {}

  rowClicked(info: any): void {
    $('#sendInvoiceOffcanvas').offcanvas('show');
    this.statusOrderListe = true;
    this.voirlist = this.ListeOperateur[info.id];
    this.ComboDroitPARUtilisateur(this.voirlist.CU_CODECOMPTEUTULISATEUR);
  }

  checkModif() {
    this.statusOrderListe = false;
    this.statuFormulaire = 'MODIFICATION';
    this.formulaire_operateur[0].valeur = this.voirlist.CU_NOMUTILISATEUR;
    this.formulaire_operateur[1].valeur = '';
    this.formulaire_operateur[2].valeur = this.voirlist.CU_EMAIL;
    this.formulaire_operateur[3].valeur = this.voirlist.AG_CODEAGENCE;
    this.formulaire_operateur[4].valeur = this.voirlist.CU_CONTACT;
    this.formulaire_operateur[5].valeur = this.voirlist.CU_LOGIN;
    this.formulaire_operateur[6].valeur = this.voirlist.CU_MOTDEPASSE;
    this.AdminService.ShowLoader();
    setTimeout(() => {
      this.ListeDroitUser.forEach((LtDroitUser2: any) => {
        LtDroitUser2.DP_STATUT = 'N';
      });
      if (this.ListeDroitforUser.length > 0) {
        this.ListeDroitUser.forEach((LtDroitUser2: any) => {
          this.ListeDroitforUser.forEach((LtDroifortUser: any) => {
            if (
              LtDroifortUser.DP_CODEDROITCOMPTEUTULISATEUR ==
              LtDroitUser2.DP_CODEDROITCOMPTEUTULISATEUR
            ) {
              LtDroitUser2.DP_STATUT = 'O';
            }
          });
        });
        this.AdminService.CloseLoader();
      }
    }, 2000);
  }
  changeVall(index: any) {
    if (this.ListeDroitUser[index].DP_STATUT == 'O') {
      this.ListeDroitUser[index].DP_STATUT = 'N';
    } else {
      this.ListeDroitUser[index].DP_STATUT = 'O';
    }
  }
  cocheAll() {
    if (this.statutAlldroit == false) {
      this.ListeDroitUser.forEach((LtDroitUser2: any) => {
        LtDroitUser2.DP_STATUT = 'O';
      });
      this.statutAlldroit = true;
    } else {
      this.ListeDroitUser.forEach((LtDroitUser2: any) => {
        LtDroitUser2.DP_STATUT = 'N';
      });
      this.statutAlldroit = false;
    }
  }

  chargementDate() {
    var pt = this;
    $(function () {
      'use strict';
      $.fn.dataTable.ext.errMode = 'throw';
      $('.datatables-basic').DataTable().destroy();
      var dt_basic_table = $('.datatables-basic');

      // DataTable with buttons
      // --------------------------------------------------------------------

      if (dt_basic_table.length) {
        var dt_basic = dt_basic_table.DataTable({
          data: pt.RecupOerateurs,
          columns: [
            { data: 'NOM' }, // Colonne "full_name"
            { data: 'CONTACT' }, // Colonne "full_name"
            { data: 'LOGIN' }, // Colonne "full_name"
            { data: 'MOTDEPASSE' }, // Colonne "email"
          ],
          select: {
            style: 'single',
            selector: 'td:first-child',
          },
          rowCallback: function (row: any, data: any, index: any) {
            $(row).on('dblclick', function () {
              // Appeler la fonction ici
              pt.rowClicked(data);
            });
          },
          /* createdRow: function (row, data, index) {
                if (data.NATURE === 'RECLAMATION') {
                  $(row).find('td:eq(1)').css('color', 'green');
                } else if (data.NATURE === 'PLAINTES') {
                  $(row).find('td:eq(1)').css('color', 'red');
                }
              }*/
          createdRow: function (row: any, data: any, index: any) {
            if (data.NATURE === 'RECLAMATION') {
              $(row).css('background-color', '#f1faee');
            } else if (data.NATURE === 'PLAINTE') {
              $(row).css('background-color', '#ffffff');
            }
          },
          responsive: true,
          order: [[2, 'desc']],
          dom: '<"card-header"<"head-label text-center"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
          displayLength: 7,
          lengthMenu: [7, 10, 25, 50, 75, 100],
          buttons: [
            {
              extend: 'collection',
              className: 'btn btn-label-primary dropdown-toggle me-2',
              text: '<i class="mdi mdi-export-variant me-1"></i>Exporter',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="mdi mdi-printer-outline me-1" ></i>Imprimer',
                  className: 'dropdown-item',
                  exportOptions: { columns: [0, 1, 2, 3] },
                },
                /* {
                  extend: 'csv',
                  text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [0, 1, 2, 3] },
                }, */
                {
                  extend: 'excel',
                  text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [0, 1, 2, 3] },
                },
                {
                  extend: 'pdf',
                  text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [0, 1, 2, 3] },
                },
                /* {
                  extend: 'copy',
                  text: '<i class="mdi mdi-content-copy me-1" ></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [0, 1, 2, 3] },
                }, */
              ],
            },
          ],
        });

        $('div.head-label').html('<h5 class="card-title mb-0"></h5>');
      }
    });
  }

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

        this.ComboListeDroitUtilisateur();

        if (this.ListeComboAgence[0].clsResultat.SL_RESULTAT == 'TRUE') {
          //  this.ComboOperateur()
        } else {
        }
      },
      (error) => {}
    );
  }

  ComboListeDroitUtilisateur() {
    let Option =
      'RequeteClientsClasse.svc/pvgInsertIntoDatasetListeDroitUtilisateur';
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
        this.ListeDroitUser = success;
        this.ListeDesClients();
      },
      (error) => {}
    );
  }

  ComboDroitPARUtilisateur(idOperateur: any) {
    let Option = 'RequeteClientsClasse.svc/pvgDroitParOperateurs';
    let body = {
      Objets: [
        {
          CU_CODECOMPTEUTULISATEUR: idOperateur,
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
        this.ListeDroitforUser = success;
        this.ListeDroitforUser =
          this.ListeDroitforUser.pvgDroitParOperateursResult;
        if (this.ListeDroitforUser[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.statutdroit = true;
        } else {
          this.statutdroit = false;
        }
      },
      (error) => {}
    );
  }

  EnregistrementDroitOperateurModif() {
    let Options = 'RequeteClientsClasse.svc/pvgAjouterdroitOperateur'; // le chemin d'appel du service web

    var tabdroitOperateur = [];
    for (var i = 0; i < this.ListeDroitUser.length; i++) {
      //if(this.ListeDroitUser[i].DP_STATUT == 'O'){
      var prepa_objet = {
        CU_CODECOMPTEUTULISATEUR: this.voirlist.CU_CODECOMPTEUTULISATEUR,
        DP_CODEDROITCOMPTEUTULISATEUR:
          this.ListeDroitUser[i].DP_CODEDROITCOMPTEUTULISATEUR,
        DP_LIBELLEDROITCOMPTEUTULISATEUR:
          this.ListeDroitUser[i].DP_LIBELLEDROITCOMPTEUTULISATEUR,
        DP_STATUT: this.ListeDroitUser[i].DP_STATUT,
        clsObjetEnvoi: {
          ET_CODEETABLISSEMENT: '',
          AN_CODEANTENNE: '',
          TYPEOPERATION: '01',
        },
      };

      tabdroitOperateur.push(prepa_objet);
      prepa_objet = {
        CU_CODECOMPTEUTULISATEUR: '',
        DP_CODEDROITCOMPTEUTULISATEUR: '.',
        DP_LIBELLEDROITCOMPTEUTULISATEUR: '',
        DP_STATUT: '',
        clsObjetEnvoi: {
          ET_CODEETABLISSEMENT: '',
          AN_CODEANTENNE: '',
          TYPEOPERATION: '01',
        },
      };
      //}
    }
    //objet d'envoi
    let body = {
      Objet: tabdroitOperateur,
    };
    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_droit_operateur = success;
        this.tab_droit_operateur = JSON.parse(this.tab_droit_operateur);
        this.tab_droit_operateur = this.tab_droit_operateur.TABLE;
        if (this.tab_droit_operateur[0].SL_RESULTAT == 'FALSE') {
          this.toastr.error(this.tab_droit_operateur[0].SL_MESSAGE, 'error', {
            positionClass: 'toast-bottom-left',
          });
          this.AdminService.CloseLoader();
        } else {
          this.toastr.success(
            this.tab_droit_operateur[0].SL_MESSAGE,
            'success',
            { positionClass: 'toast-bottom-left' }
          );

          this.AdminService.CloseLoader();
        }
      },
      (error: any) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(this.tab_droit_operateur[0].SL_MESSAGE, 'warning', {
          positionClass: 'toast-bottom-left',
        });
      }
    );
  }

  EnregistrementDroitOperateur() {
    let Options = 'RequeteClientsClasse.svc/pvgAjouterdroitOperateur'; // le chemin d'appel du service web

    var tabdroitOperateur = [];
    for (var i = 0; i < this.ListeDroitUser.length; i++) {
      for (let index = 0; index < this.valtabAgence.length; index++) {
        if (
          this.valtabAgence[index] ==
          this.ListeDroitUser[i].DP_CODEDROITCOMPTEUTULISATEUR
        ) {
          var prepa_objet = {
            CU_CODECOMPTEUTULISATEUR: this.recup_idoperateur,
            DP_CODEDROITCOMPTEUTULISATEUR:
              this.ListeDroitUser[i].DP_CODEDROITCOMPTEUTULISATEUR,
            DP_LIBELLEDROITCOMPTEUTULISATEUR:
              this.ListeDroitUser[i].DP_LIBELLEDROITCOMPTEUTULISATEUR,
            DP_STATUT: 'O',
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          };

          tabdroitOperateur.push(prepa_objet);
          prepa_objet = {
            CU_CODECOMPTEUTULISATEUR: '',
            DP_CODEDROITCOMPTEUTULISATEUR: '.',
            DP_LIBELLEDROITCOMPTEUTULISATEUR: '',
            DP_STATUT: '',
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '01',
            },
          };
        }
      }
    }

    //objet d'envoi
    let body = {
      Objet: tabdroitOperateur,
    };
    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Options).subscribe(
      (success) => {
        this.tab_droit_operateur = success;
        this.tab_droit_operateur = JSON.parse(this.tab_droit_operateur);
        this.tab_droit_operateur = this.tab_droit_operateur.TABLE;
        if (this.tab_droit_operateur[0].SL_RESULTAT == 'FALSE') {
          this.toastr.error(this.tab_droit_operateur[0].SL_MESSAGE, 'error', {
            positionClass: 'toast-bottom-left',
          });
          this.AdminService.CloseLoader();
        } else {
          this.toastr.success(
            this.tab_droit_operateur[0].SL_MESSAGE,
            'success',
            { positionClass: 'toast-bottom-left' }
          );
          this.viderchamp();
          this.AdminService.CloseLoader();
        }
      },
      (error: any) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(this.tab_droit_operateur[0].SL_MESSAGE, 'warning', {
          positionClass: 'toast-bottom-left',
        });
      }
    );
  }

  ListeDesClients() {
    this.AdminService.ShowLoader();
    let Option = 'RequeteClientsClasse.svc/pvgInsertIntoDatasetListeClient';
    var CodeAgenceUtilisateur =
      this.recupinfo[0].CU_CODECOMPTEUTULISATEUR.substring(0, 4);
    let body = {
      Objets: [
        {
          OE_PARAM: ['0002', CodeAgenceUtilisateur],
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
        this.tab_list_client = success;
        console.log('tab_list_client', this.tab_list_client);
        if (this.tab_list_client[0].SL_RESULTAT == 'TRUE') {
          this.affiche_liste_client = true;
          this.AdminService.CloseLoader();
        } else {
          this.affiche_liste_client = false;
          this.AdminService.CloseLoader();
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
      }
    );
  }

  ListeOperateurs() {
    let Option = 'RequeteClientsClasse.svc/pvgListeUtilisateurs';
    var CodeAgenceUtilisateur =
      this.recupinfo[0].CU_CODECOMPTEUTULISATEUR.substring(0, 4);
    let body = {
      Objets: [
        {
          OE_PARAM: this.recupinfo[0].CU_NOMUTILISATEUR.includes('ADMIN')
            ? [CodeAgenceUtilisateur, '0001']
            : [CodeAgenceUtilisateur, '0001'],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    // $(".datatables-basic").DataTable().destroy();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeOperateur = success;
        this.ListeOperateur = this.ListeOperateur.pvgListeUtilisateursResult;
        if (this.ListeOperateur[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.AdminService.CloseLoader();
          this.RecupOerateurs = [];
          var obj = {
            id: '',
            NOM: '',
            CONTACT: '',
            LOGIN: '',
            MOTDEPASSE: '',
          };
          for (let i = 0; i < this.ListeOperateur.length; i++) {
            obj = {
              id: i.toString(),
              NOM: this.ListeOperateur[i].CU_NOMUTILISATEUR,
              CONTACT: this.ListeOperateur[i].CU_CONTACT,
              LOGIN: this.ListeOperateur[i].CU_LOGIN,
              MOTDEPASSE: this.ListeOperateur[i].CU_MOTDEPASSE,
            };
            this.RecupOerateurs.push(obj);
          }
          //  this.toastr.success(this.ListeOperateur[0].clsResultat.SL_MESSAGE, 'success', { positionClass: 'toast-bottom-left'});
          this.chargementDate();
        } else {
          this.AdminService.CloseLoader();
          this.toastr.error(
            this.ListeOperateur[0].clsResultat.SL_MESSAGE,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
          this.RecupOerateurs = [];
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.ListeOperateur[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
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
            AG_CODEAGENCE:
              this.statuFormulaire == 'MODIFICATION'
                ? '1000'
                : this.formulaire_operateur[3].valeur, //this.formulaire_operateur[3].valeur,
            CU_ADRESSEGEOGRAPHIQUEUTILISATEUR: '.',
            CU_CLESESSION: '',
            CU_CODECOMPTEUTULISATEUR:
              this.statuFormulaire == 'MODIFICATION'
                ? this.voirlist.CU_CODECOMPTEUTULISATEUR
                : '',
            CU_CONTACT: this.formulaire_operateur[4].valeur, //"2250747839553",
            CU_DATECLOTURE: '01/01/1900',
            CU_DATECREATION: date, //"01/01/1900",
            CU_DATEPIECE: '01/01/1900',
            CU_EMAIL: this.formulaire_operateur[2].valeur, // "d.baz1008@gmail.com",
            CU_LOGIN: this.formulaire_operateur[5].valeur, //"d.baz1008@gmail.com",
            CU_MOTDEPASSE: this.formulaire_operateur[6].valeur, //"2250747839553",
            CU_NOMBRECONNECTION: '0',
            CU_NOMUTILISATEUR: `${this.formulaire_operateur[0].valeur} ${this.formulaire_operateur[1].valeur}`, //"bolaty",
            CU_NUMEROPIECE: 'XXXX',
            CU_NUMEROUTILISATEUR: '0',
            CU_TOKEN: '',
            PI_CODEPIECE: '00001',
            TU_CODETYPEUTILISATEUR: '0001',
            clsReqmicclient: null,
            clsReqmicprospect: null,
            clsReqoperateur: {
              OP_CODEOPERATEUR: '',
              OP_CODEOPERATEURZENITH: 'dddd',
              AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE,
              PV_CODEPOINTVENTE: '100000001',
              CU_CODECOMPTEUTULISATEUR:
                this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,
              SR_CODESERVICE: '01',
              OP_DATESAISIE: date,
            },
            clsReqtontineepargnantjournalier: null,
            clsReqDroitOperateur: null, //laaa
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: this.statuFormulaire == 'MODIFICATION' ? '1' : '4',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Options).subscribe(
        (success) => {
          this.tab_eng_operateur = success;
          this.tab_eng_operateur =
            this.tab_eng_operateur.pvgMajUtilisateursResult;
          if (this.tab_eng_operateur.clsResultat.SL_RESULTAT == 'FALSE') {
            // this.toastr.error(this.tab_eng_operateur.clsResultat.SL_MESSAGE);
            this.toastr.error(
              this.tab_eng_operateur.clsResultat.SL_MESSAGE,
              'error',
              { positionClass: 'toast-bottom-left' }
            );
            this.AdminService.CloseLoader();
          } else {
            /* this.toastr.success(
              this.tab_eng_operateur.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );*/
            if (this.statuFormulaire == 'MODIFICATION') {
              this.EnregistrementDroitOperateurModif();
            } else {
              this.recup_idoperateur =
                this.tab_eng_operateur.CU_CODECOMPTEUTULISATEUR;
              this.EnregistrementDroitOperateur();
            }

            for (let index = 0; index < tableau_recu.length; index++) {
              tableau_recu[index].valeur = '';
            }
            this.ListeOperateurs();
            this.AdminService.CloseLoader();
          }
        },
        (error: any) => {
          this.AdminService.CloseLoader();
          // this.toastr.warning(this.tab_eng_operateur.clsResultat.SL_MESSAGE);
          this.toastr.warning(
            this.tab_eng_operateur.clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }
  }
  viderchamp() {
    this.statuFormulaire = 'ENREGISTREMENT';
    for (let index = 0; index < this.formulaire_operateur.length; index++) {
      this.formulaire_operateur[index].valeur = '';
    }
    this.ListeDroitUser = [];
    this.ComboListeDroitUtilisateur();
  }
  RechercherClient(search_bar: any) {
    let Option =
      'RequeteClientsClasse.svc/pvgListeUtilisateursRechercheParAgence';

    /*   if (search_bar == undefined || search_bar == '') {
      this.toastr.error(
        'Veuillez renseigner un code ou un téléphone',
        'error',
        {
          positionClass: 'toast-bottom-left',
        }
      );
    } else { */
    var CodeAgenceUtilisateur =
      this.recupinfo[0].CU_CODECOMPTEUTULISATEUR.substring(0, 4);
    let body;
    // if (search_bar.substr(0, 1) === '0') {
    // dans le cas d'une recherche avec numero de telephone
    body = {
      Objets: [
        {
          OE_PARAM: ['0002', '', search_bar, CodeAgenceUtilisateur, '01'],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    /* } else {
        // dans le cas d'une recherche avec code client
        body = {
          Objets: [
            {
              OE_PARAM: ['0002', search_bar, '', '', '01'],
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '01',
              },
            },
          ],
        };
      } */

    // $(".datatables-basic").DataTable().destroy();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_list_client = success;
        this.tab_list_client =
          this.tab_list_client.pvgListeUtilisateursRechercheParAgenceResult;
        console.log('tab_list_client_2', this.tab_list_client);
        if (this.tab_list_client[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.affiche_liste_client = true;
          this.AdminService.CloseLoader();
        } else {
          this.affiche_liste_client = false;
          this.AdminService.CloseLoader();
          this.toastr.error(
            this.tab_list_client[0].clsResultat.SL_MESSAGE,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.affiche_liste_client = false;
        this.toastr.warning(
          this.tab_list_client[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
    // }
  }

  ModifyInfoClient(le_client: any) {
    this.formulaire_client[0].valeur = le_client.CU_NOMUTILISATEUR;
    this.formulaire_client[1].valeur = le_client.CU_CONTACT;
    this.formulaire_client[2].valeur = '';
    this.formulaire_client[3].valeur = le_client.CU_EMAIL;
    this.item_client = le_client;
    $('#modifInfoClienOffcanvas').offcanvas('show');
  }
  toggleAllCheckboxes2(event: any) {
    const isChecked = event.target.checked;
    // Parcourir toutes les cases à cocher et les cocher ou les décocher
    this.ListeDroitUser.forEach((LtDroitUser2: any) => {
      LtDroitUser2.isChecked = isChecked;
    });

    if (isChecked) {
      for (let i = 0; i < this.ListeDroitUser.length; i++) {
        this.valtabAgence.push(
          this.ListeDroitUser[i].DP_CODEDROITCOMPTEUTULISATEUR
        );
      }
    } else {
      this.valtabAgence = [];
    }
  }
  toggleAllCheckboxes(event: any) {
    const isChecked = event.target.checked;
    // Parcourir toutes les cases à cocher et les cocher ou les décocher
    this.ListeDroitUser.forEach((LtDroitUser: any) => {
      LtDroitUser.isChecked = isChecked;
    });

    if (isChecked) {
      for (let i = 0; i < this.ListeDroitUser.length; i++) {
        this.valtabAgence.push(
          this.ListeDroitUser[i].DP_CODEDROITCOMPTEUTULISATEUR
        );
      }
    } else {
      this.valtabAgence = [];
    }
  }
  VerifyTabAgence(element: any): void {
    // const index = this.valtabAgence.findIndex(obj => obj.id === element.id);
    const index = this.valtabAgence.indexOf(element);
    if (index !== -1) {
      // Si l'élément existe, le supprimer du tableau
      this.valtabAgence.splice(index, 1);
      console.log("L'élément existe déjà dans le tableau. Il a été supprimé.");
    } else {
      // Sinon, ajouter l'élément au tableau
      this.valtabAgence.push(element);
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
            AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE, // this.formulaire_plaintes_reclamations[3].valeur,
            CU_ADRESSEGEOGRAPHIQUEUTILISATEUR: '.',
            CU_CLESESSION: '',
            CU_CODECOMPTEUTULISATEUR: this.item_client.CU_CODECOMPTEUTULISATEUR,
            CU_CONTACT: this.formulaire_client[1].valeur, //"2250747839553",
            CU_DATECLOTURE: '01/01/1900',
            CU_DATECREATION: date, //"01/01/1900",
            CU_DATEPIECE: '01/01/1900',
            CU_EMAIL: this.formulaire_client[3].valeur, // "d.baz1008@gmail.com",
            CU_LOGIN: this.item_client.CU_LOGIN, //"d.baz1008@gmail.com",
            CU_MOTDEPASSE: this.item_client.CU_MOTDEPASSE, //"2250747839553",
            CU_NOMBRECONNECTION: '0',
            CU_NOMUTILISATEUR: this.formulaire_client[0].valeur, //"bolaty",
            CU_NUMEROPIECE: 'XXXX',
            CU_NUMEROUTILISATEUR: this.item_client.CU_NUMEROUTILISATEUR,
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
              TYPEOPERATION: '1',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Options).subscribe(
        (success) => {
          this.tab_enrg_cpte_client = success;
          this.tab_enrg_cpte_client =
            this.tab_enrg_cpte_client.pvgMajUtilisateursResult;
          if (this.tab_enrg_cpte_client.clsResultat.SL_RESULTAT == 'FALSE') {
            this.AdminService.CloseLoader();
            this.toastr.error(
              this.tab_enrg_cpte_client.clsResultat.SL_MESSAGE,
              'error',
              { positionClass: 'toast-bottom-left' }
            );
          } else {
            this.AdminService.CloseLoader();
            this.toastr.success(
              this.tab_enrg_cpte_client.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
            this.ListeDesClients();
          }
        },
        (error: any) => {
          this.AdminService.CloseLoader();
          this.toastr.warning(
            this.tab_enrg_cpte_client.clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }
  }

  RechercheAvecTouche1(e: any) {
    // Vérifier si la touche pressée est Entrée
    if (e.key === 'Enter') {
      // Appeler la fonction lorsque la touche Entrée est pressée
      this.RechercherClient(this.search_bar);
    }
  }

  ngOnInit(): void {
    //  this.ecran_affiche = this.ecran_affiche == "" ? "client" : "operateur"
    this.ComboAgence();

    var pt = this;

    /* setTimeout(() => {
      pt.chargementDate();
    }, 1000);*/
  }
}
