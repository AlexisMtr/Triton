import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TritonLoginComponent } from './components/triton-login/triton-login.component';

@NgModule({
  declarations: [
    AppComponent,
    TritonLoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
