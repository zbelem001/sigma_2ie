import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { App } from './app';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MarchesComponent } from './pages/marches/marches.component';
import { MarchesDetailsComponent } from './pages/marches-details/marches-details.component';
import { FournisseursComponent } from './pages/fournisseurs/fournisseurs.component';
import { TransformationComponent } from './pages/transformation/transformation.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'marches', component: MarchesComponent },
  { path: 'marches/details', component: MarchesDetailsComponent },
  { path: 'fournisseurs', component: FournisseursComponent },
  { path: 'transformation', component: TransformationComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    App,
    DashboardComponent,
    MarchesComponent,
    MarchesDetailsComponent,
    FournisseursComponent,
    TransformationComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HeaderComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
