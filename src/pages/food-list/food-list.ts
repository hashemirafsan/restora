import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddFoodPage } from "../add-food/add-food";
/**
 * Generated class for the FoodListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-food-list',
  templateUrl: 'food-list.html',
})
export class FoodListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodListPage');
  }

  goFood(id) {
   //  console.log(id)
  	// this.navCtrl.push(FoodProfilePage, {
  	// 	food_id: id
  	// })
  }


  delete(){

  }

  edit(){
  	this.navCtrl.setRoot(AddFoodPage);
  }

}
