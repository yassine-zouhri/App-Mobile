import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddIncidentsPage } from './add-incidents.page';

const routes: Routes = [
  {
    path: '',
    component: AddIncidentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddIncidentsPageRoutingModule {}
