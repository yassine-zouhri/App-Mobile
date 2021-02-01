import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentsOnMapPageRoutingModule } from './incidents-on-map-routing.module';

import { IncidentsOnMapPage } from './incidents-on-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentsOnMapPageRoutingModule
  ],
  declarations: [IncidentsOnMapPage]
})
export class IncidentsOnMapPageModule {}
