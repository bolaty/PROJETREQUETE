import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { LanguageService } from 'src/app/services/language.service';
import { AdminService } from '../admin.service';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    public languageService: LanguageService,
    public AdminService: AdminService
  ) {}

  recupinfo: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');

  public chart_bar: any;
  public chart_pie: any;
  nombre_de_reclam: any = '';
  tab_session_graph: any = [];
  graphe_en_bande: any = [];
  graphe_circulaire: any = [];
  tab_intermediaire_bande_abs: any = [];
  tab_intermediaire_bande_ord: any = [];
  tab_data: any = [];
  tab_data_delai_trait: any = [];
  tab_data_nature_reclam_recu: any = [];
  tab_data_nombre_reclam: any = [];
  tab_data_situation_reclam: any = [];
  tab_data_taux_satisfaction: any = [];
  reclam_dans_le_delai: any = '';
  reclam_hors_le_delai: any = '';
  recap_reclam: any = {};
  recup_reclamation_stats: any = [];
  recup_reclamation_enrg: any = [];
  recup_reclamation_encour: any = [];
  recup_reclamation_attr: any = [];
  tab_intermediaire_cercle_absEnrg: any = [];
  tab_intermediaire_cercle_ordEnrgVal: any = [];
  tab_intermediaire_cercle_absEncour: any = [];
  tab_intermediaire_cercle_ordEncourVal: any = [];
  tab_intermediaire_cercle_abstraiter: any = [];
  tab_intermediaire_cercle_ordtraiterVal: any = [];
  couleurs_aleatoiresEnrg: any = [];
  couleurs_aleatoiresEncour: any = [];
  couleurs_aleatoirestraiter: any = [];
  ValEnregistrer:any=0
  tab_intermediaire_cercle_abs: any = [
    'libellé 1',
    'libellé 2',
    'libellé 3',
    'libellé 4',
    'libellé 5',
  ];
  tab_intermediaire_cercle_ord: any = ['1', '2', '3', '4', '5'];
  tab_intermediaire_color: any = [];
  background_color: any = [
    '#0e1428',
    '#333533',
    '#8183c0',
    '#d625d8',
    '#eb5e28',
    '#369EE2',
    '#b9fbc0',
    '#80ffdb',
    '#bc4b51',
    '#5b8e7d',
    '#495057',
    '#00afb9',
    '#fca311',
    '#023047',
    '#8338ec',
    '#ff006e',
    '#780000',
    '#bc6c25',
  ];
  table_id_pie: any = [
    'MyChartPie3',
    'MyChartPie4',
    'MyChartPie33',
    'MyChartPie44',
  ];
  table_id_bar: any = ['MyChartBar2', 'MyChartBar22'];

  chartColors = {
    donut: {
      series1: '#0070FF',
      series2: '#9055fdb3',
      series3: '#9055fd80',
    },
    donut2: {
      series1: '#03C03C',
      series2: '#56ca00cc',
      series3: '#56ca0099',
      series4: '#56ca0066',
    },
    line: {
      series1: '#E25822',
      series2: '#0070FF',
      series3: '#7367f029',
    },
  };

  FormationChartPieEnregistrer() {
    this.chart_pie = new Chart('MyChartPie3', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_absEnrg, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_intermediaire_cercle_ordEnrgVal, // table_data,
            backgroundColor: this.couleurs_aleatoiresEnrg, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  FormationChartPieEnregistrermodal() {
    this.chart_pie = new Chart('MyChartPie33', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_absEnrg, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_intermediaire_cercle_ordEnrgVal, // table_data,
            backgroundColor: this.couleurs_aleatoiresEnrg, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  FormationChartBarEncour() {
    this.chart_pie = new Chart('MyChartBar2', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_absEncour, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_intermediaire_cercle_ordEncourVal, // table_data,
            backgroundColor: this.couleurs_aleatoiresEncour, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  FormationChartBarEncourmodal() {
    this.chart_pie = new Chart('MyChartBar22', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_absEncour, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_intermediaire_cercle_ordEncourVal, // table_data,
            backgroundColor: this.couleurs_aleatoiresEncour, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  /*FormationChartBarEncour() {
    var datacour = []
    var obj = {
      label: '',
      data: '',
      backgroundColor: ''
    }
    if(this.recup_reclamation_encour.length > 0){
      for(var i = 0; i < this.recup_reclamation_encour.length; i++){
        obj = {
          label: this.recup_reclamation_encour[i].TR_LIBELLETYEREQUETE,
          data: this.recup_reclamation_encour[i].NOMBRE,
          backgroundColor: this.couleurs_aleatoiresEncour[i]
        }
        datacour.push(obj)
        obj = {
          label: '',
          data: '',
          backgroundColor: ''
        }
      }

    }
    this.chart_bar = new Chart('MyChartBar2', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_absEncour, // table_label,
        datasets: datacour,
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }*/

  /*FormationChartBarEncourmodal() {
    var datacour = []
    var obj = {
      label: '',
      data: '',
      backgroundColor: ''
    }
    if(this.recup_reclamation_encour.length > 0){
      for(var i = 0; i < this.recup_reclamation_encour.length; i++){
        obj = {
          label: this.recup_reclamation_encour[i].TR_LIBELLETYEREQUETE,
          data: this.recup_reclamation_encour[i].NOMBRE,
          backgroundColor: this.couleurs_aleatoiresEncour[i]
        }
        datacour.push(obj)
        obj = {
          label: '',
          data: '',
          backgroundColor: ''
        }
      }

    }
    this.chart_bar = new Chart('MyChartBar22', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_absEncour, // table_label,
        datasets: datacour,
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }*/

  FormationChartPietraite() {
    this.chart_pie = new Chart('MyChartPie4', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_abstraiter, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_intermediaire_cercle_ordtraiterVal, // table_data,
            backgroundColor: this.couleurs_aleatoirestraiter, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  FormationChartPietraitemodal() {
    this.chart_pie = new Chart('MyChartPie44', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_abstraiter, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_intermediaire_cercle_ordtraiterVal, // table_data,
            backgroundColor: this.couleurs_aleatoirestraiter, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  FormationChartPie(id_du_graphe: any) {
    this.chart_pie = new Chart(id_du_graphe, {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_abs, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_intermediaire_cercle_ord, // table_data,
            backgroundColor: this.background_color, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  FormationChartBar(id_du_graphe: any) {
    this.chart_bar = new Chart(id_du_graphe, {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_intermediaire_cercle_abs, // table_label,
        datasets: [
          {
            label: 'En cours de traitement',
            data: this.tab_intermediaire_cercle_ord, // table_data,
            backgroundColor: '#A725A5',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  PrintGraphPie(titre_graphe: any) {
    this.tab_session_graph = [
      {
        tab_intermediaire_cercle_abs_obj: [],
        tab_intermediaire_cercle_ord_obj: [],
        type_graphe: 'pie',
        titre_graphe: titre_graphe,
      },
    ];
    for (
      let index = 0;
      index < this.tab_intermediaire_cercle_abs.length;
      index++
    ) {
      this.tab_session_graph[0].tab_intermediaire_cercle_abs_obj.push(
        this.tab_intermediaire_cercle_abs[index]
      );
    }
    for (
      let index = 0;
      index < this.tab_intermediaire_cercle_ord.length;
      index++
    ) {
      this.tab_session_graph[0].tab_intermediaire_cercle_ord_obj.push(
        this.tab_intermediaire_cercle_ord[index]
      );
    }

    sessionStorage.setItem(
      'info_graphe',
      JSON.stringify(this.tab_session_graph)
    );

    window.open('/admin/impression', '_blank');
  }

  PrintGraphBar(titre_graphe: any) {
    this.tab_session_graph = [
      {
        tab_intermediaire_cercle_abs_obj: [],
        tab_intermediaire_cercle_ord_obj: [],
        type_graphe: 'bar',
        titre_graphe: titre_graphe,
      },
    ];
    for (
      let index = 0;
      index < this.tab_intermediaire_cercle_abs.length;
      index++
    ) {
      this.tab_session_graph[0].tab_intermediaire_cercle_abs_obj.push(
        this.tab_intermediaire_cercle_abs[index]
      );
    }
    for (
      let index = 0;
      index < this.tab_intermediaire_cercle_ord.length;
      index++
    ) {
      this.tab_session_graph[0].tab_intermediaire_cercle_ord_obj.push(
        this.tab_intermediaire_cercle_ord[index]
      );
    }

    sessionStorage.setItem(
      'info_graphe',
      JSON.stringify(this.tab_session_graph)
    );

    window.open('/admin/impression', '_blank');
  }

  isDarkStyle() {
    return document.documentElement.classList.contains('dark-style');
  }

  DataDashboard() {
    let Option = 'RequeteClientsClasse.svc/pvgTableauDeBord';

    let body = {
      AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE,
      RQ_DATEDEBUT: this.recupinfo[0].EX_DATEDEBUT,
      RQ_DATEFIN: this.recupinfo[0].EX_DATEFIN,
      CU_CODECOMPTEUTULISATEUR: this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,
      TYPEETAT: 'TSCLT',
    };

    this.AdminService.ShowLoader();
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_data = success;
        this.tab_data = this.tab_data.pvgTableauDeBordResult;
        console.log('dashboard_tab_data', this.tab_data);

        if (this.tab_data.clsResultat.SL_RESULTAT == 'TRUE') {
          // recuperation des differents tableaux
          this.tab_data_delai_trait =
            this.tab_data.clsTableauDeBordDelaiTraiPlaintes;
          this.tab_data_nature_reclam_recu =
            this.tab_data.clsTableauDeBordNatPlainteRecurs;
          this.tab_data_nombre_reclam =
            this.tab_data.clsTableauDeBordNbrePlainterefs;
          this.tab_data_situation_reclam =
            this.tab_data.clsTableauDeBordSituationPlaintes;
          this.tab_data_taux_satisfaction =
            this.tab_data.clsTableauDeBordTauxSatisfactions;

          // affectation dans les variables d'affichages
          this.nombre_de_reclam =
            this.tab_data_taux_satisfaction[0].TOTALPLAINTERECUES;
          this.reclam_dans_le_delai = this.tab_data_delai_trait[0].NOMBRE;
          this.reclam_hors_le_delai = this.tab_data_delai_trait[1].NOMBRE;
          this.recap_reclam = this.tab_data_situation_reclam[5];
          this.AdminService.CloseLoader();
        } else {
          this.AdminService.CloseLoader();
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
      }
    );
  }
  DataDashboardSTATISTIQUE() {
    var TYPEOPERATION = '0';
    if (this.recupinfo[0].CU_NOMUTILISATEUR.includes('ADMIN')) {
      TYPEOPERATION = '0';
    } else if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0001') {
      TYPEOPERATION = '1';
    } else {
      TYPEOPERATION = '2';
    }
    let Option = 'RequeteClientsClasse.svc/pvgChargerDansDataSetDASHBOARD';
    let body = {
      Objets: [
        {
          OE_PARAM: [
            this.recupinfo[0].AG_CODEAGENCE,
            this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,
            '01/01/1900',
            '01/01/1900',
            TYPEOPERATION,
          ],
          //OE_PARAM: ['1000','10000000000000000000000000005','01/01/1900','01/01/1900','1'],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '0',
          },
        },
      ],
    };
    this.recup_reclamation_stats = [];
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_data = success;
        this.tab_data = this.tab_data.pvgChargerDansDataSetDASHBOARDResult;
        if (this.tab_data[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.AdminService.CloseLoader();
          this.recup_reclamation_stats = this.tab_data;
          //this.ValEnregistrer = parseInt(this.recup_reclamation_stats[0].NOMBREREQUETEDEJATRAITER) - parseInt(this.recup_reclamation_stats[0].NOMBREREQUETESENCOURS) 
          console.log('recup_reclamation_stats', this.recup_reclamation_stats);
          this.chargement();
          this.DataDashboardSTATISTIQUEDETAIL();
        } else {
          this.AdminService.CloseLoader();
          this.recup_reclamation_stats = this.tab_data;
        }
      },
      (error) => {
        this.AdminService.CloseLoader();
      }
    );
  }

  DataDashboardSTATISTIQUEDETAIL() {
    let Option = 'RequeteClientsClasse.svc/pvgTableauDeBordstatistique';
    var TYPEOPERATION = 'ADMIN';
    if (this.recupinfo[0].CU_NOMUTILISATEUR.includes('ADMIN')) {
      TYPEOPERATION = 'ADMIN';
    } else if (this.recupinfo[0].TU_CODETYPEUTILISATEUR == '0001') {
      TYPEOPERATION = 'OPERATEUR';
    } else {
      TYPEOPERATION = 'CLIENT';
    }
    let body = {
      AG_CODEAGENCE: this.recupinfo[0].AG_CODEAGENCE, //'1000',//this.recupinfo[0].AG_CODEAGENCE,//
      RQ_DATEDEBUT: this.recupinfo[0].EX_DATEDEBUT, //'01/01/1900',//this.recupinfo[0].EX_DATEDEBUT,//
      RQ_DATEFIN: this.recupinfo[0].EX_DATEFIN, //'01/01/1900',//this.recupinfo[0].EX_DATEFIN,//
      CU_CODECOMPTEUTULISATEUR: this.recupinfo[0].CU_CODECOMPTEUTULISATEUR, //'10000000000000000000000000005',//this.recupinfo[0].CU_CODECOMPTEUTULISATEUR,//
      TYPEETAT: TYPEOPERATION, //"OPERATEUR",//TYPEOPERATION,//
    };

    //this.AdminService.ShowLoader();
    this.recup_reclamation_enrg = [];
    this.recup_reclamation_encour = [];
    this.recup_reclamation_attr = [];
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.tab_data = success;
        this.tab_data = this.tab_data.pvgTableauDeBordstatistiqueResult;
        console.log('dashboard_tab_data', this.tab_data);
        if (this.tab_data.clsResultat.SL_RESULTAT == 'TRUE') {
          // recuperation des differents tableaux
          this.tab_data_taux_satisfaction =
            this.tab_data.clsTableauDeBordTauxSatisfactions;
          for (let i = 0; i < this.tab_data_taux_satisfaction.length; i++) {
            if (
              this.tab_data_taux_satisfaction[i].NR_CODENATUREREQUETE == '1'
            ) {
              this.recup_reclamation_enrg.push(
                this.tab_data_taux_satisfaction[i]
              );
            }
            if (
              this.tab_data_taux_satisfaction[i].NR_CODENATUREREQUETE == '2'
            ) {
              this.recup_reclamation_encour.push(
                this.tab_data_taux_satisfaction[i]
              );
            }
            if (
              this.tab_data_taux_satisfaction[i].NR_CODENATUREREQUETE == '3'
            ) {
              this.recup_reclamation_attr.push(
                this.tab_data_taux_satisfaction[i]
              );
            }
          }
          this.tab_intermediaire_cercle_absEnrg = [];
          this.tab_intermediaire_cercle_ordEnrgVal = [];
          this.tab_intermediaire_cercle_absEncour = [];
          this.tab_intermediaire_cercle_ordEncourVal = [];
          this.tab_intermediaire_cercle_abstraiter = [];
          this.tab_intermediaire_cercle_ordtraiterVal = [];
          if (this.recup_reclamation_enrg.length > 0) {
            for (var i = 0; i < this.recup_reclamation_enrg.length; i++) {
              this.tab_intermediaire_cercle_absEnrg.push(
                this.recup_reclamation_enrg[i].TR_LIBELLETYEREQUETE
              );
              this.tab_intermediaire_cercle_ordEnrgVal.push(
                this.recup_reclamation_enrg[i].NOMBRE
              );
            }
          }

          if (this.recup_reclamation_encour.length > 0) {
            for (var i = 0; i < this.recup_reclamation_encour.length; i++) {
              this.tab_intermediaire_cercle_absEncour.push(
                this.recup_reclamation_encour[i].TR_LIBELLETYEREQUETE
              );
              this.tab_intermediaire_cercle_ordEncourVal.push(
                this.recup_reclamation_encour[i].NOMBRE
              );
            }
          }

          if (this.recup_reclamation_attr.length > 0) {
            for (var i = 0; i < this.recup_reclamation_attr.length; i++) {
              this.tab_intermediaire_cercle_abstraiter.push(
                this.recup_reclamation_attr[i].TR_LIBELLETYEREQUETE
              );
              this.tab_intermediaire_cercle_ordtraiterVal.push(
                this.recup_reclamation_attr[i].NOMBRE
              );
            }
          }

          // Générer un tableau de couleurs aléatoires de la même taille que tab_intermediaire_cercle_absEnrg
          this.couleurs_aleatoiresEnrg = [];
          this.couleurs_aleatoiresEncour = [];
          this.couleurs_aleatoirestraiter = [];
          if (this.tab_intermediaire_cercle_absEnrg.length > 0) {
            for (
              let i = 0;
              i < this.tab_intermediaire_cercle_absEnrg.length;
              i++
            ) {
              let randomIndex = Math.floor(
                Math.random() * this.background_color.length
              );
              this.couleurs_aleatoiresEnrg.push(
                this.background_color[i]
              );
            }
          }

          if (this.tab_intermediaire_cercle_absEncour.length > 0) {
            for (
              let i = 0;
              i < this.tab_intermediaire_cercle_absEncour.length;
              i++
            ) {
              
              let randomIndex = Math.floor(
                Math.random() * this.background_color.length
              );
              this.couleurs_aleatoiresEncour.push(
                this.background_color[i]
              );
            }
          }

          if (this.recup_reclamation_attr.length > 0) {
            for (let i = 0; i < this.recup_reclamation_attr.length; i++) {
              let randomIndex = Math.floor(
                Math.random() * this.background_color.length
              );
              this.couleurs_aleatoirestraiter.push(
                this.background_color[i]
              );
            }
          }

          this.FormationChartPieEnregistrer();
          this.FormationChartPieEnregistrermodal();
          this.FormationChartBarEncour();
          this.FormationChartBarEncourmodal();
          this.FormationChartPietraite();
          this.FormationChartPietraitemodal();

          //this.AdminService.CloseLoader();
        } else {
          // this.AdminService.CloseLoader();
        }
      },
      (error) => {
        // this.AdminService.CloseLoader();
      }
    );
  }

  chargement() {
    // chart delai de traitement
    let isDarkStyle = this.isDarkStyle();
    let headingColor;
    let bodyColor;
    let chartBgColor;

    if (isDarkStyle) {
      headingColor = '#cfcbe5';
      bodyColor = '#9e9ab5';
      chartBgColor = '#474360';
    } else {
      headingColor = '#544f5a';
      bodyColor = '#9e9ab5';
      chartBgColor = '#474360';
    }

    const salesOverviewChartE1 = document.querySelector('#salesOverviewChart'),
      salesOverviewChartConfig = {
        chart: {
          height: 250,
          parentHeightOffset: 0,
          type: 'donut',
        },
        labels: ['Reclamations dans les délais', 'Reclamations hors délais'],
        series: [
          parseInt(
            this.recup_reclamation_stats[0].NOMBREREQUETESTRAITEESDANSDELAIS
          ),
          parseInt(
            this.recup_reclamation_stats[0].NOMBREREQUETESTRAITEESHORSDELAIS
          ),
        ],
        colors: [
          this.chartColors.donut.series1,
          this.chartColors.donut.series2,
          this.chartColors.donut.series3,
          chartBgColor,
        ],
        stroke: {
          width: 0,
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        tooltip: {
          style: {
            color: '#ffffff',
          },
        },
        grid: {
          padding: {
            top: 15,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                value: {
                  fontSize: '26px',
                  fontFamily: 'Inter',
                  color: headingColor,
                  fontWeight: 500,
                  offsetY: -20,
                  formatter: function (val: any) {
                    return parseInt(val);
                  },
                },
                name: {
                  offsetY: 20,
                  fontFamily: 'Inter',
                  color: bodyColor,
                },
                total: {
                  show: true,
                  fontSize: '.7rem',
                  label: '',
                  color: bodyColor, //@ts-ignore
                  formatter: function (w) {
                    return '';
                  },
                },
              },
            },
          },
        },
        responsive: [
          {
            breakpoint: 1399,
            options: {
              chart: {
                height: 200,
              },
            },
          },
          {
            breakpoint: 420,
            options: {
              chart: {
                height: 300,
              },
            },
          },
        ],
      };
    if (
      typeof salesOverviewChartE1 !== undefined &&
      salesOverviewChartE1 !== null
    ) {
      const salesOverviewChart = new ApexCharts(
        salesOverviewChartE1,
        salesOverviewChartConfig
      );
      salesOverviewChart.render();
    }
  }

  ngOnInit(): void {
    //this.DataDashboard();
    this.DataDashboardSTATISTIQUE();
    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
    /* for (let index = 0; index < this.table_id_pie.length; index++) {
      this.FormationChartPie(this.table_id_pie[index]);
    }

    for (let index = 0; index < this.table_id_bar.length; index++) {
      this.FormationChartBar(this.table_id_bar[index]);
    }*/

    // chart delai de traitement
  }
}
