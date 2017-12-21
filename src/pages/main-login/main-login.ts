// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, App, LoadingController, NavController } from 'ionic-angular';

import { User } from '../../model/user'
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { AdminPanelPage } from '../admin-panel/admin-panel';
// AgAuth


@Component({
  selector: 'page-main-login',
  templateUrl: 'main-login.html',
})

export class MainLoginPage {

  // Auth purpose
  user = {} as User;
  error : any;

  public loginForm: any;
  public backgroundImage = "assets/imgs/kuih.png";


  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public app: App,
    private afAuth: AngularFireAuth
  ) { }

  // logForm(user) {
  //   // Below is the process of authentication of user
  //   try {
  //     const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  //     console.log(user.email);
  //     if (result) {
  //       this.navCtrl.setRoot(TabsPage);
  //     }
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }


  // }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        // Loading purpose
        const loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        // Muncul loading
        loading.present();
        // Direct pages
        this.navCtrl.push(TabsPage);
      }
    }
    catch (e) {
      const alert = this.alertCtrl.create({
        title: 'Salah',
        subTitle: 'Thanks for logging in.',
        buttons: ['Dismiss']
      });
      console.log(e);
      alert.present();
    }
  }

  //setRoot for no navigate back && push() for nav button

  goToAdmin() {
    this.navCtrl.push(AdminPanelPage);
  }


  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}

