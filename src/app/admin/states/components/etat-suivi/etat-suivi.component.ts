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
import Chart from 'chart.js/auto';
// const APP_URL = "http://51.210.111.16:1009/RequeteClientsClasse.svc/pvgTableauDeBord";

@Component({
  selector: 'app-etat-suivi',
  templateUrl: './etat-suivi.component.html',
  styleUrls: ['./etat-suivi.component.scss'],
})
export class EtatSuiviComponent implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;

  // LienServeur: any = 'http://localhost:22248/'; // lien dev
  // LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod • remuci
  // LienServeur: any = 'https://reclamationserveur.mgdigitalplus.com:1022/'; // lien test local • bly
  LienServeur: any =
    'https://reclamationgesciserveurtest.mgdigitalplus.com:5803/'; // lien test gesci

  APP_URL: any = `${this.LienServeur}RequeteClientsClasse.svc/pvgTableauDeBord`;
  info_session: any = JSON.parse(sessionStorage.getItem('info_etat') || '');
  statusForms: any = JSON.parse(sessionStorage.getItem('statusForm') || '');
  info_connexion: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  info_libAgence: any = JSON.parse(
    sessionStorage.getItem('libelleAgenceselect') || ''
  );
  info_libellePeriode: any = JSON.parse(
    sessionStorage.getItem('libellePeriodeselect') || ''
  );
  TITRE: any = '';
  data: any;
  chartOptionsSatisfaction: Partial<ChartOptions>;
  chartOptionsSituationPlaintes: Partial<ChartOptions>;
  chartOptionsNaturePlaintes: Partial<ChartOptions>;
  chartOptionsClientInsatisfait: Partial<ChartOptions>;
  chartOptionsDelaiPlaintes: Partial<ChartOptionsPie>;
  chart_pie: any;
  secondeFonctionAppelee: any;
  valtauxsatisfaction: any = 0;
  datebar: any;
  val1: any = 10;
  val2: any = 15;
  val3: any = 5;
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
          data: [0, 0, 0],
          color: '#5B9BD5',
        },
      ],
      [
        ['Nombre de', 'réclamations traitées'],
        ['Avis client', 'favorable'],
        ['Avis client', 'non favorable'] /*,
        ['Taux de', 'satisfaction en %'],*/,
      ]
    );

    this.chartOptionsSituationPlaintes = barChartOptions(
      'situation des réclamations (enregistrées, traitées, non traitées)',
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
          data: [0],
          color: '#5B9BD5',
        },
        {
          name: 'Nombre de réclamations relatives aux produits et services',
          data: [0],
          color: '#ED7D31',
        },
        {
          name: 'Nombre de réclamations relatives aux politiques ou procédures',
          data: [0],
          color: '#A5A5A5',
        },
      ],
      [],
      true,
      true
    );
  }

  FormationChartPieEnregistrer() {
    var valtaux = sessionStorage.getItem('valtab') || '';
    var colr = ['#fb8500', '#219ebc'];
    var valtotal = 100 - parseInt(valtaux);
    var libelledata = ['Taux de satisfaction en %'];
    var val = [this.valtauxsatisfaction, valtotal]; //this.valtauxsatisfaction
    this.chart_pie = new Chart('MyChartPie3', {
      type: 'pie', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: libelledata, // table_label,
        datasets: [
          {
            label: '',
            data: val, // table_data,
            backgroundColor: colr, // table_color,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
  ngOnInit(): void {
    this.AdminService.showMenu = true;
    this.AdminService.ShowLoader();
    sessionStorage.setItem('valtab', '');
    sessionStorage.setItem('secondeFonctionAppelee', 'false');
    setTimeout(() => {
      var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      }

      this.TITRE =
        this.statusForms == true
          ? 'ETAT STATISTIQUE HEBDOMADAIRE'
          : 'ETAT STATISTIQUE';
      this.route.queryParams.subscribe((params) => {
        const paramName = params['paramName'];
        this.apiService
          .postData(this.APP_URL, {
            AG_CODEAGENCE: this.info_session[0].valeur, //this.info_connexion[0].AG_CODEAGENCE,
            RQ_DATEDEBUT:
              this.statusForms == true ? date : this.info_session[4].valeur,
            RQ_DATEFIN:
              this.statusForms == true ? date : this.info_session[5].valeur,
            CU_CODECOMPTEUTULISATEUR:
              this.info_connexion[0].CU_CODECOMPTEUTULISATEUR,
            TYPEETAT: this.statusForms == true ? 'HEBDO' : 'SIPRECU',
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
              this.valtauxsatisfaction =
                parseInt(ts.TOTALPLAINTETRAITES) > 0
                  ? (parseInt(ts.AVISCLIENTFAVORABLE) /
                      parseInt(ts.TOTALPLAINTETRAITES)) *
                    100
                  : 0;
              sessionStorage.setItem('valtab', this.valtauxsatisfaction);
              return {
                TAUXSATISFACTION: {
                  LIBELLERUBRIQUE: ts.LIBELLERUBRIQUE,
                  DATA: [
                    parseInt(ts.TOTALPLAINTETRAITES),
                    parseInt(ts.AVISCLIENTFAVORABLE),
                    parseInt(ts.AVISCLIENTNONFAVORABLE),
                  ],
                },
                SITUATIONPLAINTES: {
                  LIBELLES: sp.map((e: any) => e.LIBELLERUBRIQUE),
                  TOTALPLAINTERECUES: sp.map((e: any) => e.TOTALPLAINTERECUES),
                  TOTALPLAINTETRAITES: sp.map(
                    (e: any) => e.TOTALPLAINTETRAITES
                  ),
                  TOTALPLAINTENONTRAITES: sp.map((e: any) =>
                    Math.abs(e.TOTALPLAINTERECUES - e.TOTALPLAINTETRAITES)
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
              ]
            );
            data.SITUATIONPLAINTES.LIBELLES =
              this.statusForms == true
                ? data.SITUATIONPLAINTES.LIBELLES
                : [this.info_libellePeriode];
            this.chartOptionsSituationPlaintes = barChartOptions(
              'situation des réclamations (enregistrées, traitées, non traitées)',
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

            if (sessionStorage.getItem('secondeFonctionAppelee') == 'false') {
              sessionStorage.setItem('secondeFonctionAppelee', 'true');
              // Appeler la seconde fonction
              this.FormationChartPieEnregistrer();
              // this.lancementtaux(this.data)
              // Mettre à jour l'état pour indiquer que la seconde fonction a été appelée
              if (this.statusForms == false) {
                this.data.SITUATIONPLAINTES.LIBELLES.splice(0, 2);
                this.data.SITUATIONPLAINTES.TOTALPLAINTENONTRAITES.splice(0, 2);
                this.data.SITUATIONPLAINTES.TOTALPLAINTERECUES.splice(0, 2);
                this.data.SITUATIONPLAINTES.TOTALPLAINTETRAITES.splice(0, 2);
                this.chartOptionsSituationPlaintes = barChartOptions(
                  'situation des réclamations (enregistrées, traitées, non traitées)',
                  [
                    {
                      name: 'Valeur',
                      data: this.data.SITUATIONPLAINTES.TOTALPLAINTERECUES,
                      color: '#5B9BD5',
                    },
                    {
                      name: 'Valeur',
                      data: this.data.SITUATIONPLAINTES.TOTALPLAINTETRAITES,
                      color: '#ED7D31',
                    },
                    {
                      name: 'Valeur',
                      data: this.data.SITUATIONPLAINTES.TOTALPLAINTENONTRAITES,
                      color: '#A5A5A5',
                    },
                  ],
                  data.SITUATIONPLAINTES.LIBELLES
                );
              } else {
                this.chartOptionsSituationPlaintes = barChartOptions(
                  'situation des réclamations (enregistrées, traitées, non traitées)',
                  [
                    {
                      name: 'Valeur',
                      data: this.data.SITUATIONPLAINTES.TOTALPLAINTERECUES,
                      color: '#5B9BD5',
                    },
                    {
                      name: 'Valeur',
                      data: this.data.SITUATIONPLAINTES.TOTALPLAINTETRAITES,
                      color: '#ED7D31',
                    },
                    {
                      name: 'Valeur',
                      data: this.data.SITUATIONPLAINTES.TOTALPLAINTENONTRAITES,
                      color: '#A5A5A5',
                    },
                  ],
                  data.SITUATIONPLAINTES.LIBELLES
                );
              }
            }
          });
      });
    }, 1000);
  }

  printPage() {
    window.print();
  }
}
