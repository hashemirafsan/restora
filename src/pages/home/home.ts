import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';


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


  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams) {

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
