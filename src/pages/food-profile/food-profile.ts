import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ImageViewerController } from 'ionic-img-viewer';

@Component({
  selector: 'page-food-profile',
  templateUrl: 'food-profile.html',
})
export class FoodProfilePage {
  // _imageViewerCtrl: ImageViewerController;
  // images = ['food (1).jpg', 'food (2).jpg', 'food (3).jpg', 'food (4).jpg'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   //  imageViewerCtrl: ImageViewerController
  	// this._imageViewerCtrl = imageViewerCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodProfilePage');
  }

  buttonIcon: string = "ios-heart-outline";
      
      toggleIcon(getIcon: string) {
        
      if (this.buttonIcon === 'ios-heart') {
        this.buttonIcon = "ios-heart-outline";
      }
      else if (this.buttonIcon === 'ios-heart-outline') {
        this.buttonIcon = "ios-heart";
      }
      
    }
  
}
