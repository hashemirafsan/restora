import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseRegularFoodCatPage } from '../choose-regular-food-cat/choose-regular-food-cat';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';


@Component({
  selector: 'page-choose-regular-restaurant',
  templateUrl: 'choose-regular-restaurant.html',
})
export class ChooseRegularRestaurantPage {

  public name;
  public email;
  public details;
  public restCatId = [];
  public restId;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    axios
      .get(route.app_url + '/all-restaurant')
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
        this.restId = check;
  }

  ionViewDidLoad(){
  }

  goNext(event){
    this.updateRegularRestaurant(1);
  	this.navCtrl.setRoot(ChooseRegularFoodCatPage);
  }

  updateRegularRestaurant(user) {
    let arr = []
    _.forEach(this.restCatId, (item) => {
      item.status ? arr.push(item.id) : false
    })
    axios
      .post(route.app_url + '/update-user/' + user, {restaurant: arr} )
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

}
