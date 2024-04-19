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
import { ajustLibelle } from '../../utils/libelle.utils';
import { JsonPipe } from '@angular/common';
import { AdminService } from 'src/app/admin/admin.service';

// const APP_URL = "http://51.210.111.16:1009/RequeteClientsClasse.svc/pvgTableauDeBord";

@Component({
  selector: 'app-etat-suivi',
  templateUrl: './etat-suivi.component.html',
  styleUrls: ['./etat-suivi.component.scss'],
})
export class EtatSuiviComponent implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;

  LienServeur: any = 'http://localhost:22248/'; // lien dev
  // LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod • remuci
  // LienServeur: any = 'https://reclamationserveur.mgdigitalplus.com:1022/'; // lien test local • bly

  APP_URL: any = `${this.LienServeur}RequeteClientsClasse.svc/pvgTableauDeBord`;
  info_session: any = JSON.parse(sessionStorage.getItem('info_etat') || '');
  info_connexion: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');

  data: any;
  chartOptionsSatisfaction: Partial<ChartOptions>;
  chartOptionsSituationPlaintes: Partial<ChartOptions>;
  chartOptionsNaturePlaintes: Partial<ChartOptions>;
  chartOptionsClientInsatisfait: Partial<ChartOptions>;
  chartOptionsDelaiPlaintes: Partial<ChartOptionsPie>;

  dataSatisfaction: any;
  colors: string[] = [
    '#5B9BD5',
    '#ED7D31',
    '#A5A5A5',
    '#5B9BD5',
    '#ED7D31',
    '#A5A5A5',
    '#5B9BD5',
    '#ED7D31',
    '#A5A5A5',
  ];

  constructor(
    private apiService: ApiService,
    private dateService: DateService,
    private route: ActivatedRoute,
    public AdminService: AdminService
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
        ['Nombre de', 'réclamations traitées'],
        ['Avis client', 'favorable'],
        ['Avis client', 'non favorable'],
        ['Taux de', 'satisfaction en %'],
      ]
    );

    this.chartOptionsSituationPlaintes = barChartOptions(
      'situation des réclamations des réclamations (reçus, traitées, non traitées)',
      [
        {
          name: 'Valeur',
          data: [0, 0, 0, 0, 0, 0],
          color: '#5B9BD5',
        },
        {
          name: 'Valeur',
          data: [0, 0, 0, 0, 0, 0],
          color: '#ED7D31',
        },
        {
          name: 'Valeur',
          data: [0, 0, 0, 0, 0, 0],
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
    this.chartOptionsDelaiPlaintes = PieChartOptions(
      'Taux de satisfaction des plaignants',
      [0, 0],
      [['Nombre de réclamations traitées'], ['Avis client favorable']]
    );
    this.chartOptionsNaturePlaintes = barChartOptions(
      'Nature et type des réclamations les plus recurrentes',
      [
        {
          name: 'Valeur',
          data: [0, 0, 0],
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
          name: 'Nombre de réclamations relatives au comportement du personnel',
          data: [20],
          color: '#5B9BD5',
        },
        {
          name: 'Nombre de réclamations relatives aux produits et services',
          data: [30],
          color: '#ED7D31',
        },
        {
          name: 'Nombre de réclamations relatives aux politiques ou procédures',
          data: [25],
          color: '#A5A5A5',
        },
      ],
      [],
      true,
      true
    );
  }

  ngOnInit(): void {
    this.AdminService.showMenu = true;
    this.AdminService.ShowLoader();
    setTimeout(() => {
      this.route.queryParams.subscribe((params) => {
        const paramName = params['paramName'];
        this.apiService
          .postData(this.APP_URL, {
            AG_CODEAGENCE: this.info_session[0].valeur, //this.info_connexion[0].AG_CODEAGENCE,
            RQ_DATEDEBUT: this.info_session[4].valeur,
            RQ_DATEFIN: this.info_session[5].valeur,
            CU_CODECOMPTEUTULISATEUR:
              this.info_connexion[0].CU_CODECOMPTEUTULISATEUR,
            TYPEETAT: 'TSCLT',
          })
          .pipe(
            map((res: any) => {
              this.AdminService.CloseLoader();
              const data = res.pvgTableauDeBordResult;
              const ts = data.clsTableauDeBordTauxSatisfactions[0];
              const sp = data.clsTableauDeBordSituationPlaintes;
              const dt = data.clsTableauDeBordDelaiTraiPlaintes;
              const natP = data.clsTableauDeBordNatPlainteRecurs;
              const refP = data.clsTableauDeBordNbrePlainterefs;
              return {
                TAUXSATISFACTION: {
                  LIBELLERUBRIQUE: ts.LIBELLERUBRIQUE,
                  DATA: [
                    ts.TOTALPLAINTETRAITES,
                    ts.AVISCLIENTFAVORABLE,
                    ts.AVISCLIENTNONFAVORABLE,
                    parseInt(ts.TOTALPLAINTETRAITES) > 0
                      ? (parseInt(ts.AVISCLIENTFAVORABLE) /
                          parseInt(ts.TOTALPLAINTETRAITES)) *
                        100
                      : 0,
                  ],
                },
                SITUATIONPLAINTES: {
                  LIBELLES: sp.map((e: any) => e.LIBELLERUBRIQUE),
                  TOTALPLAINTERECUES: sp.map((e: any) => e.TOTALPLAINTERECUES),
                  TOTALPLAINTETRAITES: sp.map(
                    (e: any) => e.TOTALPLAINTETRAITES
                  ),
                  TOTALPLAINTENONTRAITES: sp.map(
                    (e: any) => e.TOTALPLAINTERECUES - e.TOTALPLAINTETRAITES
                  ),
                },
                DELAITRAITEMENT: {
                  LIBELLES: dt.map((e: any) => e.LIBELLERUBRIQUE),
                  NOMBRE: dt.map((e: any) => e.NOMBRE),
                },
                NATUREPLAINTES: {
                  LIBELLES: natP.map((e: any) =>
                    ajustLibelle(e.LIBELLERUBRIQUE)
                  ),
                  LIBELLESTOSHOW: natP.map((e: any) => e.LIBELLERUBRIQUE),
                  NOMBRE: natP.map((e: any) => e.NOMBRE),
                },
                REFPLAINTES: refP.map((e: any, i: number) => {
                  return {
                    name: e.LIBELLERUBRIQUE,
                    data: [e.NOMBRE],
                    color: this.colors[i],
                  };
                }),
              };
            })
          )
          .subscribe((data: any) => {
            this.data = data;
            this.chartOptionsSatisfaction = barChartOptions(
              data.TAUXSATISFACTION.LIBELLERUBRIQUE,
              [
                {
                  name: 'Valeur',
                  data: data.TAUXSATISFACTION.DATA,
                  color: '#5B9BD5',
                },
              ],
              [
                ['Nombre de', 'réclamations traitées'],
                ['Avis client', 'favorable'],
                ['Avis client', 'non favorable'],
                ['Taux de', 'satisfaction en %'],
              ]
            );

            this.chartOptionsSituationPlaintes = barChartOptions(
              'situation des réclamations des réclamations (reçus, traitées, non traitées)',
              [
                {
                  name: 'Valeur',
                  data: data.SITUATIONPLAINTES.TOTALPLAINTERECUES,
                  color: '#5B9BD5',
                },
                {
                  name: 'Valeur',
                  data: data.SITUATIONPLAINTES.TOTALPLAINTETRAITES,
                  color: '#ED7D31',
                },
                {
                  name: 'Valeur',
                  data: data.SITUATIONPLAINTES.TOTALPLAINTENONTRAITES,
                  color: '#A5A5A5',
                },
              ],
              data.SITUATIONPLAINTES.LIBELLES
            );

            this.chartOptionsDelaiPlaintes = PieChartOptions(
              'Taux de satisfaction des plaignants',
              data.DELAITRAITEMENT.NOMBRE,
              data.DELAITRAITEMENT.LIBELLES
            );
            this.chartOptionsNaturePlaintes = barChartOptions(
              'Nature et type des réclamations les plus recurrentes',
              [
                {
                  name: 'Valeur',
                  data: data.NATUREPLAINTES.NOMBRE,
                  color: '#5B9BD5',
                },
              ],

              data.NATUREPLAINTES.LIBELLES
            );
            this.chartOptionsClientInsatisfait = barChartOptions(
              'Nombre de clients insatisfaits ayant reformulé leur plainte',
              data.REFPLAINTES,
              [],
              true,
              true
            );
          });
      });
    }, 1000);
  }
  printPage() {
    window.print();
  }
}
