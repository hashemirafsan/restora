import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChooseUserPage } from '../choose-user/choose-user';
import { ChooseRegularRestaurantCatPage } from '../choose-regular-restaurant-cat/choose-regular-restaurant-cat';

import { Keyboard } from '@ionic-native/keyboard';

import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

@Component({
  selector: 'page-add-regular-details',
  templateUrl: 'add-regular-details.html',
  providers: [Keyboard]
})
export class AddRegularDetailsPage {

  private onShowSubscription;
  private onHideSubscription;
  public key = false;
  public name;
  public email;
  public data;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private keyboard: Keyboard) {

    let key =  false;
    this.onShowSubscription = keyboard.onKeyboardShow().subscribe(e => this.onShow(e));
      this.onHideSubscription = keyboard.onKeyboardHide().subscribe(() => this.onHide());

  }

  ionViewDidLoad(){
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
  }

  goNext(event,details){
    this.updateDetails(1, details);
  	this.navCtrl.setRoot(ChooseRegularRestaurantCatPage,this.data);
  }
  goBack(event){
  	this.navCtrl.setRoot(ChooseUserPage,{name:this.name,email:this.email});

  }

  updateDetails(user,details) {
    axios
      .post(route.app_url + '/update-user/' + user, {about: details})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  private onShow(e) {
    this.key = true;
  };
 
  private onHide() {
    this.key = false;
  };

}
