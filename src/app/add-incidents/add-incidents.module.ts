import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddIncidentsPageRoutingModule } from './add-incidents-routing.module';

import { AddIncidentsPage } from './add-incidents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddIncidentsPageRoutingModule
  ],
  declarations: [AddIncidentsPage]
})
export class AddIncidentsPageModule {}
