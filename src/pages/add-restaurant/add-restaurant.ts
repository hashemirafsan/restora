import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AutocompleteAddressPage } from '../autocomplete-address/autocomplete-address';
import { AutocompleteAreaPage } from '../autocomplete-area/autocomplete-area';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-add-restaurant',
  templateUrl: 'add-restaurant.html',
})

export class AddRestaurantPage{
  @ViewChild(Slides) picslider: Slides;

  public inputs;
  public photos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private imagePicker:ImagePicker,private cropService : Crop,private camera : Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }


    // restaurant address search
   showAddressModal () {
    let modal = this.modalCtrl.create(AutocompleteAddressPage);

    modal.onDidDismiss(data => {
      this.inputs = data;
    });
    modal.present();
  }


    // restaurant area search
   showAreaModal () {
    let modal = this.modalCtrl.create(AutocompleteAreaPage);

    modal.onDidDismiss(data => {
      this.inputs = data;
    });
    modal.present();
  }

  //image picker
  openImagePicker(){
    let options= {
      maximumImagesCount: 5,
    }
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
    .then((results) => {
      this.reduceImages(results).then(() => {
        console.log('all images cropped!!');
      });
    }, (err) => { console.log(err) });
  }

  reduceImages(selected_pictures: any) : any{
      return selected_pictures.reduce((promise:any, item:any) => {
        return promise.then((result) => {
          return this.cropService.crop(item, {quality: 75})
          .then(cropped_image => this.photos.push(cropped_image));
        });
      }, Promise.resolve());
    }

  takePicture(){
  let options =
  {
    quality: 100,
    correctOrientation: true
  };
  this.camera.getPicture(options)
  .then((data) => {
    this.photos = new Array<string>();
    this.cropService
    .crop(data, {quality: 75})
    .then((newImage) => {
      this.photos.push(newImage);
    }, error => console.error("Error cropping image", error));
  }, function(error) {
    console.log(error);
  });
}

  //update food
  updateFood(user) {
    // let arr = [];
    // _.forEach(this.foodCatId, (item) => {
    //   item.status ? arr.push(item.id) : false
    // })
    // axios
    //   .post(route.app_url + '/update-user/' + user, {food_category: arr} )
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }


}
