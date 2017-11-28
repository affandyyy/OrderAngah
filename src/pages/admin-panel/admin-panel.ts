import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Menu } from '../../model/menu.model';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the AdminPanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-panel',
  templateUrl: 'admin-panel.html',
})
export class AdminPanelPage {

  // Ini untuk menu


  menu: Observable<any[]>; // Listkan / input data
  Menu: AngularFireList<Menu>; // masukkan data

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public afDb: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.menu = this.afDb.list('/menu').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.val() as Menu;
        const id = a.payload.key;
        return { id, data };
      })
    })
    this.Menu = this.afDb.list('/menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPanelPage');
  }



  addMenu() {
    let prompt = this.alertCtrl.create({
      title: 'Menu',
      message: "Sila masukkan menu esok",
      inputs: [
        {
          name: 'title',
          placeholder: 'Nama Menu'
        },
        {
          name: 'harga',
          placeholder: 'Harga'
        },
        {
          name: 'kuantiti',
          placeholder: '0'
        },
      ],
      buttons: [
        {
          text: 'Batal',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Masuk',
          handler: data => {
            this.Menu.push({
              title: data.title,
              harga: data.harga,
              kuantiti: data.kuantiti,
            });
          }
        }
      ]
    });
    prompt.present();
  }



  showOptions(songId, songTitle, songHarga, songKuantiti) {
    console.log(songId, songTitle, songHarga, songKuantiti);

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Edit Menu ?',
      buttons: [
        {
          text: 'Padam Menu',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        }, {
          text: 'Kemaskini Menu',
          handler: () => {
            this.updateSong(songId, songTitle, songHarga, songKuantiti);
          }
        }, {
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


  removeSong(menuId) {
    this.Menu.remove(menuId);
  }

  updateSong(songId, songTitle, songHarga, songKuantiti){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
        {
          name: 'harga',
          placeholder: 'Harga',
          value: songHarga
        },
        {
          name: 'kuantiti',
          placeholder: 'Kuantiti',
          value: songKuantiti
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.Menu.update(songId, {
              title: data.title,
              harga: data.harga,
              kuantiti: data.kuantiti
            });
          }
        }
      ]
      
    });
    prompt.present();
  }



}
