import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,ToastController,LoadingController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import {AutocompletePage} from '../autocomplete/autocomplete';
import { SelectRestaurantCatPage } from '../select-restaurant-cat/select-restaurant-cat';
import { HomePage } from '../home/home';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})

export class AddFoodPage{
  @ViewChild(Slides) picslider: Slides;

  public inputs;
  public photos = [];

  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController,
  private transfer: FileTransfer,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }


    // restaurant search
   showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);

    modal.onDidDismiss(data => {
      this.inputs = data;
    });
    modal.present();
   }


  //go next
  goNext(event){
    this.navCtrl.setRoot(HomePage);
  }

  //go back
  goBack(event){
    this.navCtrl.setRoot(SelectRestaurantCatPage);
  }

  //file get
  getImage() {
  const options = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
  }, (err) => {
    console.log(err);
    this.presentToast(err);
  });
}


  // file upload
  uploadFile() {
  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();
  const fileTransfer: FileTransferObject = this.transfer.create();

  let options: FileUploadOptions = {
    fileKey: 'ionicfile',
    fileName: 'ionicfile',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }

  fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
    .then((data) => {
    console.log(data+" Uploaded Successfully");
    this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    loader.dismiss();
    this.presentToast("Image uploaded successfully");
  }, (err) => {
    console.log(err);
    loader.dismiss();
    this.presentToast(err);
  });
}

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


}
