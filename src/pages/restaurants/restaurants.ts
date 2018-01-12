import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

import { RestaurantProfilePage } from '../restaurant-profile/restaurant-profile';

/**
 * Generated class for the RestaurantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
})
export class RestaurantsPage {

	public restaurants = [];
	public loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  	this.geolocation.getCurrentPosition().then((position) => {
      console.log(position)


      let location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      this.fetchRestaurantData(location)

     // resp.coords.latitude
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantsPage');
  }

  fetchRestaurantData(position) {
  	axios.post(route.app_url + '/get-restaurant-lat-lng', position)
  		 .then((response) => {
  		 	this.restaurants = response.data.restaurants;
  		 	this.loading = false;
  		 })
  		 .catch((err) => {
  		 	console.log(err)
  		 })
  }

  goRestaurant(id) {
  	console.log(id)
  	this.navCtrl.push(RestaurantProfilePage , {
  		restaurant_id: id
  	})
  }

}
