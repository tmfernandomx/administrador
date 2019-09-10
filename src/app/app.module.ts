import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from 'angularfire2'; //importar estas tres cosas
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
//plugins
import{ImagePicker} from '@ionic-native/image-picker/ngx';
//auth
import{  AngularFireAuthModule} from "@angular/fire/auth"

@NgModule({
  declarations: [AppComponent, ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),//importar esao
     AngularFirestoreModule,
     AngularFireAuthModule,
     AngularFirestoreModule.enablePersistence()
    ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
