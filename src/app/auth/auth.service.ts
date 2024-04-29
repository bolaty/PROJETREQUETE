import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';
declare var $: any;
declare var feather: any;
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  nom_de_la_structure: any = ''; // personnalisable

  libelleConnexion: any = '';
  tempsRestant: number = 10;
  statusConnect: boolean = false;
   LienServeur: any = 'http://localhost:22248/'; // lien dev
  // LienServeur: any = 'http://51.210.111.16:1009/'; // lien prod • remuci
  //LienServeur: any = 'https://reclamationserveur.mgdigitalplus.com:1022/'; // lien test local • bly
  user_connecte: boolean = false; // true designe la connexion d'un operateur et false celui d'un client // personnalisable

  constructor(private http: HttpClient) {
    Network.addListener(
      'networkStatusChange',
      this.checkNetworkStatus.bind(this)
    );
  }

  ShowLoader() {
    Swal.fire({
      allowOutsideClick: false,
    });
    Swal.showLoading();
  }
  CloseLoader() {
    Swal.close();
  }
  appSet() {
    'use strict';
    var notify = $.notify(
      '<i class="fa fa-bell-o"></i><strong>Notification</strong> connexion internet......',
      {
        type: 'theme',
        allow_dismiss: true,
        delay: 8000,
        showProgressbar: true,
        timer: 300,
      }
    );

    setTimeout(function () {
      notify.update(
        'message',
        '<i class="fa fa-bell-o"></i><strong>Connexion internet retablie</strong>.'
      );
    }, 1000);

    feather.replace();
  }
  appSetn() {
    'use strict';
    var notify = $.notify(
      '<i class="fa fa-bell-o"></i><strong>Notification</strong> connexion internet...',
      {
        type: 'theme',
        allow_dismiss: true,
        delay: 8000,
        showProgressbar: true,
        timer: 300,
      }
    );

    setTimeout(function () {
      notify.update(
        'message',
        '<i class="fa fa-bell-o"></i><strong>Connexion internet perdue</strong>.'
      );
    }, 1000);

    feather.replace();
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();

    if (status.connected) {
      this.statusConnect = true;
      this.libelleConnexion = 'Connexion internet retablie';
      console.log('Connexion internet retablie');
      this.appSet();
      // this.demarrerCompteur()
    } else {
      this.statusConnect = true;
      this.libelleConnexion = 'Connexion internet perdue';
      console.log('Connexion internet perdue');
      this.appSetn();
      // this.demarrerCompteur()
    }
  }
  // notification pour les erreurs
  NotificationErreur(message: any) {
    $.notify(
      {
        title: '',
        message: message,
      },
      {
        type: 'danger',
        allow_dismiss: false,
        newest_on_top: false,
        mouse_over: false,
        showProgressbar: false,
        spacing: 0,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'top right',
        },
        offset: {
          x: 30,
          y: 15,
        },
        delay: 1000,
        z_index: 10000,
        animate: {
          enter: 'tada',
          exit: '',
        },
      }
    );
  }

  // notification pour les succes
  NotificationSucces(message: any) {
    $.notify(
      {
        title: '',
        message: message,
      },
      {
        type: 'success',
        allow_dismiss: false,
        newest_on_top: false,
        mouse_over: false,
        showProgressbar: false,
        spacing: 0,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'top right',
        },
        offset: {
          x: 30,
          y: 15,
        },
        delay: 1000,
        z_index: 10000,
        animate: {
          enter: 'pulse',
          exit: '',
        },
      }
    );
  }

  // notification pour les informations de tout genre
  NotificationInformation(message: any) {
    $.notify(
      {
        title: '',
        message: message,
      },
      {
        type: 'dark',
        allow_dismiss: false,
        newest_on_top: false,
        mouse_over: false,
        showProgressbar: false,
        spacing: 0,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'center',
        },
        offset: {
          x: 30,
          y: 15,
        },
        delay: 1000,
        z_index: 10000,
        animate: {
          enter: 'animated bounceInRight',
          exit: '',
        },
      }
    );
  }
  // **************** SECTION DES NOTIFICATIONS fin

  AppelServeur(body: any, chemin_service: any) {
    return from(Network.getStatus()).pipe(
      switchMap((status) => {
        // Configuration des options HTTP
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: '', // Vous devrez peut-être fournir un jeton d'autorisation ici
          }),
        };

        // Vérification de la connexion Internet
        if (status.connected) {
          // Envoi de la requête HTTP si la connexion est active
          return this.http
            .post(
              this.LienServeur + chemin_service, //'Service/wsCoupure.svc/pvgChargerDansDataSet',
              body,
              httpOptions
            )
            .pipe(
              catchError((error) => {
                return throwError(error);
              })
            );
        } else {
          // Si la connexion Internet est perdue, renvoyer une erreur
          $('*').LoadingOverlay('hide');
          this.appSetn();
          return throwError('Connexion internet perdue');
        }
      })
    );
  }
  isLoggedinUser() {
    return !!sessionStorage.getItem('isLoggedIn');
  }
}
