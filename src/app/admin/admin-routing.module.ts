import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaintesComponent } from './plaintes/plaintes.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { EditionsComponent } from './editions/editions.component';
import { OperateurComponent } from './operateur/operateur.component';
import { RelanceComponent } from './relance/relance.component';
import { SuiviRequeteComponent } from './suivi-requete/suivi-requete.component';
import { PrintPageComponent } from './print-page/print-page.component';
import { EtatSuiviComponent } from './states/components/etat-suivi/etat-suivi.component';
import { EtatSuiviReclamationComponent } from './states/components/etat-suivi-reclamation/etat-suivi-reclamation.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // menu dashboard
      { path: 'dashboard', component: DashboardComponent },

      // menu operateur
      { path: 'Operateur', component: OperateurComponent },

      // menu operateur
      { path: 'Client', component: OperateurComponent },

      // menu Relance
      { path: 'Relance', component: RelanceComponent },

      // menu plaintes
      {
        path: 'plaintes',
        children: [
          { path: '', redirectTo: 'liste', pathMatch: 'full' },
          { path: 'liste', component: PlaintesComponent },
          { path: 'liste/SuiviRequete', component: SuiviRequeteComponent },
        ],
      },

      // menu reclamations
      {
        path: 'reclamations',
        children: [
          { path: '', redirectTo: 'liste', pathMatch: 'full' },
          {
            path: 'liste',
            component: ReclamationsComponent,
          },
          { path: 'liste/SuiviRequete', component: SuiviRequeteComponent },
        ],
      },

      // menu edition
      {
        path: 'edition',
        children: [
          { path: '', redirectTo: 'liste', pathMatch: 'full' },
          {
            path: 'liste',
            component: EditionsComponent,
          },
        ],
      },

      // menu Impression
      { path: 'impression', component: PrintPageComponent },
      { path: 'etat-suivi', component: EtatSuiviComponent },
      {
        path: 'etat-suivi-reclamation',
        component: EtatSuiviReclamationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
