import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

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
  ListeComboAgence: any = [];
  ListeOperateur: any = [];
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
  constructor(
    public AdminService: AdminService,
    private toastr: ToastrService
  ) {}

  rowClicked(info: any): void {
    $('#sendInvoiceOffcanvas').offcanvas('show');
    this.statusOrderListe = true;
    this.voirlist = this.ListeOperateur[info.id];
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

        $('div.head-label').html(
          '<h5 class="card-title mb-0">Liste des opérateurs</h5>'
        );
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
        if (this.ListeComboAgence[0].clsResultat.SL_RESULTAT == 'TRUE') {
          //  this.ComboOperateur()
        } else {
        }
      },
      (error) => {}
    );
  }

  ListeOperateurs() {
    let Option = 'RequeteClientsClasse.svc/pvgListeUtilisateurs';
    let body = {
      Objets: [
        {
          OE_PARAM: ['1000', '0001'],
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
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }

      let Options = 'RequeteClientsClasse.svc/pvgMajUtilisateurs'; // le chemin d'appel du service web
      //objet d'envoi
      let body = {
        Objets: [
          {
            AG_CODEAGENCE: this.formulaire_operateur[3].valeur,
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
            this.toastr.success(
              this.tab_eng_operateur.clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
            for (let index = 0; index < tableau_recu.length; index++) {
              tableau_recu[index].valeur = '';
            }
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

  ngOnInit(): void {
    //  this.ecran_affiche = this.ecran_affiche == "" ? "client" : "operateur"
    this.ComboAgence();

    var pt = this;

    /* setTimeout(() => {
      pt.chargementDate();
    }, 1000);*/
  }
}
