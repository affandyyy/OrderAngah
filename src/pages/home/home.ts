import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


// Auth purpose #1
import { User } from '../../model/user'
import { AngularFireAuth } from 'angularfire2/auth';

import { Menu } from '../../model/menu.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Dari menu order song.model
  menu: Observable<any[]>;
  Menu: AngularFireList<Menu>;

  // Auth purpose #2
  user = {} as User;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public afDb: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    public afAuth: AngularFireAuth,
    public toast: ToastController
  ) {
    this.menu = this.afDb.list('/menu').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.val() as Menu;
        const id = a.payload.key;
        return { id, data };
      })
    })
    this.Menu = this.afDb.list('/menu');
  }


  // Below is for greeting
  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Hello ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details`,
          duration: 3000
        }).present();
      }
    });
  }


  // End greeting





  showOptions(songId, a, b, c) {
    console.log(songId, a, b, c);

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Order',
      buttons: [
        // {
        //   text: 'Masukkan kuantiti order',
        //   handler: () => {
        //     this.updateQ(songId, a, b, c);
        //   }
        // }, 
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }



  updateQ(songId, a, b, c) {
    let prompt = this.alertCtrl.create({
      title: 'Menu',
      message: "Masukkan kuantiti order",
      inputs: [
        {
          name: 'kuantiti',
          placeholder: 'Kuantiti',
          value: c
        },
      ],
      buttons: [
        {
          text: 'Batal',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        // {
        //   text: 'Hantar',
        //   handler: data => {
        //     this.Menu.update(songId, {
        //       title: data.title,
        //       harga: data.harga,
        //       kuantiti: data.kuantiti,
        //     });
        //   }
        // }
      ]

    });
    prompt.present();
  }







}

