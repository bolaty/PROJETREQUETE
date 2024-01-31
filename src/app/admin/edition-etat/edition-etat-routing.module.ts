import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionEtatComponent } from './edition-etat.component';
import { EditionChambreComponent } from './edition-chambre/edition-chambre.component';
import { EditionPrestationsServicesComponent } from './edition-prestations-services/edition-prestations-services.component';
import { EditionComptabiliteComponent } from './edition-comptabilite/edition-comptabilite.component';
import { EditionClientComponent } from './edition-client/edition-client.component';

const routes: Routes = [
  {
    path: '',
    component: EditionEtatComponent,
    children: [
      { path: 'editionChambre', component: EditionChambreComponent },
      {
        path: 'editionPrestationServices',
        component: EditionPrestationsServicesComponent,
      },
      { path: 'editionComptabilite', component: EditionComptabiliteComponent },
      { path: 'editionClient', component: EditionClientComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditionEtatRoutingModule {}
