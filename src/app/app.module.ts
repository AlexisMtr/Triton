import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TritonLoginComponent } from './components/triton-login/triton-login.component';
import { PoseidonApiService } from './services/poseidon-api.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { TritonHeaderComponent } from './components/triton-header/triton-header.component';
import { TritonAsideComponent } from './components/triton-aside/triton-aside.component';
import { TritonContentComponent } from './components/triton-content/triton-content.component';
import { TritonLastOverviewComponent } from './components/triton-last-overview/triton-last-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { TritonChartComponent } from './components/triton-chart/triton-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TritonLoginComponent,
    TritonHeaderComponent,
    TritonAsideComponent,
    TritonContentComponent,
    TritonLastOverviewComponent,
    TritonChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    PoseidonApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }