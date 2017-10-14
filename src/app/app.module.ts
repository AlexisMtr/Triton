import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TritonLoginComponent } from './components/triton-login/triton-login.component';
import { PoseidonApiService } from './services/poseidon-api.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { TritonHeaderComponent } from './components/triton-header/triton-header.component';
import { TritonAsideComponent } from './components/triton-aside/triton-aside.component';
import { TritonContentComponent } from './components/triton-content/triton-content.component';

@NgModule({
  declarations: [
    AppComponent,
    TritonLoginComponent,
    TritonHeaderComponent,
    TritonAsideComponent,
    TritonContentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    PoseidonApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
