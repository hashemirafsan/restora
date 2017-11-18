import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddRegularDetailsPage } from '../add-regular-details/add-regular-details';


@Component({
  selector: 'page-choose-user',
  templateUrl: 'choose-user.html',
})
export class ChooseUserPage {

	public name;
	public email;
  public data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
  	this.name = this.navParams.get('name');
  	this.email = this.navParams.get('email');
    console.log(this.name+this.email);
  }

  regularUser(event){
  	this.data =
  	{
  		name:this.name,
  		email:this.email
  	}
  	this.navCtrl.setRoot(AddRegularDetailsPage,this.data);
  }

 
  

}
