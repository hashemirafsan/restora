import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {
  @ViewChild(Slides) picslider: Slides;

  images = ['food (1).jpg', 'food (2).jpg', 'food (3).jpg', 'food (4).jpg'];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

  // Restaurant search



}
