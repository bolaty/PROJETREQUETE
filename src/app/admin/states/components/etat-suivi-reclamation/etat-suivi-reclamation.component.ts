import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { ApiService } from 'src/app/services/api.service';
import { DateService } from 'src/app/services/date.service';

// const APP_URL = "/RequeteClientsClasse.svc/pvgListeReqrequeteBCAO";
// const APP_URL = "RequeteClientsClasse.svc/pvgListeReqrequeteBCAO";

@Component({
  selector: 'app-etat-suivi-reclamation',
  templateUrl: './etat-suivi-reclamation.component.html',
  styleUrls: ['./etat-suivi-reclamation.component.scss'],
})
export class EtatSuiviReclamationComponent implements OnInit {
  @ViewChild('contentEtatSuivi', { static: false }) content!: ElementRef;

   LienServeur: any = 'http://localhost:22248/'; // lien dev
  // LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod • remuci
  //LienServeur: any = 'https://reclamationserveur.mgdigitalplus.com:1022/'; // lien test local • bly
  //LienServeur: any = 'https://reclamationserveurtest.mgdigitalplus.com:1041/'; // lien test local remuci• bly
  
  APP_URL: any = `${this.LienServeur}RequeteClientsClasse.svc/pvgListeReqrequeteBCAO`;

  data: any;
  postData: any;
  SEMESTER_BEGIN: any;
  SEMESTER_END: any;
  info_session: any = JSON.parse(sessionStorage.getItem('info_etat') || '');
  info_connexion: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  info_libAgence: any = JSON.parse(
    sessionStorage.getItem('libelleAgenceselect') || ''
  );
  get currentDate(): string {
    return this.formatDate('/Date(' + Date.now() + ')/', true);
  }

  constructor(
    private dateService: DateService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public AdminService: AdminService
  ) {}

  ngOnInit(): void {
    this.AdminService.showMenu = true;
    this.AdminService.ShowLoader();
    setTimeout(() => {
      this.route.queryParams.subscribe((params) => {
        const paramName = params['paramName'];
        this.postData = {
          Objets: [
            {
              OE_PARAM: [
                this.info_session[0].valeur, // agence
                '', // code nature requete
                this.info_session[4].valeur, // date de debut
                this.info_session[5].valeur, // date de fin
                this.info_connexion[0].CU_CODECOMPTEUTULISATEUR, // session de connexion • code utilisateur
                '01', // type operation
              ],
              clsObjetEnvoi: {
                ET_CODEETABLISSEMENT: '',
                AN_CODEANTENNE: '',
                TYPEOPERATION: '01',
              },
            },
          ],
        };
        this.SEMESTER_BEGIN = this.postData.Objets[0].OE_PARAM[2];
        this.SEMESTER_END = this.postData.Objets[0].OE_PARAM[3];

        this.apiService
          .postData(this.APP_URL, this.postData)
          .subscribe((res: any) => {
            this.AdminService.CloseLoader();
            const values = res.pvgListeReqrequeteBCAOResult[0];
            this.data = {
              AG_RAISONSOCIAL: values?.AG_RAISONSOCIAL ?? '',
              PY_LIBELLE: values?.PY_LIBELLE ?? '',
              RQ_MONTANTTOTALCONTENTIEUX:
                values?.RQ_MONTANTTOTALCONTENTIEUX ?? 0,
              RQ_NOMBRETOTALCONTENTIEUX: values?.RQ_NOMBRETOTALCONTENTIEUX ?? 0,
              RQ_MONTANTTOTALCONTENTIEUXAPRES:
                values?.RQ_MONTANTTOTALCONTENTIEUXAPRES ?? 0,
              RQ_NOMBRETOTALCONTENTIEUXAPRES:
                values?.RQ_NOMBRETOTALCONTENTIEUXAPRES ?? 0,
              ENCOURS: values.clsReqrequeteRecus.map((e: any) => {
                return {
                  TR_LIBELLETYEREQUETE: e.TR_LIBELLETYEREQUETE,
                  RQ_DESCRIPTIONREQUETE: e.RQ_OBSERVATIONDELAITRAITEMENTREQUETE, //e.RQ_DESCRIPTIONREQUETEAVISCLIENT // RQ_DESCRIPTIONREQUETE,
                };
              }),
              TRAITES: values.clsReqrequeteTraitees.map((e: any) => {
                return {
                  TR_LIBELLETYEREQUETE: e.TR_LIBELLETYEREQUETE,
                  RQ_DESCRIPTIONREQUETE: e.RQ_OBSERVATIONDELAITRAITEMENTREQUETE, //e.RQ_DESCRIPTIONREQUETEAVISCLIENT // RQ_DESCRIPTIONREQUETE,
                };
              }),
              SUSPENDUES: values.clsReqrequeteSuspendues.map((e: any) => {
                return {
                  TR_LIBELLETYEREQUETE: e.TR_LIBELLETYEREQUETE,
                  RQ_DESCRIPTIONREQUETE: e.RQ_OBSERVATIONDELAITRAITEMENTREQUETE, //e.RQ_DESCRIPTIONREQUETEAVISCLIENT,// // RQ_DESCRIPTIONREQUETE,
                };
              }),
            };

            console.log('le_data', this.data);
          });
      });
    }, 1000);
  }

  printPage() {
    window.print();
  }
  formatDate(dateString: string, hour: boolean = false) {
    return this.dateService.formatDate(dateString, hour);
  }
}
