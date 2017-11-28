import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Every pages declare here
import { ListOrderPage } from '../pages/listorder/listorder';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MainLoginPage } from '../pages/main-login/main-login';
import { AdminPanelPage } from '../pages/admin-panel/admin-panel';

// Database integration #1
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// Database Config #2
export const firebaseConfig = {
  apiKey: "AIzaSyA6sCZS_6ZgGMSboXYpH4w94O-t08G28cg",
  authDomain: "orderkuih-13815.firebaseapp.com",
  databaseURL: "https://orderkuih-13815.firebaseio.com",
  projectId: "orderkuih-13815",
  storageBucket: "orderkuih-13815.appspot.com",
  messagingSenderId: "586839000901"
};

@NgModule({
  declarations: [
    MyApp,
    ListOrderPage,
    ContactPage,
    HomePage,
    TabsPage,
    MainLoginPage,
    AdminPanelPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    // Database Import #3
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListOrderPage,
    ContactPage,
    HomePage,
    TabsPage,
    MainLoginPage,
    AdminPanelPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
