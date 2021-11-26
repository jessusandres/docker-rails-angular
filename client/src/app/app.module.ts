import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MainReducer } from './store/main.reducer';
import { AppEffects } from './store/effects/app.effects';
import { HttpClientModule } from '@angular/common/http';

let storeDevTool: any = [];
const isProduction = environment.production;

if (!isProduction) {
  storeDevTool = StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: false
  });
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(MainReducer),
    EffectsModule.forRoot([AppEffects]),
    storeDevTool
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
