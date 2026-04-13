import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { App } from './app';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MarchesComponent } from './pages/marches/marches.component';
import { FournisseursComponent } from './pages/fournisseurs/fournisseurs.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'marches', component: MarchesComponent },
  { path: 'fournisseurs', component: FournisseursComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    App,
    DashboardComponent,
    MarchesComponent,
    FournisseursComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HeaderComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
