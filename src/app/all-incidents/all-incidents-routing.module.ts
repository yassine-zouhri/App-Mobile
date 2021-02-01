import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllIncidentsPage } from './all-incidents.page';

const routes: Routes = [
  {
    path: '',
    component: AllIncidentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllIncidentsPageRoutingModule {}
