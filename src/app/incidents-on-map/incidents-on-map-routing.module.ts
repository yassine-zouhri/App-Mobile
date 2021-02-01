import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentsOnMapPage } from './incidents-on-map.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentsOnMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentsOnMapPageRoutingModule {}
