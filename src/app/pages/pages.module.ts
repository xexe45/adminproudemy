import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { ChartsModule } from "ng2-charts";
import { GraficoComponent } from '../components/grafico/grafico.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoComponent,
    AccountSettingsComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule]
})
export class PagesModule {}
