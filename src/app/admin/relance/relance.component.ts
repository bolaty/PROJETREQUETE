import { Component } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-relance',
  templateUrl: './relance.component.html',
  styleUrls: ['./relance.component.scss']
})
export class RelanceComponent {
  recupclient:any =  [
    {
      "id": 1,
      "LIBELLE": "PROBLEME DE VERSEMENT",
      "NATURE": "PLAINTE",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "01/01/2024",
    },
    {
      "id": 2,
      "LIBELLE": "PROBLEME DE RETRAIT",
      "NATURE": "RECLAMATION",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "02/01/2024",
    },
    {
      "id": 1,
      "LIBELLE": "PROBLEME DE VERSEMENT",
      "NATURE": "PLAINTE",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "01/01/2024",
    },
    {
      "id": 2,
      "LIBELLE": "PROBLEME DE RETRAIT",
      "NATURE": "RECLAMATION",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "02/01/2024",
    }
    ,
    {
      "id": 1,
      "LIBELLE": "PROBLEME DE VERSEMENT",
      "NATURE": "PLAINTE",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "01/01/2024",
    },
    {
      "id": 2,
      "LIBELLE": "PROBLEME DE RETRAIT",
      "NATURE": "RECLAMATION",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "02/01/2024",
    }
    ,
    {
      "id": 1,
      "LIBELLE": "PROBLEME DE VERSEMENT",
      "NATURE": "PLAINTE",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "01/01/2024",
    },
    {
      "id": 2,
      "LIBELLE": "PROBLEME DE RETRAIT",
      "NATURE": "RECLAMATION",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "02/01/2024",
    }
    ,
    {
      "id": 1,
      "LIBELLE": "PROBLEME DE VERSEMENT",
      "NATURE": "PLAINTE",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "01/01/2024",
    },
    {
      "id": 2,
      "LIBELLE": "PROBLEME DE RETRAIT",
      "NATURE": "RECLAMATION",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "02/01/2024",
    }
    ,
    {
      "id": 1,
      "LIBELLE": "PROBLEME DE VERSEMENT",
      "NATURE": "PLAINTE",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "01/01/2024",
    },
    {
      "id": 2,
      "LIBELLE": "PROBLEME DE RETRAIT",
      "NATURE": "RECLAMATION",
      "STATUT": "NOUVELLE PLAINTE",
      "DATE": "02/01/2024",
    }
    
  ]
  rowClicked(info: any): void {
  $("#sendInvoiceOffcanvas").offcanvas('show')
  }
  chargementDate(){
    var pt = this
    $(function () {
      'use strict';
      $.fn.dataTable.ext.errMode = 'throw';
      $(".datatables-basic").DataTable().destroy();
      var dt_basic_table = $('.datatables-basic');
    
      // DataTable with buttons
      // --------------------------------------------------------------------
    
      if (dt_basic_table.length) {
        var dt_basic = dt_basic_table.DataTable({
          data: pt.recupclient,
          columns: [
            { data: 'LIBELLE' },  // Colonne "full_name"
            { data: 'NATURE' },  // Colonne "full_name"
            { data: 'STATUT' },  // Colonne "full_name"
            { data: 'DATE' },  // Colonne "email"
          
          ],
          select: {
            style: 'single',
            selector: 'td:first-child'
          },
          rowCallback: function (row:any, data:any, index:any) {
            $(row).on('click', function () {
              // Appeler la fonction ici
              pt.rowClicked(data);
            });
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
              text: '<i class="mdi mdi-export-variant me-1"></i>Export',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="mdi mdi-printer-outline me-1" ></i>Print',
                  className: 'dropdown-item',
                  exportOptions: { columns: [0, 1, 2, 3] }
                },
                {
                  extend: 'csv',
                  text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3] }
                },
                {
                  extend: 'excel',
                  text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3]}
                },
                {
                  extend: 'copy',
                  text: '<i class="mdi mdi-content-copy me-1" ></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3] }
                }
              ]
            }
          ]
        });
        
        $('div.head-label').html('<h5 class="card-title mb-0">RELANCE</h5>');
      }
});
  }

  ngOnInit(): void {
    var pt = this
    
    setTimeout(() => {
      pt.chargementDate();
    }, 1000);
  }
}
