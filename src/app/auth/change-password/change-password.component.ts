import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(private toastr: ToastrService, public AuthService: AuthService) {}

  formulaire_change_mdp: any = [
    {
      id: 'oldLogin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'ancien login',
    },
    {
      id: 'newLogin',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'nouveau login',
    },
    {
      id: 'oldPassword',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'ancien mot de passe',
    },
    {
      id: 'newPassword',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'nouveau mot de passe',
    },
    {
      id: 'confirmPassword',
      type: 'text',
      valeur: '',
      obligatoire: 'O',
      label: 'confirmation du mot de passe',
    },
  ];
  tab_modif_mdp: any = [];
  infoChmpPassword_1: any;
  infoChmpPassword_2: any;
  infoChmpPassword_3: any;
  infoBtnPassword_1: boolean = true;
  infoBtnPassword_2: boolean = true;
  infoBtnPassword_3: boolean = true;

  RetourConnexion() {
    window.location.href = '/auth/login';
  }

  NouveauMotDePasse() {
    if (
      this.formulaire_change_mdp[2].valeur ==
      this.formulaire_change_mdp[3].valeur
    ) {
      this.toastr.error(
        "Le nouveau mot de passe doit être différent de l'ancien",
        'Echec'
      );
    } else if (
      this.formulaire_change_mdp[3].valeur !=
      this.formulaire_change_mdp[4].valeur
    ) {
      this.toastr.error(
        "Le mot de passe n'a pas été confirmé correctement.\n Veuillez verifier le nouveau mot de passe et la confirmation",
        'Echec'
      );
    } else {
      let Options = 'RequeteClientsClasse.svc/pvgUpdateFirstconnexion';

      let body = {
        //TU_CODETYPEUTILISATEUR: '0001', // personnalisable // operateur
        TU_CODETYPEUTILISATEUR: '0002', // personnalisable // client
        CU_MOTDEPASSEOLD: this.formulaire_change_mdp[2].valeur,
        CU_LOGINOLD: this.formulaire_change_mdp[0].valeur,
        CU_MOTDEPASSENEW: this.formulaire_change_mdp[4].valeur,
        CU_LOGINNEW: this.formulaire_change_mdp[1].valeur,
        CU_CLESESSION: '.',
      };
      this.AuthService.ShowLoader();

      this.AuthService.AppelServeur(body, Options).subscribe(
        (success: any) => {
          this.tab_modif_mdp = success;
          this.tab_modif_mdp = this.tab_modif_mdp.pvgUpdateFirstconnexionResult;
          console.log('tab_modif_mdp', this.tab_modif_mdp);
          this.AuthService.CloseLoader();

          if (this.tab_modif_mdp[0].clsResultat.SL_RESULTAT == 'FALSE') {
            this.toastr.error(
              this.tab_modif_mdp[0].clsResultat.SL_MESSAGE,
              'Echec'
            );
          } else {
            this.toastr.success(
              this.tab_modif_mdp[0].clsResultat.SL_MESSAGE,
              'success'
            );

            window.location.href = '/auth/login';
          }
        },
        (error) => {
          this.AuthService.CloseLoader();
          //  toastr.warning('Veuillez réessayer svp !!!')
          this.toastr.warning('Veuillez réessayer svp !!!', 'warning');
        }
      );
    }
  }

  ShowHide1(val_bool: boolean): void {
    this.infoChmpPassword_1 = document.getElementById('oldPassword');
    this.infoBtnPassword_1 = val_bool;
    if (this.infoChmpPassword_1.type === 'password') {
      this.infoChmpPassword_1.type = 'text';
    } else {
      this.infoChmpPassword_1.type = 'password';
    }
  }

  ShowHide2(val_bool: boolean): void {
    this.infoChmpPassword_2 = document.getElementById('newPassword');
    this.infoBtnPassword_2 = val_bool;
    if (this.infoChmpPassword_2.type === 'password') {
      this.infoChmpPassword_2.type = 'text';
    } else {
      this.infoChmpPassword_2.type = 'password';
    }
  }

  ShowHide3(val_bool: boolean): void {
    this.infoChmpPassword_3 = document.getElementById('confirmPassword');
    this.infoBtnPassword_3 = val_bool;
    if (this.infoChmpPassword_3.type === 'password') {
      this.infoChmpPassword_3.type = 'text';
    } else {
      this.infoChmpPassword_3.type = 'password';
    }
  }
}
