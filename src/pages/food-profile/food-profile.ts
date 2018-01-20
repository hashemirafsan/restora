import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { route } from '../../assets/Auth/Auth';
import axios from 'axios';
import { ToastController } from 'ionic-angular';
// import { ImageViewerController } from 'ionic-img-viewer';

@Component({
  selector: 'page-food-profile',
  templateUrl: 'food-profile.html',
})
export class FoodProfilePage {

  @ViewChild(Slides) slides: Slides;
  @ViewChild(Slides) picslider: Slides;

  images = ['food (1).jpg', 'food (2).jpg', 'food (3).jpg', 'food (4).jpg'];
  public food_details = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public photoViewer: PhotoViewer,public toastCtrl: ToastController) {
    console.log('food_id', this.navParams.data.food_id)
    this.getFoodData(this.navParams.data.food_id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodProfilePage');

    this.slides.lockSwipes(true);
    this.picslider.lockSwipes(false)
  }

  getFoodData(food_id) {
    axios.get(route.app_url + '/get-food-by-id/' + food_id + '/' + 1)
         .then((response) => {
            this.food_details = response.data
            this.buttonIcon = response.data.loved_status ? 'ios-heart-outline' : 'ios-heart'
         })
         .catch((err) => {
            console.log(err)
         })
  }


    // love react

    buttonIcon: string = "ios-heart-outline";

    changeToggle() {
      axios
        .get(route.app_url + '/food-ate-unate/' + this.navParams.data.food_id + '/' + 1)
        .then((response) => {
          this.getFoodData(this.navParams.data.food_id)
          this.presentToast(response.data.message)
        })
        .catch((err) => {})
    }

      
    toggleIcon() {
        
      axios
        .get(route.app_url + '/food-like-unlike/' + this.navParams.data.food_id + '/' + 1)
        .then((response) => {
          this.getFoodData(this.navParams.data.food_id)
          this.presentToast(response.data.message)
        })
        .catch((err) => {})
      
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

    presentToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 2000,
        position: 'down'
      });
      toast.present();
    }

}
