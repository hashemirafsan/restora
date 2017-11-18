import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChooseUserPage } from '../choose-user/choose-user';
import { AddRegularDetailsPage } from '../add-regular-details/add-regular-details';
import { ChooseRegularRestaurantPage } from '../choose-regular-restaurant/choose-regular-restaurant';

@Component({
  selector: 'page-choose-regular-restaurant-cat',
  templateUrl: 'choose-regular-restaurant-cat.html',
})
export class ChooseRegularRestaurantCatPage {

  public name;
  public email;
  public details;
  public restCatId;
  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  Checkbox(check){
      this.restCatId = check;
  }

  ionViewDidLoad(){
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
    this.details = this.navParams.get('details');
  }

  goNext(event){
    this.data=
    {
      name:this.name,
      email:this.email,
      details:this.details,
      restCatId:this.restCatId
    }
  	this.navCtrl.setRoot(ChooseRegularRestaurantPage,this.data);
  }
  goBack(event){
  	this.navCtrl.setRoot(AddRegularDetailsPage,{name:this.name,email:this.email,details:this.details});
  }
  goBack1(event){
  	this.navCtrl.setRoot(ChooseUserPage,{name:this.name,email:this.email});
  }

}
