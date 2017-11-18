import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-restaurant-profile',
  templateUrl: 'restaurant-profile.html',
})

export class RestaurantProfilePage {
   @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantProfilePage');
    this.slides.lockSwipes(true);	
  }
  margin = "-30%";
  expresions = null;
  rate = null;
  onModelChange(rate){
  		this.margin = "0";	
  		let button = rate;
  		this.expresions = ["","Hated it!","Disliked it!","It's ok","Liked it!","Loved it!"] ; 
  				
  }

  submitbutton1(){
  	// slide
  	this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }


  submitbutton2(rate,title,desc){
  	// update review
  	console.log("done "+rate+" "+title+" "+desc);
    this.rate = rate;
  	// slide
  	this.slides.lockSwipes(false);
    this.slides.slideNext(); 
    this.slides.lockSwipes(true); 	
  }

  edit(){
      this.slides.slideTo(1);
  }

  delete(){
      this.rate = null;
      this.slides.slideTo(1);
  }

}
