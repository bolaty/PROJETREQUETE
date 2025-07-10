import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/admin.service';
const toastr = require('toastr');

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: any = {};
  RetoursChargement: any = [];
  RetoursChargementMdp: any = [];
  tab_valeur_de_decision: any = [];
  tab_retour_data: any = [];
  ListeDroitforUser: any = [];
  ListeDroitUser: any = [];
  customizer: any;
  message: any;
  infoChmpPassword: any;
  infoBtnPassword: boolean = true;
  temps_de_latence: boolean = true;
  formulaire_new_reclam: any = [
    {
      id: 'nom',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'nom',
    },
    {
      id: 'prenoms',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'prénoms',
    },
    {
      id: 'email',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'email',
    },
    {
      id: 'telephone',
      type: 'telephone',
      valeur: '',
      obligatoire: 'N',
      label: 'numéro de téléphone',
    },
    {
      id: 'invoice-observation-avis',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'observation',
    },
    {
      id: 'numCompte',
      type: 'text',
      valeur: '',
      obligatoire: 'N',
      label: 'numéro de compte',
    },
  ];
  formulaire_recupMdp: any = [
    {
      id: 'EmailRecup',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Email',
    },
    {
      id: 'LoginRecup',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'Login',
    },
  ];

  constructor(
    public _router: Router,
    private toastr: ToastrService,
    public AuthService: AuthService,
    public AdminService: AdminService
  ) {}

  Login() {
    let Options = 'RequeteClientsClasse.svc/pvgLogin';

    let body = {
      Objets: [
        {
          OE_PARAM: ['0001', this.formLogin.login, this.formLogin.mdp], // operateur personnalisable
          //OE_PARAM: ['0002', this.formLogin.login, this.formLogin.mdp], // client personnalisable
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AuthService.ShowLoader();

    this.AuthService.AppelServeur(body, Options).subscribe(
      (success: any) => {
        this.RetoursChargement = success;
        this.RetoursChargement = this.RetoursChargement.pvgLoginResult;
        console.log('RetoursChargement', this.RetoursChargement);
        this.AuthService.CloseLoader();

        if (this.RetoursChargement[0].clsResultat.SL_RESULTAT == 'FALSE') {
          // toastr.error(this.RetoursChargement[0].clsResultat.SL_MESSAGE, "Succès")
          this.toastr.error(
            this.RetoursChargement[0].clsResultat.SL_MESSAGE,
            'Echec'
          );
        } else {
          // Vérification de l'année courante
          const anneeBase = this.RetoursChargement[0].EX_EXERCICE;
          const anneeSysteme = new Date().getFullYear().toString();
          if (anneeBase !== anneeSysteme) {
            this.toastr.error(
              `Attention : L'année courante de la base (${anneeBase}) est différente de l'année système (${anneeSysteme})`,
              'Alerte'
            );
            return ; // Arrêter le traitement si les années ne correspondent pas
          }
          if (this.RetoursChargement[0].TU_CODETYPEUTILISATEUR == '0001') {
            if (this.RetoursChargement[0].CU_NOMBRECONNECTION == '0') {
              window.location.href = '/auth/changePassword';
            } else if (
              this.RetoursChargement[0].CU_NOMUTILISATEUR.includes('ADMIN')
            ) {
              this.toastr.success(
                this.RetoursChargement[0].clsResultat.SL_MESSAGE,
                'success'
              );

              sessionStorage.setItem('isLoggedIn', 'true');
              this.formLogin.login = '';
              this.formLogin.mdp = '';
              sessionStorage.setItem(
                'infoLogin',
                JSON.stringify(this.RetoursChargement)
              );
              window.location.href = '/admin';
            } else {
              this.toastr.success(
                this.RetoursChargement[0].clsResultat.SL_MESSAGE,
                'success'
              );

              sessionStorage.setItem('isLoggedIn', 'true');
              this.formLogin.login = '';
              this.formLogin.mdp = '';
              sessionStorage.setItem(
                'infoLogin',
                JSON.stringify(this.RetoursChargement)
              );
              this.ComboListeDroitUtilisateur();
            }
          } else {
            this.toastr.success(
              this.RetoursChargement[0].clsResultat.SL_MESSAGE,
              'success'
            );

            sessionStorage.setItem('isLoggedIn', 'true');
            this.formLogin.login = '';
            this.formLogin.mdp = '';
            sessionStorage.setItem(
              'infoLogin',
              JSON.stringify(this.RetoursChargement)
            );
            window.location.href = '/admin';
          }
        }
      },
      (error) => {
        this.AuthService.CloseLoader();
        //  toastr.warning('Veuillez réessayer svp !!!')
        this.toastr.warning('Veuillez réessayer svp !!!', 'warning');
      }
    );
  }
  ComboListeDroitUtilisateur() {
    let Option =
      'RequeteClientsClasse.svc/pvgInsertIntoDatasetListeDroitUtilisateur';
    let body = {
      Objets: [
        {
          OE_PARAM: [],
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeDroitUser = success;
        this.ComboDroitPARUtilisateur(
          this.RetoursChargement[0].CU_CODECOMPTEUTULISATEUR
        );
      },
      (error) => {}
    );
  }
  ComboDroitPARUtilisateur(idOperateur: any) {
    let Option = 'RequeteClientsClasse.svc/pvgDroitParOperateurs';
    let body = {
      Objets: [
        {
          CU_CODECOMPTEUTULISATEUR: idOperateur,
          clsObjetEnvoi: {
            ET_CODEETABLISSEMENT: '',
            AN_CODEANTENNE: '',
            TYPEOPERATION: '01',
          },
        },
      ],
    };
    this.AdminService.AppelServeur(body, Option).subscribe(
      (success: any) => {
        this.ListeDroitforUser = success;
        this.ListeDroitforUser =
          this.ListeDroitforUser.pvgDroitParOperateursResult;
        if (this.ListeDroitforUser[0].clsResultat.SL_RESULTAT == 'TRUE') {
          this.ListeDroitUser.forEach((LtDroitUser2: any) => {
            LtDroitUser2.DP_STATUT = 'N';
          });
          if (this.ListeDroitforUser.length > 0) {
            this.ListeDroitUser.forEach((LtDroitUser2: any) => {
              this.ListeDroitforUser.forEach((LtDroifortUser: any) => {
                if (
                  LtDroifortUser.DP_CODEDROITCOMPTEUTULISATEUR ==
                  LtDroitUser2.DP_CODEDROITCOMPTEUTULISATEUR
                ) {
                  LtDroitUser2.DP_STATUT = 'O';
                  LtDroitUser2.DP_OBJET = LtDroifortUser.DP_OBJET;
                }
              });
            });
          }
        }
        sessionStorage.setItem(
          'ListeDroitUsers',
          JSON.stringify(this.ListeDroitUser)
        );

        if (this.ListeDroitUser[11].DP_STATUT == 'O') {
          this.RetoursChargement[0].CU_NOMUTILISATEUR =
            this.RetoursChargement[0].CU_NOMUTILISATEUR + 'ADMIN SPECIAL';
          sessionStorage.setItem(
            'infoLogin',
            JSON.stringify(this.RetoursChargement)
          );
        }
        window.location.href = '/admin';
      },
      (error) => {}
    );
  }
  Recuperation() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^(0|[0-9]\d*)$/;
    var statuttest = 'NITELEPHONENIEMAIL';
    let Options = 'RequeteClientsClasse.svc/pvgPasswordRequest';

    if (emailPattern.test(this.formulaire_recupMdp[0].valeur)) {
      statuttest = 'OK';
    } else if (phonePattern.test(this.formulaire_recupMdp[0].valeur)) {
      statuttest = 'OK';
    } else {
      statuttest = 'NITELEPHONENIEMAIL';
    }

    if (statuttest == 'NITELEPHONENIEMAIL') {
      this.toastr.error(
        "L'entrée n'est ni un email ni un numéro de téléphone valide",
        'error',
        { positionClass: 'toast-bottom-left' }
      );
    } else if (
      this.formulaire_recupMdp[1].valeur == '' ||
      this.formulaire_recupMdp[1].valeur == undefined
    ) {
      this.toastr.error('veuillez renseigner un login svp !!!', 'error', {
        positionClass: 'toast-bottom-left',
      });
    } else {
      let body = {
        Objets: [
          {
            CU_CONTACT: this.formulaire_recupMdp[0].valeur,
            CU_LOGIN: this.formulaire_recupMdp[1].valeur,
            clsObjetEnvoi: {
              ET_CODEETABLISSEMENT: '',
              AN_CODEANTENNE: '',
              TYPEOPERATION: '0',
            },
          },
        ],
      };
      this.AuthService.ShowLoader();

      this.AuthService.AppelServeur(body, Options).subscribe(
        (success: any) => {
          this.RetoursChargementMdp = success;
          this.RetoursChargementMdp =
            this.RetoursChargementMdp.pvgPasswordRequestResult;
          this.AuthService.CloseLoader();
          if (this.RetoursChargementMdp[0].clsResultat.SL_RESULTAT == 'FALSE') {
            this.toastr.error(
              this.RetoursChargementMdp[0].clsResultat.SL_MESSAGE,
              'Echec'
            );
          } else {
            if (this.formulaire_recupMdp[0].valeur.includes('@')) {
              this.RetoursChargementMdp[0].clsResultat.SL_MESSAGE =
                this.message =
                  'Veuillez consulter votre boite mail pour recuperer votre mot de passe.';
            } else {
              this.RetoursChargementMdp[0].clsResultat.SL_MESSAGE =
                this.message =
                  'Un sms contenant votre mot de passe vous a été envoyé.';
            }

            this.formulaire_recupMdp[0].valeur = '';
            this.formulaire_recupMdp[1].valeur = '';
            /*  this.toastr.success(
              this.RetoursChargementMdp[0].clsResultat.SL_MESSAGE,
              'success'
            );  */

            $('#onboardImageModal').modal('show');

            $('#sendInvoiceOffcanvasMotdepasse').offcanvas('hide');
          }
        },
        (error) => {
          this.AuthService.CloseLoader();
          this.toastr.warning('Veuillez réessayer svp !!!', 'warning');
        }
      );
    }
  }

  voirTraitement(): void {
    $('#sendInvoiceOffcanvas').offcanvas('show');
  }
  voirRecuperation(): void {
    $('#sendInvoiceOffcanvasMotdepasse').offcanvas('show');
  }

  ValeurDeDecision() {
    let Options = 'RequeteClientsClasse.svc/pvgNomDeLaStructure';

    let body = {
      PP_CODEPARAMETRE: 'NMCLT',
    };

    this.AuthService.AppelServeur(body, Options).subscribe(
      (success: any) => {
        this.tab_valeur_de_decision = success;
        this.tab_valeur_de_decision = JSON.parse(this.tab_valeur_de_decision);
        this.tab_valeur_de_decision = this.tab_valeur_de_decision.TABLE;

        sessionStorage.setItem(
          'info_de_decision',
          JSON.stringify(this.tab_valeur_de_decision[0].PP_VALEUR)
        );

        this.customizer = JSON.parse(
          sessionStorage.getItem('info_de_decision') || ''
        );

        // personnalisable
        switch (this.customizer) {
          case 'remuci':
            this.AuthService.nom_de_la_structure = 'REMU-CI';
            break;

          case 'gesci':
            this.AuthService.nom_de_la_structure = 'GES-CI';
            break;

          default:
            break;
        }

        this.temps_de_latence = false;
        console.log('tab_valeur_de_decision', this.tab_valeur_de_decision);
      },
      (error) => {}
    );
  }

  ShowHide(val_bool: boolean): void {
    this.infoChmpPassword = document.getElementById('password');
    this.infoBtnPassword = val_bool;
    if (this.infoChmpPassword.type === 'password') {
      this.infoChmpPassword.type = 'text';
    } else {
      this.infoChmpPassword.type = 'password';
    }
  }

  SubmitNewReclam(tableau_recu: any) {
    this.AdminService.SecuriteChampObligatoireEtTypeDeDonnee(tableau_recu);
    this.AdminService.TypeDeDonneeChampNonObligatoire(tableau_recu);

    if (
      this.AdminService.statut_traitement == true &&
      this.AdminService.statut_traitement_champ_non_obligatoire == true
    ) {
      /* var d = new Date();
      var date =
        d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
      var jour = d.getDate();
      if (jour < 10) {
        var date =
          '0' + d.getDate() + '-0' + (d.getMonth() + 1) + '-' + d.getFullYear();
        console.log(date);
      }*/

      var d = new Date();
      var jour = d.getDate();
      var mois = d.getMonth() + 1; // Les mois sont comptés de 0 à 11 en JavaScript
      var annee = d.getFullYear();

      // Ajout des zéros devant le jour et le mois s'ils sont inférieurs à 10
      var date =
        (jour < 10 ? '0' + jour : jour) +
        '-' +
        (mois < 10 ? '0' + mois : mois) +
        '-' +
        annee;

      let Options = 'RequeteClientsClasse.svc/pvgEnvoiEmail';

      let body = {
        Objets: [
          {
            EE_NOM: this.formulaire_new_reclam[0].valeur,
            EE_PRENOMS: this.formulaire_new_reclam[1].valeur,
            EE_EMAIL: this.formulaire_new_reclam[2].valeur,
            EE_NUMTELEPHONE: this.formulaire_new_reclam[3].valeur,
            EE_NUMCOMPTE: this.formulaire_new_reclam[5].valeur,
            EE_OBSERVATION: this.formulaire_new_reclam[4].valeur,
            EE_DATEEMISSION: date,
            clsObjetEnvoi: {
              TYPEOPERATION: '0',
            },
          },
        ],
      };
      this.AdminService.ShowLoader();
      this.AdminService.AppelServeur(body, Options).subscribe(
        (success) => {
          this.tab_retour_data = success;
          this.tab_retour_data = this.tab_retour_data.pvgEnvoiEmailResult;
          if (this.tab_retour_data[0].clsResultat.SL_RESULTAT == 'FALSE') {
            this.toastr.error(
              this.tab_retour_data[0].clsResultat.SL_MESSAGE,
              'error',
              { positionClass: 'toast-bottom-left' }
            );
            this.AdminService.CloseLoader();
          } else {
            for (
              let index = 0;
              index < this.formulaire_new_reclam.length;
              index++
            ) {
              this.formulaire_new_reclam[index].valeur = '';
            }
            this.toastr.success(
              this.tab_retour_data[0].clsResultat.SL_MESSAGE,
              'success',
              { positionClass: 'toast-bottom-left' }
            );
            this.AdminService.CloseLoader();
          }
        },
        (error: any) => {
          this.AdminService.CloseLoader();
          // this.toastr.warning(this.tab_retour_data[0].clsResultat.SL_MESSAGE);
          this.toastr.warning(
            this.tab_retour_data[0].clsResultat.SL_MESSAGE,
            'warning',
            { positionClass: 'toast-bottom-left' }
          );
        }
      );
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/admin';
    }

   
    setTimeout(() => {
       this.ValeurDeDecision();
    }, 5000);
  }
}
