import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import axios from 'axios';
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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;

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

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private googleMaps: GoogleMaps, public viewCtrl: ViewController,public navParams: NavParams) {
    
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
      console.log(position)

      this.nativeGeocoder.reverseGeocode(position.coords.latitude, position.coords.longitude)
        .then((result: NativeGeocoderReverseResult) => this.getData = result)
        .catch((error: any) => console.log(error));

     // resp.coords.latitude
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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
  }

  ionViewWillEnter() {
       this.viewCtrl.showBackButton(false);
  }

  	  

}
