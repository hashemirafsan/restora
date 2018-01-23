import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddFoodPage } from '../add-food/add-food';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

@Component({
  selector: 'page-select-restaurant-cat',
  templateUrl: 'select-restaurant-cat.html',
})
export class SelectRestaurantCatPage {

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

        console.log(res);
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
  	this.navCtrl.setRoot(AddFoodPage);
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
