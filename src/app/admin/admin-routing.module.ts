import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaintesComponent } from './plaintes/plaintes.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { EditionsComponent } from './editions/editions.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // menu dashboard
      { path: 'dashboard', component: DashboardComponent },

      // menu plaintes
      {
        path: 'plaintes',
        children: [
          { path: '', redirectTo: 'liste', pathMatch: 'full' },
          { path: 'liste', component: PlaintesComponent },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
