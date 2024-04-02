import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
const toastr = require('toastr');
declare var $: any;
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
  customizer: any;
  infoChmpPassword: any;
  infoBtnPassword: boolean = true;
  temps_de_latence: boolean = true;
  formulaire_avis: any = [
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
      obligatoire: 'N',
      label: 'observation',
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
    public AuthService: AuthService
  ) {}

  Login() {
    let Options = 'RequeteClientsClasse.svc/pvgLogin';

    let body = {
      Objets: [
        {
          // OE_PARAM: ['0001', this.formLogin.login, this.formLogin.mdp], // operateur personnalisable
          OE_PARAM: ['0002', this.formLogin.login, this.formLogin.mdp], // client personnalisable
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
          if (this.RetoursChargement[0].TU_CODETYPEUTILISATEUR == '0001') {
            if (this.RetoursChargement[0].CU_NOMBRECONNECTION == '0') {
              window.location.href = '/auth/changePassword';
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
            this.formulaire_recupMdp[0].valeur = '';
            this.formulaire_recupMdp[1].valeur = '';
            this.toastr.success(
              this.RetoursChargementMdp[0].clsResultat.SL_MESSAGE,
              'success'
            );
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

  ngOnInit(): void {
    if (sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/admin';
    }

    this.ValeurDeDecision();
  }
}
