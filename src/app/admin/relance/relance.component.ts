import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/services/language.service';

declare var $: any;

@Component({
  selector: 'app-relance',
  templateUrl: './relance.component.html',
  styleUrls: ['./relance.component.scss'],
})
export class RelanceComponent {
  recupinfo: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
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
  recupEtape: any;
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
    },
  ];
  retourRequeteEnregistrement: any = [];
  ListeRelance: any = [];
  RecupRelances: any = [];
  ListeComboEtapes: any = [];
  ListeComboOperateur: any = [];
  tab_enregistrement_traitement: any = [];
  constructor(
    public AdminService: AdminService,
    private toastr: ToastrService,
    public LanguageService: LanguageService
  ) {}

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
        if (this.ListeComboEtapes[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ComboOperateur();
        } else {
        }
      },
      (error) => {}
    );
  }
  ComboOperateur() {
    let Option = 'RequeteClientsClasse.svc/pvgListeUtilisateursCombo';
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
        this.ListeComboOperateur = success;
        this.ListeComboOperateur =
          this.ListeComboOperateur.pvgListeUtilisateursComboResult;
        if (this.ListeComboOperateur[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ListeDesRelance();
        } else {
        }
      },
      (error) => {}
    );
  }

  ClotureEtape() {
    var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }
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
          RQ_CODEREQUETE: this.recupEtape.RQ_CODEREQUETE,
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
          //this.ViderChamp()
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
  rowClicked(info: any): void {
    this.recupEtape = this.ListeRelance[info.id];
    //$("#sendInvoiceOffcanvas").offcanvas('show')
    $('#addNewAddress').modal('show');
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
          data: pt.RecupRelances,
          columns: [
            { data: 'OBJET' }, // Colonne "full_name"
            { data: 'DESCRIPTION' }, // Colonne "full_name"
            { data: 'NATURE' }, // Colonne "full_name"
            { data: 'OBSERVATIONAGENT' }, // Colonne "email"
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
              className: 'btn btn-label-primary dropdown-toggle me-2', //@ts-ignore
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
                  exportOptions: { columns:  [0, 1, 2, 3] }
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
                  exportOptions: { columns:  [0, 1, 2, 3] }
                } */
              ],
            },
          ],
        });

        $('div.head-label').html(
          //@ts-ignore
          '<h5 class="card-title mb-0">  </h5>'
        );
      }
    });
  }
  ListeDesRelance() {
    var d = new Date();
    var date = d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
    var jour = d.getDate();
    if (jour < 10) {
      var date =
        '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      console.log(date);
    }
    let Option = 'RequeteClientsClasse.svc/pvgListeReqrequeteRelance';
    let body = {
      Objets: [
        {
          OE_PARAM: [date, '01'],
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
        this.ListeRelance = success;
        this.ListeRelance = this.ListeRelance.pvgListeReqrequeteRelanceResult;
        this.RecupRelances = [];
        if (this.ListeRelance[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.AdminService.CloseLoader();
          this.RecupRelances = [];
          var obj = {
            id: '',
            OBJET: '',
            DESCRIPTION: '',
            NATURE: '',
            OBSERVATIONAGENT: '',
          };
          for (let i = 0; i < this.ListeRelance.length; i++) {
            // if(this.ListeRelance[i].NR_LIBELLENATUREREQUETE == 'RECLAMATION'){
            obj = {
              id: i.toString(),
              OBJET: this.ListeRelance[i].TR_LIBELLETYEREQUETE,
              DESCRIPTION: this.ListeRelance[i].RQ_DESCRIPTIONREQUETE,
              NATURE: this.ListeRelance[i].NR_LIBELLENATUREREQUETE,
              OBSERVATIONAGENT:
                this.ListeRelance[i].RQ_OBSERVATIONAGENTTRAITEMENTREQUETE,
            };
            this.RecupRelances.push(obj);
            //  }
          }
          this.toastr.success(
            this.ListeRelance[0].clsResultat.SL_MESSAGE,
            'success',
            { positionClass: 'toast-bottom-left' }
          );
          this.chargementDate();
        } else {
          this.AdminService.CloseLoader();
          this.toastr.error(
            this.ListeRelance[0].clsResultat.SL_MESSAGE,
            'error',
            { positionClass: 'toast-bottom-left' }
          );
          this.RecupRelances = [];
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
        this.toastr.warning(
          this.ListeRelance[0].clsResultat.SL_MESSAGE,
          'warning',
          { positionClass: 'toast-bottom-left' }
        );
      }
    );
  }

  RelanceRequetePrincipale() {
    /* if(this.recupinfo.RQ_DATECLOTUREREQUETE == "01/01/1900"){
      this.toastr.error(
        "veuillez d'abord cloturé cette relamation",
        'error',
        { positionClass: 'toast-bottom-left' }
      );
    }else{*/
    let Options = 'RequeteClientsClasse.svc/pvgMajReqrequete'; // le chemin d'appel du service web
    //objet d'envoi
    let body = {
      Objets: [
        {
          AC_CODEACTIONCORRECTIVE: '',
          CU_CODECOMPTEUTULISATEUR: this.recupEtape.CU_CODECOMPTEUTULISATEUR,
          CU_CODECOMPTEUTULISATEURAGENTENCHARGE:
            this.recupEtape.CU_CODECOMPTEUTULISATEURAGENTENCHARGE,
          MC_CODEMODECOLLETE: this.recupEtape.MC_CODEMODECOLLETE,
          NS_CODENIVEAUSATISFACTION: this.recupEtape.NS_CODENIVEAUSATISFACTION,
          RQ_CODEREQUETE: '0',
          RQ_CODEREQUETERELANCEE: this.recupEtape.RQ_CODEREQUETE,
          RQ_DATECLOTUREREQUETE: '01/01/1900', //this.recupinfo.RQ_DATECLOTUREREQUETE,
          RQ_DATEDEBUTTRAITEMENTREQUETE: '01/01/1900', //this.recupinfo.RQ_DATEDEBUTTRAITEMENTREQUETE,
          RQ_DATEFINTRAITEMENTREQUETE: '01/01/1900', //this.recupinfo.RQ_DATEFINTRAITEMENTREQUETE,
          RQ_DATESAISIEREQUETE: this.recupEtape.RQ_DATESAISIEREQUETE,
          RQ_DATETRANSFERTREQUETE: this.recupEtape.RQ_DATETRANSFERTREQUETE,
          RQ_DELAITRAITEMENTREQUETE: '',
          RQ_DESCRIPTIONREQUETE: this.recupEtape.RQ_DESCRIPTIONREQUETE,
          RQ_DUREETRAITEMENTREQUETE: '',
          RQ_LOCALISATIONCLIENT: this.recupEtape.RQ_LOCALISATIONCLIENT,
          RQ_NUMERORECOMPTE: this.recupEtape.RQ_NUMERORECOMPTE,
          RQ_NUMEROREQUETE: this.recupEtape.RQ_NUMEROREQUETE,
          RQ_OBJETREQUETE: this.recupEtape.RQ_OBJETREQUETE,
          RQ_OBSERVATIONAGENTTRAITEMENTREQUETE: '', // this.recupinfo.RQ_OBSERVATIONAGENTTRAITEMENTREQUETE,
          RQ_OBSERVATIONDELAITRAITEMENTREQUETE: '', //this.recupinfo.RQ_OBSERVATIONDELAITRAITEMENTREQUETE,
          RQ_AFFICHERINFOCLIENT: 'O',
          RQ_SIGNATURE: '',
          RQ_SIGNATURE1: '',
          RS_CODESTATUTRECEVABILITE: '', //this.recupinfo.RS_CODESTATUTRECEVABILITE,
          SR_CODESERVICE: this.recupEtape.SR_CODESERVICE,
          TR_CODETYEREQUETE: this.recupEtape.TR_CODETYEREQUETE,
          RT_CODETYPERELANCE: '02',
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
          this.ListeDesRelance();
          this.toastr.success(
            this.tab_enregistrement_traitement.clsResultat.SL_MESSAGE,
            'success',
            { positionClass: 'toast-bottom-left' }
          );
          $('#addNewAddress').modal('hide');
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
    // }
  }

  EnregistrementRequeteAffectation(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);
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
      } else {
        var d = new Date();
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
        }
        var recuperation = JSON.parse(
          sessionStorage.getItem('infoReque') || ''
        );
        let Options = 'RequeteClientsClasse.svc/pvgMajReqrequeteEtape'; // le chemin d'appel du service web
        //objet d'envoi
        let body = {
          Objets: [
            {
              AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE,
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
              RQ_CODEREQUETE: this.recupEtape.RQ_CODEREQUETE,
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

  selectionEtape(info: any) {
    this.recupEtape = info;
  }

  viderChampAff() {
    this.formulaire_attr_reclamations[0].valeur = '';
    this.formulaire_attr_reclamations[1].valeur = '';
    this.formulaire_attr_reclamations[2].valeur = '';
    this.formulaire_attr_reclamations[3].valeur = '';
    $('#addNewAddress').modal('hide');
  }

  ngOnInit(): void {
    this.ComboEtapeParam();
  }
}
