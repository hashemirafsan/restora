import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  text: number = 1;
  public userInfo = {};
  public userDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.fetchUserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  fetchUserData() {
  	axios
  		.get(route.app_url + '/user-info/1')
  		.then(res => {
  			this.userDetails = res.data;
  			this.userInfo = this.userDetails['user'];
  		})
  		.catch(err => {
  			console.log(err)
  		})
  }

}
