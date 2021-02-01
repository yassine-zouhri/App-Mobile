import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllIncidentsPageRoutingModule } from './all-incidents-routing.module';

import { AllIncidentsPage } from './all-incidents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllIncidentsPageRoutingModule
  ],
  declarations: [AllIncidentsPage]
})
export class AllIncidentsPageModule {}
