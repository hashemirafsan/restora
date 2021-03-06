import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseRegularRestaurantPage } from '../choose-regular-restaurant/choose-regular-restaurant';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

@Component({
  selector: 'page-choose-regular-restaurant-cat',
  templateUrl: 'choose-regular-restaurant-cat.html',
})
export class ChooseRegularRestaurantCatPage {

  public name;
  public email;
  public details;
  public data;
  public restCatId = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    axios
      .get(route.app_url + '/all-restaurant-category')
      .then(res => {
        _.map(res.data, (item) => {
          item.status = false;
        })
        this.restCatId = res.data;
      })
      .catch(err => {
        console.log(err)
      })
  }

  Checkbox(check){
      console.log(this.restCatId)
  }

  ionViewDidLoad(){
  }

  goNext(event){
    this.updateRestaurantCategory(1);
  	this.navCtrl.setRoot(ChooseRegularRestaurantPage);
  }


  updateRestaurantCategory(user) {
    let arr = [];
    _.forEach(this.restCatId, (item) => {
      item.status ? arr.push(item.id) : false
    })
    axios
      .post(route.app_url + '/update-user/' + user, {restaurant_category: arr})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

}
