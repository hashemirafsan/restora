import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { FileChooser } from '@ionic-native/file-chooser';
import axios from 'axios';
import { route } from '../../assets/Auth/Auth';
import { SelectLocationPage } from '../select-location/select-location';


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
  public zila = {
    id: ''
  };
  public areas = [];
  public area = {
    id: ''
  };

  public form = {
    restaurant_name : '',
    address_line_1: '',
    address_line_2: '',
    user_id: 1
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

    let data = {
      area_id: this.area.id,
      zila_id: this.zila.id,
      ...this.form
    }

    axios.post(route.app_url + '/store-restaurant', data)
         .then((res) => {
            this.navCtrl.push(SelectLocationPage, {
              restaurant_id: res.data.restaurant_id
            })
         })
         .catch((err) => {
            console.log(err)
         })
    console.log(data)
  }

  getZila(event) {
    this.areas = event.areas;
  }

  getArea(event) {

  }

  loadImage() {
    // console.log('yes')
    // this.fileChooser.open()
    //     .then(uri => console.log(uri))
    //     .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateRestaurantPage');
  }

}
