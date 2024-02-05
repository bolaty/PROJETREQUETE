import { Injectable } from '@angular/core';
import  Swal  from "sweetalert2"
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // ***************** SECTION DES DECLARATIONS debut
  date_sectionnee: any = {
    annee_date: '',
    mois_date: '',
    jour_date: '',
  };
  statut_traitement: boolean = false;
  champ_a_renseigner: any = [];
  tab_type_de_donnee: any = [];
  statut_champ_obligatoire: boolean = true;
  statut_type_de_donnee: boolean = true;
  statut_bissextile: boolean = true;
  statut_traitement_champ_non_obligatoire: boolean = false;
  dateInput: any;
  cacher_le_menu: any = 0;
  valeur_ecran: boolean = false;
  // ***************** SECTION DES DECLARATIONS fin

  constructor() {}

  ShowLoader(){
    Swal.fire({
      allowOutsideClick: false
    })
    Swal.showLoading()
  }
  CloseLoader(){
    Swal.close()
  }

  // **************** SECTION DES NOTIFICATIONS debut
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

  // **************** SECTION DES FORMATAGES debut
  // methode pour tester et formater le numero compte du client
  FormaterNumeroCompteClient(objet_recu: any) {
    let regex_compte = /^([0-9]{1,8})$/;
    if (!objet_recu.valeur.match(regex_compte)) {
      $('#' + objet_recu.id).css('background-color', 'MistyRose');
      this.NotificationErreur("Ce champ n'accepte que des chiffres");
    } else {
      $('#' + objet_recu.id).css('background-color', 'white');

      let resultat = 8 - objet_recu.valeur.length;
      switch (resultat) {
        case 1:
          objet_recu.valeur = '0' + objet_recu.valeur;
          break;
        case 2:
          objet_recu.valeur = '00' + objet_recu.valeur;
          break;
        case 3:
          objet_recu.valeur = '000' + objet_recu.valeur;
          break;
        case 4:
          objet_recu.valeur = '0000' + objet_recu.valeur;
          break;
        case 5:
          objet_recu.valeur = '00000' + objet_recu.valeur;
          break;
        case 6:
          objet_recu.valeur = '000000' + objet_recu.valeur;
          break;
        case 7:
          objet_recu.valeur = '0000000' + objet_recu.valeur;
          break;
      }
    }
  }
  // **************** SECTION DES FORMATAGES fin

  // **************** SECTION DES DATES debut
  // methode pour demembrer une date et retourner l'annee
  SectionnerDateEnAnnee(date_recu: any) {
    this.date_sectionnee.annee_date = date_recu.substr(6, 4);
    return this.date_sectionnee.annee_date;
  }

  // methode pour demembrer une date et retourner le mois
  SectionnerDateEnMois(date_recu: any) {
    this.date_sectionnee.mois_date = date_recu.substr(3, 2);
    return this.date_sectionnee.mois_date;
  }

  // methode pour demembrer une date et retourner le jour
  SectionnerDateEnJour(date_recu: any) {
    this.date_sectionnee.jour_date = date_recu.substr(0, 2);
    return this.date_sectionnee.jour_date;
  }

  // methode pour determiner si une annee est bissextile ou pas
  AnneeBissextile(annee_recu: any) {
    if (
      (annee_recu % 4 == 0 && annee_recu % 100 !== 0) ||
      annee_recu % 400 == 0
    ) {
      this.statut_bissextile = true;
      return this.statut_bissextile;
    } else {
      this.statut_bissextile = false;
      return this.statut_bissextile;
    }
  }

  // methode pour ajouter des separateurs automatiquement a la saisie d'une date
  SaisieAutoDesDates(id: any) {
    this.dateInput = document.getElementById(id);

    this.dateInput.addEventListener('keyup', (e: any) => {
      const input = e.target;
      const inputLength = input.value.length;
      const key = e.key;

      // Vérifier si l'utilisateur a appuyé sur une touche de chiffre
      // if (/^\d$/.test(key)) {
      if (!isNaN(key)) {
        if (inputLength === 2 || inputLength === 5) {
          // Ajouter un tiret après avoir saisi deux chiffres ou après avoir saisi cinq chiffres
          input.value += '-';
        }
      } else {
        // Si l'utilisateur a appuyé sur une touche autre qu'un chiffre, le bloquer
        e.preventDefault();
      }
    });
  }
  // **************** SECTION DES DATES fin

  // ******************** SECTION DES VERIFICATIONS POUR LES CHAMPS OBLIGATOIRE debut
  // verification des champs obligatoires et les types de données
  SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu: any) {
    // variable qui valide les deux test (obligatoire et type)
    this.statut_traitement = false;
    // initialisation du tableau qui recoit les champs obligatoire vide
    this.champ_a_renseigner = [];
    this.tab_type_de_donnee = [];
    var num = '';
    // les differentes expressions reguliere
    let regex_numerique = /^[\d]+$/;
    let regex_telephone = /^[\d]{6,15}$/;
    let regex_date =
      /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    let regex_annee = /^([0-9]{4})$/;
    let regex_montant = /^[\d]{1,12}$/;
    let regex_email =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let regex_email = /^([^*/\\._-])([w.-])*(@gmail|@yahoo|@outlook).(com|fr)$/;
    let regex_taux =
      /^(\$(?=[0-9])((\d*\.\d{1,2})|\d+\.?)|((?=[0-9])(\d+\.?)|((?=([0-9]+|\d*\.0*[1-9]+))\d{1,3}\,\d{1,3})))$/;

    let AnneeDateRecu = '';
    let MoisDateRecu = '';
    let JourDateRecu = '';

    // test champ obligatoire
    for (let index = 0; index < tableau_recu.length; index++) {
      if (tableau_recu[index].obligatoire == 'O') {
        if (
          tableau_recu[index].valeur == '' ||
          tableau_recu[index].valeur == undefined ||
          tableau_recu[index].valeur == null
        ) {
          this.statut_champ_obligatoire = false;
          this.champ_a_renseigner.push(tableau_recu[index]);
          this.tab_type_de_donnee = [];
        } else {
          this.statut_champ_obligatoire = true;
          $('#' + tableau_recu[index].id).css('background-color', 'white');
          this.tab_type_de_donnee.push(tableau_recu[index]);
        }
      }
    }

    // la liste des champs obligatoire a renseigner
    if (this.champ_a_renseigner.length != 0) {
      this.statut_champ_obligatoire = false;
      this.tab_type_de_donnee = [];
      this.NotificationErreur('Veuillez renseigner les champs obligatoire');
      for (let index = 0; index < this.champ_a_renseigner.length; index++) {
        $('#' + this.champ_a_renseigner[index].id).css(
          'background-color',
          'MistyRose'
        );
      }
    }

    // test type de donnée
    if (this.statut_champ_obligatoire) {
      for (let index = 0; index < this.tab_type_de_donnee.length; index++) {
        // le type email
        if (this.tab_type_de_donnee[index].type == 'email') {
          if (!this.tab_type_de_donnee[index].valeur.match(regex_email)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                this.tab_type_de_donnee[index].label
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'white'
            );
          }//
        }
        // le type montant
        if (this.tab_type_de_donnee[index].type == 'montant') {
          if (!this.tab_type_de_donnee[index].valeur.match(regex_montant)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                this.tab_type_de_donnee[index].label
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'white'
            );
          }
        }
        // le type numerique
        if (this.tab_type_de_donnee[index].type == 'numerique') {
          this.tab_type_de_donnee[index].valeur =
            this.tab_type_de_donnee[index].valeur.toString();
          if (!this.tab_type_de_donnee[index].valeur.match(regex_numerique)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                this.tab_type_de_donnee[index].label
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'white'
            );
          }
        }
        // le type date
        if (this.tab_type_de_donnee[index].type == 'date') {
          // decomposition de la date
          AnneeDateRecu = this.tab_type_de_donnee[index].valeur.substr(6, 4);
          MoisDateRecu = this.tab_type_de_donnee[index].valeur.substr(3, 2);
          JourDateRecu = this.tab_type_de_donnee[index].valeur.substr(0, 2);
          // verification du pattern
          if (!this.tab_type_de_donnee[index].valeur.match(regex_date)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                this.tab_type_de_donnee[index].label
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          }
          // si l'annee n'est pas bissextile
          else if (
            this.AnneeBissextile(AnneeDateRecu) == false &&
            MoisDateRecu == '02' &&
            JourDateRecu > '28'
          ) {
            this.NotificationErreur(
              this.tab_type_de_donnee[index].label +
                " n'est pas une date valide"
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          }
          // si l'annee est bissextile
          else if (
            this.AnneeBissextile(AnneeDateRecu) == true &&
            MoisDateRecu == '02' &&
            JourDateRecu > '29'
          ) {
            this.NotificationErreur(
              this.tab_type_de_donnee[index].label +
                " n'est pas une date valide"
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          }
          // si l'annee comporte 30 jours
          else if (
            (MoisDateRecu == '04' ||
              MoisDateRecu == '06' ||
              MoisDateRecu == '09' ||
              MoisDateRecu == '11') &&
            JourDateRecu > '30'
          ) {
            this.NotificationErreur(
              this.tab_type_de_donnee[index].label +
                " n'est pas une date valide"
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'white'
            );
          }
        }
        // le type annee
        if (this.tab_type_de_donnee[index].type == 'annee') {
          if (!this.tab_type_de_donnee[index].valeur.match(regex_annee)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                this.tab_type_de_donnee[index].label
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'white'
            );
          }
        }
        // le type telephone
        if (this.tab_type_de_donnee[index].type == 'telephone') {
          if (!this.tab_type_de_donnee[index].valeur.match(regex_telephone)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                this.tab_type_de_donnee[index].label
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'white'
            );
          }
        }
        // le type taux
        if (this.tab_type_de_donnee[index].type == 'taux') {
          if (!this.tab_type_de_donnee[index].valeur.match(regex_taux)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                this.tab_type_de_donnee[index].label
            );
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'MistyRose'
            );
            this.tab_type_de_donnee = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + this.tab_type_de_donnee[index].id).css(
              'background-color',
              'white'
            );
          }
        }
      }
    }

    // approbation des tests obligatoire et type de donnees
    if (
      this.statut_champ_obligatoire == true &&
      this.statut_type_de_donnee == true
    ) {
      this.statut_traitement = true;
    }
  }

  // methode pour tester les types de donnée pour les champs non obligatoire
  TypeDeDonneeChampNonObligatoire(tableau_recu: any) {
    this.statut_traitement_champ_non_obligatoire = false;
    var num = '';
    // les differentes expressions reguliere
    let regex_numerique = /^[\d]+$/;
    let regex_telephone = /^[\d]{6,15}$/;
    let regex_date =
      /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    let regex_annee = /^([0-9]{4})$/;
    let regex_montant = /^[\d]{1,12}$/;
    let regex_email =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let regex_email = /^([^*/\\._-])([w.-])*(@gmail|@yahoo|@outlook).(com|fr)$/;
    let regex_taux =
      /^(\$(?=[0-9])((\d*\.\d{1,2})|\d+\.?)|((?=[0-9])(\d+\.?)|((?=([0-9]+|\d*\.0*[1-9]+))\d{1,3}\,\d{1,3})))$/;

    let AnneeDateRecu = '';
    let MoisDateRecu = '';
    let JourDateRecu = '';

    // test type de donnée pour les champs non obligatoire
    for (let index = 0; index < tableau_recu.length; index++) {
      if (
        tableau_recu[index].obligatoire == 'N' &&
        tableau_recu[index].valeur != ''
      ) {
        // le type email
        if (tableau_recu[index].type == 'email') {
          if (!tableau_recu[index].valeur.match(regex_email)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                tableau_recu[index].label
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + tableau_recu[index].id).css('background-color', 'white');
          }
        }
        // le type montant
        if (tableau_recu[index].type == 'montant') {
          if (!tableau_recu[index].valeur.match(regex_montant)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                tableau_recu[index].label
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + tableau_recu[index].id).css('background-color', 'white');
          }
        }
        // le type numerique
        if (tableau_recu[index].type == 'numerique') {
          if (!tableau_recu[index].valeur.match(regex_numerique)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                tableau_recu[index].label
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + tableau_recu[index].id).css('background-color', 'white');
          }
        }
        // le type date
        if (tableau_recu[index].type == 'date') {
          // decomposition de la date
          AnneeDateRecu = tableau_recu[index].valeur.substr(6, 4);
          MoisDateRecu = tableau_recu[index].valeur.substr(3, 2);
          JourDateRecu = tableau_recu[index].valeur.substr(0, 2);
          // verification du pattern
          if (!tableau_recu[index].valeur.match(regex_date)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                tableau_recu[index].label
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          }
          // si l'annee n'est pas bissextile
          else if (
            this.AnneeBissextile(AnneeDateRecu) == false &&
            MoisDateRecu == '02' &&
            JourDateRecu > '28'
          ) {
            this.NotificationErreur(
              tableau_recu[index].label + " n'est pas une date valide"
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          }
          // si l'annee est bissextile
          else if (
            this.AnneeBissextile(AnneeDateRecu) == true &&
            MoisDateRecu == '02' &&
            JourDateRecu > '29'
          ) {
            this.NotificationErreur(
              tableau_recu[index].label + " n'est pas une date valide"
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          }
          // si l'annee comporte 30 jours
          else if (
            (MoisDateRecu == '04' ||
              MoisDateRecu == '06' ||
              MoisDateRecu == '09' ||
              MoisDateRecu == '11') &&
            JourDateRecu > '30'
          ) {
            this.NotificationErreur(
              tableau_recu[index].label + " n'est pas une date valide"
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + tableau_recu[index].id).css('background-color', 'white');
          }
        }
        // le type annee
        if (tableau_recu[index].type == 'annee') {
          if (!tableau_recu[index].valeur.match(regex_annee)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                tableau_recu[index].label
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + tableau_recu[index].id).css('background-color', 'white');
          }
        }
        // le type telephone
        if (tableau_recu[index].type == 'telephone') {
          if (!tableau_recu[index].valeur.match(regex_telephone)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                tableau_recu[index].label
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + tableau_recu[index].id).css('background-color', 'white');
          }
        }
        // le type taux
        if (tableau_recu[index].type == 'taux') {
          if (!tableau_recu[index].valeur.match(regex_taux)) {
            this.NotificationErreur(
              'Veuillez renseigner correctement le champ ' +
                tableau_recu[index].label
            );
            $('#' + tableau_recu[index].id).css(
              'background-color',
              'MistyRose'
            );
            tableau_recu = [];
            this.statut_type_de_donnee = false;
            break;
          } else {
            this.statut_type_de_donnee = true;
            $('#' + tableau_recu[index].id).css('background-color', 'white');
          }
        }
      }
      if (
        tableau_recu[index].obligatoire == 'N' &&
        tableau_recu[index].valeur == ''
      ) {
        $('#' + tableau_recu[index].id).css('background-color', 'white');
      }
    }

    // approbation des type de donnees  pour les champs non obligatoire
    if (this.statut_type_de_donnee == true) {
      this.statut_traitement_champ_non_obligatoire = true;
    }
  }

  // methode pour tester les types de donnée pour les champs non obligatoire dans les tableaux a saisie
  TypeDeDonneeChampNonObligatoireTableauASaisie(tableau_recu: any) {
    this.statut_traitement_champ_non_obligatoire = false;
    this.champ_a_renseigner = [];

    // les differentes expressions reguliere
    let regex_numerique = /^[\d]+$/;
    let regex_telephone = /^[\d]{6,15}$/;
    let regex_date =
      /^([0][1-9]|[1|2][0-9]|[3][0|1])[./-]([0][1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
    let regex_annee = /^([0-9]{4})$/;
    let regex_montant = /^[\d]{1,12}$/;
    let regex_email =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let regex_email = /^([^*/\\._-])([w.-])*(@gmail|@yahoo|@outlook).(com|fr)$/;
    let regex_taux =
      /^(\$(?=[0-9])((\d*\.\d{1,2})|\d+\.?)|((?=[0-9])(\d+\.?)|((?=([0-9]+|\d*\.0*[1-9]+))\d{1,3}\,\d{1,3})))$/;

    let AnneeDateRecu = '';
    let MoisDateRecu = '';
    let JourDateRecu = '';

    // test type de donnée pour les champs non obligatoire
    for (let index1 = 0; index1 < tableau_recu.length; index1++) {
      for (
        let index = 0;
        index < tableau_recu[index1].colonneTableau.length;
        index++
      ) {
        // champ obligatoire
        if (tableau_recu[index1].colonneTableau[index].obligatoire == 'O') {
          if (
            tableau_recu[index1].colonneTableau[index].valeur == '' ||
            tableau_recu[index1].colonneTableau[index].valeur == undefined ||
            tableau_recu[index1].colonneTableau[index].valeur == null
          ) {
            this.statut_champ_obligatoire = false;
            this.champ_a_renseigner.push(
              tableau_recu[index1].colonneTableau[index]
            );
            this.tab_type_de_donnee = [];
          } else {
            this.statut_champ_obligatoire = true;
            $('#' + tableau_recu[index1].colonneTableau[index].id).css(
              'background-color',
              'white'
            );
            this.tab_type_de_donnee.push(
              tableau_recu[index1].colonneTableau[index]
            );
          }
        }

        if (this.champ_a_renseigner.length == 0) {
          // lorsque le champ est non obligatoire
          if (
            tableau_recu[index1].colonneTableau[index].obligatoire == 'N' &&
            tableau_recu[index1].colonneTableau[index].valeur != ''
          ) {
            // le type email
            if (tableau_recu[index1].colonneTableau[index].type == 'email') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_email
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type montant
            if (tableau_recu[index1].colonneTableau[index].type == 'montant') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_montant
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type numerique
            if (
              tableau_recu[index1].colonneTableau[index].type == 'numerique'
            ) {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_numerique
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /*  $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type date
            if (tableau_recu[index1].colonneTableau[index].type == 'date') {
              // decomposition de la date
              AnneeDateRecu = tableau_recu[index1].colonneTableau[
                index
              ].valeur.substr(6, 4);
              MoisDateRecu = tableau_recu[index1].colonneTableau[
                index
              ].valeur.substr(3, 2);
              JourDateRecu = tableau_recu[index1].colonneTableau[
                index
              ].valeur.substr(0, 2);
              // verification du pattern
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_date
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              }
              // si l'annee n'est pas bissextile
              else if (
                this.AnneeBissextile(AnneeDateRecu) == false &&
                MoisDateRecu == '02' &&
                JourDateRecu > '28'
              ) {
                this.NotificationErreur(
                  tableau_recu[index1].colonneTableau[index].label +
                    " n'est pas une date valide"
                );
                /*  $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              }
              // si l'annee est bissextile
              else if (
                this.AnneeBissextile(AnneeDateRecu) == true &&
                MoisDateRecu == '02' &&
                JourDateRecu > '29'
              ) {
                this.NotificationErreur(
                  tableau_recu[index1].colonneTableau[index].label +
                    " n'est pas une date valide"
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              }
              // si l'annee comporte 30 jours
              else if (
                (MoisDateRecu == '04' ||
                  MoisDateRecu == '06' ||
                  MoisDateRecu == '09' ||
                  MoisDateRecu == '11') &&
                JourDateRecu > '30'
              ) {
                this.NotificationErreur(
                  tableau_recu[index1].colonneTableau[index].label +
                    " n'est pas une date valide"
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type annee
            if (tableau_recu[index1].colonneTableau[index].type == 'annee') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_annee
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type telephone
            if (
              tableau_recu[index1].colonneTableau[index].type == 'telephone'
            ) {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_telephone
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type taux
            if (tableau_recu[index1].colonneTableau[index].type == 'taux') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_taux
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
          }
          // lorsque le champ est obligatoire
          if (
            tableau_recu[index1].colonneTableau[index].obligatoire == 'O' &&
            tableau_recu[index1].colonneTableau[index].valeur != ''
          ) {
            // le type email
            if (tableau_recu[index1].colonneTableau[index].type == 'email') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_email
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type montant
            if (tableau_recu[index1].colonneTableau[index].type == 'montant') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_montant
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type numerique
            if (
              tableau_recu[index1].colonneTableau[index].type == 'numerique'
            ) {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_numerique
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /*  $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type date
            if (tableau_recu[index1].colonneTableau[index].type == 'date') {
              // decomposition de la date
              AnneeDateRecu = tableau_recu[index1].colonneTableau[
                index
              ].valeur.substr(6, 4);
              MoisDateRecu = tableau_recu[index1].colonneTableau[
                index
              ].valeur.substr(3, 2);
              JourDateRecu = tableau_recu[index1].colonneTableau[
                index
              ].valeur.substr(0, 2);
              // verification du pattern
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_date
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              }
              // si l'annee n'est pas bissextile
              else if (
                this.AnneeBissextile(AnneeDateRecu) == false &&
                MoisDateRecu == '02' &&
                JourDateRecu > '28'
              ) {
                this.NotificationErreur(
                  tableau_recu[index1].colonneTableau[index].label +
                    " n'est pas une date valide"
                );
                /*  $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              }
              // si l'annee est bissextile
              else if (
                this.AnneeBissextile(AnneeDateRecu) == true &&
                MoisDateRecu == '02' &&
                JourDateRecu > '29'
              ) {
                this.NotificationErreur(
                  tableau_recu[index1].colonneTableau[index].label +
                    " n'est pas une date valide"
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              }
              // si l'annee comporte 30 jours
              else if (
                (MoisDateRecu == '04' ||
                  MoisDateRecu == '06' ||
                  MoisDateRecu == '09' ||
                  MoisDateRecu == '11') &&
                JourDateRecu > '30'
              ) {
                this.NotificationErreur(
                  tableau_recu[index1].colonneTableau[index].label +
                    " n'est pas une date valide"
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type annee
            if (tableau_recu[index1].colonneTableau[index].type == 'annee') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_annee
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type telephone
            if (
              tableau_recu[index1].colonneTableau[index].type == 'telephone'
            ) {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_telephone
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
            // le type taux
            if (tableau_recu[index1].colonneTableau[index].type == 'taux') {
              if (
                !tableau_recu[index1].colonneTableau[index].valeur.match(
                  regex_taux
                )
              ) {
                this.NotificationErreur(
                  'Veuillez renseigner correctement le champ ' +
                    tableau_recu[index1].colonneTableau[index].label
                );
                /* $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                'background-color',
                'MistyRose'
              ); */
                tableau_recu = [];
                this.statut_type_de_donnee = false;
                break;
              } else {
                this.statut_type_de_donnee = true;
                $('#' + tableau_recu[index1].colonneTableau[index].id).css(
                  'background-color',
                  'white'
                );
              }
            }
          }
          // lorsque le champ est non obligatoire et n'est pas renseigné
          if (
            tableau_recu[index1].colonneTableau[index].obligatoire == 'N' &&
            tableau_recu[index1].colonneTableau[index].valeur == ''
          ) {
            $('#' + tableau_recu[index1].colonneTableau[index].id).css(
              'background-color',
              'white'
            );
          }
        }
      }
    }

    // la liste des champs obligatoire a renseigner
    if (this.champ_a_renseigner.length != 0) {
      this.statut_champ_obligatoire = false;
      this.statut_type_de_donnee = false;
      this.tab_type_de_donnee = [];
      this.NotificationErreur('Veuillez renseigner les champs obligatoire');
      for (let index = 0; index < this.champ_a_renseigner.length; index++) {
        console.log(this.champ_a_renseigner[index].id);

        $('#' + this.champ_a_renseigner[index].id).css(
          'background-color',
          'MistyRose'
        );
      }
    }

    // approbation des type de donnees  pour les champs non obligatoire
    if (this.statut_type_de_donnee == true) {
      this.statut_traitement_champ_non_obligatoire = true;
    }
  }
  // ******************** SECTION DES VERIFICATIONS POUR LES CHAMPS OBLIGATOIRE fin

  // ******************** SECTION DES ACTIONS GENERALES debut
  // methode pour connaitre la taille de l'ecran
  PouceDuDevice() {
    var stat = screen.width;
    this.cacher_le_menu = stat;
    if (stat > 1179) {
      this.valeur_ecran = true;
    } else {
      this.valeur_ecran = false;
    }
  }

  //methode pour la coche avec les checkbox
  Coche(valeur: any) {
    if (valeur == 'O') {
      valeur = true;
      return valeur;
    } else {
      valeur = false;
      return valeur;
    }
  }
  // ******************** SECTION DES ACTIONS GENERALES fin
}
