import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';


import axios from 'axios';
import { route } from '../../assets/Auth/Auth';

import { RestaurantProfilePage } from '../restaurant-profile/restaurant-profile';
import { FoodProfilePage } from '../food-profile/food-profile';

/**
 * Generated class for the RecommendedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recommended',
  templateUrl: 'recommended.html',
})
export class RecommendedPage {

  public nearestData = 0;
  public rec_food;
  public loading = true;
  public choose_res ; 

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	private nativeGeocoder: NativeGeocoder,
  	private geolocation: Geolocation
  ) {
  	this.nearestLocation();
  }

  nearestLocation() {
  	this.geolocation.getCurrentPosition().then((position) => {
      const url = route.app_url + '/search-restaurant';
      axios
      	  .post(url, { lat: position.coords.latitude, lng: position.coords.longitude, user: 1 })
      	  .then((res) => {
      	  	this.nearestData = res.data.nearest;
      	  	this.rec_food = res.data.recommended_food;
      	  	this.choose_res = res.data.choose_restaurant;
      	  	this.loading = false;
      	  })
      	  .catch((err) => {
      	  	console.log(err)
      	  })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  goRestaurant(id) {
  	console.log(id)
  	this.navCtrl.push(RestaurantProfilePage , {
  		restaurant_id: id
  	})
  }

  goFood(id) {
  	this.navCtrl.push(FoodProfilePage, {
  		food_id: id
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendedPage');
  }

}
