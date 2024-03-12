import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss'],
})
export class PrintPageComponent {
  @ViewChild('printer', { static: false }) content!: ElementRef;

  public chart_bar: any;
  public chart_pie: any;
  graphe_en_bande: any = [];
  graphe_circulaire: any = [];
  tab_intermediaire_bande_abs: any = [];
  tab_intermediaire_bande_ord: any = [];
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
  table_id_pie: any = ['MyChartPie3'];
  table_id_bar: any = ['MyChartBar2'];
  recup_info_graphe: any = JSON.parse(
    sessionStorage.getItem('info_graphe') || ''
  );

  FormationChartPie(id_du_graphe: any, data: any) {
    this.chart_pie = new Chart(id_du_graphe, {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: data[0].tab_intermediaire_cercle_abs_obj, // table_label,
        datasets: [
          {
            label: '',
            data: data[0].tab_intermediaire_cercle_ord_obj, // table_data,
            backgroundColor: this.background_color, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  FormationChartBar(id_du_graphe: any, data: any) {
    this.chart_bar = new Chart(id_du_graphe, {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: data[0].tab_intermediaire_cercle_abs_obj, // table_label,
        datasets: [
          {
            label: 'En cours de traitement',
            data: data[0].tab_intermediaire_cercle_ord_obj, // table_data,
            backgroundColor: '#A725A5',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  printPage() {
    window.print();
  }

  ngOnInit(): void {
    console.log('recup_info_graphe', this.recup_info_graphe);

    setTimeout(() => {
      if (this.recup_info_graphe[0].type_graphe == 'pie') {
        for (let index = 0; index < this.table_id_pie.length; index++) {
          this.FormationChartPie(
            this.table_id_pie[index],
            this.recup_info_graphe
          );
        }
      }

      if (this.recup_info_graphe[0].type_graphe == 'bar') {
        for (let index = 0; index < this.table_id_bar.length; index++) {
          this.FormationChartBar(
            this.table_id_bar[index],
            this.recup_info_graphe
          );
        }
      }
    }, 1000);
  }
}
