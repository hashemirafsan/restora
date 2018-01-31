import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import axios from 'axios';
import { NativeStorage } from '@ionic-native/native-storage';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { RestaurantProfilePage } from '../restaurant-profile/restaurant-profile';
import { FoodProfilePage } from '../food-profile/food-profile';
import * as io from 'socket.io-client';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;
  socket: any;
  public name;
  public email;
  public details;
  public restCatId;
  public restId;
  public foodCatId;
  public userInfo = {};
  public user = {};
  public getData = {};
  public searchBar = false;
  public restaurants = [];
  public food = [];
  public loader = null;
  public location = {};
  public msg = '';
  public obj = {};

  constructor(public nativeStorage: NativeStorage, public toastCtrl: ToastController, private localNotifications: LocalNotifications,public backgroundMode : BackgroundMode,public loadingCtrl: LoadingController, public navCtrl: NavController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private googleMaps: GoogleMaps, public viewCtrl: ViewController,public navParams: NavParams) {
    
    this.nativeStorage.getItem('myitem')
    .then(
      data => this.obj = data,
      error => console.error(error)
    );

    this.socket = io.connect('https://restora.herokuapp.com/' , {
          query: "userId=" + 1
        });

    console.log(this.socket)

    this.socket.on('create_restaurant', (msg) => {

      this.msg = this.msg + msg;

      this.localNotifications.schedule({
        id: 1,
        text: 'Single ILocalNotification'
      });

      this.presentToast(msg);
    })


    
    axios
      .get(route.app_url + '/user-info/1')
      .then(res => {
        this.userInfo = res.data
        this.user = this.userInfo['user']
      })
      .catch(err => {
        console.log(err)
      })

    this.geolocation.getCurrentPosition().then((position) => {
      this.getData = "Can't find you!";
      console.log('pos',position)

      this.location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude)
        .then((result: NativeGeocoderReverseResult) => this.getData = result)
        .catch((error: any) => console.log(error));

     // resp.coords.latitude
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  goFood(id) {
    this.navCtrl.push(FoodProfilePage, {
      food_id: id
    })
  }

  goRestaurant(id) {
    console.log(id)
    this.navCtrl.push(RestaurantProfilePage, {
      restaurant_id: id
    });
  }

  openSearch() {
    this.searchBar = !this.searchBar;
    console.log(this.searchBar)
  }

  getItems(event) {
    axios
        .post(route.app_url+'/search-restaurant-food/', {search : event.target.value})
        .then(({ data: { restaurant, food }}) => {
            this.food = food;
            this.restaurants = restaurant;
        })
        .catch((err) => {
          console.log(err)
        })
  }

  ionViewDidLoad(){
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
    this.details = this.navParams.get('details');
    this.restCatId = this.navParams.get('restCatId');
    this.restId = this.navParams.get('restId');
    this.foodCatId = this.navParams.get('foodCatId');

    this.getNotification('user', 1);
  }

  ionViewWillEnter() {
       this.viewCtrl.showBackButton(false);
  }

   presentToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'down'
      });
      toast.present();
    }


    //check notification
    public new_notification = null;

    getNotification(type, user_id) {
    axios.get(route.app_url + '/get-notifications/' + type + '/' + user_id)
         .then(res => {
          this.new_notification = res.data.new_notification
          if(this.new_notification == 0){
            this.new_notification = null;
          }

         })
         .catch(err => {
            console.log(err)
         })
    }

      

}