import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DateService } from 'src/app/services/date.service';
import {
  ChartOptions,
  ChartOptionsPie,
  PieChartOptions,
  barChartOptions,
} from '../../utils/bar-chart.utils';
import { map } from 'rxjs';

// const APP_URL = "http://51.210.111.16:1009/RequeteClientsClasse.svc/pvgTableauDeBord";

@Component({
  selector: 'app-etat-suivi',
  templateUrl: './etat-suivi.component.html',
  styleUrls: ['./etat-suivi.component.scss'],
})
export class EtatSuiviComponent implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;

  // LienServeur: any = 'http://localhost:22248/'; // lien dev
  LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod

  APP_URL: any = `${this.LienServeur}RequeteClientsClasse.svc/pvgTableauDeBord`;

  data: any;
  chartOptionsSatisfaction: Partial<ChartOptions>;
  chartOptionsFrequencePlaintes: Partial<ChartOptions>;
  chartOptionsSituationPlaintes: Partial<ChartOptions>;
  chartOptionsNaturePlaintes: Partial<ChartOptions>;
  chartOptionsClientInsatisfait: Partial<ChartOptions>;
  chartOptionsDelaiPlaintes: Partial<ChartOptionsPie>;

  dataSatisfaction: any;

  constructor(
    private apiService: ApiService,
    private dateService: DateService,
    private route: ActivatedRoute
  ) {
    this.chartOptionsSatisfaction = barChartOptions(
      'Taux de satisfaction des plaignants',
      [
        {
          name: 'Valeur',
          data: [0, 0, 0, 0],
          color: '#5B9BD5',
        },
      ],
      [
        ['Nombre de', 'plaintes traitées'],
        ['Avis client', 'favorable'],
        ['Avis client', 'non favorable'],
        ['Taux de', 'satisfaction en %'],
      ]
    );
    this.chartOptionsFrequencePlaintes = barChartOptions(
      'Fréquence de reception des plaintes',
      [
        {
          name: 'Valeur',
          data: [5, 10, 23, 60, 40, 30, 50],
          color: '#5B9BD5',
        },
      ],

      [
        ['Nombre de plaintes', 'reçues avec 01 à 07', "jours d'écart"],
        ['Nombre de plaintes', 'reçues avec 08 à 14', "jours d'écart"],
        ['Nombre de plaintes', 'reçues avec 14 à 21', "jours d'écart"],
        ['Nombre de plaintes', 'reçues avec 22 à 31', "jours d'écart"],
        ['Nombre de plaintes', 'reçues avec 01 à 03', "mois d'écart"],
        ['Nombre de plaintes', 'reçues avec 03 à 06', "mois d'écart"],
        ['Nombre de plaintes', 'reçues avec 06 à 12', "mois d'écart"],
      ]
    );
    this.chartOptionsSituationPlaintes = barChartOptions(
      'situation des plaintes des plaintes (reçus, traitées, non traitées)',
      [
        {
          name: 'Valeur',
          data: [4, 10, 25, 39, 40, 50],
          color: '#5B9BD5',
        },
        {
          name: 'Valeur',
          data: [3, 6, 23, 37, 38, 47],
          color: '#ED7D31',
        },
        {
          name: 'Valeur',
          data: [1, 4, 2, 2, 2, 3],
          color: '#A5A5A5',
        },
      ],
      [
        'Ce jour',
        'Cette semaine',
        'Ce mois',
        'Ce trimestre',
        'Ces 06 mois',
        'Cette année',
      ]
    );
    this.chartOptionsNaturePlaintes = barChartOptions(
      'Natureet type des plaintes les plus recurrentes',
      [
        {
          name: 'Valeur',
          data: [20, 30, 25],
          color: '#5B9BD5',
        },
      ],

      [
        'Comportement du personnel',
        'Produits et services',
        'Politiques ou procédures',
      ]
    );
    this.chartOptionsClientInsatisfait = barChartOptions(
      'Nombre de clients insatisfaits ayant reformulé leur plainte',
      [
        {
          name: 'Nombre de plaintes relatives au comportement du personnel',
          data: [20],
          color: '#5B9BD5',
        },
        {
          name: 'Nombre de plaintes relatives aux produits et services',
          data: [30],
          color: '#ED7D31',
        },
        {
          name: 'Nombre de plaintes relatives aux politiques ou procédures',
          data: [25],
          color: '#A5A5A5',
        },
      ],
      [],
      true,
      true
    );

    this.chartOptionsDelaiPlaintes = PieChartOptions(
      'Taux de satisfaction des plaignants',
      [
        {
          name: 'Valeur',
          data: [100, 60, 40, 60],
          color: '#5B9BD5',
        },
      ],
      [
        ['Nombre de', 'plaintes traitées'],
        ['Avis client', 'favorable'],
        ['Avis client', 'non favorable'],
        ['Taux de', 'satisfaction en %'],
      ]
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const paramName = params['paramName'];
      this.apiService
        .postData(
          this.APP_URL,
          {
            RQ_DATEDEBUT: '15/02/2024',
            RQ_DATEFIN: '16/02/2024',
            CU_CODECOMPTEUTULISATEUR: '', // utilisateur connecté
            TYPEETAT: 'TSCLT',
          },
          true
        )
        .pipe(
          map((res: any) => {
            const data = res.pvgTableauDeBordResult[0];
            return {
              LIBELLERUBRIQUE: data.LIBELLERUBRIQUE,
              DATA: [
                data.TOTALPLAINTETRAITES,
                data.AVISCLIENTFAVORABLE,
                data.AVISCLIENTNONFAVORABLE,
                parseInt(data.TOTALPLAINTETRAITES) > 0
                  ? (parseInt(data.AVISCLIENTFAVORABLE) /
                      parseInt(data.TOTALPLAINTETRAITES)) *
                    100
                  : 0,
              ],
            };
          })
        )
        .subscribe((data: any) => {
          this.dataSatisfaction = data;
          this.chartOptionsSatisfaction = barChartOptions(
            this.dataSatisfaction.LIBELLERUBRIQUE,
            [
              {
                name: 'Valeur',
                data: this.dataSatisfaction.DATA,
                color: '#5B9BD5',
              },
            ],
            [
              ['Nombre de', 'plaintes traitées'],
              ['Avis client', 'favorable'],
              ['Avis client', 'non favorable'],
              ['Taux de', 'satisfaction en %'],
            ]
          );
        });
    });
  }
  printPage() {
    window.print();
  }
}
