import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRegularDetailsPage } from '../add-regular-details/add-regular-details';
import { CreateRestaurantPage } from '../create-restaurant/create-restaurant';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

@Component({
  selector: 'page-choose-user',
  templateUrl: 'choose-user.html',
})
export class ChooseUserPage {

	public name;
	public email;
  public data;
  public userId='';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userId = this.navParams.get('id')
  }

  ionViewDidLoad(){
  	this.name = this.navParams.get('name');
  	this.email = this.navParams.get('email');
    console.log(this.name+this.email);
  }



  regularUser(event){
  	this.updateUser(this.userId, 'regular')
  	this.navCtrl.setRoot(AddRegularDetailsPage,this.data);
  }
    authorityUser() {
        this.updateUser(this.userId, 'authority');
        this.navCtrl.setRoot(CreateRestaurantPage, this.data);
    }

  updateUser(user, type) {
    axios
      .post(route.app_url + '/update-user/' + user , {type: type})
      .then(res => {
        console.log(res)
      })
      .catch(err => {

      })
  }
  

}
