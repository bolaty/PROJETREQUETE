import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  recupinfo: any = JSON.parse(sessionStorage.getItem("infoLogin") || '');
  public chart_bar: any;
  public chart_pie: any;
  graphe_en_bande: any = [];
  graphe_circulaire: any = [];
  tab_intermediaire_bande_abs: any = [];
  tab_intermediaire_bande_ord: any = [];
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
    'MyChartPie1',
    'MyChartPie2',
    'MyChartPie3',
    'MyChartPie4',
  ];
  table_id_bar: any = ['MyChartBar1', 'MyChartBar2'];

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
            label: 'Adhésion',
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

  ngOnInit(): void {
    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
    for (let index = 0; index < this.table_id_pie.length; index++) {
      this.FormationChartPie(this.table_id_pie[index]);
    }

    for (let index = 0; index < this.table_id_bar.length; index++) {
      this.FormationChartBar(this.table_id_bar[index]);
    }

  }
}
