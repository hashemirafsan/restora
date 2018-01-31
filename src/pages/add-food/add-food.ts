import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import {AutocompletePage} from '../autocomplete/autocomplete';
//import { FileChooser } from '@ionic-native/file-chooser';
import { SelectRestaurantCatPage } from '../select-restaurant-cat/select-restaurant-cat';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})

export class AddFoodPage{
  @ViewChild(Slides) picslider: Slides;

  public inputs;
  public photos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }


    // restaurant search
   showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);

    modal.onDidDismiss(data => {
      this.inputs = data;
    });
    modal.present();
   }


  //go next
  goNext(event){
    this.navCtrl.setRoot(HomePage);
  }

  //go back
  goBack(event){
    this.navCtrl.setRoot(SelectRestaurantCatPage);
  }

  //file choose
  // openFile(){
  //   this.fileChooser.open()
  //   .then(uri => console.log(uri))
  //   .catch(e => console.log(e));
  // }

}
