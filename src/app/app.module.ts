import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from "./shared/security/auth.service";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database/database.module";
import {AngularFireAuth} from "angularfire2/auth/auth";
import {AngularFireAuthModule} from "angularfire2/auth/auth.module";

var firebaseConfig = {
  apiKey: "AIzaSyCjrJ-g5KW3khx1XbT8C5Ku59H0xpP_r58",
  authDomain: "defio-959c1.firebaseapp.com",
  databaseURL: "https://defio-959c1.firebaseio.com",
  projectId: "defio-959c1",
  storageBucket: "defio-959c1.appspot.com",
  messagingSenderId: "726692528687"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
