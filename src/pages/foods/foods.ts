import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

import { FoodProfilePage } from '../food-profile/food-profile';

/**
 * Generated class for the FoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-foods',
  templateUrl: 'foods.html',
})
export class FoodsPage {
  public foods = [];
  public loading = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  	this.geolocation.getCurrentPosition().then((position) => {
      console.log(position)


      let location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      this.fetchFoodData(location)

     // resp.coords.latitude
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  fetchFoodData(position) {
  	axios.post(route.app_url + '/get-food-lat-lng', position)
  		 .then((response) => {
  		 	response.data.forEach((item) => {
  		 		item.food_lists.forEach((food) => {
  		 			let data = {
	  		 			name: item.restaurant_name,
	  		 			food
	  		 		}
	  		 		this.foods.push(data)
  		 		})
  		 	})

        console.log(this.foods)
  		 	this.loading = false;
  		 })
  		 .catch((err) => {
  		 	console.log(err)
  		 })
  }

  goFood(id) {
    console.log(id)
  	this.navCtrl.push(FoodProfilePage, {
  		food_id: id
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodsPage');
  }

}
