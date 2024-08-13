import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { ApiService } from 'src/app/services/api.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-frequence-reception-reclam',
  templateUrl: './frequence-reception-reclam.component.html',
  styleUrls: ['./frequence-reception-reclam.component.scss'],
})
export class FrequenceReceptionReclamComponent implements OnInit {
  @ViewChild('contentEtatSuivi', { static: false }) content!: ElementRef;

  constructor(
    private dateService: DateService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public AdminService: AdminService
  ) {}

  LienServeur: any = 'http://localhost:22248/'; // lien dev
  // LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod • remuci
  //LienServeur: any = 'https://reclamationserveur.mgdigitalplus.com:1022/'; // lien test local • bly
  //LienServeur: any = 'https://reclamationserveurtest.mgdigitalplus.com:1041/'; // lien test local remuci• bly
  
  APP_URL: any = `${this.LienServeur}RequeteClientsClasse.svc/pvgFrequenceReclamation`;
  postData: any;
  total: any;
  info_session: any = JSON.parse(sessionStorage.getItem('info_etat') || '');
  Info_sessionFrequence: any = JSON.parse(sessionStorage.getItem('info_etattypefrequence') || '');
  info_connexion: any = JSON.parse(sessionStorage.getItem('infoLogin') || '');
  tab_retour: any = [];
  LibelleEtat: any = " FREQUENCE DE RECEPTION DES RECLAMATIONS PAR CLIENT DU" 
  get CurrentDate(): string {
    return this.FormatDate('/Date(' + Date.now() + ')/', true);
  }

  PrintPage() {
    window.print();
  }

  FormatDate(dateString: string, hour: boolean = false) {
    return this.dateService.formatDate(dateString, hour);
  }

  ngOnInit(): void {
    this.AdminService.showMenu = true;
    this.AdminService.ShowLoader();
    setTimeout(() => {

      if(this.Info_sessionFrequence != 'frequencetransmission'){
        this.LibelleEtat = " FREQUENCE DE RECEPTION DES RECLAMATIONS PAR CLIENT DU" 
      }else{
        this.LibelleEtat = " FREQUENCE DE TRANSMISSION DES REQUETE PAR OPERATEUR DU" 
      }


      this.route.queryParams.subscribe((params) => {
        this.postData = {
          AG_CODEAGENCE: this.info_session[0].valeur,
          RQ_DATEDEBUT: this.info_session[4].valeur,
          RQ_DATEFIN: this.info_session[5].valeur,
          CU_CODECOMPTEUTULISATEUR:
            this.info_connexion[0].CU_CODECOMPTEUTULISATEUR,
          TYPEETAT: this.Info_sessionFrequence != 'frequencetransmission' ? 'TSCLT'  : 'TRCLT',
        };

        this.apiService
          .postData(this.APP_URL, this.postData)
          .subscribe((res: any) => {
            this.AdminService.CloseLoader();
            this.tab_retour = res.pvgFrequenceReclamationResult;
            console.log('tab_retour', this.tab_retour);

            this.total = 0;
            /* for (let index = 0; index < this.tab_retour.length; index++) {
              this.total += this.tab_retour[index].NOMBRE;
            } */
            this.total = this.tab_retour.reduce(
              (a: any, b: any) => a + parseInt(b.NOMBRE),
              0
            );
          });
      });
    }, 1000);
  }
}
