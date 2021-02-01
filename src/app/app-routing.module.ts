import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'all-incidents',
    loadChildren: () => import('./all-incidents/all-incidents.module').then( m => m.AllIncidentsPageModule)
  },
  {
    path: 'my-incidents',
    loadChildren: () => import('./my-incidents/my-incidents.module').then( m => m.MyIncidentsPageModule)
  },
  {
    path: 'add-incidents',
    loadChildren: () => import('./add-incidents/add-incidents.module').then( m => m.AddIncidentsPageModule)
  },
  {
    path: 'incidents-on-map',
    loadChildren: () => import('./incidents-on-map/incidents-on-map.module').then( m => m.IncidentsOnMapPageModule)
  },
  {
    path: 'incident-detail',
    loadChildren: () => import('./incident-detail/incident-detail.module').then( m => m.IncidentDetailPageModule)
  },
  {
    path: 'modal-filter',
    loadChildren: () => import('./modal-filter/modal-filter.module').then( m => m.ModalFilterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
