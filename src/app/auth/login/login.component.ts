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
  formLogin:any={}
  RetoursChargement:any=[]
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
    }
  ];
  constructor(
    public _router: Router,
    private toastr: ToastrService,
    public AuthService: AuthService
    ) {}

    Login(){
     let Options = 'RequeteClientsClasse.svc/pvgLogin'
  
      let body = {
        "Objets": [
            {
                "OE_PARAM": [
                    "0001",
                    this.formLogin.login,
                    this.formLogin.mdp
                ],
                "clsObjetEnvoi": {
                    "ET_CODEETABLISSEMENT": "",
                    "AN_CODEANTENNE": "",
                    "TYPEOPERATION": "01"
                }
            }
        ]
    };
    this.AuthService.ShowLoader()
  
      this.AuthService.AppelServeur(body, Options).subscribe((success: any) => {
        this.RetoursChargement = success
        this.RetoursChargement = this.RetoursChargement.pvgLoginResult
        this.AuthService.CloseLoader()
        if (this.RetoursChargement[0].clsResultat.SL_RESULTAT == 'FALSE') {
         // toastr.error(this.RetoursChargement[0].clsResultat.SL_MESSAGE, "Succès")
          this.toastr.error(this.RetoursChargement[0].clsResultat.SL_MESSAGE, 'Echec');
        }
         else {
          this.toastr.success(this.RetoursChargement[0].clsResultat.SL_MESSAGE, 'success');
        
          sessionStorage.setItem('isLoggedIn', 'true');
          this.formLogin.login = ''
          this.formLogin.mdp = ''
          sessionStorage.setItem(
            'infoLogin',
            JSON.stringify(this.RetoursChargement)
          );
          window.location.href = '/admin';
        }
      },(error) => {
        this.AuthService.CloseLoader()
      //  toastr.warning('Veuillez réessayer svp !!!')
        this.toastr.warning('Veuillez réessayer svp !!!', 'warning');
      }
      );
    }
    voirTraitement(): void {
      $("#sendInvoiceOffcanvas").offcanvas('show')

    }
    ngOnInit(): void {
      if (sessionStorage.getItem('isLoggedIn')) {
        window.location.href = '/admin';
      }
     }
}
