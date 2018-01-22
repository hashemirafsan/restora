import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';


@Component({
  selector: 'page-choose-regular-food-cat',
  templateUrl: 'choose-regular-food-cat.html',
})
export class ChooseRegularFoodCatPage {

  public name;
  public email;
  public details;
  public restCatId;
  public restId;
  public foodCatId = [];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    axios
      .get(route.app_url + '/all-food-category')
      .then(res => {
        _.map(res.data, (item) => {
          item.status = false;
        })
        this.foodCatId = res.data;
      })
      .catch(err => {
        console.log(err)
      })
  }

  Checkbox(check){
      this.foodCatId = check;
  }

  ionViewDidLoad(){
  }

  goNext(event){
    this.updateFoodCategory(1);
  	this.navCtrl.setRoot(HomePage);
  }


  updateFoodCategory(user) {
    let arr = [];
    _.forEach(this.foodCatId, (item) => {
      item.status ? arr.push(item.id) : false
    })
    axios
      .post(route.app_url + '/update-user/' + user, {food_category: arr} )
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  

}
