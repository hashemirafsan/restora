import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-food-profile',
  templateUrl: 'food-profile.html',
})
export class FoodProfilePage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild(Slides) picslider: Slides;

  images = ['food (1).jpg', 'food (2).jpg', 'food (3).jpg', 'food (4).jpg'];

  constructor(public navCtrl: NavController, public navParams: NavParams,public photoViewer: PhotoViewer) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodProfilePage');
    this.slides.lockSwipes(true);
    this.picslider.lockSwipes(false)
  }


    // love react

    buttonIcon: string = "ios-heart-outline";
      
      toggleIcon(getIcon: string) {
        
      if (this.buttonIcon === 'ios-heart') {
        this.buttonIcon = "ios-heart-outline";
      }
      else if (this.buttonIcon === 'ios-heart-outline') {
        this.buttonIcon = "ios-heart";
      }
      
    }
  
    // Ate option

    disbutton: string = "disabledbtn";
      
      togglebtn(getbtn: string) {
        
      if (this.disbutton === 'activebtn') {
        this.disbutton = "disabledbtn";
      }
      else if (this.disbutton === 'disabledbtn') {
        this.disbutton = "activebtn";
      }
      
    }

    

    //photo viewer
    photoViewerfunc(img : string){
      console.log(img);
        this.photoViewer.show('assets/images/FoodItem/img', 'My image title', {share: false});
    }

    //rating
    margin = "-15%";
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
