import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import axios from 'axios';
import _ from 'lodash';
import { route } from '../../assets/Auth/Auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedItem: any;

  public name;
  public email;
  public details;
  public restCatId;
  public restId;
  public foodCatId;
  public userInfo = {};
  public user = {};


  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams) {
    axios
      .get(route.app_url + '/user-info/1')
      .then(res => {
        this.userInfo = res.data
        this.user = this.userInfo['user']
      })
      .catch(err => {
        console.log(err)
      })
  }

  ionViewDidLoad(){
    this.name = this.navParams.get('name');
    this.email = this.navParams.get('email');
    this.details = this.navParams.get('details');
    this.restCatId = this.navParams.get('restCatId');
    this.restId = this.navParams.get('restId');
    this.foodCatId = this.navParams.get('foodCatId');
  }

  ionViewWillEnter() {
       this.viewCtrl.showBackButton(false);
  }

  	  

}
