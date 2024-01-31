import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExtourneComponent } from "./comptabilite/extourne/extourne.component";
import { ReglementFactureComponent } from "./comptabilite/reglement-facture/reglement-facture.component";
import { ClientComponent } from "./client/client.component";
import { ChambresComponent } from "./chambres/chambres.component";
import { RecapClientComponent } from "./client/recap-client/recap-client.component";
import { PrestationsServiceComponent } from "./prestations-service/prestations-service.component";
import { RestaurationComponent } from "./restauration/restauration.component";
import { ComptabiliteComponent } from "./comptabilite/comptabilite.component";
import { ReservationComponent } from "./prestations-service/reservation/reservation.component";
import { AutresPrestationsComponent } from "./prestations-service/autres-prestations/autres-prestations.component";
import { EditionChambreComponent } from "./edition-etat/edition-chambre/edition-chambre.component";
import { EditionClientComponent } from "./edition-etat/edition-client/edition-client.component";
import { EditionComptabiliteComponent } from "./edition-etat/edition-comptabilite/edition-comptabilite.component";
import { EditionPrestationsServicesComponent } from "./edition-etat/edition-prestations-services/edition-prestations-services.component";
import { EditionEtatComponent } from "./edition-etat/edition-etat.component";
import { ParametrageComponent } from "./parametrage/parametrage.component";
import { AgentComponent } from "./parametrage/agent/agent.component";
import { JourneeExerciceComponent } from "./parametrage/journee-exercice/journee-exercice.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },

      // menu dashboard
      { path: "dashboard", component: DashboardComponent },

      // menu client
      {
        path: "client",
        children: [
          { path: "", redirectTo: "liste", pathMatch: "full" },
          { path: "liste", component: ClientComponent },
          { path: "recapClient", component: RecapClientComponent },
        ],
      },

      // menu chambre
      { path: "chambres", component: ChambresComponent },

      // menu prestation de service
      {
        path: "prestation",
        children: [
          { path: "", redirectTo: "menu", pathMatch: "full" },
          { path: "menu", component: PrestationsServiceComponent },
          {
            path: "restauration",
            component: RestaurationComponent,
          },
          { path: "autresPrestation", component: AutresPrestationsComponent },
        ],
      },

      // menu reservation
      { path: "reservation", component: ReservationComponent },

      // menu comptabilité
      {
        path: "comptabilite",
        children: [
          { path: "", redirectTo: "menu", pathMatch: "full" },
          { path: "menu", component: ComptabiliteComponent },
          {
            path: "reglementFacture",
            component: ReglementFactureComponent,
          },
          { path: "extourne", component: ExtourneComponent },
        ],
      },

      // menu edition 
      {
        path: "edition",
        children: [
          { path: "", redirectTo: "menu", pathMatch: "full" },
          { path: "menu", component: EditionEtatComponent },
          {
            path: "editionChambre",
            component: EditionChambreComponent
          },
          { path: "editionClient", component: EditionClientComponent },
        { path: "editionComptabilite", component: EditionComptabiliteComponent},
        { path: "editionprestationsServices", component: EditionPrestationsServicesComponent},
        ],
      },

      // menu parametrage (samuel)
      {
        path: "parametrage",
        children: [
          { path: "", redirectTo: "menu", pathMatch: "full" },
          { path: "menu", component: ParametrageComponent },
          {
            path: "agent",
            component: AgentComponent,
          },
          { path: "journeeExercice", component: JourneeExerciceComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
