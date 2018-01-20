import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import axios from 'axios';
import { route } from '../../assets/Auth/Auth';


/**
 * Generated class for the CreateRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-restaurant',
  templateUrl: 'create-restaurant.html',
})
export class CreateRestaurantPage {

  public zilas = [];
  public zila = {};
  public areas = [];
  public area = {};

  public form = {
    restaurant_name : '',
    address_line_1: '',
    address_line_2: '',
    user_id: 1
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private fileChooser: FileChooser) {
    this.fetchAllAreaAndZila()
  }

  fetchAllAreaAndZila() {
    axios.get(route.app_url + '/get-all-area')
        .then((res) => {
          this.zilas = res.data.zila
        })
        .catch((err) => {
          console.log(err)
        })
  }

  goMapPage() {
    console.log(this.form)
  }

  getZila(event) {
    this.areas = event.areas;
  }

  loadImage() {
    console.log('yes')
    this.fileChooser.open()
        .then(uri => console.log(uri))
        .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateRestaurantPage');
  }

}
