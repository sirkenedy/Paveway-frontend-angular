import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { MustMatchDirective } from './_helpers/must-match.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { 
  NavbarComponent, 
  FooterComponent, 
  SignupComponent, 
  SigninComponent, 
  DashboardComponent, 
  HomeComponent 
} from './components';
import {httpSetHeaders} from './Interceptors'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    HomeComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: httpSetHeaders, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
