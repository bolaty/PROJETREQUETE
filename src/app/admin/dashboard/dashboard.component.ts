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
    '#44FD48',
    '#CA72A4',
    '#FCCD6A',
    '#36E036',
    '#FCA4A6',
    '#369EE2',
    '#DEDEFE',
    '#FD383A',
    '#FDFE37',
    '#A725A5',
    '#4344FC',
    '#27A7A4',
    '#BFC0FD',
    '#BF6498',
    '#FCD170',
    '#3BE23B',
    '#FDBBBB',
    '#3BA3E5',
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

  FormationChartPie(id_du_graphe: any) {
    this.chart_pie = new Chart(id_du_graphe, {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.tab_data_nature_reclam_recu.LIBELLERUBRIQUE, // this.tab_intermediaire_cercle_abs, // table_label,
        datasets: [
          {
            label: '',
            data: this.tab_data_nature_reclam_recu.NOMBRE, // this.tab_intermediaire_cercle_ord, // table_data,
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

  ngOnInit(): void {
    this.DataDashboard();

    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
    for (let index = 0; index < this.table_id_pie.length; index++) {
      this.FormationChartPie(this.table_id_pie[index]);
    }

    for (let index = 0; index < this.table_id_bar.length; index++) {
      this.FormationChartBar(this.table_id_bar[index]);
    }

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
          parseInt(this.reclam_dans_le_delai),
          parseInt(this.reclam_hors_le_delai),
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
                    return parseInt(val) + 'k';
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
    // chart delai de traitement
  }
}
