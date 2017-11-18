import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChooseUserPage } from '../choose-user/choose-user';
import { AddRegularDetailsPage } from '../add-regular-details/add-regular-details';
import { ChooseRegularRestaurantCatPage } from '../choose-regular-restaurant-cat/choose-regular-restaurant-cat';
import { ChooseRegularFoodCatPage } from '../choose-regular-food-cat/choose-regular-food-cat';


@Component({
  selector: 'page-choose-regular-restaurant',
  templateUrl: 'choose-regular-restaurant.html',
})
export class ChooseRegularRestaurantPage {

  public name;
  public email;
  public details;
  public restCatId;
  public restId;
  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  Checkbox(check){
        this.restId = check;
  }

  ionViewDidLoad(){
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
    this.details = this.navParams.get('details');
    this.restCatId = this.navParams.get('restCatId');
  }

  goNext(event){
    this.data=
    {
      name:this.name,
      email:this.email,
      details:this.details,
      restCatId:this.restCatId,
      restId:this.restId
    }
  	this.navCtrl.setRoot(ChooseRegularFoodCatPage,this.data);
  }
  goBack(event){
  	this.navCtrl.setRoot(ChooseRegularRestaurantCatPage,{name:this.name,email:this.email,details:this.details,restCatId:this.restCatId});
  }
  goBack1(event){
  	this.navCtrl.setRoot(AddRegularDetailsPage,{name:this.name,email:this.email,details:this.details});
  }
  goBack2(event){
  	this.navCtrl.setRoot(ChooseUserPage,{name:this.name,email:this.email});
  }

}
