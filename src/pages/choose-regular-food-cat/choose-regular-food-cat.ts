import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChooseUserPage } from '../choose-user/choose-user';
import { AddRegularDetailsPage } from '../add-regular-details/add-regular-details';
import { ChooseRegularRestaurantCatPage } from '../choose-regular-restaurant-cat/choose-regular-restaurant-cat';
import { ChooseRegularRestaurantPage } from '../choose-regular-restaurant/choose-regular-restaurant';
import { HomePage } from '../home/home';


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
  public foodCatId;
  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  Checkbox(check){
      this.foodCatId = check;
  }

  ionViewDidLoad(){
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
    this.details = this.navParams.get('details');
    this.restCatId = this.navParams.get('restCatId');
    this.restId = this.navParams.get('restId');
  }

  goNext(event){
    this.data=
    {
      name:this.name,
      email:this.email,
      details:this.details,
      restCatId:this.restCatId,
      restId:this.restId,
      foodCatId:this.foodCatId
    }
  	this.navCtrl.setRoot(HomePage,this.data);
    console.log(this.data);
  }
  goBack(event){
  	this.navCtrl.setRoot(ChooseRegularRestaurantPage,{name:this.name,email:this.email,details:this.details,restCatId:this.restCatId,restId:this.restId});
  }
  goBack1(event){
  	this.navCtrl.setRoot(ChooseRegularRestaurantCatPage,{name:this.name,email:this.email,details:this.details,restCatId:this.restCatId});
  }
  goBack2(event){
  	this.navCtrl.setRoot(AddRegularDetailsPage,{name:this.name,email:this.email,details:this.details});
  }
  goBack3(event){
  	this.navCtrl.setRoot(ChooseUserPage,{name:this.name,email:this.email});
  }
  

}
