import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AgentComponent } from './parametrage/agent/agent.component';
import { ChambresComponent } from './chambres/chambres.component';
import { ClientComponent } from './client/client.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditionChambreComponent } from './edition-etat/edition-chambre/edition-chambre.component';
import { EditionClientComponent } from './edition-etat/edition-client/edition-client.component';
import { EditionComptabiliteComponent } from './edition-etat/edition-comptabilite/edition-comptabilite.component';
import { EditionEtatComponent } from './edition-etat/edition-etat.component';
import { EditionPrestationsServicesComponent } from './edition-etat/edition-prestations-services/edition-prestations-services.component';
import { JourneeExerciceComponent } from './parametrage/journee-exercice/journee-exercice.component';
import { PrestationsServiceComponent } from './prestations-service/prestations-service.component';
import { RestaurationComponent } from './restauration/restauration.component';
import { ExtourneComponent } from './comptabilite/extourne/extourne.component';
import { ReglementFactureComponent } from './comptabilite/reglement-facture/reglement-facture.component';
import { RecapClientComponent } from './client/recap-client/recap-client.component';
import { ReservationComponent } from './prestations-service/reservation/reservation.component';
import { AutresPrestationsComponent } from './prestations-service/autres-prestations/autres-prestations.component';
import { ParametrageComponent } from './parametrage/parametrage.component';
import { PlaintesComponent } from './plaintes/plaintes.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { EditionsComponent } from './editions/editions.component';
import { AttributionPlaintesReclamationsComponent } from './attribution-plaintes-reclamations/attribution-plaintes-reclamations.component';
import { OperateurComponent } from './operateur/operateur.component';
import { RelanceComponent } from './relance/relance.component';
import { SuiviRequeteComponent } from './suivi-requete/suivi-requete.component';
import { FormsModule } from '@angular/forms';
import { PrintPageComponent } from './print-page/print-page.component';
import { EtatSuiviComponent } from './states/components/etat-suivi/etat-suivi.component';
import { EtatSuiviReclamationComponent } from './states/components/etat-suivi-reclamation/etat-suivi-reclamation.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FrequenceReceptionReclamComponent } from './states/components/frequence-reception-reclam/frequence-reception-reclam.component';

@NgModule({
  declarations: [
    AdminComponent,
    AutresPrestationsComponent,
    ReservationComponent,
    ComptabiliteComponent,
    ReglementFactureComponent,
    ExtourneComponent,
    EditionEtatComponent,
    EditionClientComponent,
    DashboardComponent,
    ClientComponent,
    RecapClientComponent,
    ChambresComponent,
    PrestationsServiceComponent,
    RestaurationComponent,
    EditionChambreComponent,
    EditionPrestationsServicesComponent,
    EditionComptabiliteComponent,
    AgentComponent,
    JourneeExerciceComponent,
    ParametrageComponent,
    PlaintesComponent,
    ReclamationsComponent,
    EditionsComponent,
    AttributionPlaintesReclamationsComponent,
    OperateurComponent,
    RelanceComponent,
    SuiviRequeteComponent,
    PrintPageComponent,
    EtatSuiviComponent,
    EtatSuiviReclamationComponent,
    FrequenceReceptionReclamComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, NgApexchartsModule],
})
export class AdminModule {}
