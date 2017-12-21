import { Component } from '@angular/core';

import { ListOrderPage } from '../listorder/listorder';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth' // Everytime want to use FB
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  

  tab1Root = HomePage;
  tab2Root = ListOrderPage;

  constructor(private afAuth: AngularFireAuth , private toast: ToastController,
  public navCtrl: NavController, public navParams: NavParams) {

  }


  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email){
      this.toast.create({
        message: 'Logged In',
        duration: 3000
      }).present()
    }
    else{
      this.toast.create({
        message: 'Could not connect',
        duration: 3000
      }).present()
    }
    })
  }
}
