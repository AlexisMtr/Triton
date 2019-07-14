import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PoseidonApiService } from './services/poseidon-api.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { AppService } from './services/app.service';
import { JwtInterceptor } from './middleware/http.interceptor';
import { AuthenticationGuard } from './middleware/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { HomeListComponent } from './components/home-list/home-list.componenet';
import { PoolComponent } from './components/pool/pool.component';
import { OwmApiService } from './services/weather.service';
import { PoolSettingsComponent } from './components/pool-settings/pool-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeListComponent,
    PoolComponent,
    PoolSettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PoseidonApiService,
    OwmApiService,
    AppService,
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }