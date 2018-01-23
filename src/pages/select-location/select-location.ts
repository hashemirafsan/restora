import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SelectRestaurantCatPage } from '../select-restaurant-cat/select-restaurant-cat';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import axios from 'axios';
import { route } from '../../assets/Auth/Auth';

declare var google;

@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html',
})
export class SelectLocationPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lastLat: 0;
  lastLng: 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: true
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        draggable: true
      });


      google.maps.event.addListener(marker, 'dragend', () =>{ 
         this.lastLat = marker.position.lat()
         this.lastLng = marker.position.lng()
      
      });
      

      console.log(this.map)


      google.maps.event.addListener(marker, 'click', () => {
        this.navCtrl.setRoot(SelectRestaurantCatPage);
      });

 
    }, (err) => {
      console.log(err);
    });
 
  }

  // addMarker(){

  //   let data = {
  //     lat: this.lastLat,
  //     lng: this.lastLng
  //   }
    
  //   axios.post(route.app_url + '/store-lat-lng/' + this.navParams.data.restaurant_id, data)
  //        .then((response) => {
  //           console.log(response)
  //        })
  //        .catch((err) => {
  //          console.log(err)
  //        })
   
  // }

  // addInfoWindow(marker, content){
 
  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });
   
  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
 
  // }

}
